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
const TelegramBot = require('node-telegram-bot-api'); 
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
        
        // Setup Telegram Bot for notifications
        if (process.env.TELEGRAM_BOT_TOKEN) {
            this.telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
            console.log('✅ Telegram Bot client initialized.');
        } else {
            console.warn('⚠️ TELEGRAM_BOT_TOKEN not found in .env, Telegram notifications will be disabled.');
        }

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

        // Start billing scheduler
        this.startBillingScheduler();
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
                    connectSrc: ["'self'", "wss:", "https://esm.sh", "https://api.telegram.org"],
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
                tenantId: req.headers['x-tenant-id'] // Retrieve X-Tenant-ID
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
                    'Frontend Error Tracking',
                    'Performance Monitoring',
                    'Alert System (Telegram)',
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
        
        // Apply authentication and tenant active status check globally for /api/v2/ routes (except auth)
        // Note: Specific role checks (e.g., superadmin) will be applied after authentication.
        this.app.use('/api/v2/accounting', this.authenticateToken.bind(this), this.checkTenantActiveStatus.bind(this));
        this.app.use('/api/v2/pos', this.authenticateToken.bind(this), this.checkTenantActiveStatus.bind(this));
        this.app.use('/api/v2/reports', this.authenticateToken.bind(this), this.checkTenantActiveStatus.bind(this));
        this.app.use('/api/v2/integrations', this.authenticateToken.bind(this), this.checkTenantActiveStatus.bind(this));
        this.app.use('/api/v2/admin', this.authenticateToken.bind(this), this.requireAdminRole.bind(this), this.checkTenantActiveStatus.bind(this));
        
        // Business Management Routes (SuperAdmin Only)
        this.app.use('/api/v2/businesses', this.authenticateToken.bind(this), this.requireSuperAdminRole.bind(this), this.checkTenantActiveStatus.bind(this));
        
        // User Management Routes (SuperAdmin can manage all, Tenant Admin can manage own tenant)
        this.app.use('/api/v2/users', this.authenticateToken.bind(this), this.checkTenantActiveStatus.bind(this)); // Role check applied within handlers

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

        // New Logging Endpoints for frontend
        this.app.post('/api/v2/log-error', this.validateFrontendErrorLog.bind(this), this.logFrontendError.bind(this));
        this.app.post('/api/v2/performance-log', this.validatePerformanceLog.bind(this), this.logPerformanceMetric.bind(this));
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
            this.getBusinesses.bind(this)
        );

        // Create new business
        this.app.post('/api/v2/businesses',
            this.validateBusinessRequest.bind(this),
            this.createBusiness.bind(this)
        );

        // Get business details
        this.app.get('/api/v2/businesses/:id',
            this.getBusiness.bind(this)
        );

        // Update business
        this.app.put('/api/v2/businesses/:id',
            this.validateBusinessRequest.bind(this),
            this.updateBusiness.bind(this)
        );

        // Delete business
        this.app.delete('/api/v2/businesses/:id',
            this.deleteBusiness.bind(this)
        );
    }

    setupUserRoutes() {
        this.app.get('/api/v2/users',
            this.getUsers.bind(this)
        );

        this.app.post('/api/v2/users',
            this.validateUserRequest.bind(this),
            this.createUser.bind(this)
        );

        this.app.get('/api/v2/users/:id',
            this.getUser.bind(this)
        );

        this.app.put('/api/v2/users/:id',
            this.validateUserRequest.bind(this),
            this.updateUser.bind(this)
        );

        this.app.delete('/api/v2/users/:id',
            this.deleteUser.bind(this)
        );
    }

    setupAccountingRoutes() {
        // Chart of Accounts
        this.app.get('/api/v2/accounting/chart-of-accounts',
            this.getChartOfAccounts.bind(this)
        );

        this.app.post('/api/v2/accounting/chart-of-accounts',
            this.validateAccountRequest.bind(this),
            this.createAccount.bind(this)
        );
        this.app.get('/api/v2/accounting/chart-of-accounts/:id', this.getAccount.bind(this));
        this.app.put('/api/v2/accounting/chart-of-accounts/:id', this.updateAccount.bind(this));
        this.app.delete('/api/v2/accounting/chart-of-accounts/:id', this.deleteAccount.bind(this));

        // Journal Entries
        this.app.get('/api/v2/accounting/journal-entries',
            this.getJournalEntries.bind(this)
        );

        this.app.post('/api/v2/accounting/journal-entries',
            this.validateJournalEntryRequest.bind(this),
            this.createJournalEntry.bind(this)
        );
        this.app.get('/api/v2/accounting/journal-entries/:id', this.getJournalEntry.bind(this));
        this.app.put('/api/v2/accounting/journal-entries/:id', this.updateJournalEntry.bind(this));
        this.app.delete('/api/v2/accounting/journal-entries/:id', this.deleteJournalEntry.bind(this));
    }

    setupPOSRales() {
        // Products
        this.app.get('/api/v2/pos/products',
            this.getProducts.bind(this)
        );

        this.app.post('/api/v2/pos/products',
            this.validateProductRequest.bind(this),
            this.createProduct.bind(this)
        );
        this.app.get('/api/v2/pos/products/:id', this.getProduct.bind(this));
        this.app.put('/api/v2/pos/products/:id', this.updateProduct.bind(this));
        this.app.delete('/api/v2/pos/products/:id', this.deleteProduct.bind(this));

        // Sales
        this.app.get('/api/v2/pos/sales',
            this.getSales.bind(this)
        );

        this.app.post('/api/v2/pos/sales',
            this.validateSaleRequest.bind(this),
            this.createSale.bind(this)
        );
        this.app.get('/api/v2/pos/sales/:id', this.getSale.bind(this));
        this.app.put('/api/v2/pos/sales/:id', this.updateSale.bind(this));
        this.app.delete('/api/v2/pos/sales/:id', this.deleteSale.bind(this));
    }

    setupReportsRoutes() {
        this.app.get('/api/v2/reports/dashboard',
            this.getDashboardReports.bind(this)
        );
    }

    setupIntegrationRoutes() {
        // Tenant-specific Telegram settings
        this.app.get('/api/v2/integrations/telegram-settings/:businessId',
            this.authenticateToken.bind(this), this.checkTenantActiveStatus.bind(this), // Apply auth and tenant check
            this.getTenantTelegramSettings.bind(this)
        );
        this.app.put('/api/v2/integrations/telegram-settings/:businessId',
            this.authenticateToken.bind(this), this.checkTenantActiveStatus.bind(this), this.requireAdminRole.bind(this), // Only admin/superadmin can update
            this.validateTelegramSettingsRequest.bind(this),
            this.updateTenantTelegramSettings.bind(this)
        );

        // WhatsApp routes (already exists, but ensures it's under integration)
        this.app.post('/api/v2/whatsapp/connect',
            this.authenticateToken.bind(this), this.requireAdminRole.bind(this), // Admin only
            this.connectWhatsApp.bind(this)
        );

        this.app.post('/api/v2/whatsapp/disconnect',
            this.authenticateToken.bind(this), this.requireAdminRole.bind(this), // Admin only
            this.disconnectWhatsApp.bind(this)
        );
        
        // No /api/v2/settings/whatsapp in main app, it's global for backend.
        // It's covered by `getGlobalTelegramSettings` for the frontend to read.
        // If frontend needs to read general WhatsApp settings that backend stores,
        // it would be through a specific API route.

        // Webhooks (telegram webhook already exists)
        this.app.post('/api/v2/webhooks/telegram',
            this.handleTelegramWebhook.bind(this)
        );
    }

    setupAdminRoutes() {
        this.app.get('/api/v2/admin/audit-logs',
            this.getAuditLogs.bind(this)
        );

        this.app.get('/api/v2/admin/system-stats',
            this.getSystemStats.bind(this)
        );

        // Global Telegram Settings (Read-only from .env for frontend display)
        this.app.get('/api/v2/admin/global-telegram-settings',
            this.getGlobalTelegramSettings.bind(this)
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
                            const { rows: businesses } = await this.db.query('SELECT id, name FROM businesses WHERE is_active = TRUE ORDER BY created_at LIMIT 1', []);
                            
                            if (businesses.length > 0) {
                                const business = businesses[0];
                                const { rows: products } = await this.db.query(
                                    'SELECT name, quantity, unit, min_quantity FROM products WHERE business_id = $1 AND is_active = true ORDER BY name ASC LIMIT 10', 
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
        // Global error handler for Express
        this.app.use((err, req, res, next) => {
            console.error(`[${req.context?.requestId || 'N/A'}] Backend Error:`, err.stack);

            // Log error to database
            this.logErrorToDatabase({
                type: 'backend_error',
                message: err.message,
                stack: err.stack,
                url: req.originalUrl,
                method: req.method,
                ip: req.context?.ip,
                userAgent: req.context?.userAgent,
                level: 'error'
            });

            // Send Telegram alert
            const telegramMessage = `🚨 Backend Xətası [${this.isProduction ? 'PROD' : 'DEV'}]:\n` +
                                  `Mesaj: ${err.message}\n` +
                                  `URL: ${req.method} ${req.originalUrl}\n` +
                                  `Vaxt: ${new Date().toLocaleString('az-AZ')}\n` +
                                  `Stack: \`\`\`${err.stack ? err.stack.substring(0, 1000) : 'N/A'}\`\`\``; // Limit stack for Telegram
            this.sendTelegramNotification(telegramMessage);
            
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
                next_billing_date DATE, -- New field for billing
                is_active BOOLEAN DEFAULT TRUE, -- New field for operational status
                warning_sent BOOLEAN DEFAULT FALSE, -- New field for billing warning status
                telegram_chat_id TEXT, -- New: for tenant-specific Telegram notifications
                telegram_notifications_enabled BOOLEAN DEFAULT FALSE, -- New: enable/disable tenant Telegram notifications
                telegram_notification_types JSONB DEFAULT '[]', -- New: specific types of notifications for tenant
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
            
            // Error logs for tracking frontend and backend errors
            `CREATE TABLE IF NOT EXISTS error_logs (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                type TEXT NOT NULL,         -- e.g., 'frontend_error', 'unhandled_rejection', 'backend_error', 'performance_metric'
                message TEXT,               -- Error message or performance summary
                stack TEXT,                 -- Stack trace for errors
                source TEXT,                -- Source file for frontend errors
                lineno INT,                 -- Line number for frontend errors
                colno INT,                  -- Column number for frontend errors
                url TEXT,                   -- URL where the error occurred or performance was measured
                method TEXT,                -- HTTP method for backend errors, or 'GET' for frontend
                level TEXT DEFAULT 'error', -- Severity level: 'error', 'warning', 'info', 'debug'
                metadata JSONB DEFAULT '{}', -- Additional JSON data (e.g., user agent, IP, custom data)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,

            // Create indexes
            `CREATE INDEX IF NOT EXISTS idx_users_business_id ON users(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
            `CREATE INDEX IF NOT EXISTS idx_chart_accounts_business_id ON chart_of_accounts(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_products_business_id ON products(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_sales_business_id ON sales(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_audit_logs_business_id ON audit_logs(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_error_logs_type ON error_logs(type)`,
            `CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at)`
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
                next_billing_date DATE,
                is_active BOOLEAN DEFAULT TRUE,
                warning_sent BOOLEAN DEFAULT FALSE,
                telegram_chat_id TEXT, -- New: for tenant-specific Telegram notifications
                telegram_notifications_enabled BOOLEAN DEFAULT FALSE, -- New: enable/disable tenant Telegram notifications
                telegram_notification_types JSON DEFAULT '[]', -- New: specific types of notifications for tenant
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
            
            // Error logs for tracking frontend and backend errors
            `CREATE TABLE IF NOT EXISTS error_logs (
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                type TEXT NOT NULL,         -- e.g., 'frontend_error', 'unhandled_rejection', 'backend_error', 'performance_metric'
                message TEXT,               -- Error message or performance summary
                stack TEXT,                 -- Stack trace for errors
                source TEXT,                -- Source file for frontend errors
                lineno INT,                 -- Line number for frontend errors
                colno INT,                  -- Column number for frontend errors
                url TEXT,                   -- URL where the error occurred or performance was measured
                method TEXT,                -- HTTP method for backend errors, or 'GET' for frontend
                level TEXT DEFAULT 'error', -- Severity level: 'error', 'warning', 'info', 'debug'
                metadata JSON,              -- Additional JSON data (e.g., user agent, IP, custom data)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
            
            // Indexes
            `CREATE INDEX IF NOT EXISTS idx_users_business_id ON users(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
            `CREATE INDEX IF NOT EXISTS idx_chart_accounts_business_id ON chart_of_accounts(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_products_business_id ON products(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_sales_business_id ON sales(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_audit_logs_business_id ON audit_logs(business_id)`,
            `CREATE INDEX IF NOT EXISTS idx_error_logs_type ON error_logs(type)`,
            `CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at)`
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
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const threeDaysLater = new Date(today);
            threeDaysLater.setDate(today.getDate() + 3);
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);

            const businessesData = [
                {
                    id: 'f87a8f8a-c603-4f9e-a89e-3d8b8e0b0b0b', 
                    name: 'ABC Şirkəti',
                    domain: 'abc.muhasibatliqpro.az',
                    subdomain: 'abc',
                    plan: 'professional',
                    limits: '{"users": 50, "transactions": 10000}',
                    next_billing_date: nextMonth.toISOString().split('T')[0],
                    is_active: true,
                    warning_sent: false,
                    telegram_chat_id: null, // Default: no tenant chat ID
                    telegram_notifications_enabled: false,
                    telegram_notification_types: []
                },
                {
                    id: 'd1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a', 
                    name: 'XYZ Holdings MMC',
                    domain: 'xyz.muhasibatliqpro.az',
                    subdomain: 'xyz',
                    plan: 'enterprise',
                    limits: '{"users": 100, "transactions": 50000}',
                    next_billing_date: threeDaysLater.toISOString().split('T')[0],
                    is_active: true,
                    warning_sent: false,
                    telegram_chat_id: 'YOUR_XYZ_TENANT_CHAT_ID', // Example for XYZ
                    telegram_notifications_enabled: true,
                    telegram_notification_types: ['new_sales', 'daily_report']
                },
                {
                    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 
                    name: 'Demo Biznes',
                    domain: 'demo.muhasibatliqpro.az',
                    subdomain: 'demo',
                    plan: 'basic',
                    limits: '{"users": 10, "transactions": 1000}',
                    next_billing_date: lastMonth.toISOString().split('T')[0],
                    is_active: false, 
                    warning_sent: true,
                    telegram_chat_id: null,
                    telegram_notifications_enabled: false,
                    telegram_notification_types: []
                }
            ];

            const businessInsertQuery = `
                INSERT INTO businesses (id, name, domain, subdomain, plan, limits, next_billing_date, is_active, warning_sent, telegram_chat_id, telegram_notifications_enabled, telegram_notification_types) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id
            `;
            for (const biz of businessesData) {
                const result = await this.db.query(businessInsertQuery, [
                    biz.id, biz.name, biz.domain, biz.subdomain, biz.plan,
                    JSON.stringify(biz.limits), biz.next_billing_date, biz.is_active, biz.warning_sent,
                    biz.telegram_chat_id, biz.telegram_notifications_enabled, JSON.stringify(biz.telegram_notification_types)
                ]);
                const businessIds = {};
                businessIds[biz.name] = result.rows[0].id;
            }

            // Insert demo users with hashed passwords
            const hashedPassword = await bcrypt.hash('demo123', 10);
            const superAdminPassword = await bcrypt.hash('superadmin123', 10);

            // SuperAdmin user (global)
            await this.db.query(`
                INSERT INTO users (email, password_hash, first_name, last_name, role, business_id, is_active)
                VALUES ($1, $2, $3, $4, $5, NULL, TRUE)
                ON CONFLICT (email) DO NOTHING
            `, ['r.bagrv1@gmail.com', superAdminPassword, 'Rəşad', 'Bağırov', 'superadmin']);

            // Tenant Admin for ABC Şirkəti
            await this.db.query(`
                INSERT INTO users (email, password_hash, first_name, last_name, role, business_id, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, TRUE)
                ON CONFLICT (email) DO NOTHING
            `, ['admin@abc.com', hashedPassword, 'Admin', 'ABC', 'admin', businessIds['ABC Şirkəti']]);

            // Regular user for ABC Şirkəti
            await this.db.query(`
                INSERT INTO users (email, password_hash, first_name, last_name, role, business_id, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, TRUE)
                ON CONFLICT (email) DO NOTHING
            `, ['user1@abc.com', hashedPassword, 'UserOne', 'ABC', 'user', businessIds['ABC Şirkəti']]);

            // Tenant Admin for XYZ Holdings MMC
            await this.db.query(`
                INSERT INTO users (email, password_hash, first_name, last_name, role, business_id, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, TRUE)
                ON CONFLICT (email) DO NOTHING
            `, ['admin@xyz.com', hashedPassword, 'Admin', 'XYZ', 'admin', businessIds['XYZ Holdings MMC']]);

        } catch (error) {
            console.error('Error inserting sample data:', error);
        }
    }

    // Validation middleware
    validateLoginRequest(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(1).required(),
            rememberMe: Joi.boolean().default(false),
            // Allow tenant_id for direct login to specific tenant context if needed, but not required for general login flow
            tenantId: Joi.string().uuid().optional().allow(null) 
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
            description: Joi.string().allow(''),
            // New Telegram fields for business creation (optional on creation)
            telegramChatId: Joi.string().allow(null, '').optional(),
            telegramNotificationsEnabled: Joi.boolean().default(false),
            telegramNotificationTypes: Joi.array().items(Joi.string()).default([])
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
            password: Joi.string().min(6).optional().allow(''), // Password can be optional on update
            firstName: Joi.string().min(1).required(),
            lastName: Joi.string().min(1).required(),
            role: Joi.string().valid('admin', 'user', 'accountant', 'manager', 'superadmin').default('user'),
            permissions: Joi.array().items(Joi.string()).default([]),
            businessId: Joi.string().uuid().optional().allow(null),
            is_active: Joi.boolean().optional() // Allow updating user active status
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

    // New validation for Telegram settings update
    validateTelegramSettingsRequest(req, res, next) {
        const schema = Joi.object({
            telegramChatId: Joi.string().allow(null, '').optional(),
            telegramNotificationsEnabled: Joi.boolean().default(false),
            telegramNotificationTypes: Joi.array().items(Joi.string()).default([])
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
            
            // Re-fetch user to get latest status, esp. is_active
            try {
                const userResult = await this.db.query(`
                    SELECT u.*, b.is_active as business_is_active, b.id as business_uuid
                    FROM users u
                    LEFT JOIN businesses b ON u.business_id = b.id
                    WHERE u.id = $1
                `, [user.userId]);

                if (userResult.rows.length === 0) {
                    return res.status(404).json({
                        error: 'User Not Found',
                        message: 'Authenticated user not found in database.'
                    });
                }
                const fullUser = userResult.rows[0];
                req.user = {
                    ...user, 
                    is_active: fullUser.is_active, 
                    businessId: fullUser.business_id, 
                    role: fullUser.role 
                };
            } catch (dbErr) {
                console.error("Failed to fetch full user details during token authentication:", dbErr);
                return res.status(500).json({
                    error: 'Authentication Error',
                    message: 'Failed to verify user details.'
                });
            }


            // Set business context for database queries
            if (req.user.businessId) {
                try {
                    await this.db.query('SELECT set_config($1, $2, true)', 
                        ['app.current_business_id', req.user.businessId]);
                } catch (error) {
                    console.error('Error setting business context:', error);
                }
            }
            
            next();
        });
    }

    checkTenantActiveStatus(req, res, next) {
        // Superadmin bypasses tenant active status check
        if (req.user && req.user.role === 'superadmin') {
            return next();
        }
        
        // Only apply for authenticated users who are tied to a business and if their business is inactive
        // `is_active` is fetched from the database in `authenticateToken` and added to `req.user`
        if (req.user && req.user.businessId && req.user.is_active === false) {
            return res.status(403).json({
                error: 'Subscription Inactive',
                message: 'Your business subscription is currently inactive. Please contact support to reactivate your services.',
                requestId: req.context?.requestId
            });
        }
        next();
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

    requireSuperAdminRole(req, res, next) {
        if (!req.user || req.user.role !== 'superadmin') {
            return res.status(403).json({
                error: 'Insufficient Permissions',
                message: 'SuperAdmin role required for this operation'
            });
        }
        next();
    }

    // Authentication handlers
    async handleLogin(req, res) {
        try {
            const { email, password, rememberMe } = req.body;

            // Demo credentials check (can be expanded to pull from DB)
            if (email === 'demo@example.com') {
                const demoUser = await this.createDemoUserResponse();
                return res.json(demoUser);
            }

            // Regular user authentication
            const userResult = await this.db.query(`
                SELECT u.*, b.name as business_name, b.subdomain, b.plan, b.is_active as business_is_active, b.next_billing_date, b.warning_sent
                FROM users u 
                LEFT JOIN businesses b ON u.business_id = b.id 
                WHERE u.email = $1 AND u.is_active = true
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
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
                [user.id]
            );

            // Log audit event
            await this.logAuditEvent(user.business_id, user.id, 'login', 'users', user.id, null, user, req.context);

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
                    businessIsActive: user.business_is_active, 
                    nextBillingDate: user.next_billing_date, 
                    warningSent: user.warning_sent, 
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
        // Find the 'Demo Biznes' tenant ID
        const demoBusinessResult = await this.db.query(
            "SELECT id, name, subdomain, plan, is_active, next_billing_date, warning_sent FROM businesses WHERE name = 'Demo Biznes' LIMIT 1"
        );

        let business;
        if (demoBusinessResult.rows.length > 0) {
            business = demoBusinessResult.rows[0];
        } else {
            // Fallback: if 'Demo Biznes' not found, get the first active business
            const fallbackBusinessResult = await this.db.query(
                'SELECT id, name, subdomain, plan, is_active, next_billing_date, warning_sent FROM businesses WHERE is_active = TRUE ORDER BY created_at LIMIT 1',
            );
            if (fallbackBusinessResult.rows.length === 0) {
                 throw new Error('No active businesses found for demo user.');
            }
            business = fallbackBusinessResult.rows[0];
        }

        const demoUser = {
            id: 'demo-user-id', 
            businessId: business.id,
            email: 'demo@example.com',
            role: 'admin', 
            permissions: ['all'],
            is_active: business.is_active 
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
                businessIsActive: business.is_active, 
                nextBillingDate: business.next_billing_date, 
                warningSent: business.warning_sent, 
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
                permissions: user.permissions || [],
                is_active: user.is_active 
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
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 

        await this.db.query(
            'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
            [userId, tokenHash, expiresAt]
        );

        return refreshToken;
    }

    // Additional handler methods (shortened for brevity)
    async handleRegister(req, res) {
        try {
            const { businessId, email, password, firstName, lastName, role } = req.body;

            // Ensure the business exists
            const businessCheck = await this.db.query('SELECT id FROM businesses WHERE id = $1', [businessId]);
            if (businessCheck.rows.length === 0) {
                return res.status(404).json({ error: 'Business not found' });
            }

            // Check if user already exists
            const existingUser = await this.db.query('SELECT id FROM users WHERE email = $1', [email]);
            if (existingUser.rows.length > 0) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, SECURITY_CONFIG.bcrypt.saltRounds);

            const result = await this.db.query(`
                INSERT INTO users (business_id, email, password_hash, first_name, last_name, role)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, email, first_name, last_name, role, business_id
            `, [businessId, email, hashedPassword, firstName, lastName, role]);

            const newUser = result.rows[0];

            // Log audit event
            await this.logAuditEvent(businessId, newUser.id, 'register', 'users', newUser.id, null, newUser, req.context);

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstName: newUser.first_name,
                    lastName: newUser.last_name,
                    role: newUser.role,
                    businessId: newUser.business_id
                }
            });

        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
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
        try {
            const { name, domain, subdomain, plan, type, description } = req.body;
            const nextBillingDate = new Date();
            nextBillingDate.setDate(nextBillingDate.getDate() + 30); 

            const result = await this.db.query(`
                INSERT INTO businesses (name, domain, subdomain, plan, settings, next_billing_date, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, name, domain, subdomain, plan, next_billing_date, is_active
            `, [name, domain, subdomain, plan, JSON.stringify({ type, description }), nextBillingDate.toISOString().split('T')[0], true]);

            const newBusiness = result.rows[0];

            // Log audit event
            await this.logAuditEvent(newBusiness.id, req.user?.id, 'create_business', 'businesses', newBusiness.id, null, newBusiness, req.context);

            res.status(201).json({
                message: 'Business created successfully',
                business: newBusiness
            });
        } catch (error) {
            console.error('Create business error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getBusiness(req, res) {
        try {
            const { id } = req.params;
            const result = await this.db.query('SELECT * FROM businesses WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Business not found' });
            }
            res.json({ business: result.rows[0] });
        } catch (error) {
            console.error('Get business error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async updateBusiness(req, res) {
        try {
            const { id } = req.params;
            const { name, domain, subdomain, plan, settings, next_billing_date, is_active } = req.body;

            const result = await this.db.query(`
                UPDATE businesses SET name = $1, domain = $2, subdomain = $3, plan = $4, settings = $5, next_billing_date = $6, is_active = $7
                WHERE id = $8
                RETURNING id, name, domain, subdomain, plan, settings, next_billing_date, is_active
            `, [name, domain, subdomain, plan, JSON.stringify(settings), next_billing_date, is_active, id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Business not found' });
            }

            const updatedBusiness = result.rows[0];

            // Log audit event
            await this.logAuditEvent(id, req.user?.id, 'update_business', 'businesses', id, null, updatedBusiness, req.context);

            res.json({
                message: 'Business updated successfully',
                business: updatedBusiness
            });
        } catch (error) {
            console.error('Update business error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async deleteBusiness(req, res) {
        try {
            const { id } = req.params;

            // Log audit event
            await this.logAuditEvent(id, req.user?.id, 'delete_business', 'businesses', id, null, null, req.context);

            await this.db.query('DELETE FROM businesses WHERE id = $1', [id]);

            res.status(200).json({ message: 'Business deleted successfully' });
        } catch (error) {
            console.error('Delete business error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getUsers(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM users WHERE business_id = $1 ORDER BY created_at DESC', [req.user.businessId]);
            res.json({ users: result.rows });
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async createUser(req, res) {
        try {
            const { email, password, firstName, lastName, role, permissions, businessId } = req.body;

            // Check if user already exists
            const existingUser = await this.db.query('SELECT id FROM users WHERE email = $1', [email]);
            if (existingUser.rows.length > 0) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, SECURITY_CONFIG.bcrypt.saltRounds);

            const result = await this.db.query(`
                INSERT INTO users (business_id, email, password_hash, first_name, last_name, role, permissions)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, email, first_name, last_name, role, business_id
            `, [businessId, email, hashedPassword, firstName, lastName, role, JSON.stringify(permissions)]);

            const newUser = result.rows[0];

            // Log audit event
            await this.logAuditEvent(businessId, req.user?.id, 'create_user', 'users', newUser.id, null, newUser, req.context);

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstName: newUser.first_name,
                    lastName: newUser.last_name,
                    role: newUser.role,
                    businessId: newUser.business_id
                }
            });

        } catch (error) {
            console.error('Create user error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ user: result.rows[0] });
        } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { email, firstName, lastName, role, permissions } = req.body;

            const result = await this.db.query(`
                UPDATE users SET email = $1, first_name = $2, last_name = $3, role = $4, permissions = $5
                WHERE id = $6
                RETURNING id, email, first_name, last_name, role, business_id
            `, [email, firstName, lastName, role, JSON.stringify(permissions), id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updatedUser = result.rows[0];

            // Log audit event
            await this.logAuditEvent(req.user.businessId, req.user.id, 'update_user', 'users', id, null, updatedUser, req.context);

            res.json({
                message: 'User updated successfully',
                user: updatedUser
            });
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            // Log audit event
            await this.logAuditEvent(req.user.businessId, req.user.id, 'delete_user', 'users', id, null, null, req.context);

            await this.db.query('DELETE FROM users WHERE id = $1', [id]);

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getChartOfAccounts(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM chart_of_accounts WHERE business_id = $1 ORDER BY code', [req.user.businessId]);
            res.json({ chartOfAccounts: result.rows });
        } catch (error) {
            console.error('Get chart of accounts error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async createAccount(req, res) {
        try {
            const { code, name, accountType, parentId, balance, currency } = req.body;

            const result = await this.db.query(`
                INSERT INTO chart_of_accounts (business_id, code, name, account_type, parent_id, balance, currency)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, code, name, account_type, parent_id, balance, currency
            `, [req.user.businessId, code, name, accountType, parentId, balance, currency]);

            const newAccount = result.rows[0];

            // Log audit event
            await this.logAuditEvent(req.user.businessId, req.user.id, 'create_account', 'chart_of_accounts', newAccount.id, null, newAccount, req.context);

            res.status(201).json({
                message: 'Account created successfully',
                account: newAccount
            });
        } catch (error) {
            console.error('Create account error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getJournalEntries(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM journal_entries WHERE business_id = $1 ORDER BY date', [req.user.businessId]);
            res.json({ journalEntries: result.rows });
        } catch (error) {
            console.error('Get journal entries error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async createJournalEntry(req, res) {
        try {
            const { date, description, reference, entries } = req.body;

            const result = await this.db.query(`
                INSERT INTO journal_entries (business_id, date, description, reference)
                VALUES ($1, $2, $3, $4)
                RETURNING id, date, description, reference
            `, [req.user.businessId, date, description, reference]);

            const newJournalEntry = result.rows[0];

            // Log audit event
            await this.logAuditEvent(req.user.businessId, req.user.id, 'create_journal_entry', 'journal_entries', newJournalEntry.id, null, newJournalEntry, req.context);

            res.status(201).json({
                message: 'Journal entry created successfully',
                journalEntry: newJournalEntry
            });
        } catch (error) {
            console.error('Create journal entry error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getProducts(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM products WHERE business_id = $1 ORDER BY name', [req.user.businessId]);
            res.json({ products: result.rows });
        } catch (error) {
            console.error('Get products error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async createProduct(req, res) {
        try {
            const { name, description, sku, barcode, price, cost, quantity, minQuantity, category, unit, taxRate } = req.body;

            const result = await this.db.query(`
                INSERT INTO products (business_id, name, description, sku, barcode, price, cost, quantity, min_quantity, category, unit, tax_rate)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING id, name, description, sku, barcode, price, cost, quantity, min_quantity, category, unit, tax_rate
            `, [req.user.businessId, name, description, sku, barcode, price, cost, quantity, minQuantity, category, unit, taxRate]);

            const newProduct = result.rows[0];

            // Log audit event
            await this.logAuditEvent(req.user.businessId, req.user.id, 'create_product', 'products', newProduct.id, null, newProduct, req.context);

            res.status(201).json({
                message: 'Product created successfully',
                product: newProduct
            });
        } catch (error) {
            console.error('Create product error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getSales(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM sales WHERE business_id = $1 ORDER BY created_at DESC', [req.user.businessId]);
            res.json({ sales: result.rows });
        } catch (error) {
            console.error('Get sales error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async createSale(req, res) {
        try {
            const { customerId, items, paymentMethod, notes } = req.body;

            const result = await this.db.query(`
                INSERT INTO sales (business_id, user_id, sale_number, total_amount, tax_amount, discount_amount, payment_method, payment_status, notes)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id, sale_number, total_amount, tax_amount, discount_amount, payment_method, payment_status, notes
            `, [req.user.businessId, req.user.id, 'Sale-' + Date.now(), 0, 0, 0, paymentMethod, 'completed', notes]);

            const newSale = result.rows[0];

            // Log audit event
            await this.logAuditEvent(req.user.businessId, req.user.id, 'create_sale', 'sales', newSale.id, null, newSale, req.context);

            res.status(201).json({
                message: 'Sale created successfully',
                sale: newSale
            });
        } catch (error) {
            console.error('Create sale error:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getDashboardReports(req, res) {
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
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async logFrontendError(req, res) {
        try {
            const { type, message, stack, source, lineno, colno, url, method, level, metadata } = req.body;
            await this.logErrorToDatabase({
                type,
                message,
                stack,
                source,
                lineno,
                colno,
                url,
                method,
                level,
                ip: req.context?.ip,
                userAgent: req.context?.userAgent,
                metadata
            });
            console.log(`Logged frontend error: ${type} - ${message}`);
            
            const telegramMessage = `🚨 Frontend Xətası [${this.isProduction ? 'PROD' : 'DEV'}]:\n` +
                                  `Mesaj: ${message}\n` +
                                  `URL: ${url}\n` +
                                  (lineno && colno ? `Sətr: ${lineno}:${colno}\n` : '') +
                                  `Stack: \`\`\`${stack ? stack.substring(0, 500) : 'N/A'}\`\`\``; 
            this.sendTelegramNotification(telegramMessage);

            res.status(200).json({ success: true, message: 'Error logged successfully' });
        } catch (error) {
            console.error('Failed to log frontend error:', error);
            res.status(500).json({ success: false, message: 'Failed to log error' });
        }
    }

    async logPerformanceMetric(req, res) {
        try {
            const { type, loadTime, url, metadata, level } = req.body;
            await this.logErrorToDatabase({
                type,
                message: `Page load time: ${loadTime}ms`,
                url,
                level: level || (loadTime > 3000 ? 'warning' : 'info'), 
                metadata: { ...metadata, loadTime },
                ip: req.context?.ip,
                userAgent: req.context?.userAgent
            });
            console.log(`Logged performance metric: ${type} - ${loadTime}ms`);
            
            if (loadTime > 5000) { 
                const telegramMessage = `🐌 Performans Xəbərdarlığı [${this.isProduction ? 'PROD' : 'DEV'}]:\nTip: ${type}\nYüklənmə Vaxtı: ${loadTime}ms\nURL: ${url}\nVaxt: ${new Date().toLocaleString('az-AZ')}`;
                this.sendTelegramNotification(telegramMessage);
            }

            res.status(200).json({ success: true, message: 'Performance metric logged successfully' });
        } catch (error) {
            console.error('Failed to log performance metric:', error);
            res.status(500).json({ success: false, message: 'Failed to log performance metric' });
        }
    }

    async logErrorToDatabase({ type, message, stack, source, lineno, colno, url, method, ip, userAgent, level, metadata }) {
        try {
            const query = `
                INSERT INTO error_logs (type, message, stack, source, lineno, colno, url, method, level, metadata, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
            `;
            const values = [
                type,
                message || null,
                stack || null,
                source || null,
                lineno || null,
                colno || null,
                url || null,
                method || null,
                level || 'error',
                JSON.stringify({ ip, userAgent, ...metadata })
            ];
            await this.db.query(query, values);
            console.log(`Database Logged: ${type} - ${message}`);
        } catch (dbError) {
            console.error('CRITICAL: Failed to log error to database:', dbError);
        }
    }

    async sendTelegramNotification(text) {
        if (!this.telegramBot || !process.env.TELEGRAM_CHAT_ID) {
            console.warn('Telegram bot or chat ID not configured for global notifications. Cannot send Telegram notification.');
            return;
        }

        try {
            await this.telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID, text, {
                parse_mode: 'Markdown'
            });
            console.log('Global Telegram notification sent successfully.');
        } catch (error) {
            console.error('Failed to send global Telegram notification:', error.message);
        }
    }
    
    // New function for tenant-specific Telegram notifications
    async sendTenantTelegramNotification(businessId, message, notificationType = 'general') {
        try {
            const { rows } = await this.db.query(
                'SELECT telegram_chat_id, telegram_notifications_enabled, telegram_notification_types FROM businesses WHERE id = $1',
                [businessId]
            );

            if (rows.length === 0) {
                console.warn(`Tenant ${businessId} not found for Telegram notification.`);
                return;
            }

            const tenant = rows[0];

            if (!tenant.telegram_notifications_enabled || !tenant.telegram_chat_id) {
                console.log(`Telegram notifications disabled or chat ID missing for tenant ${businessId}.`);
                return;
            }

            if (Array.isArray(tenant.telegram_notification_types) && !tenant.telegram_notification_types.includes(notificationType)) {
                console.log(`Notification type "${notificationType}" not enabled for tenant ${businessId}.`);
                return;
            }
            
            if (!this.telegramBot) {
                console.warn('Telegram bot not initialized on backend. Cannot send tenant notification.');
                return;
            }

            await this.telegramBot.sendMessage(tenant.telegram_chat_id, message, {
                parse_mode: 'Markdown'
            });
            console.log(`Tenant Telegram notification sent successfully to ${tenant.telegram_chat_id} for type ${notificationType}.`);

        } catch (error) {
            console.error(`Failed to send tenant Telegram notification for business ${businessId}:`, error.message);
        }
    }

    async getTenantTelegramSettings(req, res) {
        try {
            const { businessId } = req.params;
            if (req.user.role !== 'superadmin' && req.user.businessId !== businessId) {
                 return res.status(403).json({ error: 'Insufficient Permissions', message: 'You can only access your own business settings.' });
            }

            const result = await this.db.query(
                'SELECT telegram_chat_id, telegram_notifications_enabled, telegram_notification_types FROM businesses WHERE id = $1',
                [businessId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Business not found' });
            }

            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching tenant Telegram settings:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async updateTenantTelegramSettings(req, res) {
        try {
            const { businessId } = req.params;
            const { telegramChatId, telegramNotificationsEnabled, telegramNotificationTypes } = req.body;

            if (req.user.role !== 'superadmin' && req.user.businessId !== businessId) {
                return res.status(403).json({ error: 'Insufficient Permissions', message: 'You can only update your own business settings.' });
            }

            const result = await this.db.query(
                `UPDATE businesses SET 
                    telegram_chat_id = $1, 
                    telegram_notifications_enabled = $2, 
                    telegram_notification_types = $3,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $4
                RETURNING telegram_chat_id, telegram_notifications_enabled, telegram_notification_types`,
                [telegramChatId, telegramNotificationsEnabled, JSON.stringify(telegramNotificationTypes), businessId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Business not found' });
            }

            res.json({ message: 'Tenant Telegram settings updated successfully', settings: result.rows[0] });
        } catch (error) {
            console.error('Error updating tenant Telegram settings:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
        }
    }

    async getGlobalTelegramSettings(req, res) {
        try {
            const tokenExists = !!process.env.TELEGRAM_BOT_TOKEN;
            const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL || 'N/A';
            const adminChatId = process.env.TELEGRAM_CHAT_ID || 'N/A';

            res.json({
                botToken: tokenExists ? '********************' : 'Yoxdur', // Mask token
                webhookUrl: webhookUrl,
                adminChatId: adminChatId,
                status: this.telegramBot ? 'Online' : 'Offline (Token yoxdur)'
            });
        } catch (error) {
            console.error('Error fetching global Telegram settings:', error);
            res.status(500).json({ error: 'Internal Server Error', requestId: req.context.requestId });
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
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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

    startBillingScheduler() {
        // Clear any existing scheduler to prevent duplicates on hot reload or reinitialization
        if (this.billingSchedulerInterval) {
            clearInterval(this.billingSchedulerInterval);
            clearTimeout(this.billingSchedulerInterval); 
            console.log('Previous billing scheduler cleared.');
        }

        const runBillingCheck = async () => {
            console.log('Running daily billing check...');
            await this.checkBillingStatus();
        };

        // Calculate time until next midnight
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); 

        const initialDelay = midnight.getTime() - now.getTime();

        // If server starts very close to midnight, run check immediately and then schedule daily from next day
        if (initialDelay < 5 * 60 * 1000) { 
            console.log(`Scheduling immediate billing check due to close proximity to midnight (${initialDelay / 1000}s remaining).`);
            runBillingCheck(); 
            // Schedule for subsequent midnights (from the day after 'this' midnight)
            this.billingSchedulerInterval = setInterval(runBillingCheck, 24 * 60 * 60 * 1000);
        } else {
            // Schedule the first run for the upcoming midnight
            console.log(`Scheduling first billing check in ${initialDelay / 1000 / 60} minutes.`);
            this.billingSchedulerInterval = setTimeout(() => {
                runBillingCheck(); 
                // After the first run, set up a daily interval for subsequent midnights
                this.billingSchedulerInterval = setInterval(runBillingCheck, 24 * 60 * 60 * 1000);
            }, initialDelay);
        }
    }

    async checkBillingStatus() {
        try {
            const { rows: tenants } = await this.db.query('SELECT id, name, email, next_billing_date, is_active, warning_sent FROM businesses');
            const today = new Date();
            today.setHours(0, 0, 0, 0); 

            console.log(`Starting billing status check for ${tenants.length} tenants on ${today.toLocaleDateString()}`);

            for (const tenant of tenants) {
                if (!tenant.next_billing_date) {
                    console.warn(`Tenant ${tenant.name} has no next_billing_date, skipping billing check for this tenant.`);
                    continue;
                }

                const nextBillingDate = new Date(tenant.next_billing_date);
                nextBillingDate.setHours(0, 0, 0, 0); 

                const diffTime = nextBillingDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                let newIsActive = tenant.is_active;
                let newWarningSent = tenant.warning_sent;
                let updateNeeded = false;

                // Scenario 1: Billing date is within 3 days and warning not sent yet
                if (diffDays > 0 && diffDays <= 3 && !tenant.warning_sent) {
                    const message = `🔔 Diqqət: *${tenant.name}* biznes hesabının ödəniş tarixi *${nextBillingDate.toLocaleDateString('az-AZ')}* tarixindədir. Xidmətin dayandırılmaması üçün vaxtında ödəniş etməyinizi xahiş edirik.`;
                    console.log(`Sending billing warning for ${tenant.name}. Days left: ${diffDays}`);
                    this.sendTelegramNotification(message);
                    if (tenant.email) {
                        this.sendEmailNotification(tenant.email, "MühasibatlıqPro - Ödəniş Xatırlatması", `Sayın ${tenant.name},\n\nsisteminizin ödəniş tarixi ${nextBillingDate.toLocaleDateString('az-AZ')} olaraq müəyyən edilib. Xidmətin dayandırılmaması üçün vaxtında ödəniş etməyinizi xahiş edirik.\n\nHörmətlə,\nMühasibatlıqPro Komandası`);
                    }
                    newWarningSent = true;
                    updateNeeded = true;
                } 
                // Scenario 2: Billing date is in the past and tenant is still active
                else if (diffDays < 0 && tenant.is_active) {
                    const message = `🚨 Diqqət: *${tenant.name}* biznes hesabının ödəniş vaxtı keçib. Xidmət deaktiv edilir.`;
                    console.log(`Deactivating tenant ${tenant.name} due to overdue payment.`);
                    this.sendTelegramNotification(message);
                    if (tenant.email) {
                        this.sendEmailNotification(tenant.email, "MühasibatlıqPro - Xidmət Deaktiv Edildi", `Sayın ${tenant.name},\n\nödəniş vaxtı keçdiyi üçün MühasibatlıqPro xidmətiniz deaktiv edilmişdir. Xidmətlərdən yenidən istifadə etmək üçün ödənişinizi tamamlamağınızı xahiş edirik.\n\nHörmətlə,\nMühasibatlıqPro Komandası`);
                    }
                    newIsActive = false;
                    newWarningSent = true; 
                    updateNeeded = true;
                }
                // Scenario 3: Tenant was inactive but payment was confirmed (manual action, not handled by this loop)
                // This scenario would typically be handled via an admin action or a payment webhook
                // If a payment is confirmed, is_active should be set to true and warning_sent to false,
                // and next_billing_date updated. This check below would ensure old warnings are reset if
                // a tenant becomes active and next_billing_date is properly updated.
                else if (diffDays >= 0 && tenant.is_active && tenant.warning_sent) {
                    // This implies payment was made and next_billing_date was updated manually
                    // or by another process. Reset warning_sent.
                    newWarningSent = false;
                    updateNeeded = true;
                }

                if (updateNeeded) {
                    await this.db.query(`
                        UPDATE businesses SET is_active = $1, warning_sent = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3
                    `, [newIsActive, newWarningSent, tenant.id]);
                    console.log(`Updated tenant ${tenant.name}: is_active=${newIsActive}, warning_sent=${newWarningSent}`);
                }
            }
            console.log('Daily billing check completed.');
        } catch (error) {
            console.error('❌ Error during daily billing check:', error);
            this.sendTelegramNotification(`🔥 KRİTİK XƏTA: Billing skan zamanı xəta baş verdi:\n${error.message}`);
        }
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
            // Log to database and send alert for critical unhandled exceptions
            this.logErrorToDatabase({
                type: 'server_uncaught_exception',
                message: err.message,
                stack: err.stack,
                level: 'critical'
            });
            this.sendTelegramNotification(`🔥 KRİTİK SERVER XƏTASI [${this.isProduction ? 'PROD' : 'DEV'}]:\nMesaj: ${err.message}\nStack: \`\`\`${err.stack ? err.stack.substring(0, 1000) : 'N/A'}\`\`\``); 
            if (this.isProduction) {
                this.shutdown();
            }
        });

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            // Log to database and send alert for critical unhandled promise rejections
            this.logErrorToDatabase({
                type: 'server_unhandled_rejection',
                message: reason instanceof Error ? reason.message : String(reason),
                stack: reason instanceof Error ? reason.stack : null,
                level: 'critical'
            });
            this.sendTelegramNotification(`🔥 KRİTİK SERVER REJECTION [${this.isProduction ? 'PROD' : 'DEV'}]:\nReason: ${reason instanceof Error ? reason.message : String(reason)}\nStack: \`\`\`${reason instanceof Error && reason.stack ? reason.stack.substring(0, 1000) : 'N/A'}\`\`\``);
            if (this.isProduction) {
                this.shutdown();
            }
        });
    }

    async shutdown() {
        console.log('Shutting down server...');
        
        try {
            // Stop billing scheduler
            if (this.billingSchedulerInterval) {
                clearInterval(this.billingSchedulerInterval);
                clearTimeout(this.billingSchedulerInterval); 
                console.log('✅ Billing scheduler stopped');
            }

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