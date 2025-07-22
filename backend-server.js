/**
 * MühasibatlıqPro v2.0 - Modern Multi-Tenant SaaS Backend
 * Built with Node.js + Express + PostgreSQL
 * Modern ES6+ patterns with enhanced security
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const WebSocket = require('ws');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const rateLimit = require('express-rate-limit');
const mysql = require('mysql2/promise');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

// Security Configuration
const SECURITY_CONFIG = {
    jwt: {
        secret: process.env.JWT_SECRET || 'muhasibatlıq-pro-v2-ultra-secure-2024',
        accessTokenExpiry: '1h',
        refreshTokenExpiry: '30d'
    },
    bcrypt: {
        saltRounds: 12
    },
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }
};

class ModernBackendServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.wsPort = process.env.WS_PORT || 3001;
        this.version = '2.0.0';
        this.isProduction = process.env.NODE_ENV === 'production';
        this.dbClientType = process.env.DB_CLIENT || 'pg';
        
        // Initialize database connection
        this.initializeDatabase();
        
        // Setup middleware
        this.setupSecurityMiddleware();
        this.setupCorsMiddleware();
        this.setupBodyParsingMiddleware();
        this.setupLoggingMiddleware();
        this.setupRateLimitingMiddleware();
        this.setupCustomMiddleware();
        
        // Setup routes
        this.setupRoutes();
        
        // Setup error handling
        this.setupErrorHandling();
        
        // Setup WebSocket
        this.setupWebSocketServer();
        
        // Setup WhatsApp Bot
        this.setupWhatsAppBot();
        
        // Initialize database schema
        this.initializeDatabaseSchema();
    }

    initializeDatabase() {
        if (this.dbClientType === 'pg') {
            this.pool = new Pool({
                user: process.env.DB_USER || 'postgres',
                host: process.env.DB_HOST || 'localhost',
                database: process.env.DB_NAME || 'muhasibatliq_pro_v2',
                password: process.env.DB_PASSWORD || 'password',
                port: process.env.DB_PORT || 5432,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
                ssl: this.isProduction ? { rejectUnauthorized: false } : false
            });

            this.db = {
                query: (text, params) => this.pool.query(text, params),
                client: this.pool
            };

            this.pool.on('connect', () => {
                console.log('✅ PostgreSQL Database connected successfully');
            });

            this.pool.on('error', (err) => {
                console.error('❌ PostgreSQL Database connection error:', err);
            });

        } else if (this.dbClientType === 'mariadb') {
             this.pool = mysql.createPool({
                user: process.env.DB_USER || 'root',
                host: process.env.DB_HOST || 'localhost',
                database: process.env.DB_NAME || 'muhasibatliq_pro_v2',
                password: process.env.DB_PASSWORD || 'password',
                port: process.env.DB_PORT || 3306,
                waitForConnections: true,
                connectionLimit: 20,
                queueLimit: 0
            });

            this.db = {
                query: async (text, params) => {
                    // Convert pg's $1, $2 placeholders to mysql's ?
                    const mysqlQuery = text.replace(/\$(\d+)/g, '?');
                    const [rows] = await this.pool.query(mysqlQuery, params);
                    return { rows };
                },
                client: this.pool
            };

            this.pool.getConnection()
                .then(conn => {
                    console.log('✅ MariaDB Database connected successfully');
                    conn.release();
                })
                .catch(err => console.error('❌ MariaDB Database connection error:', err));
        } else {
            throw new Error(`Unsupported DB_CLIENT: ${this.dbClientType}`);
        }
    }

    setupSecurityMiddleware() {
        // Enhanced security headers
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
                    fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "https://esm.sh"],
                    connectSrc: ["'self'", "wss:", "https://esm.sh"],
                    imgSrc: ["'self'", "data:", "https:"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"]
                }
            },
            crossOriginEmbedderPolicy: false,
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true
            },
            // whatsapp-web.js requires puppeteer which may have issues with default CSP
            contentSecurityPolicy: false,
        }));

        // Remove X-Powered-By header
        this.app.disable('x-powered-by');
    }

    setupCorsMiddleware() {
        const corsOptions = {
            origin: (origin, callback) => {
                const allowedOrigins = [
                    'http://localhost:3000',
                    'http://localhost:8080',
                    'http://127.0.0.1:3000',
                    'http://127.0.0.1:8080',
                    'https://muhasibatliqpro.az',
                    /^https:\/\/.*\.muhasibatliqpro\.az$/
                ];
                
                if (!origin || allowedOrigins.some(allowed => 
                    typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
                )) {
                    callback(null, true);
                } else {
                    callback(new Error('CORS policy violation'));
                }
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID', 'X-Requested-With'],
            exposedHeaders: ['X-Total-Count', 'X-Page-Count']
        };

        this.app.use(cors(corsOptions));
    }

    setupBodyParsingMiddleware() {
        this.app.use(express.json({ 
            limit: '10mb',
            strict: true
        }));
        this.app.use(express.urlencoded({ 
            extended: true, 
            limit: '10mb',
            parameterLimit: 1000
        }));
    }

    setupLoggingMiddleware() {
        const logFormat = this.isProduction ? 'combined' : 'dev';
        this.app.use(morgan(logFormat, {
            skip: (req, res) => res.statusCode < 400 && this.isProduction
        }));
    }

    setupRateLimitingMiddleware() {
        const limiter = rateLimit({
            windowMs: SECURITY_CONFIG.rateLimit.windowMs,
            max: SECURITY_CONFIG.rateLimit.max,
            message: {
                error: 'Too Many Requests',
                message: 'Too many requests from this IP, please try again later.',
                retryAfter: Math.ceil(SECURITY_CONFIG.rateLimit.windowMs / 1000)
            },
            standardHeaders: true,
            legacyHeaders: false
        });

        this.app.use('/api/', limiter);
    }

    setupCustomMiddleware() {
        // Request context middleware
        this.app.use((req, res, next) => {
            req.context = {
                requestId: this.generateRequestId(),
                timestamp: new Date().toISOString(),
                ip: req.ip || req.connection.remoteAddress,
                userAgent: req.get('User-Agent'),
                tenantId: req.headers['x-tenant-id']
            };
            
            res.setHeader('X-Request-ID', req.context.requestId);
            console.log(`[${req.context.requestId}] ${req.method} ${req.path}`);
            next();
        });

        // Security headers middleware
        this.app.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('X-XSS-Protection', '1; mode=block');
            res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
            next();
        });
    }

    setupRoutes() {
        // API Health Check
        this.app.get('/api/v2/health', async (req, res) => {
            try {
                let dbResult, dbVersion;
                if (this.dbClientType === 'pg') {
                    dbResult = await this.db.query('SELECT NOW() as timestamp, version() as version');
                    dbVersion = dbResult.rows[0].version.split(' ')[0] + " " + dbResult.rows[0].version.split(' ')[1];
                } else {
                    dbResult = await this.db.query('SELECT NOW() as timestamp, @@version as version');
                    dbVersion = dbResult.rows[0].version;
                }
                
                const wsClients = this.wss ? this.wss.clients.size : 0;
                
                res.json({
                    status: 'healthy',
                    version: this.version,
                    timestamp: new Date().toISOString(),
                    database: {
                        client: this.dbClientType,
                        status: 'connected',
                        timestamp: dbResult.rows[0].timestamp,
                        version: dbVersion
                    },
                    websocket: {
                        status: 'running',
                        connectedClients: wsClients
                    },
                    memory: {
                        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
                        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
                    },
                    uptime: Math.round(process.uptime()) + ' seconds'
                });
            } catch (error) {
                res.status(503).json({
                    status: 'unhealthy',
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // API Info
        this.app.get('/api/v2', (req, res) => {
            res.json({
                name: 'MühasibatlıqPro Backend API',
                version: this.version,
                description: 'Modern Multi-Tenant SaaS Accounting System Backend',
                architecture: 'Node.js + Express + PostgreSQL',
                features: [
                    'Multi-Tenant Architecture',
                    'JWT Authentication with Refresh Tokens',
                    'Real-time WebSocket Updates',
                    'Advanced Security & Rate Limiting',
                    'PostgreSQL with Row Level Security',
                    'RESTful API with Validation',
                    'Comprehensive Audit Logging',
                    'Modern ES6+ Patterns'
                ],
                security: {
                    authentication: 'JWT Bearer Token',
                    authorization: 'Role-based Access Control',
                    encryption: 'bcrypt for passwords',
                    rateLimit: `${SECURITY_CONFIG.rateLimit.max} requests per ${SECURITY_CONFIG.rateLimit.windowMs/60000} minutes`
                },
                timestamp: new Date().toISOString()
            });
        });

        // Authentication Routes
        this.setupAuthRoutes();
        
        // Business Management Routes
        this.setupBusinessRoutes();
        
        // User Management Routes
        this.setupUserRoutes();
        
        // Accounting Routes
        this.setupAccountingRoutes();
        
        // POS Routes
        this.setupPOSRales();
        
        // Reports Routes
        this.setupReportsRoutes();
        
        // Integration Routes
        this.setupIntegrationRoutes();
        
        // Admin Routes
        this.setupAdminRoutes();
    }

    setupAuthRoutes() {
        // Login
        this.app.post('/api/v2/auth/login', 
            this.validateLoginRequest.bind(this),
            this.handleLogin.bind(this)
        );

        // Register
        this.app.post('/api/v2/auth/register',
            this.validateRegisterRequest.bind(this),
            this.handleRegister.bind(this)
        );

        // Refresh Token
        this.app.post('/api/v2/auth/refresh',
            this.handleRefreshToken.bind(this)
        );

        // Logout
        this.app.post('/api/v2/auth/logout',
            this.authenticateToken.bind(this),
            this.handleLogout.bind(this)
        );

        // Get Current User
        this.app.get('/api/v2/auth/me',
            this.authenticateToken.bind(this),
            this.getCurrentUser.bind(this)
        );
    }

    setupBusinessRoutes() {
        // Get all businesses/tenants
        this.app.get('/api/v2/businesses',
            this.authenticateToken.bind(this),
            this.getBusinesses.bind(this)
        );

        // Create new business
        this.app.post('/api/v2/businesses',
            this.authenticateToken.bind(this),
            this.validateBusinessRequest.bind(this),
            this.createBusiness.bind(this)
        );

        // Get business details
        this.app.get('/api/v2/businesses/:id',
            this.authenticateToken.bind(this),
            this.getBusiness.bind(this)
        );

        // Update business
        this.app.put('/api/v2/businesses/:id',
            this.authenticateToken.bind(this),
            this.updateBusiness.bind(this)
        );

        // Delete business
        this.app.delete('/api/v2/businesses/:id',
            this.authenticateToken.bind(this),
            this.deleteBusiness.bind(this)
        );
    }

    setupUserRoutes() {
        this.app.get('/api/v2/users',
            this.authenticateToken.bind(this),
            this.getUsers.bind(this)
        );

        this.app.post('/api/v2/users',
            this.authenticateToken.bind(this),
            this.validateUserRequest.bind(this),
            this.createUser.bind(this)
        );

        this.app.get('/api/v2/users/:id',
            this.authenticateToken.bind(this),
            this.getUser.bind(this)
        );

        this.app.put('/api/v2/users/:id',
            this.authenticateToken.bind(this),
            this.updateUser.bind(this)
        );

        this.app.delete('/api/v2/users/:id',
            this.authenticateToken.bind(this),
            this.deleteUser.bind(this)
        );
    }

    setupAccountingRoutes() {
        // Chart of Accounts
        this.app.get('/api/v2/accounting/chart-of-accounts',
            this.authenticateToken.bind(this),
            this.getChartOfAccounts.bind(this)
        );

        this.app.post('/api/v2/accounting/chart-of-accounts',
            this.authenticateToken.bind(this),
            this.validateAccountRequest.bind(this),
            this.createAccount.bind(this)
        );

        // Journal Entries
        this.app.get('/api/v2/accounting/journal-entries',
            this.authenticateToken.bind(this),
            this.getJournalEntries.bind(this)
        );

        this.app.post('/api/v2/accounting/journal-entries',
            this.authenticateToken.bind(this),
            this.validateJournalEntryRequest.bind(this),
            this.createJournalEntry.bind(this)
        );
    }

    setupPOSRales() {
        // Products
        this.app.get('/api/v2/pos/products',
            this.authenticateToken.bind(this),
            this.getProducts.bind(this)
        );

        this.app.post('/api/v2/pos/products',
            this.authenticateToken.bind(this),
            this.validateProductRequest.bind(this),
            this.createProduct.bind(this)
        );

        // Sales
        this.app.get('/api/v2/pos/sales',
            this.authenticateToken.bind(this),
            this.getSales.bind(this)
        );

        this.app.post('/api/v2/pos/sales',
            this.authenticateToken.bind(this),
            this.validateSaleRequest.bind(this),
            this.createSale.bind(this)
        );
    }

    setupReportsRoutes() {
        this.app.get('/api/v2/reports/dashboard',
            this.authenticateToken.bind(this),
            this.getDashboardReports.bind(this)
        );

        this.app.get('/api/v2/reports/financial',
            this.authenticateToken.bind(this),
            this.getFinancialReports.bind(this)
        );

        this.app.get('/api/v2/reports/sales',
            this.authenticateToken.bind(this),
            this.getSalesReports.bind(this)
        );
    }

    setupIntegrationRoutes() {
        // Telegram
        this.app.get('/api/v2/integrations/telegram',
            this.authenticateToken.bind(this),
            this.getTelegramConfig.bind(this)
        );

        this.app.post('/api/v2/integrations/telegram',
            this.authenticateToken.bind(this),
            this.updateTelegramConfig.bind(this)
        );

        // WhatsApp routes
        this.app.post('/api/v2/whatsapp/connect',
            this.authenticateToken.bind(this),
            this.connectWhatsApp.bind(this)
        );

        this.app.post('/api/v2/whatsapp/disconnect',
            this.authenticateToken.bind(this),
            this.disconnectWhatsApp.bind(this)
        );

        this.app.get('/api/v2/settings/whatsapp',
            this.authenticateToken.bind(this),
            this.getWhatsAppSettings.bind(this)
        );

        this.app.post('/api/v2/settings/whatsapp',
            this.authenticateToken.bind(this),
            this.saveWhatsAppSettings.bind(this)
        );

        // Webhooks
        this.app.post('/api/v2/webhooks/telegram',
            this.handleTelegramWebhook.bind(this)
        );
    }

    setupAdminRoutes() {
        this.app.get('/api/v2/admin/audit-logs',
            this.authenticateToken.bind(this),
            this.requireAdminRole.bind(this),
            this.getAuditLogs.bind(this)
        );

        this.app.get('/api/v2/admin/system-stats',
            this.authenticateToken.bind(this),
            this.requireAdminRole.bind(this),
            this.getSystemStats.bind(this)
        );
    }

    setupWhatsAppBot() {
        console.log('🔄 Initializing WhatsApp Bot...');

        // Prevent duplicate clients - destroy existing client first
        if (this.whatsappClient) {
            console.log('🔄 Destroying existing WhatsApp client...');
            try {
                this.whatsappClient.removeAllListeners();
                this.whatsappClient.destroy();
            } catch (e) {
                console.log('Warning: Error destroying existing client:', e.message);
            }
            this.whatsappClient = null;
            this.whatsappConnected = false;
            this.whatsappQRCode = null;
        }

        try {
            this.whatsappClient = new Client({
                authStrategy: new LocalAuth({
                    dataPath: './whatsapp_auth'
                }),
                puppeteer: {
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--single-process',
                        '--disable-gpu'
                    ],
                }
            });

            // Store QR code for API access
            this.whatsappQRCode = null;
            this.whatsappConnected = false;

            this.whatsappClient.on('qr', qr => {
                console.log('--- WhatsApp QR Code Generated ---');
                qrcode.generate(qr, { small: true });
                console.log('Scan this QR code with your WhatsApp to link the bot.');
                
                // Store QR for API access
                this.whatsappQRCode = qr;
                
                // Broadcast QR code to connected WebSocket clients (only once)
                if (this.wss && !this.qrCodeBroadcasted) {
                    this.qrCodeBroadcasted = true;
                    this.broadcastToClients({
                        type: 'whatsapp_qr',
                        qrCode: qr,
                        message: 'WhatsApp QR kodunu skan edin'
                    });
                }
            });

            this.whatsappClient.on('ready', () => {
                console.log('✅ WhatsApp Bot is ready and connected!');
                this.whatsappConnected = true;
                this.whatsappQRCode = null;
                this.qrCodeBroadcasted = false;
                
                // Broadcast connection status (only once)
                if (this.wss && !this.connectionBroadcasted) {
                    this.connectionBroadcasted = true;
                    this.broadcastToClients({
                        type: 'whatsapp_connected',
                        message: 'WhatsApp uğurla qoşuldu!'
                    });
                    // Reset flag after a delay
                    setTimeout(() => { this.connectionBroadcasted = false; }, 2000);
                }
            });

            this.whatsappClient.on('authenticated', () => {
                console.log('✅ WhatsApp authenticated successfully');
            });

            this.whatsappClient.on('auth_failure', msg => {
                console.error('❌ WHATSAPP AUTHENTICATION FAILURE', msg);
                this.whatsappConnected = false;
                this.whatsappQRCode = null;
                this.qrCodeBroadcasted = false;
                
                if (this.wss && !this.authFailureBroadcasted) {
                    this.authFailureBroadcasted = true;
                    this.broadcastToClients({
                        type: 'whatsapp_error',
                        message: 'WhatsApp autentifikasiya xətası'
                    });
                    setTimeout(() => { this.authFailureBroadcasted = false; }, 2000);
                }
            });

            this.whatsappClient.on('disconnected', (reason) => {
                console.log('❌ WhatsApp Bot disconnected:', reason);
                this.whatsappConnected = false;
                this.whatsappQRCode = null;
                this.qrCodeBroadcasted = false;
                
                if (this.wss && !this.disconnectionBroadcasted) {
                    this.disconnectionBroadcasted = true;
                    this.broadcastToClients({
                        type: 'whatsapp_disconnected',
                        message: 'WhatsApp bağlantısı kəsildi'
                    });
                    setTimeout(() => { this.disconnectionBroadcasted = false; }, 2000);
                }
            });

            this.whatsappClient.on('message', async msg => {
                console.log(`💬 WhatsApp Message from ${msg.from}: ${msg.body}`);
                
                try {
                    // Handle different commands
                    if (msg.body === '!salam' || msg.body === '!hello') {
                        await msg.reply('🤖 Salam! MühasibatlıqPro WhatsApp botuna xoş gəldiniz!\n\n📋 *Mövcud komandalar:*\n• !salam - Salamlama\n• !anbar - Anbar məlumatı\n• !help - Kömək\n• !status - Sistem statusu');
                    }
                    
                    else if (msg.body === '!help') {
                        const helpText = `🤖 *MühasibatlıqPro Bot Köməyi*\n\n📋 *Komandalar:*\n• !salam - Salamlama mesajı\n• !anbar - Anbar məlumatını göstər\n• !status - Sistem statusunu yoxla\n• !help - Bu kömək mesajı\n\n📞 Dəstək üçün: +994 XX XXX XX XX`;
                        await msg.reply(helpText);
                    }
                    
                    else if (msg.body === '!status') {
                        const statusText = `📊 *Sistem Statusu*\n\n✅ WhatsApp Bot: Aktiv\n✅ Database: Bağlı\n✅ Server: İşləyir\n🕐 Vaxt: ${new Date().toLocaleString('az-AZ')}`;
                        await msg.reply(statusText);
                    }

                    else if (msg.body === '!anbar') {
                        try {
                            // For a multi-tenant system, we need to associate the WhatsApp number with a tenant.
                            // For this demo, we'll fetch data from the first available business.
                            const { rows: businesses } = await this.db.query('SELECT id, name FROM businesses WHERE status = ? ORDER BY created_at LIMIT 1', ['active']);
                            
                            if (businesses.length > 0) {
                                const business = businesses[0];
                                const { rows: products } = await this.db.query(
                                    'SELECT name, quantity, unit, min_quantity FROM products WHERE business_id = ? AND is_active = true ORDER BY name ASC LIMIT 10', 
                                    [business.id]
                                );
                                
                                let anbarInfo = `📦 *${business.name} - Anbar Məlumatı*\n\n`;
                                if (products.length > 0) {
                                    anbarInfo += products.map(p => {
                                        const statusIcon = p.quantity <= p.min_quantity ? '⚠️' : '✅';
                                        return `${statusIcon} *${p.name}*: ${p.quantity} ${p.unit || 'ədəd'}`;
                                    }).join('\n');
                                    
                                    // Add low stock warning
                                    const lowStockItems = products.filter(p => p.quantity <= p.min_quantity);
                                    if (lowStockItems.length > 0) {
                                        anbarInfo += `\n\n⚠️ *Az Stok Xəbərdarlığı:*\n${lowStockItems.length} məhsulun stoku azdır!`;
                                    }
                                } else {
                                    anbarInfo += "❌ Anbarda məhsul tapılmadı.";
                                }
                                
                                anbarInfo += `\n\n🕐 Yenilənmə: ${new Date().toLocaleString('az-AZ')}`;
                                await msg.reply(anbarInfo);

                            } else {
                                await msg.reply("❌ Sistemdə aktiv biznes tapılmadı.");
                            }

                        } catch (dbError) {
                            console.error("Error fetching inventory for WhatsApp command '!anbar':", dbError);
                            await msg.reply("❌ Anbar məlumatını alarkən xəta baş verdi. Zəhmət olmasa, daha sonra yenidən cəhd edin.");
                        }
                    }
                    
                    // Handle unknown commands
                    else if (msg.body.startsWith('!')) {
                        await msg.reply("❓ Naməlum komanda. Kömək üçün !help yazın.");
                    }
                    
                } catch (msgError) {
                    console.error('Error handling WhatsApp message:', msgError);
                    await msg.reply("❌ Xəta baş verdi. Daha sonra yenidən cəhd edin.");
                }
            });

            // Initialize the client
            this.whatsappClient.initialize().catch(err => {
                console.error('❌ WhatsApp Bot initialization error:', err);
                this.whatsappConnected = false;
                this.whatsappQRCode = null;
            });

        } catch (error) {
            console.error('❌ Failed to setup WhatsApp Bot:', error);
            this.whatsappConnected = false;
            this.whatsappQRCode = null;
            this.qrCodeBroadcasted = false;
        }
    }

    // Helper method to broadcast messages to WebSocket clients with deduplication
    broadcastToClients(message) {
        if (this.wss) {
            const messageId = message.type + '_' + Date.now();
            this.lastBroadcastId = this.lastBroadcastId || '';
            
            // Prevent duplicate broadcasts of the same message type within 1 second
            if (this.lastBroadcastId === message.type && Date.now() - this.lastBroadcastTime < 1000) {
                console.log('Preventing duplicate WebSocket broadcast:', message.type);
                return;
            }
            
            this.lastBroadcastId = message.type;
            this.lastBroadcastTime = Date.now();
            
            // Add unique ID to message
            message.id = messageId;
            message.timestamp = new Date().toISOString();
            
            let clientCount = 0;
            this.wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                    clientCount++;
                }
            });
            console.log(`📡 Broadcasted ${message.type} to ${clientCount} clients`);
        }
    }

    setupErrorHandling() {
        // 404 handler
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Endpoint Not Found',
                message: `${req.method} ${req.originalUrl} is not a valid endpoint`,
                suggestions: [
                    'Check the API documentation at /api/v2',
                    'Verify the HTTP method and URL path',
                    'Ensure you are using the correct API version (v2)'
                ],
                timestamp: new Date().toISOString(),
                requestId: req.context?.requestId
            });
        });

        // Global error handler
        this.app.use((err, req, res, next) => {
            console.error(`[${req.context?.requestId}] Error:`, err);
            
            // Validation errors
            if (err.name === 'ValidationError' || err.isJoi) {
                return res.status(400).json({
                    error: 'Validation Error',
                    message: err.message,
                    details: err.details || err.details?.map(d => d.message),
                    requestId: req.context?.requestId
                });
            }
            
            // Authentication errors
            if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    error: 'Authentication Failed',
                    message: 'Invalid or expired authentication token',
                    requestId: req.context?.requestId
                });
            }

            // CORS errors
            if (err.message.includes('CORS')) {
                return res.status(403).json({
                    error: 'CORS Policy Violation',
                    message: 'Origin not allowed by CORS policy',
                    requestId: req.context?.requestId
                });
            }
            
            // Database errors
            if (err.code && err.code.startsWith('23')) {
                return res.status(409).json({
                    error: 'Database Constraint Violation',
                    message: 'The operation violates database constraints',
                    requestId: req.context?.requestId
                });
            }
            
            // Default server error
            res.status(500).json({
                error: 'Internal Server Error',
                message: this.isProduction ? 'Something went wrong' : err.message,
                requestId: req.context?.requestId,
                ...(this.isProduction ? {} : { stack: err.stack })
            });
        });
    }

    setupWebSocketServer() {
        this.wss = new WebSocket.Server({ 
            port: this.wsPort,
            verifyClient: (info) => {
                // TODO: Add JWT token verification for WebSocket connections
                return true;
            }
        });
        
        this.wss.on('connection', (ws, req) => {
            const clientId = this.generateRequestId();
            ws.clientId = clientId;
            ws.isAlive = true;
            
            console.log(`📡 WebSocket client connected: ${clientId}`);
            
            ws.on('message', async (message) => {
                try {
                    const data = JSON.parse(message);
                    await this.handleWebSocketMessage(ws, data);
                } catch (error) {
                    console.error('WebSocket message error:', error);
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Invalid message format',
                        timestamp: new Date().toISOString()
                    }));
                }
            });

            ws.on('pong', () => {
                ws.isAlive = true;
            });
            
            ws.on('close', (code, reason) => {
                console.log(`📡 WebSocket client disconnected: ${clientId} (${code}: ${reason})`);
            });

            ws.on('error', (error) => {
                console.error(`📡 WebSocket error for client ${clientId}:`, error);
            });

            // Send welcome message
            ws.send(JSON.stringify({
                type: 'connection',
                message: 'Connected to MühasibatlıqPro v2.0 real-time updates',
                clientId: clientId,
                version: this.version,
                timestamp: new Date().toISOString()
            }));
        });

        // Heartbeat to detect broken connections
        const heartbeat = setInterval(() => {
            this.wss.clients.forEach((ws) => {
                if (ws.isAlive === false) {
                    return ws.terminate();
                }
                
                ws.isAlive = false;
                ws.ping();
            });
        }, 30000);

        this.wss.on('close', () => {
            clearInterval(heartbeat);
        });

        console.log(`📡 WebSocket server started on port ${this.wsPort}`);
    }

    async initializeDatabaseSchema() {
        try {
            console.log('🔄 Initializing database schema...');

            // Test connection
            let result;
            if (this.dbClientType === 'pg') {
                result = await this.db.query('SELECT NOW() as timestamp, version() as version');
            } else {
                result = await this.db.query('SELECT NOW() as timestamp, @@version as version');
            }
            console.log(`✅ Database (${this.dbClientType}) connection verified:`, result.rows[0]);

            // Create database schema
            await this.createDatabaseTables();
            console.log('✅ Database tables created/verified');

            // Insert sample data
            await this.insertSampleData();
            console.log('✅ Sample data verified');

            console.log('✅ Database initialization completed successfully');

        } catch (error) {
            console.error('❌ Database initialization error:', error);
            if (!this.isProduction) {
                console.error('Full error details:', error.stack);
            }
            process.exit(1);
        }
    }

    async createDatabaseTables() {
        const queries = this.dbClientType === 'pg' 
            ? this.getPostgresSchemaQueries() 
            : this.getMariaDbSchemaQueries();

        for (const query of queries) {
            await this.db.query(query);
        }
    }

    getPostgresSchemaQueries() {
        return [
            // Extensions
            `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
            `CREATE EXTENSION IF NOT EXISTS "pgcrypto"`,

            // Businesses table
            `CREATE TABLE IF NOT EXISTS businesses (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                domain VARCHAR(255) UNIQUE,
                subdomain VARCHAR(100) UNIQUE,
                plan VARCHAR(50) DEFAULT 'basic',
                status VARCHAR(50) DEFAULT 'active',
                settings JSONB DEFAULT '{}',
                limits JSONB DEFAULT '{"users": 10, "transactions": 1000}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Users table
            `CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                role VARCHAR(50) DEFAULT 'user',
                permissions JSONB DEFAULT '[]',
                preferences JSONB DEFAULT '{}',
                is_active BOOLEAN DEFAULT true,
                email_verified BOOLEAN DEFAULT false,
                last_login TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Refresh tokens
            `CREATE TABLE IF NOT EXISTS refresh_tokens (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                token_hash VARCHAR(255) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                is_revoked BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Chart of accounts
            `CREATE TABLE IF NOT EXISTS chart_of_accounts (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
                code VARCHAR(20) NOT NULL,
                name VARCHAR(255) NOT NULL,
                account_type VARCHAR(50) NOT NULL,
                parent_id UUID REFERENCES chart_of_accounts(id),
                balance DECIMAL(15,2) DEFAULT 0,
                currency VARCHAR(3) DEFAULT 'AZN',
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(business_id, code)
            )`,

            // Products
            `CREATE TABLE IF NOT EXISTS products (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                sku VARCHAR(100),
                barcode VARCHAR(100),
                price DECIMAL(10,2) NOT NULL,
                cost DECIMAL(10,2),
                quantity INTEGER DEFAULT 0,
                min_quantity INTEGER DEFAULT 0,
                category VARCHAR(100),
                unit VARCHAR(50) DEFAULT 'pcs',
                tax_rate DECIMAL(5,2) DEFAULT 18.00,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Sales
            `CREATE TABLE IF NOT EXISTS sales (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(id),
                sale_number VARCHAR(50) UNIQUE,
                total_amount DECIMAL(15,2) NOT NULL,
                tax_amount DECIMAL(15,2) DEFAULT 0,
                discount_amount DECIMAL(15,2) DEFAULT 0,
                payment_method VARCHAR(50),
                payment_status VARCHAR(50) DEFAULT 'completed',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Audit logs
            `CREATE TABLE IF NOT EXISTS audit_logs (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(id),
                action VARCHAR(100) NOT NULL,
                resource_type VARCHAR(100),
                resource_id UUID,
                old_data JSONB,
                new_data JSONB,
                metadata JSONB DEFAULT '{}',
                ip_address INET,
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Create indexes
            `CREATE INDEX IF NOT EXISTS idx_users_business_id ON users(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
            `CREATE INDEX IF NOT EXISTS idx_chart_accounts_business_id ON chart_of_accounts(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_products_business_id ON products(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_sales_business_id ON sales(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_audit_logs_business_id ON audit_logs(business_id)`
        ];
    }
    
    getMariaDbSchemaQueries() {
        return [
            // Businesses table
            `CREATE TABLE IF NOT EXISTS businesses (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                name VARCHAR(255) NOT NULL,
                domain VARCHAR(255) UNIQUE,
                subdomain VARCHAR(100) UNIQUE,
                plan VARCHAR(50) DEFAULT 'basic',
                status VARCHAR(50) DEFAULT 'active',
                settings JSON,
                limits JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Users table
            `CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                business_id CHAR(36),
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                role VARCHAR(50) DEFAULT 'user',
                permissions JSON,
                preferences JSON,
                is_active BOOLEAN DEFAULT true,
                email_verified BOOLEAN DEFAULT false,
                last_login TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
            )`,

            // Refresh tokens
            `CREATE TABLE IF NOT EXISTS refresh_tokens (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                user_id CHAR(36),
                token_hash VARCHAR(255) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                is_revoked BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )`,
            
            // Chart of accounts
            `CREATE TABLE IF NOT EXISTS chart_of_accounts (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                business_id CHAR(36),
                code VARCHAR(20) NOT NULL,
                name VARCHAR(255) NOT NULL,
                account_type VARCHAR(50) NOT NULL,
                parent_id CHAR(36),
                balance DECIMAL(15,2) DEFAULT 0,
                currency VARCHAR(3) DEFAULT 'AZN',
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(business_id, code),
                FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
                FOREIGN KEY (parent_id) REFERENCES chart_of_accounts(id)
            )`,

            // Products
            `CREATE TABLE IF NOT EXISTS products (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                business_id CHAR(36),
                name VARCHAR(255) NOT NULL,
                description TEXT,
                sku VARCHAR(100),
                barcode VARCHAR(100),
                price DECIMAL(10,2) NOT NULL,
                cost DECIMAL(10,2),
                quantity INTEGER DEFAULT 0,
                min_quantity INTEGER DEFAULT 0,
                category VARCHAR(100),
                unit VARCHAR(50) DEFAULT 'pcs',
                tax_rate DECIMAL(5,2) DEFAULT 18.00,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
            )`,

            // Sales
            `CREATE TABLE IF NOT EXISTS sales (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                business_id CHAR(36),
                user_id CHAR(36),
                sale_number VARCHAR(50) UNIQUE,
                total_amount DECIMAL(15,2) NOT NULL,
                tax_amount DECIMAL(15,2) DEFAULT 0,
                discount_amount DECIMAL(15,2) DEFAULT 0,
                payment_method VARCHAR(50),
                payment_status VARCHAR(50) DEFAULT 'completed',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`,

            // Audit logs
            `CREATE TABLE IF NOT EXISTS audit_logs (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                business_id CHAR(36),
                user_id CHAR(36),
                action VARCHAR(100) NOT NULL,
                resource_type VARCHAR(100),
                resource_id CHAR(36),
                old_data JSON,
                new_data JSON,
                metadata JSON,
                ip_address VARCHAR(45),
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`,
            
            // Indexes
            `CREATE INDEX IF NOT EXISTS idx_users_business_id ON users(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
            `CREATE INDEX IF NOT EXISTS idx_chart_accounts_business_id ON chart_of_accounts(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_products_business_id ON products(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_sales_business_id ON sales(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_audit_logs_business_id ON audit_logs(business_id)`
        ];
    }

    async insertSampleData() {
        try {
            // Check if sample data exists
            const businessCheck = await this.db.query('SELECT COUNT(*) as count FROM businesses');
            if (parseInt(businessCheck.rows[0].count) > 0) {
                console.log('Sample data already exists, skipping...');
                return;
            }
            
            // Insert demo data (your example data)
            const businessesData = [
                {
                    name: 'ABC Şirkəti',
                    domain: 'abc.muhasibatliqpro.az',
                    subdomain: 'abc',
                    plan: 'professional',
                    limits: '{"users": 50, "transactions": 10000}'
                },
                {
                    name: 'XYZ Holdings MMC',
                    domain: 'xyz.muhasibatliqpro.az',
                    subdomain: 'xyz',
                    plan: 'enterprise',
                    limits: '{"users": 100, "transactions": 50000}'
                },
                {
                    name: 'Demo Biznes',
                    domain: 'demo.muhasibatliqpro.az',
                    subdomain: 'demo',
                    plan: 'basic',
                    limits: '{"users": 10, "transactions": 1000}'
                }
            ];

            for (const biz of businessesData) {
                await this.db.query(`
                    INSERT INTO businesses (name, domain, subdomain, plan, limits) 
                    VALUES ($1, $2, $3, $4, $5)
                `, [biz.name, biz.domain, biz.subdomain, biz.plan, biz.limits]);
            }

            // Insert demo users with hashed passwords
            const hashedPassword = await bcrypt.hash('demo123', 10);
            await this.db.query(`
                INSERT INTO users (email, password_hash, first_name, last_name, role)
                VALUES ($1, $2, $3, $4, $5)
            `, ['r.bagrv1@gmail.com', hashedPassword, 'Rəşad', 'Bağırov', 'superadmin']);

        } catch (error) {
            console.error('Error inserting sample data:', error);
        }
    }

    // Validation middleware
    validateLoginRequest(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(1).required(),
            rememberMe: Joi.boolean().default(false)
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    validateRegisterRequest(req, res, next) {
        const schema = Joi.object({
            businessId: Joi.string().uuid().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            firstName: Joi.string().min(1).required(),
            lastName: Joi.string().min(1).required(),
            role: Joi.string().valid('admin', 'user', 'accountant').default('user')
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    validateBusinessRequest(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(1).required(),
            domain: Joi.string().domain().required(),
            subdomain: Joi.string().alphanum().min(2).max(20).required(),
            plan: Joi.string().valid('basic', 'professional', 'enterprise').default('basic'),
            type: Joi.string().valid('retail', 'wholesale', 'service', 'manufacturing', 'other').default('other'),
            description: Joi.string().allow('')
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    validateUserRequest(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            firstName: Joi.string().min(1).required(),
            lastName: Joi.string().min(1).required(),
            role: Joi.string().valid('admin', 'user', 'accountant', 'manager').default('user'),
            permissions: Joi.array().items(Joi.string()).default([])
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    validateAccountRequest(req, res, next) {
        const schema = Joi.object({
            code: Joi.string().min(1).max(20).required(),
            name: Joi.string().min(1).max(255).required(),
            accountType: Joi.string().valid('Asset', 'Liability', 'Equity', 'Revenue', 'Expense').required(),
            parentId: Joi.string().uuid().allow(null),
            balance: Joi.number().default(0),
            currency: Joi.string().length(3).default('AZN')
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    validateJournalEntryRequest(req, res, next) {
        const schema = Joi.object({
            date: Joi.date().required(),
            description: Joi.string().required(),
            reference: Joi.string().allow(''),
            entries: Joi.array().items(
                Joi.object({
                    accountId: Joi.string().uuid().required(),
                    debitAmount: Joi.number().min(0),
                    creditAmount: Joi.number().min(0),
                    description: Joi.string().allow('')
                })
            ).min(2).required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    validateProductRequest(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(1).required(),
            description: Joi.string().allow(''),
            sku: Joi.string().allow(''),
            barcode: Joi.string().allow(''),
            price: Joi.number().min(0).required(),
            cost: Joi.number().min(0),
            quantity: Joi.number().integer().min(0).default(0),
            minQuantity: Joi.number().integer().min(0).default(0),
            category: Joi.string().allow(''),
            unit: Joi.string().default('pcs'),
            taxRate: Joi.number().min(0).max(100).default(18)
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    validateSaleRequest(req, res, next) {
        const schema = Joi.object({
            customerId: Joi.string().uuid().allow(null),
            items: Joi.array().items(
                Joi.object({
                    productId: Joi.string().uuid().required(),
                    quantity: Joi.number().min(0.001).required(),
                    unitPrice: Joi.number().min(0).required(),
                    taxRate: Joi.number().min(0).max(100).default(18),
                    discountAmount: Joi.number().min(0).default(0)
                })
            ).min(1).required(),
            paymentMethod: Joi.string().valid('cash', 'card', 'bank_transfer', 'other').required(),
            notes: Joi.string().allow('')
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation Error',
                message: error.details[0].message 
            });
        }
        next();
    }

    // Authentication middleware
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                error: 'Authentication Required',
                message: 'Access token is required for this endpoint'
            });
        }

        jwt.verify(token, SECURITY_CONFIG.jwt.secret, async (err, user) => {
            if (err) {
                return res.status(403).json({ 
                    error: 'Invalid Token',
                    message: 'The provided token is invalid or expired'
                });
            }
            
            req.user = user;
            
            // Set business context for database queries
            if (user.businessId) {
                try {
                    await this.db.query('SELECT set_config($1, $2, true)', 
                        ['app.current_business_id', user.businessId]);
                } catch (error) {
                    console.error('Error setting business context:', error);
                }
            }
            
            next();
        });
    }

    requireAdminRole(req, res, next) {
        if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
            return res.status(403).json({
                error: 'Insufficient Permissions',
                message: 'Admin role required for this operation'
            });
        }
        next();
    }

    // Authentication handlers
    async handleLogin(req, res) {
        try {
            const { email, password, rememberMe } = req.body;

            // Demo credentials check
            if (email === 'demo@example.com') {
                const demoUser = await this.createDemoUserResponse();
                return res.json(demoUser);
            }

            // Regular user authentication
            const userResult = await this.db.query(`
                SELECT u.*, b.name as business_name, b.subdomain, b.plan 
                FROM users u 
                LEFT JOIN businesses b ON u.business_id = b.id 
                WHERE u.email = ? AND u.is_active = true
            `, [email]);

            if (userResult.rows.length === 0) {
                return res.status(401).json({ 
                    error: 'Invalid Credentials',
                    message: 'Email or password is incorrect'
                });
            }

            const user = userResult.rows[0];
            const validPassword = await bcrypt.compare(password, user.password_hash);

            if (!validPassword) {
                return res.status(401).json({ 
                    error: 'Invalid Credentials',
                    message: 'Email or password is incorrect'
                });
            }

            // Generate tokens
            const accessToken = this.generateAccessToken(user);
            const refreshToken = await this.generateRefreshToken(user.id);

            // Update last login
            await this.db.query(
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
                [user.id]
            );

            // Log audit event
            await this.logAuditEvent(user.business_id, user.id, 'login', 'users', user.id, null, null, req.context);

            res.json({
                accessToken,
                refreshToken: rememberMe ? refreshToken : undefined,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role: user.role,
                    businessId: user.business_id,
                    businessName: user.business_name,
                    businessSubdomain: user.subdomain,
                    businessPlan: user.plan,
                    permissions: user.permissions || []
                },
                message: 'Login successful'
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ 
                error: 'Internal Server Error',
                requestId: req.context.requestId
            });
        }
    }

    async createDemoUserResponse() {
        // Get first business for demo
        const businessResult = await this.db.query(
            'SELECT * FROM businesses WHERE status = ? ORDER BY created_at LIMIT 1',
            ['active']
        );

        if (businessResult.rows.length === 0) {
            throw new Error('No active businesses found');
        }

        const business = businessResult.rows[0];
        const demoUser = {
            id: 'demo-user-id',
            businessId: business.id,
            email: 'demo@example.com',
            role: 'admin',
            permissions: ['all']
        };

        const accessToken = this.generateAccessToken(demoUser);

        return {
            accessToken,
            user: {
                id: demoUser.id,
                email: 'demo@example.com',
                firstName: 'Demo',
                lastName: 'User',
                role: 'admin',
                businessId: business.id,
                businessName: business.name,
                businessSubdomain: business.subdomain,
                businessPlan: business.plan,
                permissions: ['all']
            },
            message: 'Demo login successful'
        };
    }

    generateAccessToken(user) {
        return jwt.sign(
            { 
                userId: user.id, 
                businessId: user.business_id || user.businessId,
                email: user.email, 
                role: user.role,
                permissions: user.permissions || []
            },
            SECURITY_CONFIG.jwt.secret,
            { expiresIn: SECURITY_CONFIG.jwt.accessTokenExpiry }
        );
    }

    async generateRefreshToken(userId) {
        const refreshToken = jwt.sign(
            { userId, type: 'refresh' },
            SECURITY_CONFIG.jwt.secret,
            { expiresIn: SECURITY_CONFIG.jwt.refreshTokenExpiry }
        );

        const tokenHash = await bcrypt.hash(refreshToken, 10);
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        await this.db.query(
            'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
            [userId, tokenHash, expiresAt]
        );

        return refreshToken;
    }

    // Additional handler methods (shortened for brevity)
    async handleRegister(req, res) {
        res.json({ message: 'Register endpoint - implementation pending' });
    }

    async handleRefreshToken(req, res) {
        res.json({ message: 'Refresh token endpoint - implementation pending' });
    }

    async handleLogout(req, res) {
        res.json({ message: 'Logout successful' });
    }

    async getCurrentUser(req, res) {
        res.json({ user: req.user });
    }

    async getBusinesses(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM businesses ORDER BY created_at DESC');
            res.json({ businesses: result.rows });
        } catch (error) {
            console.error('Get businesses error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createBusiness(req, res) {
        res.json({ message: 'Create business endpoint - implementation pending' });
    }

    async getBusiness(req, res) {
        res.json({ message: 'Get business endpoint - implementation pending' });
    }

    async updateBusiness(req, res) {
        res.json({ message: 'Update business endpoint - implementation pending' });
    }

    async deleteBusiness(req, res) {
        res.json({ message: 'Delete business endpoint - implementation pending' });
    }

    async getUsers(req, res) {
        res.json({ message: 'Get users endpoint - implementation pending' });
    }

    async createUser(req, res) {
        res.json({ message: 'Create user endpoint - implementation pending' });
    }

    async getUser(req, res) {
        res.json({ message: 'Get user endpoint - implementation pending' });
    }

    async updateUser(req, res) {
        res.json({ message: 'Update user endpoint - implementation pending' });
    }

    async deleteUser(req, res) {
        res.json({ message: 'Delete user endpoint - implementation pending' });
    }

    async getChartOfAccounts(req, res) {
        res.json({ message: 'Get chart of accounts endpoint - implementation pending' });
    }

    async createAccount(req, res) {
        res.json({ message: 'Create account endpoint - implementation pending' });
    }

    async getJournalEntries(req, res) {
        res.json({ message: 'Get journal entries endpoint - implementation pending' });
    }

    async createJournalEntry(req, res) {
        res.json({ message: 'Create journal entry endpoint - implementation pending' });
    }

    async getProducts(req, res) {
        try {
            const { businessId } = req.user;
            const result = await this.db.query(
                'SELECT * FROM products WHERE business_id = ? AND is_active = true ORDER BY name',
                [businessId]
            );
            res.json({ products: result.rows });
        } catch (error) {
            console.error('Get products error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createProduct(req, res) {
        res.json({ message: 'Create product endpoint - implementation pending' });
    }

    async getSales(req, res) {
        try {
            const { businessId } = req.user;
            const result = await this.db.query(
                'SELECT * FROM sales WHERE business_id = ? ORDER BY created_at DESC LIMIT 50',
                [businessId]
            );
            res.json({ sales: result.rows });
        } catch (error) {
            console.error('Get sales error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createSale(req, res) {
        res.json({ message: 'Create sale endpoint - implementation pending' });
    }

    async getDashboardReports(req, res) {
        try {
            const { businessId } = req.user;
            
            const stats = await this.db.query(`
                SELECT 
                    COUNT(DISTINCT s.id) as total_sales,
                    COALESCE(SUM(s.total_amount), 0) as total_revenue,
                    COUNT(DISTINCT p.id) as total_products,
                    COUNT(DISTINCT u.id) as total_users
                FROM sales s
                FULL OUTER JOIN products p ON s.business_id = p.business_id
                FULL OUTER JOIN users u ON s.business_id = u.business_id
                WHERE s.business_id = ? OR p.business_id = ? OR u.business_id = ?
            `, [businessId, businessId, businessId]);

            res.json({
                dashboard: stats.rows[0],
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Dashboard reports error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getFinancialReports(req, res) {
        res.json({ message: 'Financial reports endpoint - implementation pending' });
    }

    async getSalesReports(req, res) {
        res.json({ message: 'Sales reports endpoint - implementation pending' });
    }

    async getTelegramConfig(req, res) {
        res.json({ message: 'Telegram config endpoint - implementation pending' });
    }

    async updateTelegramConfig(req, res) {
        res.json({ message: 'Update Telegram config endpoint - implementation pending' });
    }

    async connectWhatsApp(req, res) {
        try {
            // If already connected, return status
            if (this.whatsappConnected && this.whatsappClient) {
                return res.json({
                    success: true,
                    message: 'WhatsApp already connected',
                    connected: true,
                    qrCode: null
                });
            }

            // Reset broadcast flags
            this.qrCodeBroadcasted = false;
            this.connectionBroadcasted = false;
            this.authFailureBroadcasted = false;
            this.disconnectionBroadcasted = false;

            // Initialize new WhatsApp client (this will cleanup existing client)
            this.setupWhatsAppBot();

            // Return current status
            res.json({
                success: true,
                message: 'WhatsApp connection initiated. Check console for QR code or wait for WebSocket updates.',
                connected: this.whatsappConnected,
                qrCode: this.whatsappQRCode,
                instructions: 'QR kod əldə etmək üçün bir neçə saniyə gözləyin və ya konsolu yoxlayın.'
            });

        } catch (error) {
            console.error('WhatsApp connect error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to initiate WhatsApp connection',
                message: error.message
            });
        }
    }

    async disconnectWhatsApp(req, res) {
        try {
            if (this.whatsappClient) {
                this.whatsappClient.removeAllListeners();
                await this.whatsappClient.destroy();
                this.whatsappClient = null;
                this.whatsappConnected = false;
                this.whatsappQRCode = null;
                this.qrCodeBroadcasted = false;
                this.connectionBroadcasted = false;
                this.authFailureBroadcasted = false;
                this.disconnectionBroadcasted = false;
                console.log('✅ WhatsApp client disconnected and destroyed');
                
                // Broadcast disconnection (only once)
                if (!this.disconnectionBroadcasted) {
                    this.disconnectionBroadcasted = true;
                    this.broadcastToClients({
                        type: 'whatsapp_disconnected',
                        message: 'WhatsApp bağlantısı kəsildi'
                    });
                }
            }

            res.json({
                success: true,
                message: 'WhatsApp disconnected successfully',
                connected: false
            });
        } catch (error) {
            console.error('WhatsApp disconnect error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to disconnect WhatsApp',
                message: error.message
            });
        }
    }

    async getWhatsAppSettings(req, res) {
        try {
            // Get current WhatsApp status and settings
            const settings = {
                connected: this.whatsappConnected || false,
                qrCode: this.whatsappQRCode || null,
                botName: 'MühasibatlıqPro Bot',
                welcomeMessage: 'Salam, MühasibatlıqPro xidmətinə xoş gəldiniz!',
                notifications: {
                    newSales: true,
                    lowStock: true,
                    dailyReport: true
                },
                autoReplies: [
                    {
                        command: '!salam',
                        response: 'Salam! MühasibatlıqPro WhatsApp botuna xoş gəldiniz!'
                    },
                    {
                        command: '!anbar',
                        response: 'Anbar məlumatı yüklənir...'
                    },
                    {
                        command: '!help',
                        response: 'Kömək məlumatları'
                    },
                    {
                        command: '!status',
                        response: 'Sistem statusu'
                    }
                ],
                lastUpdate: new Date().toISOString()
            };

            res.json(settings);
        } catch (error) {
            console.error('Get WhatsApp settings error:', error);
            res.status(500).json({ 
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    async saveWhatsAppSettings(req, res) {
        try {
            const settings = req.body;
            
            // Here you would save settings to database in a real implementation
            // For now, just validate and return success
            
            if (settings.botName) {
                console.log('Bot name updated:', settings.botName);
            }
            
            if (settings.welcomeMessage) {
                console.log('Welcome message updated:', settings.welcomeMessage);
            }
            
            console.log('WhatsApp settings saved:', {
                botName: settings.botName,
                welcomeMessage: settings.welcomeMessage,
                notifications: settings.notifications
            });

            res.json({
                success: true,
                message: 'WhatsApp settings saved successfully',
                settings: settings,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Save WhatsApp settings error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to save WhatsApp settings',
                message: error.message
            });
        }
    }

    async handleTelegramWebhook(req, res) {
        res.json({ message: 'Telegram webhook endpoint - implementation pending' });
    }

    async getAuditLogs(req, res) {
        res.json({ message: 'Audit logs endpoint - implementation pending' });
    }

    async getSystemStats(req, res) {
        try {
            const stats = {
                server: {
                    uptime: process.uptime(),
                    memory: process.memoryUsage(),
                    version: this.version,
                    nodeVersion: process.version
                },
                database: {
                    connected: true,
                    // Add more DB stats here
                },
                websocket: {
                    connectedClients: this.wss ? this.wss.clients.size : 0
                }
            };
            
            res.json({ stats });
        } catch (error) {
            console.error('System stats error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async handleWebSocketMessage(ws, data) {
        console.log('WebSocket message received:', data);
        
        switch (data.type) {
            case 'ping':
                ws.send(JSON.stringify({ 
                    type: 'pong', 
                    timestamp: new Date().toISOString() 
                }));
                break;
            case 'subscribe':
                ws.businessId = data.businessId;
                ws.send(JSON.stringify({ 
                    type: 'subscribed', 
                    businessId: data.businessId 
                }));
                break;
            default:
                ws.send(JSON.stringify({ 
                    type: 'unknown', 
                    message: 'Unknown message type' 
                }));
        }
    }

    async logAuditEvent(businessId, userId, action, resourceType, resourceId, oldData, newData, context) {
        try {
            await this.db.query(`
                INSERT INTO audit_logs (business_id, user_id, action, resource_type, resource_id, old_data, new_data, metadata, ip_address, user_agent)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                businessId, 
                userId, 
                action, 
                resourceType, 
                resourceId, 
                oldData ? JSON.stringify(oldData) : null,
                newData ? JSON.stringify(newData) : null,
                JSON.stringify(context || {}),
                context?.ip,
                context?.userAgent
            ]);
        } catch (error) {
            console.error('Audit log error:', error);
        }
    }

    generateRequestId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('🚀 MühasibatlıqPro Modern Backend Server Started');
            console.log('='.repeat(60));
            console.log(`📡 HTTP Server: http://localhost:${this.port}`);
            console.log(`🔌 WebSocket Server: ws://localhost:${this.wsPort}`);
            console.log(`📊 API Health Check: http://localhost:${this.port}/api/v2/health`);
            console.log(`📚 API Info: http://localhost:${this.port}/api/v2`);
            console.log(`💾 Database: PostgreSQL`);
            console.log(`🔐 Authentication: JWT (${SECURITY_CONFIG.jwt.accessTokenExpiry})`);
            console.log(`🛡️  Security: Enhanced with Helmet + Rate Limiting`);
            console.log(`🏢 Architecture: Multi-Tenant SaaS`);
            console.log(`⚡ Environment: ${this.isProduction ? 'Production' : 'Development'}`);
            console.log('='.repeat(60));
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received, shutting down gracefully');
            this.shutdown();
        });

        process.on('SIGINT', () => {
            console.log('SIGINT received, shutting down gracefully');
            this.shutdown();
        });

        // Handle uncaught exceptions
        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err);
            if (this.isProduction) {
                this.shutdown();
            }
        });

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            if (this.isProduction) {
                this.shutdown();
            }
        });
    }

    async shutdown() {
        console.log('Shutting down server...');
        
        try {
            // Close WhatsApp client
            if (this.whatsappClient) {
                await this.whatsappClient.destroy();
                console.log('✅ WhatsApp client closed');
            }

            // Close WebSocket server
            if (this.wss) {
                this.wss.close(() => {
                    console.log('✅ WebSocket server closed');
                });
            }

            // Close database pool
            await this.pool.end();
            console.log('✅ Database pool closed');

            console.log('✅ Server shutdown completed');
            process.exit(0);
        } catch (error) {
            console.error('❌ Error during shutdown:', error);
            process.exit(1);
        }
    }
}

// Create and start the server
const backendServer = new ModernBackendServer();
backendServer.start();

// Export for testing
module.exports = ModernBackendServer;