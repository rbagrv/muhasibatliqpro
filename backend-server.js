require('dotenv').config(); // Load environment variables from .env at the very top

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Client: PgClient } = require('pg'); // For PostgreSQL
const mysql = require('mysql2/promise'); // For MySQL/MariaDB
const WebSocket = require('ws');
const TelegramBot = require('node-telegram-bot-api');
const Joi = require('joi'); // For input validation
const admin = require('firebase-admin'); // New: Import firebase-admin

/**
 * A modern, class-based backend server for the MühasibatlıqPro application.
 * This server is designed to be multi-tenant, secure, and observable.
 */
class ModernBackendServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.wsPort = process.env.WS_PORT || 3001; // Separate port for WebSocket, or use same for hybrid
        this.version = '2.1.1'; // Updated version
        this.isProduction = process.env.NODE_ENV === 'production';
        this.dbClientType = process.env.DB_CLIENT || 'pg';
        this.corsAllowedOrigins = this.parseCorsOrigins(process.env.CORS_ORIGIN);

        this.db = null; // Database connection instance
        this.telegramBot = null;
        this.wss = null; // WebSocket server instance
        this.firebaseAdminInitialized = false; // New: Flag for Firebase Admin SDK initialization
        // this.whatsappClient = null; // WhatsApp client instance

        // New: Setup Firebase Admin SDK
        this.initializeFirebaseAdmin();

        // Setup Telegram Bot for notifications
        this.setupTelegramBot();

        // Initialize database connection
        this.initializeDatabase();

        // Setup middleware
        this.setupMiddlewares();

        // Setup routes
        this.setupRoutes();

        // Setup error handling
        this.setupErrorHandling();

        // Initialize database schema (placeholder for migrations)
        // In a real app, this would typically be a separate script or part of a deployment process.
        this.initializeDatabaseSchema();

        // Start billing scheduler (placeholder)
        this.startBillingScheduler();

        console.log(`Backend Server v${this.version} initialized in ${process.env.NODE_ENV || 'development'} mode.`);
    }

    /**
     * Parses the CORS_ORIGIN environment variable into a format usable by the cors middleware.
     * For development, allows '*' to simplify setup.
     */
    parseCorsOrigins(origins) {
        if (!origins) return [];
        const parsedOrigins = origins.split(',').map(o => o.trim());
        if (parsedOrigins.includes('*')) {
            return '*'; // The cors library prefers '*' string for all origins
        }
        return parsedOrigins;
    }

    /**
     * Initializes the Firebase Admin SDK for backend token verification.
     * Gracefully handles missing configuration.
     */
    initializeFirebaseAdmin() {
        if (process.env.FIREBASE_ADMIN_CREDENTIALS_PATH) {
            try {
                const serviceAccount = require(process.env.FIREBASE_ADMIN_CREDENTIALS_PATH);
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount)
                });
                this.firebaseAdminInitialized = true;
                console.log('✅ Firebase Admin SDK initialized successfully.');
            } catch (error) {
                console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
                console.error('   Ensure FIREBASE_ADMIN_CREDENTIALS_PATH in .env points to a valid service account JSON file.');
            }
        } else {
            console.warn('⚠️ FIREBASE_ADMIN_CREDENTIALS_PATH not found in .env. Firebase token verification will be skipped. This is INSECURE for production!');
        }
    }
    
    /**
     * Connects to the database based on the DB_CLIENT environment variable.
     */
    async initializeDatabase() {
        console.log(`Attempting to connect to ${this.dbClientType} database...`);
        try {
            if (this.dbClientType === 'pg') {
                this.db = new PgClient({
                    connectionString: process.env.DATABASE_URL, // Recommended for production environments like Heroku/Neon
                    user: process.env.DB_USER,
                    host: process.env.DB_HOST,
                    database: process.env.DB_NAME,
                    password: process.env.DB_PASSWORD,
                    port: process.env.DB_PORT,
                    ssl: this.isProduction ? { rejectUnauthorized: false } : false // Adjust SSL for production
                });
                await this.db.connect();
                console.log('✅ PostgreSQL database connected successfully.');
            } else if (this.dbClientType === 'mariadb') {
                this.db = await mysql.createConnection({
                    host: process.env.DB_HOST,
                    port: process.env.DB_PORT,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                });
                console.log('✅ MariaDB database connected successfully.');
            }
        } catch (error) {
            console.error('❌ Database connection failed:', error.message);
            // In a real application, you might want to exit the process or implement retry logic
        }
    }
    
    /**
     * Sets up the Telegram bot for system notifications.
     */
    setupTelegramBot() {
        if (process.env.TELEGRAM_BOT_TOKEN) {
            this.telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
            console.log('✅ Telegram Bot client initialized.');
            // Setup webhook for Telegram if URL is provided
            if (process.env.TELEGRAM_WEBHOOK_URL) {
                this.telegramBot.setWebHook(process.env.TELEGRAM_WEBHOOK_URL).then(() => {
                    console.log('✅ Telegram webhook set successfully.');
                }).catch(err => {
                    console.error('❌ Failed to set Telegram webhook:', err.message);
                });
            }
        } else {
            console.warn('⚠️ TELEGRAM_BOT_TOKEN not found in .env. Telegram notifications will be disabled.');
        }
    }
    
    /**
     * Configures all Express middleware.
     */
    setupMiddlewares() {
        this.app.use(cors({
            origin: this.corsAllowedOrigins,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
            credentials: true
        }));
        console.log(`✅ CORS configured for origins: ${this.corsAllowedOrigins}`);

        // Security Middleware
        this.app.use(helmet());
        console.log('✅ Helmet security middleware enabled.');

        // Body Parsing
        this.app.use(express.json({ limit: '10mb' })); // Increased limit
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        console.log('✅ Body parsing middleware configured.');
        
        // Logging
        this.app.use(morgan('dev')); // 'dev' is cleaner for development
        console.log('✅ Morgan HTTP logging enabled.');

        // Custom middleware to attach tenant and user context to requests
        this.app.use((req, res, next) => {
            req.tenantId = req.headers['x-tenant-id'] || null;
            try {
                const authHeader = req.headers.authorization;
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    const token = authHeader.split(' ')[1];
                    req.user = jwt.verify(token, process.env.JWT_SECRET);
                }
            } catch (err) {
                // Invalid token, req.user remains undefined.
                // We don't block here; specific routes will enforce authentication.
            }
            next();
        });
        console.log('✅ Custom context middleware enabled.');
    }
    
    /**
     * Defines all API routes for the application.
     */
    setupRoutes() {
        const apiRouter = express.Router();
        const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

        // --- Auth Schemas for Validation ---
        const authSchemas = {
            login: Joi.object({ email: Joi.string().email().required(), password: Joi.string().min(6).required() }),
            firebaseVerify: Joi.object({ idToken: Joi.string().required(), firebaseEmail: Joi.string().email().required() }),
            refreshToken: Joi.object({ refreshToken: Joi.string().required() })
        };
        const validate = (schema) => (req, res, next) => {
            const { error } = schema.validate(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });
            next();
        };

        // --- Demo User and Tenant Data ---
        const DEMO_USER_DATA = { email: 'demo@example.com', id: 'demo-user-id', role: 'admin' };
        const DEMO_TENANT_DATA = { id: 'demo-tenant-id', name: 'Demo Biznes', subdomain: 'demo', plan: 'professional', isActive: true };

        // Helper to generate app-specific JWTs
        const generateAppTokens = (user, tenant) => {
            const accessToken = jwt.sign({ userId: user.id, role: user.role, tenantId: tenant.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ userId: user.id, tenantId: tenant.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
            return {
                accessToken,
                refreshToken,
                user: { ...user, businessId: tenant.id, businessName: tenant.name, businessIsActive: tenant.isActive }
            };
        };

        // --- Authentication Routes ---
        
        apiRouter.post('/auth/demo-login', asyncHandler(async (req, res) => {
            console.log('--- Handling /auth/demo-login ---');
            const responsePayload = generateAppTokens(DEMO_USER_DATA, DEMO_TENANT_DATA);
            res.json({ message: 'Demo login successful!', ...responsePayload });
        }));

        apiRouter.post('/auth/login', validate(authSchemas.login), asyncHandler(async (req, res) => {
            console.log('--- Handling /auth/login ---');
            const { email, password } = req.body;
            // Let's simulate a user lookup and password check.
            const user = this.findUserByEmail(email); // Mock function call
            if (user && await bcrypt.compare(password, user.passwordHash)) {
                // Assume the user is associated with the demo tenant.
                const tenant = this.findTenantById(user.tenantId);
                const responsePayload = generateAppTokens(user, tenant);
                return res.json({ message: 'Login successful!', ...responsePayload });
            } else {
                return res.status(401).json({ message: 'E-mail və ya şifrə səhvdir.' });
            }
        }));

        apiRouter.post('/auth/firebase-verify', validate(authSchemas.firebaseVerify), asyncHandler(async (req, res) => {
            console.log('--- Handling /auth/firebase-verify ---');
            const { idToken } = req.body;
            let firebaseUser;

            if (!this.firebaseAdminInitialized) {
                console.warn('Firebase Admin not initialized. Cannot verify token.');
                return res.status(503).json({ message: 'Firebase service is unavailable on the backend. Please use Demo Login.' });
            }

            try {
                firebaseUser = await admin.auth().verifyIdToken(idToken);
                console.log('Firebase ID token verified successfully for UID:', firebaseUser.uid);
            } catch (error) {
                console.error('Firebase ID Token Verification Failed:', error.code, error.message);
                return res.status(401).json({ message: `Firebase token verification failed: ${error.message}` });
            }

            // MOCK: Find or create user in your DB based on firebaseUser.email or firebaseUser.uid
            let appUser = this.findUserByEmail(firebaseUser.email);
            if (!appUser) {
                // If user doesn't exist, create a new one (mock logic)
                console.log(`User with email ${firebaseUser.email} not found. Creating a new mock user.`);
                appUser = this.createUser({
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    role: 'user', // Default role for new sign-ups
                    tenantId: DEMO_TENANT_DATA.id // Assign to demo tenant for now
                });
            }

            const appTenant = this.findTenantById(appUser.tenantId) || DEMO_TENANT_DATA;
            
            const responsePayload = generateAppTokens(appUser, appTenant);
            res.json({ message: 'Firebase authentication successful!', ...responsePayload });
        }));
        
        apiRouter.post('/auth/refresh', validate(authSchemas.refreshToken), asyncHandler(async (req, res) => {
            const { refreshToken } = req.body;
            try {
                const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                // MOCK: In a real app, find user/tenant to re-sign token with correct roles
                const newAccessToken = jwt.sign({ userId: decoded.userId, role: 'admin', tenantId: decoded.tenantId }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ accessToken: newAccessToken });
            } catch (error) {
                res.status(403).json({ message: 'Invalid or expired refresh token.' });
            }
        }));

        // --- Logging Routes ---
        apiRouter.post('/log-error', asyncHandler(async (req, res) => {
            console.error('FRONTEND ERROR LOGGED:', req.body);
            // MOCK: Save to DB or logging service
            res.status(200).json({ message: 'Error logged.' });
        }));

        // --- Frontend Performance Logging ---
        apiRouter.post('/performance-log', asyncHandler(async (req, res) => {
            const { type, loadTime, url } = req.body;
            // In a real system, save this to a performance monitoring system or DB
            console.log('FRONTEND PERFORMANCE LOGGED:', { type, loadTime, url });
            res.status(200).json({ message: 'Performance metric logged.' });
        }));

        // --- Generic CRUD Endpoints for Modules (Placeholders) ---
        // This is a simplified example; real implementations would be specific per module
        const moduleNames = ['users', 'tenants', 'employees', 'contracts', 'attendance', 'payroll',
            'chart-of-accounts', 'journal-entries', 'income-expense', 'cash-accounts', 'transfers',
            'products', 'sales-invoices', 'sales-offers', 'sales-history', 'customers', 'credit-notes', 'debit-notes',
            'purchase-invoices', 'purchase-offers', 'suppliers',
            'warehouse', 'inventory', 'bom', 'production', 'production-orders',
            'financial-reports', 'profit-loss', 'balance-sheet', 'tax-reports', 'custom-reports', 'budget-planning', 'investments', 'analytics', 'technical-reports',
            'documents', 'folders', 'templates',
            'pos-settings', 'api', 'direct-correspondence', 'correspondence-accounts'
        ];

        moduleNames.forEach(moduleName => {
            // GET all
            apiRouter.get(`/${moduleName}`, asyncHandler(async (req, res) => {
                // Fetch all items for the tenant
                // Mock response
                res.json({ message: `Listing all ${moduleName} for tenant ${req.tenantId || 'N/A'}` });
            }));

            // GET by ID
            apiRouter.get(`/${moduleName}/:id`, asyncHandler(async (req, res) => {
                const id = req.params.id;
                // Fetch single item for the tenant
                // Mock response
                res.json({ message: `Viewing ${moduleName} with ID ${id} for tenant ${req.tenantId || 'N/A'}` });
            }));

            // POST (Create)
            apiRouter.post(`/${moduleName}`, asyncHandler(async (req, res) => {
                const data = req.body;
                // Create item for the tenant
                // Mock response
                res.status(201).json({ message: `${moduleName} created successfully for tenant ${req.tenantId || 'N/A'}. Data: ${JSON.stringify(data)}` });
            }));

            // PUT (Update)
            apiRouter.put(`/${moduleName}/:id`, asyncHandler(async (req, res) => {
                const id = req.params.id;
                const data = req.body;
                // Update item for the tenant
                // Mock response
                res.json({ message: `${moduleName} with ID ${id} updated successfully for tenant ${req.tenantId || 'N/A'}. Data: ${JSON.stringify(data)}` });
            }));

            // DELETE
            apiRouter.delete(`/${moduleName}/:id`, asyncHandler(async (req, res) => {
                const id = req.params.id;
                // Delete item for the tenant
                // Mock response
                res.json({ message: `${moduleName} with ID ${id} deleted successfully for tenant ${req.tenantId || 'N/A'}.` });
            }));
        });

        // --- Integrations Routes (Telegram example) ---
        const telegramSettingsSchema = Joi.object({
            telegramChatId: Joi.string().allow('').required(),
            telegramNotificationsEnabled: Joi.boolean().required(),
            telegramNotificationTypes: Joi.array().items(Joi.string()).required(),
        });

        apiRouter.get('/integrations/telegram-settings/:tenantId', asyncHandler(async (req, res) => {
            // Mock retrieval of settings based on tenantId
            const tenantId = req.params.tenantId;
            const mockSettings = {
                telegram_chat_id: process.env.TELEGRAM_CHAT_ID || '',
                telegram_notifications_enabled: true,
                telegram_notification_types: ['new_sales', 'low_stock'],
            };
            res.json({ settings: mockSettings });
        }));

        apiRouter.put('/integrations/telegram-settings/:tenantId', validate(telegramSettingsSchema), asyncHandler(async (req, res) => {
            const tenantId = req.params.tenantId;
            const { telegramChatId, telegramNotificationsEnabled, telegramNotificationTypes } = req.body;
            // Mock saving to DB
            console.log(`Mock saving Telegram settings for tenant ${tenantId}:`, { telegramChatId, telegramNotificationsEnabled, telegramNotificationTypes });
            res.json({ message: 'Telegram settings saved successfully.', settings: { telegram_chat_id: telegramChatId, telegram_notifications_enabled: telegramNotificationsEnabled, telegram_notification_types: telegramNotificationTypes } });
        }));

        apiRouter.post('/integrations/telegram/test-send', asyncHandler(async (req, res) => {
            const { chatId, message } = req.body;
            if (this.telegramBot && chatId) {
                try {
                    await this.telegramBot.sendMessage(chatId, message);
                    res.json({ success: true, message: 'Test message sent!' });
                } catch (error) {
                    console.error('Error sending Telegram test message:', error);
                    res.status(500).json({ success: false, message: `Failed to send Telegram message: ${error.message}` });
                }
            } else {
                res.status(400).json({ success: false, message: 'Telegram bot not configured or chat ID missing.' });
            }
        }));

        // Endpoint for Telegram webhook (if enabled)
        if (process.env.TELEGRAM_WEBHOOK_URL) {
            apiRouter.post('/telegram/webhook', (req, res) => {
                if (this.telegramBot) {
                    this.telegramBot.processUpdate(req.body);
                    res.sendStatus(200);
                } else {
                    res.status(500).send('Telegram bot not initialized');
                }
            });
        }

        this.app.use('/api/v2', apiRouter);
        console.log('✅ API routes configured.');
    }
    
    /**
     * Configures global error handling middleware.
     */
    setupErrorHandling() {
        // 404 handler
        this.app.use((req, res, next) => {
            res.status(404).json({ message: `Not Found: ${req.method} ${req.originalUrl}` });
        });

        // General error handler
        this.app.use((error, req, res, next) => {
            console.error('❌ Server Error:', error);
            if (this.telegramBot && this.isProduction && error.status >= 500) {
                const adminChatId = process.env.TELEGRAM_CHAT_ID; // Assuming this is an admin chat ID
                if (adminChatId) {
                    this.telegramBot.sendMessage(adminChatId, `🚨 Backend Error:\n${error.message}`).catch(console.error);
                }
            }
            res.status(error.status || 500).json({
                message: error.message,
                stack: this.isProduction ? '🔒' : error.stack // Hide stack in production
            });
        });
        console.log('✅ Error handling configured.');
    }

    /**
     * MOCK FUNCTION: Simulates finding a user in the database by email.
     * In a real application, this would query your 'users' table.
     */
    findUserByEmail(email) {
        // This is a mock database of users.
        const users = {
            'demo@example.com': { 
                id: 'demo-user-id', 
                email: 'demo@example.com', 
                passwordHash: '$2a$10$fW.N.1.lK3gq8fJ.VzE5IuXG5.VzE5IuXG5.VzE5IuX', // Mock hash for "password"
                role: 'admin', 
                tenantId: 'demo-tenant-id' 
            }
            // Add other mock users here if needed for testing
        };
        return users[email.toLowerCase()];
    }

    /**
     * MOCK FUNCTION: Simulates finding a tenant by ID.
     */
    findTenantById(tenantId) {
        const tenants = {
            'demo-tenant-id': { id: 'demo-tenant-id', name: 'Demo Biznes', subdomain: 'demo', plan: 'professional', isActive: true }
        };
        return tenants[tenantId];
    }
    
    /**
     * MOCK FUNCTION: Simulates creating a new user.
     */
    createUser(userData) {
        console.log("MOCK: Creating user -> ", userData);
        // In a real app, you would hash the password if provided and insert into the DB.
        return userData;
    }

    /**
     * Initializes and attaches the WebSocket server.
     */
    setupWebSocketServer() {
        // Using the same HTTP server for WebSocket upgrades
        this.wss = new WebSocket.Server({ server: this.server });

        this.wss.on('connection', ws => {
            console.log('Client connected to WebSocket.');
            ws.send('Welcome to MühasibatlıqPro WebSocket!');

            ws.on('message', message => {
                console.log('Received WebSocket message:', message.toString());
                // Echo message back to client
                ws.send(`You said: ${message.toString()}`);
            });

            ws.on('close', () => {
                console.log('Client disconnected from WebSocket.');
            });

            ws.on('error', error => {
                console.error('WebSocket error:', error);
            });
        });

        console.log('✅ WebSocket server configured.');
    }

    /**
     * Placeholder for running database migrations.
     */
    initializeDatabaseSchema() {
        // This is a placeholder. In a real application, you'd use migration tools
        // like Knex.js migrations (if using Knex) or custom scripts.
        console.log('ℹ️ Database schema initialization/migration placeholder executed.');
        // Example: if using pg directly for migrations:
        /*
        this.db.query(`
            CREATE TABLE IF NOT EXISTS tenants (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                subdomain VARCHAR(255) UNIQUE NOT NULL,
                plan VARCHAR(50) NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                next_billing_date DATE,
                warning_sent BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            -- Add more tables here, e.g., users, sales, products etc.
        `).then(() => console.log('Mock schema check/creation complete.'))
          .catch(err => console.error('Error during mock schema initialization:', err));
        */
    }

    /**
     * Placeholder for starting cron jobs or schedulers.
     */
    startBillingScheduler() {
        // Placeholder for a recurring task, e.g., checking subscriptions
        console.log('ℹ️ Billing scheduler placeholder started.');
        setInterval(() => {
            // console.log('Running mock billing check...');
            // In a real app: check tenant billing dates, send warnings, suspend accounts
        }, 24 * 60 * 60 * 1000); // Once a day
    }
    
    /**
     * Starts the Express server and initializes the WebSocket server.
     */
    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`\n🚀 Backend server listening on http://localhost:${this.port}`);
            console.log('Ensure this process remains running for the frontend to connect.');
        });
        this.setupWebSocketServer();
    }
}

// Create and start the server instance
const backendServer = new ModernBackendServer();
backendServer.start();

// Export for potential testing frameworks.
module.exports = ModernBackendServer;