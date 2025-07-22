import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { marked } from "marked";
import DOMPurify from "dompurify";

class MuhasibatProApp {
    constructor() {
        this.currentUser = null;
        this.currentTenant = null;
        this.firebaseAuth = null; 
        this.apiBaseUrl = '/api/v2';
        this.version = '2.0.0';
        this.loadedModules = new Map();
        this.currentModule = null;

        this.coaFormData = {};

        this.allBusinessSettings = new Map();
        this.currentBusinessSettings = null;

        this.firebaseConnected = false; 
        this.init();
    }

    async init() {
        console.log('MühasibatlıqPro v2.0 - Multi-Tenant SaaS Platform');

        // The initial display of landingPage and appContainer is now handled by index.html itself.

        this.initializeNotifications();

        if (window.firebaseConfig) {
            try {
                this.firebaseApp = initializeApp(window.firebaseConfig);
                this.firebaseDb = getFirestore(this.firebaseApp);
                this.firebaseAuth = getAuth(this.firebaseApp); 
                console.log("Firebase initialized.");
                this.firebaseConnected = true;
                this.updateFirebaseStatusIcon();
                
                this.setupFirebaseAuthStateListener(); 
            } catch (firebaseInitError) {
                console.error("Error initializing Firebase:", firebaseInitError);
                this.showErrorNotification("Firebase-i başlatmaq mümkün olmadı. Bəzi funksiyalar işləməyə bilər.");
                this.firebaseConnected = false;
                this.updateFirebaseStatusIcon(); 
            }
        } else {
            console.warn("Firebase configuration not found. Firebase features will be unavailable.");
            this.showWarningNotification("Firebase konfiqurasiyası tapılmadı. Bəzi funksiyalar işləməyə bilər.");
            this.firebaseConnected = false;
            this.updateFirebaseStatusIcon(); 
        }

        this.initializePWA();
        this.initializeComponents();

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleFirebaseLoginFormSubmit.bind(this));
        }

        // At this point, the landing page is visible. The auth state listener will handle redirection
        // if a user is already logged in from a previous session.

        console.log('Application initialized successfully');
    }

    initializeComponents() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    async loadModule(moduleName) {
        if (this.loadedModules.has(moduleName)) {
            return this.loadedModules.get(moduleName);
        }

        try {
            const module = await import(`./modules/${moduleName}.js`);
            this.loadedModules.set(moduleName, module);

            if (module && typeof module.bootstrap === "function") {
                module.bootstrap();
            }
            console.log(`Module loaded: ${moduleName}`);
            return module;
        } catch (error) {
            console.error(`Failed to load module: ${moduleName}`, error);
            this.showErrorNotification(`"${moduleName}" modulunu yükləmək mümkün olmadı.`);
            return null;
        }
    }

    showBusinessSelection() {
        const landingPage = document.getElementById('landingPage');
        const appContainer = document.getElementById('appContainer');

        if (landingPage) {
            landingPage.style.display = 'none'; // Hide the landing page
        }
        if (appContainer) {
            appContainer.style.display = 'block'; // Show the app container (can be 'flex' depending on layout needs)
            appContainer.innerHTML = this.getBusinessSelectionHTML();
            this.initializeBusinessSelectionComponents();
        }

        console.log('Business selection interface loaded');
    }

    selectBusiness(businessId) {
        const businesses = [
            {
                id: 'abc-company',
                name: 'ABC MMC',
                type: 'Professional',
                status: 'active',
                description: 'Böyük pərakəndə satış şəbəkəsi və distribyutor.',
                stats: {
                    totalSales: '₼1.2M',
                    activeUsers: 45,
                    totalInvoices: 560
                }
            },
            {
                id: 'xyz-holdings',
                name: 'XYZ Holdings',
                type: 'Enterprise',
                status: 'active',
                description: 'Texnologiya və investisiya holdinqi.',
                stats: {
                    totalSales: '₼3.5M',
                    activeUsers: 120,
                    totalInvoices: 1800
                }
            },
            {
                id: 'demo-biznes',
                name: 'Demo Biznes',
                type: 'Basic',
                status: 'trial',
                description: 'Platformanın sınaq versiyası üçün nümunə biznes.',
                stats: {
                    totalSales: '₼50K',
                    activeUsers: 8,
                    totalInvoices: 150
                }
            },
        ];

        const selectedBusiness = businesses.find(b => b.id === businessId);

        if (selectedBusiness) {
            console.log(`Business selected: ${selectedBusiness.name}`);
            this.currentTenant = selectedBusiness;

            if (!this.allBusinessSettings.has(businessId)) {
                this.allBusinessSettings.set(businessId, this.getDefaultBusinessSettings(businessId));
            }
            this.currentBusinessSettings = this.allBusinessSettings.get(businessId);

            document.querySelectorAll('.business-card').forEach(card => {
                card.classList.remove('active');
                if (card.dataset.businessId === businessId) {
                    card.classList.add('active');
                }
            });

            this.showSuccessNotification(`"${selectedBusiness.name}" seçildi. Sistem yüklənir...`, {
                duration: 2000
            });

            setTimeout(() => {
                this.loadMainApplication();
            }, 1000);
        } else {
            console.error(`Business with ID ${businessId} not found.`);
            this.showErrorNotification('Seçilmiş biznes tapılmadı.');
        }
    }

    getBusinessesListHTML() {
        const businesses = [
            {
                id: 'abc-company',
                name: 'ABC MMC',
                type: 'Professional',
                status: 'active',
                description: 'Böyük pərakəndə satış şəbəkəsi və distribyutor.',
                stats: {
                    totalSales: '₼1.2M',
                    activeUsers: 45,
                    totalInvoices: 560
                }
            },
            {
                id: 'xyz-holdings',
                name: 'XYZ Holdings',
                type: 'Enterprise',
                status: 'active',
                description: 'Texnologiya və investisiya holdinqi.',
                stats: {
                    totalSales: '₼3.5M',
                    activeUsers: 120,
                    totalInvoices: 1800
                }
            },
            {
                id: 'demo-biznes',
                name: 'Demo Biznes',
                type: 'Basic',
                status: 'trial',
                description: 'Platformanın sınaq versiyası üçün nümunə biznes.',
                stats: {
                    totalSales: '₼50K',
                    activeUsers: 8,
                    totalInvoices: 150
                }
            },
        ];

        return businesses.map(business => `
            <div class="business-card" data-business-id="${business.id}" onclick="app.selectBusiness('${business.id}')">
                <div class="business-info">
                    <h3>${business.name}</h3>
                    <div class="business-meta">
                        <span class="business-type">${business.type}</span>
                        <span class="business-name ${business.status}">${business.status === 'active' ? 'Aktiv' : 'Sınaq'}</span>
                    </div>
                    <p class="business-description">${business.description}</p>
                </div>
                <div class="business-stats">
                    <div class="stat-item">
                        <span class="stat-label"><i class="fas fa-chart-line"></i> Ümumi Satış</span>
                        <span class="stat-value">${business.stats.totalSales}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label"><i class="fas fa-users"></i> Aktiv İstifadəçilər</span>
                        <span class="stat-value">${business.stats.activeUsers}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label"><i class="fas fa-receipt"></i> Fakturalar</span>
                        <span class="stat-value">${business.stats.totalInvoices}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getBusinessSelectionHTML() {
        return `
            <div class="business-selection-container">
                <div class="business-selection-header">
                    <div class="brand-icon"><i class="fas fa-calculator"></i></div>
                    <h1>Biznes Seçimi</h1>
                    <p>Davam etmək üçün bir biznes (tenant) seçin və ya admin panelinə daxil olun.</p>
                </div>

                <div class="business-selection-tabs">
                    <button class="modern-tab-button active" data-tab="businesses">
                        <span class="tab-btn-icon"><i class="fas fa-building"></i></span>
                        <span class="tab-btn-label">Bizneslər</span>
                    </button>
                    <button class="modern-tab-button" data-tab="admin">
                        <span class="tab-btn-icon"><i class="fas fa-user-shield"></i></span>
                        <span class="tab-btn-label">Admin Panel</span>
                    </button>
                </div>

                <div class="business-selection-content">
                    <div id="businessesTab" class="tab-content active">
                        <div class="businesses-grid">
                            ${this.getBusinessesListHTML()}
                        </div>
                    </div>
                    <div id="adminTab" class="tab-content">
                        ${this.getAdminPanelHTML()}
                    </div>
                </div>
            </div>
        `;
    }

    async getAdminPanelHTML() {
        return `<div class="loading"><div class="spinner"></div><span>Admin paneli yüklənir...</span></div>`;
    }

    async initializeBusinessSelectionComponents() {
        const businessCards = document.querySelectorAll('.business-card');
        businessCards.forEach(card => {
            card.addEventListener('click', () => {
                const businessId = card.dataset.businessId;
                if (businessId) {
                    this.selectBusiness(businessId);
                }
            });
        });

        const tabs = document.querySelectorAll('.business-selection-tabs .modern-tab-button');
        const tabContents = document.querySelectorAll('.business-selection-content .tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', async () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const targetTab = tab.dataset.tab;

                if (targetTab === 'admin') {
                    const adminTab = document.getElementById('adminTab');
                    adminTab.innerHTML = `<div class="loading"><div class="spinner"></div><span>Admin paneli yüklənir...</span></div>`;

                    try {
                        const tenantsModule = await this.loadModule('tenants');
                        const usersModule = await this.loadModule('users');
                        let healthData = await this.fetchApiData('/health');

                        if (!healthData) {
                            healthData = {
                                status: 'unknown',
                                version: this.version,
                                timestamp: new Date().toISOString(),
                                database: {
                                    client: 'pg',
                                    status: 'unknown',
                                    timestamp: new Date().toISOString(),
                                    version: 'Unknown'
                                },
                                websocket: {
                                    status: 'unknown',
                                    connectedClients: 0
                                },
                                memory: {
                                    used: 'Unknown',
                                    total: 'Unknown'
                                },
                                uptime: 'Unknown'
                            };
                        }

                        if (!tenantsModule || !usersModule) {
                            throw new Error("Admin modules failed to load.");
                        }

                        const tenantsHTML = tenantsModule.getHTML();
                        const usersHTML = usersModule.getHTML();
                        const systemCheckHTML = this.getSystemCheckHTML(healthData);
                        const platformSettingsHTML = this.getAdminSettingsHTML(healthData);
                        const moduleLinksHTML = this.getModuleLinksHTML();

                        const currentBusinessSettings = this.currentBusinessSettings || this.getDefaultBusinessSettings('default');
                        const businessSettingsHTML = this.getBusinessSettingsHTML(currentBusinessSettings);

                        adminTab.innerHTML = `
                            <div class="admin-content">
                                <div class="admin-navigation">
                                    <button class="modern-admin-nav-button active" data-section="system-check">
                                        <span class="tab-btn-icon"><i class="fas fa-heartbeat"></i></span>
                                        <span class="tab-btn-label">Sistem Yoxlaması</span>
                                    </button>
                                    <button class="modern-admin-nav-button" data-section="tenants">
                                        <span class="tab-btn-icon"><i class="fas fa-building"></i></span>
                                        <span class="tab-btn-label">Tenantlar</span>
                                    </button>
                                    <button class="modern-admin-nav-button" data-section="users">
                                        <span class="tab-btn-icon"><i class="fas fa-users-cog"></i></span>
                                        <span class="tab-btn-label">İstifadəçilər</span>
                                     </button>
                                     <button class="modern-admin-nav-button" data-section="business-settings">
                                        <span class="tab-btn-icon"><i class="fas fa-briefcase"></i></span>
                                        <span class="tab-btn-label">Biznes Parametrləri</span>
                                     </button>
                                     <button class="modern-admin-nav-button" data-section="platform-settings">
                                        <span class="tab-btn-icon"><i class="fas fa-cog"></i></span>
                                        <span class="tab-btn-label">Platforma Tənzimləmələri</span>
                                    </button>
                                    <button class="modern-admin-nav-button" data-section="module-links">
                                        <span class="tab-btn-icon"><i class="fas fa-link"></i></span>
                                        <span class="tab-btn-label">Modul Əlaqələri</span>
                                    </button>
                                </div>
                                <div class="admin-sections">
                                    <div id="system-check-section" class="admin-section active">${systemCheckHTML}</div>
                                    <div id="tenants-section" class="admin-section">${tenantsHTML}</div>
                                    <div id="users-section" class="admin-section">${usersHTML}</div>
                                    <div id="business-settings-section" class="admin-section">${businessSettingsHTML}</div>
                                    <div id="platform-settings-section" class="admin-section">${platformSettingsHTML}</div>
                                    <div id="module-links-section" class="admin-section">${moduleLinksHTML}</div>
                                </div>
                            </div>
                        `;
                        this.initializeAdminNav();

                    } catch (e) {
                        console.error('Admin panel loading error:', e);
                        adminTab.innerHTML = `
                            <div class="error-container">
                                <i class="fas fa-exclamation-triangle error-icon"></i>
                                <h3>Admin panelini yükləmək mümkün olmadı</h3>
                                <p>${e.message}</p>
                                <div class="error-actions">
                                    <button class="btn btn-primary" onclick="location.reload()">
                                        <i class="fas fa-refresh"></i> Səhifəni Yenilə
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.showBusinessSelection()">
                                        <i class="fas fa-arrow-left"></i> Geri
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                }

                tabContents.forEach(content => {
                    if (content.id === `${targetTab}Tab`) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });

        console.log('Business selection components initialized');
    }

    initializeAdminNav() {
        const adminNavButtons = document.querySelectorAll('.admin-navigation .modern-admin-nav-button');
        const adminSections = document.querySelectorAll('.admin-sections .admin-section');

        if (adminNavButtons.length === 0) return;

        adminNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                adminNavButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const targetSection = button.dataset.section;
                adminSections.forEach(section => {
                    if (section.id === `${targetSection}-section`) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            });
        });
    }

    getSystemCheckHTML(healthData) {
        if (!healthData) {
            return `<div class="loading"><div class="spinner"></div><span>Sistem vəziyyəti yoxlanılır...</span></div>`;
        }

        const dbClientName = healthData.database?.client === 'pg' ? 'PostgreSQL' :
            healthData.database?.client === 'mariadb' ? 'MariaDB' : 'Unknown';
        const isHealthy = healthData.status === 'healthy';
        const healthPercentage = isHealthy ? '100' : healthData.status === 'unknown' ? '?' : '75';

        return `
            <h3>Sistem Vəziyyəti</h3>
            <div class="system-check-overview">
                <div class="system-health-indicator ${isHealthy ? 'healthy' : 'warning'}">
                    <div class="health-circle">
                        <div class="health-percentage">${healthPercentage}%</div>
                    </div>
                    <div class="health-info">
                        <h4>${isHealthy ? 'Sistem Sağlamdır' : 'Sistem Statusu Bilinmir'}</h4>
                        <div class="health-status">${isHealthy ? 'Bütün sistemlər normal işləyir.' : 'API əlaqəsi yoxdur, lokal rejim.'}</div>
                        <div class="health-summary">
                            <span class="success-count">${healthData.status || 'unknown'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="system-components-status">
                <div class="component-status ${isHealthy ? 'success' : 'warning'}">
                    <div class="component-header">
                        <div class="component-icon"><i class="fas fa-server"></i></div>
                        <div class="component-info">
                            <h4>Backend Server</h4>
                            <div class="component-message">${isHealthy ? `API cavabları normaldır (v${healthData.version})` : 'API əlaqəsi yoxdur'}</div>
                        </div>
                        <div class="status-indicator ${isHealthy ? 'success' : 'warning'}"><i class="fas fa-${isHealthy ? 'check-circle' : 'exclamation-triangle'}"></i></div>
                    </div>
                </div>
                <div class="component-status ${healthData.database?.status === 'connected' ? 'success' : 'warning'}">
                     <div class="component-header">
                        <div class="component-icon"><i class="fas fa-database"></i></div>
                        <div class="component-info">
                            <h4>Database (${dbClientName})</h4>
                            <div class="component-message">${healthData.database?.status === 'connected' ? `Bağlantı uğurludur (v${healthData.database.version})` : 'Bağlantı statusu bilinmir'}</div>
                        </div>
                        <div class="status-indicator ${healthData.database?.status === 'connected' ? 'success' : 'warning'}"><i class="fas fa-${healthData.database?.status === 'connected' ? 'check-circle' : 'exclamation-triangle'}"></i></div>
                    </div>
                </div>
                <div class="component-status success">
                     <div class="component-header">
                        <div class="component-icon"><i class="fas fa-rocket"></i></div>
                        <div class="component-info">
                            <h4>WebSocket</h4>
                            <div class="component-message">${healthData.websocket?.connectedClients || 0} müştəri qoşulub</div>
                        </div>
                        <div class="status-indicator success"><i class="fas fa-check-circle"></i></div>
                    </div>
                </div>
            </div>
        `;
    }

    getDefaultBusinessSettings(businessId) {
        return {
            id: businessId,
            companyName: `${businessId.replace('-', ' ').toUpperCase()} Şirkəti`,
            legalName: `${businessId.replace('-', ' ').toUpperCase()} MMC`,
            taxId: '1234567890',
            address: 'Ünvan, Bakı, Azərbaycan',
            phone: '+994 55 123 45 67',
            email: `info@${businessId}.az`,
            website: `https://${businessId}.az`,
            fiscalYearStart: '2024-01-01',
            defaultCurrency: 'AZN',
            logoUrl: '',
            invoicePrefix: 'INV-',
            nextInvoiceNumber: 1001,
            VATRate: 18,
            paymentTerms: '30 gün',
            language: 'az',
            timezone: 'Asia/Baku'
        };
    }

    getBusinessSettingsHTML(settings) {
        if (!settings) {
            settings = this.getDefaultBusinessSettings('default');
            this.showWarningNotification('Biznes parametrləri yüklənə bilmədi, standart parametrlər göstərildi.');
        }

        return `
            <h3>Biznes Parametrləri</h3>
            <div class="settings-grid">
                <div class="setting-group">
                    <h4>Ümumi Məlumatlar</h4>
                    <form id="generalBusinessSettingsForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Şirkət Adı</label>
                                <input type="text" class="form-input" name="companyName" value="${settings.companyName || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hüquqi Adı</label>
                                <input type="text" class="form-input" name="legalName" value="${settings.legalName || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">VÖEN</label>
                                <input type="text" class="form-input" name="taxId" value="${settings.taxId || ''}">
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Ünvan</label>
                                <textarea class="form-textarea" name="address" rows="3">${settings.address || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Telefon</label>
                                <input type="tel" class="form-input" name="phone" value="${settings.phone || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" name="email" value="${settings.email || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Veb Sayt</label>
                                <input type="url" class="form-input" name="website" value="${settings.website || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Loqo URL</label>
                                <input type="url" class="form-input" name="logoUrl" value="${settings.logoUrl || ''}">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.resetBusinessSettings('generalBusinessSettingsForm', 'general')">
                                <i class="fas fa-undo"></i> Sıfırla
                            </button>
                            <button type="submit" class="btn btn-primary" onclick="app.saveBusinessSettings(event, 'generalBusinessSettingsForm', 'general')">
                                <i class="fas fa-save"></i> Yadda Saxla
                            </button>
                        </div>
                    </form>
                </div>

                <div class="setting-group">
                    <h4>Maliyyə & Sənəd Tənzimləmələri</h4>
                    <form id="financialBusinessSettingsForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Maliyyə ili Başlanğıcı</label>
                                <input type="date" class="form-input" name="fiscalYearStart" value="${settings.fiscalYearStart || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Əsas Valyuta</label>
                                <select class="form-input" name="defaultCurrency">
                                    <option value="AZN" ${settings.defaultCurrency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${settings.defaultCurrency === 'USD' ? 'selected' : ''}>USD</option>
                                    <option value="EUR" ${settings.defaultCurrency === 'EUR' ? 'selected' : ''}>EUR</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Standart ƏDV dərəcəsi (%)</label>
                                <input type="number" class="form-input" name="VATRate" value="${settings.VATRate || ''}" min="0" max="100" step="0.01">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Faktura prefiksi</label>
                                <input type="text" class="form-input" name="invoicePrefix" value="${settings.invoicePrefix || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Növbəti Faktura Nömrəsi</label>
                                <input type="number" class="form-input" name="nextInvoiceNumber" value="${settings.nextInvoiceNumber || ''}" min="1">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Standart Ödəniş Şərtləri</label>
                                <input type="text" class="form-input" name="paymentTerms" value="${settings.paymentTerms || ''}">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.resetBusinessSettings('financialBusinessSettingsForm', 'financial')">
                                <i class="fas fa-undo"></i> Sıfırla
                            </button>
                            <button type="submit" class="btn btn-primary" onclick="app.saveBusinessSettings(event, 'financialBusinessSettingsForm', 'financial')">
                                <i class="fas fa-save"></i> Yadda Saxla
                            </button>
                        </div>
                    </form>
                </div>

                <div class="setting-group">
                    <h4>Digər Tənzimləmələr</h4>
                    <form id="otherBusinessSettingsForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Dil</label>
                                <select class="form-input" name="language">
                                    <option value="az" ${settings.language === 'az' ? 'selected' : ''}>Azərbaycanca</option>
                                    <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
                                    <option value="ru" ${settings.language === 'ru' ? 'selected' : ''}>Русский</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Saat Qurşağı</label>
                                <input type="text" class="form-input" name="timezone" value="${settings.timezone || ''}">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.resetBusinessSettings('otherBusinessSettingsForm', 'other')">
                                <i class="fas fa-undo"></i> Sıfırla
                            </button>
                            <button type="submit" class="btn btn-primary" onclick="app.saveBusinessSettings(event, 'otherBusinessSettingsForm', 'other')">
                                <i class="fas fa-save"></i> Yadda Saxla
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    saveBusinessSettings(event, formId, category) {
        event.preventDefault();
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        Object.assign(this.currentBusinessSettings, data);
        if (this.currentTenant) {
            this.allBusinessSettings.set(this.currentTenant.id, this.currentBusinessSettings);
        } else {
            console.warn("No current tenant selected. Settings not fully persisted to specific business.");
        }

        console.log(`Saving business settings for category '${category}' for business:`, this.currentTenant?.id, this.currentBusinessSettings);
        this.showSuccessNotification(`Biznes parametrləri uğurla yadda saxlanıldı.`);
    }

    resetBusinessSettings(formId, category) {
        if (!this.currentTenant) {
            this.showWarningNotification('Biznes seçilmədiği üçün parametrlər sıfırlana bilmədi.');
            return;
        }

        const defaultSettings = this.getDefaultBusinessSettings(this.currentTenant.id);
        this.allBusinessSettings.set(this.currentTenant.id, defaultSettings);
        this.currentBusinessSettings = defaultSettings;

        console.log(`Resetting business settings for category '${category}' for business: ${this.currentTenant.id}`);
        this.showInfoNotification(`Biznes parametrləri sıfırlandı.`);

        const businessSettingsSection = document.getElementById('business-settings-section');
        if (businessSettingsSection) {
            businessSettingsSection.innerHTML = this.getBusinessSettingsHTML(this.currentBusinessSettings);
        }
    }

    getAdminSettingsHTML(healthData) {
        const dbClientName = healthData.database?.client === 'pg' ? 'PostgreSQL' :
            healthData.database?.client === 'mariadb' ? 'MariaDB' : 'Unknown';
        return `
            <h3>Platforma Tənzimləmələri</h3>
             <div class="settings-grid">
                <div class="setting-group">
                    <h4>Database Tənzimləmələri (Read-Only)</h4>
                     <div class="info-card">
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Database Client:</span>
                                <span class="info-value">${dbClientName}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Status:</span>
                                <span class="info-value ${healthData.database?.status === 'connected' ? 'success' : 'warning'}">${healthData.database?.status || 'unknown'}</span>
                            </div>
                             <div class="info-item">
                                <span class="info-label">Version:</span>
                                <span class="info-value">${healthData.database?.version || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setting-group">
                    <h4>Server Tənzimləmələri (Read-Only)</h4>
                     <div class="info-card">
                        <div class="info-grid">
                             <div class="info-item">
                                <span class="info-label">Server Version:</span>
                                <span class="info-value">${healthData.version || 'Unknown'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Uptime:</span>
                                <span class="info-value">${healthData.uptime || 'Unknown'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Memory Used:</span>
                                <span class="info-value">${healthData.memory?.used || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setting-group">
                    <h4>WhatsApp İnteqrasiyası</h4>
                    <div class="info-card">
                        <div class="whatsapp-status">
                            <div class="status-indicator warning">
                                <i class="fab fa-whatsapp"></i>
                                <span id="whatsappStatusText">Backend tərəfindən idarə olunur.</span>
                            </div>
                        </div>
                        <form id="whatsappSettingsForm" class="settings-form">
                            <div class="form-group">
                                <label class="form-label">Bot Adı</label>
                                <input type="text" class="form-input" name="botName"
                                    value="MühasibatlıqPro Bot"
                                    placeholder="MühasibatlıqPro Bot" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Xoş Gəldiniz Mesajı</label>
                                <textarea class="form-textarea" name="welcomeMessage"
                                    placeholder="Salam, MühasibatlıqPro xidmətinə xoş gəldiniz!" readonly
                                >Salam, MühasibatlıqPro xidmətinə xoş gəldiniz!</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Bildiriş Tənzimləmələri</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="notifyNewSales" checked disabled>
                                        Yeni Satışlar
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="notifyLowStock" checked disabled>
                                        Az Stok Xəbərdarlığı
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="notifyDailyReport" checked disabled>
                                        Gündəlik Hesabat
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mövcud Komandalar</label>
                                <div class="auto-replies">
                                    <div class="command-info">
                                        <div class="command-item">
                                            <strong>!salam</strong> - Salamlama və komandalar siyahısı
                                        </div>
                                        <div class="command-item">
                                            <strong>!anbar</strong> - Anbar məlumatını göstər (10 məhsula qədər)
                                        </div>
                                        <div class="command-item">
                                            <strong>!help</strong> - Kömək və bütün komandalar
                                        </div>
                                        <div class="command-item">
                                            <strong>!status</strong> - Sistem statusu
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-primary" disabled>
                                    <i class="fas fa-save"></i> Tənzimləmələr Backenddədir
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    saveModuleLinks(event) {
        event.preventDefault();
        const form = document.getElementById('moduleLinksForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log("Saving module links:", data);
        this.showSuccessNotification("Modul əlaqələri yadda saxlanıldı.");
    }

    setupFirebaseAuthStateListener() {
        if (!this.firebaseAuth) {
            console.error("Firebase Auth not initialized. Cannot set up auth state listener.");
            return;
        }

        onAuthStateChanged(this.firebaseAuth, (user) => {
            if (user) {
                // User is signed in.
                this.postFirebaseLoginSetup(user);
            } else {
                // User is signed out. Ensure landing page is visible.
                this.logoutCleanup();
            }
        });
    }

    handleFirebaseLoginFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        const errorMsgDiv = document.getElementById('loginErrorMsg');
        errorMsgDiv.style.display = 'none';
        errorMsgDiv.textContent = '';

        this.showInfoNotification('Daxil olunur...', { duration: 1500 });
        signInWithEmailAndPassword(this.firebaseAuth, email, password)
            .then((userCredential) => {
                this.postFirebaseLoginSetup(userCredential.user);
                this.showSuccessNotification('Sistemə uğurla daxil oldunuz!');
                this.closeLoginModal(); 
            })
            .catch((error) => {
                console.error("Firebase Login Error:", error);
                let errorMessage = "Xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.";
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    errorMessage = "Yanlış email və ya şifrə.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "Yanlış email formatı.";
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = "İnternet bağlantısı yoxdur və ya server əlçatan deyil.";
                }
                errorMsgDiv.textContent = errorMessage;
                errorMsgDiv.style.display = 'block';
                this.showErrorNotification(errorMessage, { title: 'Giriş Xətası', persistent: true });
            });
    }

    postFirebaseLoginSetup(firebaseUser) {
        this.currentUser = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            role: 'admin', 
            permissions: ['all'],
            firstName: firebaseUser.displayName || 'Demo',
            lastName: '', 
            phone: firebaseUser.phoneNumber || '',
        };

        // For demo purposes, assign a fixed demo tenant.
        // In a real app, this would be fetched from your backend based on user's tenant membership.
        this.currentTenant = {
            id: 'demo-biznes',
            name: 'Demo Biznes',
            domain: 'demo.muhasibatliqpro.az',
            plan: 'enterprise'
        };

        if (!this.allBusinessSettings.has(this.currentTenant.id)) {
            this.allBusinessSettings.set(this.currentTenant.id, this.getDefaultBusinessSettings(this.currentTenant.id));
        }
        this.currentBusinessSettings = this.allBusinessSettings.get(this.currentTenant.id);

        // Store a token. For a real app, this would be a JWT from your backend.
        localStorage.setItem('auth_token', `firebase_token_${firebaseUser.uid}`); 
        localStorage.setItem('current_user', JSON.stringify(this.currentUser));

        console.log('User logged in via Firebase:', this.currentUser.email, 'with tenant:', this.currentTenant.name);
        this.showBusinessSelection(); // Directs to business selection after login
    }

    loadMainApplication() {
        const appContainer = document.getElementById('appContainer');
        if (!appContainer) return;

        // appContainer should already be visible from showBusinessSelection()
        // No explicit display style change needed here if showBusinessSelection is the entry point

        appContainer.innerHTML = this.getMainApplicationHTML();

        this.initializeApplicationComponents();
        this.updateFirebaseStatusIcon(); 
        this.navigateTo('dashboard');

        console.log('Main application loaded');
    }

    getSidebarHTML() {
        return `
            <div class="sidebar-section" data-section="main">
                <h3 class="sidebar-title">
                    <span>Əsas</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="dashboard">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Panel</span>
                    </li>
                    <li class="sidebar-item" data-module="comments">
                        <i class="fas fa-comments"></i>
                        <span>Şərhlər</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="sales">
                <h3 class="sidebar-title">
                    <span>Satış və Alış</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="sales-invoices">
                        <i class="fas fa-file-invoice-dollar"></i>
                        <span>Satış Fakturaları</span>
                    </li>
                    <li class="sidebar-item" data-module="sales-offers">
                        <i class="fas fa-file-contract"></i>
                        <span>Satış Təklifləri</span>
                    </li>
                    <li class="sidebar-item" data-module="customers">
                        <i class="fas fa-users"></i>
                        <span>Müştərilər</span>
                    </li>
                    <li class="sidebar-item" data-module="purchase-invoices">
                        <i class="fas fa-receipt"></i>
                        <span>Alış Fakturaları</span>
                    </li>
                    <li class="sidebar-item" data-module="purchase-offers">
                        <i class="fas fa-handshake"></i>
                        <span>Alış Təklifləri</span>
                    </li>
                    <li class="sidebar-item" data-module="suppliers">
                        <i class="fas fa-truck"></i>
                        <span>Təchizatçılar</span>
                    </li>
                     <li class="sidebar-item" data-module="credit-notes">
                        <i class="fas fa-file-plus"></i>
                        <span>Kredit Notlar</span>
                    </li>
                    <li class="sidebar-item" data-module="debit-notes">
                        <i class="fas fa-file-minus"></i>
                        <span>Debit Notlar</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="inventory">
                <h3 class="sidebar-title">
                    <span>Anbar və İstehsalat</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="warehouse">
                        <i class="fas fa-warehouse"></i>
                        <span>Anbar</span>
                    </li>
                    <li class="sidebar-item" data-module="products">
                        <i class="fas fa-box"></i>
                        <span>Məhsullar</span>
                    </li>
                    <li class="sidebar-item" data-module="inventory">
                        <i class="fas fa-boxes"></i>
                        <span>Stok</span>
                    </li>
                    <li class="sidebar-item" data-module="production-orders">
                        <i class="fas fa-industry"></i>
                        <span>İstehsalat</span>
                    </li>
                </ul>
            </div>

             <div class="sidebar-section" data-section="finance">
                <h3 class="sidebar-title">
                    <span>Maliyyə</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="cash-accounts">
                        <i class="fas fa-cash-register"></i>
                        <span>Kassa & Bank</span>
                    </li>
                    <li class="sidebar-item" data-module="transfers">
                        <i class="fas fa-exchange-alt"></i>
                        <span>Köçürmələr</span>
                    </li>
                    <li class="sidebar-item" data-module="fixed-assets">
                        <i class="fas fa-building"></i>
                        <span>Əsas Vəsaitlər</span>
                    </li>
                    <li class="sidebar-item" data-module="intangible-assets">
                        <i class="fas fa-lightbulb"></i>
                        <span>Qeyri-Maddi Aktivlər</span>
                    </li>
                     <li class="sidebar-item" data-module="investments">
                        <i class="fas fa-chart-line"></i>
                        <span>İnvestisiyalar</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="accounting">
                <h3 class="sidebar-title">
                    <span>Mühasibatlıq</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="journal-entries">
                        <i class="fas fa-book"></i>
                        <span>Jurnal Yazılışları</span>
                    </li>
                    <li class="sidebar-item" data-module="chart-of-accounts">
                        <i class="fas fa-sitemap"></i>
                        <span>Hesablar Planı</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="hr">
                <h3 class="sidebar-title">
                    <span>Kadrlar (HR)</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="employees">
                        <i class="fas fa-user-friends"></i>
                        <span>İşçilər</span>
                    </li>
                    <li class="sidebar-item" data-module="contracts">
                        <i class="fas fa-file-signature"></i>
                        <span>Müqavilələr</span>
                    </li>
                    <li class="sidebar-item" data-module="payroll">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>Əmək Haqqı</span>
                    </li>
                    <li class="sidebar-item" data-module="attendance">
                        <i class="fas fa-user-check"></i>
                        <span>Davamiyyət</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="pos">
                <h3 class="sidebar-title">
                    <span>Terminal</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="pos">
                        <i class="fas fa-cash-register"></i>
                        <span>POS Terminalı</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="parameters">
                <h3 class="sidebar-title">
                    <span>Parametrlər</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="business-settings">
                        <i class="fas fa-cogs"></i>
                        <span>Biznes Parametrləri</span>
                    </li>
                </ul>
            </div>
        `;
    }

    getMainApplicationHTML() {
        const tenantName = this.currentTenant ? this.currentTenant.name : 'Müəssisə';
        const sidebarHTML = this.getSidebarHTML();

        return `
            <div class="app-container">
                <header class="app-header no-print">
                    <div class="app-title">
                        <button class="mobile-menu-toggle" id="mobileMenuToggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div class="brand-icon"><i class="fas fa-calculator"></i></div>
                        <span>MühasibatlıqPro</span>
                        <span class="tenant-name">${tenantName}</span>
                    </div>
                    <div class="app-header-actions">
                        <span id="firebaseStatusIcon" class="firebase-status-icon" title="Firebase Status: Yoxlanılır...">
                            <i class="fas fa-question-circle"></i>
                        </span>
                        <button class="btn btn-secondary" onclick="app.showBusinessSelection()">
                            <i class="fas fa-exchange-alt"></i> Biznesi Dəyiş
                        </button>
                        <button class="btn btn-danger" onclick="app.logout()">
                            <i class="fas fa-sign-out-alt"></i> Çıxış
                        </button>
                    </div>
                </header>
                <div class="app-content">
                    <aside class="app-sidebar no-print" id="appSidebar">${sidebarHTML}</aside>
                    <main class="app-main" id="appMainContent">
                        <div class="loading">
                            <div class="spinner"></div>
                            <span>Yüklənir...</span>
                        </div>
                    </main>
                </div>
                <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
            </div>
        `;
    }

    async navigateTo(moduleId) {
        if (!moduleId) return;

        if (moduleId === 'business-settings') {
            const mainContent = document.getElementById('appMainContent');
            if (!mainContent) return;
            mainContent.innerHTML = this.getBusinessSettingsHTML(this.currentBusinessSettings || this.getDefaultBusinessSettings(this.currentTenant?.id || 'default'));
            return;
        }

        const mainContent = document.getElementById('appMainContent');
        if (!mainContent) {
            console.error('Main content area not found.');
            return;
        }

        mainContent.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>'${moduleId}' modulu yüklənir...</span>
            </div>
        `;

        if (this.currentModule && this.loadedModules.has(this.currentModule)) {
            try {
                const oldModule = this.loadedModules.get(this.currentModule);
                if (oldModule && oldModule.onNavigateOut) {
                    oldModule.onNavigateOut();
                }
            } catch (error) {
                console.error(`Error in onNavigateOut for module ${this.currentModule}:`, error);
            }
        }

        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.module === moduleId) {
                item.classList.add('active');
            }
        });

        this.currentModule = moduleId;

        try {
            const module = await this.loadModule(moduleId);
            if (module && typeof module.getHTML === 'function') {
                const html = module.getHTML();
                mainContent.innerHTML = html;

                if (module.onNavigateIn) {
                    module.onNavigateIn();
                }
            } else {
                throw new Error(`Module ${moduleId} has no getHTML function or failed to load.`);
            }
        } catch (error) {
            console.error(`Error loading module ${moduleId}:`, error);
            mainContent.innerHTML = `
                <div class="page-content">
                    <div class="error-container">
                        <i class="fas fa-exclamation-triangle error-icon"></i>
                        <h2>Modul Yüklənmədi</h2>
                        <p>"${moduleId}" modulunu yükləyərkən xəta baş verdi.</p>
                        <div class="error-details">
                            <details>
                                <summary>Texniki Məlumat</summary>
                                <pre>${error.stack || error}</pre>
                            </details>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    showModuleForm(module, action, id = null) {
        this.navigateToForm(module, action, id, false); 
    }

    showSubAccountForm(module, parentId, action = 'create', subId = null) {
        this.navigateToForm(module, action, subId, true, parentId); 
    }

    async navigateToForm(module, action, id = null, isSubAccount = false, parentId = null) {
        const mainContent = document.getElementById('appMainContent');
        if (!mainContent) {
            console.error('Main content area not found.');
            return;
        }

        mainContent.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>Form yüklənir...</span>
            </div>
        `;

        try {
            const moduleObj = await this.loadModule(module);
            let html = '';
            let data = {};
            let parentData = {};

            if (isSubAccount) {
                if (typeof moduleObj.getSubAccountFormHTML !== 'function') {
                    throw new Error(`Module ${module} has no getSubAccountFormHTML function.`);
                }
                parentData = this.getSampleData(module, parentId);
                if (!parentData || Object.keys(parentData).length === 0) {
                    parentData = {
                        id: parentId,
                        code: parentId,
                        name: `Hesab ${parentId}`
                    };
                }
                if (subId) {
                    data = this.getSampleData(module, subId);
                }
                html = moduleObj.getSubAccountFormHTML(action, parentData, data);
            } else {
                if (typeof moduleObj.getFormHTML !== 'function') {
                    throw new Error(`Module ${module} has no getFormHTML function.`);
                }
                data = this.getSampleData(module, id);
                html = moduleObj.getFormHTML(action, data);
            }

            mainContent.innerHTML = html;

            this.initializeFormComponents();

            if (module === 'chart-of-accounts' && !isSubAccount) { 
                await this.prepareCoaFormData(action, data); 
                this.initializeCoaForm();
            }

        } catch (error) {
            console.error(`Error loading form for module ${module}:`, error);
            mainContent.innerHTML = `
                <div class="page-content">
                    <div class="error-container">
                        <i class="fas fa-exclamation-triangle error-icon"></i>
                        <h2>Form Yüklənmədi</h2>
                        <p>"${module}" modulunu yükləyərkən xəta baş verdi.</p>
                        <div class="error-details">
                            <details>
                                <summary>Texniki Məlumat</summary>
                                <pre>${error.stack || error}</pre>
                            </details>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    getSampleData(module, id) {
        const businesses = [
            {
                id: 'abc-company',
                name: 'ABC MMC',
                type: 'Professional',
                status: 'active',
                description: 'Böyük pərakəndə satış şəbəkəsi və distribyutor.',
                stats: {
                    totalSales: '₼1.2M',
                    activeUsers: 45,
                    totalInvoices: 560
                }
            },
            {
                id: 'xyz-holdings',
                name: 'XYZ Holdings',
                type: 'Enterprise',
                status: 'active',
                description: 'Texnologiya və investisiya holdinqi.',
                stats: {
                    totalSales: '₼3.5M',
                    activeUsers: 120,
                    totalInvoices: 1800
                }
            },
            {
                id: 'demo-biznes',
                name: 'Demo Biznes',
                type: 'Basic',
                status: 'trial',
                description: 'Platformanın sınaq versiyası üçün nümunə biznes.',
                stats: {
                    totalSales: '₼50K',
                    activeUsers: 8,
                    totalInvoices: 150
                }
            },
        ];

        const sampleData = {
            customers: {
                cust1: {
                    id: 'cust1',
                    type: 'individual',
                    name: 'Əli',
                    surname: 'Məmmədov',
                    email: 'ali@example.com',
                    phone: '+994 50 123 45 67',
                    address: 'Bakı şəhəri, Yasamal rayonu',
                    city: 'Bakı',
                    district: 'Yasamal',
                    group: 'regular',
                    creditLimit: 1000,
                    paymentTerms: 'net30'
                }
            },
            products: {
                prod1: {
                    id: 'prod1',
                    name: 'Dell Laptop Inspiron 15',
                    sku: 'DELL-123',
                    barcode: '1234567890123',
                    category: 'electronics',
                    description: 'Intel i5 processor, 8GB RAM, 256GB SSD',
                    price: 1200.00,
                    cost: 900.00,
                    quantity: 12,
                    minQuantity: 2,
                    unit: 'pcs',
                    taxRate: 18,
                    status: 'active',
                    brand: 'Dell',
                    model: 'Inspiron 15'
                }
            },
            employees: {
                emp1: {
                    id: 'emp1',
                    firstName: 'Rövşən',
                    lastName: 'Bəgirov',
                    email: 'r.bagirov@company.com',
                    phone: '+994 55 123 45 67',
                    position: 'Baş Mühasib',
                    department: 'finance',
                    hireDate: '2022-01-15',
                    baseSalary: 2400,
                    currency: 'AZN',
                    status: 'active',
                    employmentType: 'full_time'
                }
            },
            users: {
                user1: {
                    id: 'user1',
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'test@example.com',
                    phone: '+994 50 111 22 33',
                    role: 'user',
                }
            },
            tenants: {
                tenant1: {
                    id: 'tenant1',
                    name: 'Sınaq Biznes MMC',
                    subdomain: 'sinqbiznes',
                    plan: 'basic',
                    description: 'Test üçün sınaq biznes hesabı',
                }
            },
            'sales-offers': {
                so1: {
                    id: 'SO-2024-001',
                    offerNumber: 'SO-2024-001',
                    date: '2024-02-08',
                    dueDate: '2024-02-22',
                    customerId: 'cust1',
                    notes: 'Website hazırlama xidməti',
                    items: [
                        {
                            productId: 'prod-website',
                            quantity: 1,
                            unitPrice: 3500,
                            discount: 0,
                            taxRate: 18
                        }
                    ]
                }
            },
            'purchase-offers': {
                po1: {
                    id: 'PO-2024-001',
                    offerNumber: 'PO-2024-001',
                    date: '2024-02-10',
                    dueDate: '2024-02-20',
                    supplierId: 'S-0001',
                    notes: '15 ədəd Dell laptop üçün təklif',
                    items: [
                        {
                            productId: 'prod1',
                            quantity: 15,
                            unitPrice: 1150,
                            discount: 0,
                            taxRate: 18
                        }
                    ]
                }
            },
            warehouse: {
                wh1: {
                    id: 'main',
                    name: 'Əsas Anbar',
                    location: 'Bakı, Yasamal',
                    responsiblePerson: 'Vüqar Abbasov',
                    capacity: 5000,
                    type: 'general',
                    status: 'active'
                }
            },
            contracts: {
                cont1: {
                    id: 'EMP-2024-001',
                    contractNumber: 'EMP-2024-001',
                    employeeId: 'emp1',
                    position: 'Baş Mühasib',
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                    salary: 2500,
                    currency: 'AZN',
                    contractType: 'full_time',
                    notes: 'Standart əmək müqaviləsi'
                }
            },
            'fixed-assets': {
                fa1: {
                    id: 'FA-2023-001',
                    name: 'Server Dell PowerEdge',
                    category: 'IT Avadanlıq',
                    purchaseDate: '2023-01-10',
                    initialValue: 25000,
                    depreciationMethod: 'straight_line',
                    usefulLife: 4,
                    salvageValue: 1000,
                    notes: 'Əsas data mərkəzində istifadə olunur'
                }
            },
            'intangible-assets': {
                ia1: {
                    id: 'IA-2023-001',
                    name: 'ERP Lisenziyası',
                    category: 'Proqram Təminatı',
                    acquisitionDate: '2023-01-01',
                    initialValue: 120000,
                    amortizationMethod: 'straight_line',
                    usefulLife: 5,
                    notes: 'SAP Business One lisenziyası'
                }
            },
            investments: {
                inv1: {
                    id: 'INV-2024-001',
                    projectName: 'Anbar Kompleksi',
                    type: 'Daşınmaz Əmlak',
                    amount: 250000,
                    startDate: '2024-01-01',
                    endDate: '2025-12-31',
                    expectedROI: 15,
                    status: 'active',
                    notes: 'Yeni anbar tikintisi layihəsi'
                }
            },
            'credit-notes': {
                cn1: {
                    id: 'CN-2024-001',
                    creditNoteNumber: 'CN-2024-001',
                    customerId: 'cust1',
                    relatedInvoice: 'SINV-2024-001',
                    reason: 'Məhsul qaytarma',
                    amount: 450.00,
                    date: '2024-02-12',
                    status: 'completed',
                    notes: 'Müştəri qüsurlu məhsulu geri qaytardı.'
                }
            },
            'debit-notes': {
                dn1: {
                    id: 'DN-2024-001',
                    debitNoteNumber: 'DN-2024-001',
                    customerId: 'cust1',
                    relatedInvoice: 'SINV-2024-001',
                    reason: 'Gecikmə faizi',
                    amount: 150.00,
                    date: '2024-02-10',
                    status: 'completed',
                    notes: 'Faktura gecikməsi səbəbindən əlavə ödəniş.'
                }
            },
            'journal-entries': {
                je1: {
                    id: 'JE-2024-001',
                    entryNumber: 'JE-2024-001',
                    date: '2024-02-19',
                    description: 'Kassa mədaxil - satış',
                    reference: 'INV-2024-001',
                    entries: [
                        {
                            accountId: '101',
                            debitAmount: 1200,
                            creditAmount: 0,
                            description: 'Kassa girişi'
                        },
                        {
                            accountId: '601',
                            debitAmount: 0,
                            creditAmount: 1200,
                            description: 'Satış gəliri'
                        }
                    ]
                }
            },
            'cash-accounts': {
                ca1: {
                    id: 'main-cash',
                    name: 'Əsas Kassa',
                    type: 'cash',
                    balance: 5600,
                    currency: 'AZN',
                    minLimit: 1000,
                    bankName: '',
                    accountNumber: '',
                    notes: 'Gündəlik nağd əməliyyatlar üçün'
                }
            },
            payroll: {
                pay1: {
                    id: 'PAY-2024-001',
                    employeeId: 'emp1',
                    period: '2024-01',
                    grossSalary: 2400,
                    deductions: 360,
                    netPay: 2040,
                    paymentDate: '2024-02-05',
                    status: 'paid',
                    notes: 'Yanvar ayı əmək haqqı'
                }
            },
            attendance: {
                att1: {
                    id: 'ATT-2024-001',
                    employeeId: 'emp1',
                    date: '2024-02-19',
                    clockIn: '09:05',
                    clockOut: '18:00',
                    workHours: 8.92,
                    notes: '5 dəq gecikib',
                    status: 'late'
                }
            },
            'production-orders': {
                prodord1: {
                    id: 'PRO-2024-001',
                    orderNumber: 'PRO-2024-001',
                    product: 'Dell Laptop',
                    quantity: 25,
                    startDate: '2024-02-10',
                    endDate: '2024-02-25',
                    status: 'in_progress',
                    priority: 'high',
                    notes: 'Təcili istehsal sifarişi'
                }
            },
            'tax-reports': {
                taxrep1: {
                    id: 'TXR-2024-001',
                    reportNumber: 'VH-2024-001',
                    type: 'ƏDV',
                    period: 'Yanvar 2024',
                    amount: 2340,
                    submissionDate: '2024-02-20',
                    status: 'submitted',
                    notes: 'Yanvar ƏDV bəyannaməsi təqdim edildi.'
                }
            },
            'financial-reports': {
                finrep1: {
                    id: 'FNR-2024-001',
                    reportNumber: 'FIN-2024-001',
                    name: 'Mənfəət və Zərər',
                    period: 'Yanvar 2024',
                    generationDate: '2024-02-22',
                    status: 'ready',
                    notes: 'Aylıq Mənfəət və Zərər Hesabatı.'
                }
            },
            'balance-sheet': {
                bs1: {
                    id: 'BAL-2024-001',
                    reportNumber: 'BAL-2024-001',
                    period: 'Yanvar 2024',
                    generationDate: '2024-02-22',
                    status: 'ready',
                    notes: 'Aylıq Balans Hesabatı.'
                }
            },
            'profit-loss': {
                pl1: {
                    id: 'PL-2024-001',
                    reportNumber: 'PL-2024-001',
                    period: 'Yanvar 2024',
                    generationDate: '2024-02-22',
                    status: 'ready',
                    notes: 'Aylıq Mənfəət və Zərər Hesabatı.'
                }
            },
            transfers: {
                trans1: {
                    id: 'TRF-2024-001',
                    transferNumber: 'TRF-2024-001',
                    date: '2024-02-14',
                    fromAccount: 'main-cash',
                    toAccount: 'kapital-azn',
                    amount: 1000,
                    currency: 'AZN',
                    notes: 'Kassadan banka pul köçürməsi'
                }
            },
            'chart-of-accounts': {
                '101': {
                    id: '101',
                    code: '101',
                    name: 'Qeyri-maddi aktivlərin dəyəri',
                    accountType: 'Aktiv',
                    section: '1',
                    article: '10',
                    balance: 15000,
                    currency: 'AZN',
                    created_at: '2023-01-01',
                    is_active: true,
                },
                '211': {
                    id: '211',
                    code: '211',
                    name: 'Alıcıların və sifarişçilərin qısamüddətli debitor borcları',
                    accountType: 'Aktiv',
                    section: '2',
                    article: '21',
                    balance: 25000,
                    currency: 'AZN',
                    created_at: '2023-01-01',
                    is_active: true,
                },
                '211.1': {
                    id: '211.1',
                    code: '211.1',
                    name: 'Müştəri A - Debitor Borcu',
                    accountType: 'Aktiv',
                    section: '2',
                    article: '21',
                    parentId: '211',
                    balance: 1500,
                    currency: 'AZN',
                    created_at: '2024-01-10',
                    is_active: true,
                },
                '221': {
                    id: '221',
                    code: '221',
                    name: 'Kassa',
                    accountType: 'Aktiv',
                    section: '2',
                    article: '22',
                    balance: 5600,
                    currency: 'AZN',
                    created_at: '2023-01-01',
                    is_active: true,
                },
                '221.1': {
                    id: '221.1',
                    code: '221.1',
                    name: 'Əsas Kassa - AZN',
                    accountType: 'Aktiv',
                    section: '2',
                    article: '22',
                    parentId: '221',
                    balance: 5600,
                    currency: 'AZN',
                    created_at: '2024-01-15',
                    is_active: true,
                },
                '221.2': {
                    id: '221.2',
                    code: '221.2',
                    name: 'Xarici Valyuta Kassası - USD',
                    accountType: 'Aktiv',
                    section: '2',
                    article: '22',
                    parentId: '221',
                    balance: 1200,
                    currency: 'USD',
                    created_at: '2024-01-20',
                    is_active: true,
                }
            }
        };

        if (id && sampleData[module] && sampleData[module][id]) {
            return sampleData[module][id];
        }
        return {};
    }

    initializeFormComponents() {
        if (document.getElementById('invoiceItemsBody')) {
            this.calculateInvoiceTotal();
        }

        if (document.getElementById('journalEntryItemsBody')) {
            this.calculateJournalEntryTotal();
        }
    }

    async _performSubmission(module, action, data) {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const entityName = this.getEntityName(module);
            let successMessage = '';
            if (action === 'create') {
                successMessage = `Yeni ${entityName} uğurla yaradıldı!`;
            } else if (action === 'edit') {
                successMessage = `${entityName} uğurla yeniləndi!`;
            }
            this.showSuccessNotification(successMessage);

            if (this.firebaseDb) {
                try {
                    const collectionName = module; 
                    const docData = {
                        ...data,
                        _localAction: action, 
                        _localId: data.id, 
                        _timestamp: serverTimestamp(), 
                        _tenantId: this.currentTenant?.id || 'unknown_tenant',
                        _userId: this.currentUser?.id || 'unknown_user'
                    };

                    const docRef = await addDoc(collection(this.firebaseDb, collectionName), docData);
                    console.log(`Document for ${module} (${action}) written to Firebase with ID: ${docRef.id}`);
                } catch (firebaseError) {
                    console.error("Error writing document to Firebase:", firebaseError);
                    this.showErrorNotification(`Firebase-ə yazarkən xəta: ${firebaseError.message}`, {
                        title: 'Firebase Yazma Xətası'
                    });
                }
            } else {
                console.warn("Firebase Firestore not initialized. Data not sent to Firebase.");
                this.showWarningNotification("Firebase bağlantısı yoxdur. Məlumatlar yalnız lokal yadda saxlanıldı.");
            }

            setTimeout(() => {
                this.navigateTo(module);
            }, 1500);

        } catch (error) {
            console.error(`Error submitting ${module} form locally:`, error);
            this.showErrorNotification(error, {
                title: `${module} formu göndərilərkən xəta!`
            });
        }
    }

    async submitModuleForm(event, module, action, id) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (action === 'create') {
            const prefixes = {
                'users': 'USR',
                'products': 'PRD',
                'sales-invoices': 'INV',
                'sales-offers': 'SOF',
                'purchase-invoices': 'PIN',
                'purchase-offers': 'POF',
                'customers': 'CUS',
                'suppliers': 'SUP',
                'employees': 'EMP',
                'contracts': 'CNT',
                'fixed-assets': 'AST',
                'intangible-assets': 'INT',
                'investments': 'INV',
                'credit-notes': 'CRN',
                'debit-notes': 'DBN',
                'journal-entries': 'JRN',
                'cash-accounts': 'ACC',
                'production-orders': 'PRO',
                'tax-reports': 'TXR',
                'financial-reports': 'FNR',
                'transfers': 'TRF',
                'chart-of-accounts': 'COA',
                'inventory': 'STK',
                'warehouse': 'WH',
                'payroll': 'PAY',
                'attendance': 'ATT',
                'tenants': 'TNT'
            };

            const prefix = prefixes[module] || 'DOC';
            data.id = `${prefix}-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
        } else { 
            data.id = id;
        }

        if (module === 'sales-invoices' || module === 'purchase-invoices' || module === 'sales-offers' || module === 'purchase-offers' || module === 'bom') {
            data.items = this.getInvoiceItems(formData);
        }

        if (module === 'journal-entries') {
            data.entries = this.getJournalEntriesFromForm(formData);
        }

        if (module === 'chart-of-accounts') {
            data.code = formData.get('code');
            data.name = formData.get('name');
        }

        console.log(`Submitting top-level ${action} form for ${module}:`, data);
        this._performSubmission(module, action, data);
    }

    getInvoiceItems(formData) {
        const items = [];
        const products = formData.getAll('productId[]');
        const quantities = formData.getAll('quantity[]');
        const unitPrices = formData.getAll('unitPrice[]');
        const discounts = formData.getAll('discount[]');
        const taxRates = formData.getAll('taxRate[]');

        for (let i = 0; i < products.length; i++) {
            if (products[i]) {
                items.push({
                    productId: products[i],
                    quantity: parseFloat(quantities[i]) || 0,
                    unitPrice: parseFloat(unitPrices[i]) || 0,
                    discount: parseFloat(discounts[i]) || 0,
                    taxRate: parseFloat(taxRates[i]) || 0
                });
            }
        }
        return items;
    }

    getJournalEntriesFromForm(formData) {
        const entries = [];
        const accountIds = formData.getAll('accountId[]');
        const debitAmounts = formData.getAll('debitAmount[]');
        const creditAmounts = formData.getAll('creditAmount[]');
        const descriptions = formData.getAll('entryDescription[]');

        for (let i = 0; i < accountIds.length; i++) {
            if (accountIds[i]) {
                entries.push({
                    accountId: accountIds[i],
                    debitAmount: parseFloat(debitAmounts[i]) || 0,
                    creditAmount: parseFloat(creditAmounts[i]) || 0,
                    description: descriptions[i] || ''
                });
            }
        }
        return entries;
    }

    initializeApplicationComponents() {
        const sidebarSections = document.querySelectorAll('.sidebar-section');

        sidebarSections.forEach(section => {
            const menu = section.querySelector('.sidebar-menu');
            const title = section.querySelector('.sidebar-title');
            const sectionId = section.getAttribute('data-section');

            let isCollapsed = true;
            if (sectionId === 'main') {
                isCollapsed = false;
            }

            const savedState = localStorage.getItem(`sidebar_${sectionId}`);
            if (savedState !== null) {
                isCollapsed = savedState === 'true';
            }

            if (menu && title) {
                if (isCollapsed) {
                    menu.classList.add('collapsed');
                    title.classList.add('collapsed');
                } else {
                    menu.classList.remove('collapsed');
                    title.classList.remove('collapsed');
                }
            }
        });

        document.querySelectorAll('.sidebar-title').forEach(title => {
            title.addEventListener('click', () => {
                const section = title.closest('.sidebar-section');
                const menu = section.querySelector('.sidebar-menu');

                sidebarSections.forEach(otherSection => {
                    if (otherSection !== section) {
                        const otherMenu = otherSection.querySelector('.sidebar-menu');
                        const otherTitle = otherSection.querySelector('.sidebar-title');
                        if (otherMenu && otherTitle) {
                            otherMenu.classList.add('collapsed');
                            otherTitle.classList.add('collapsed');
                            localStorage.setItem(`sidebar_${otherSection.getAttribute('data-section')}`, 'true');
                        }
                    }
                });

                const isNowCollapsed = !menu.classList.contains('collapsed');
                title.classList.toggle('collapsed', isNowCollapsed);
                menu.classList.toggle('collapsed', isNowCollapsed);

                const sectionId = section.getAttribute('data-section');
                if (sectionId) {
                    localStorage.setItem(`sidebar_${sectionId}`, isNowCollapsed);
                }
            });
        });

        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const module = e.currentTarget.dataset.module;
                if (module) {
                    this.navigateTo(module);
                    this.closeMobileMenu();
                }
            });
        });

        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', () => this.closeMobileMenu());
        }
    }

    initializeNotifications() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.id = 'notification-container';
        document.body.appendChild(this.notificationContainer);
        this.activeNotifications = [];
        this.notificationHistory = new Set();
    }

    initializePWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('PWA: Service Worker registered', registration);
                })
                .catch(error => {
                    console.log('PWA: Service Worker registration failed', error);
                });
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.showInstallPrompt(e);
        });
    }

    showInstallPrompt(deferredPrompt) {
        console.log('PWA install prompt available');
    }

    showNotification(message, type = 'info', options = {}) {
        const {
            title = this.getNotificationTitle(type),
            duration = 5000,
            actions = [],
            persistent = false,
            sound = true
        } = options;

        const notificationKey = `${type}_${title}_${message}`;

        if (this.notificationHistory.has(notificationKey)) {
            const lastShown = this.lastNotificationTime || 0;
            if (Date.now() - lastShown < 3000) {
                console.log('Preventing duplicate notification:', notificationKey);
                return null;
            }
        }

        this.notificationHistory.add(notificationKey);
        this.lastNotificationTime = Date.now();

        setTimeout(() => {
            this.notificationHistory.delete(notificationKey);
        }, 5000);

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const notificationId = Date.now() + Math.random();
        notification._notificationId = notificationId;

        notification.style.setProperty('--duration', `${duration}ms`);

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const actionsHTML = actions.length > 0 ? `
            <div class="notification-actions">
                ${actions.map((action, index) => `
                    <button class="notification-action ${action.style || ''}" onclick="app.handleNotificationAction(${notificationId}, ${index})">
                        ${action.icon ? `<i class="${action.icon}"></i>` : ''}
                        ${action.label}
                    </button>
                `).join('')}
            </div>
        ` : '';

        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="${icons[type]}"></i>
                </div>
                <div class="notification-body">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                    ${actionsHTML}
                </div>
                <button class="notification-close" onclick="app.dismissNotification(this.closest('.notification'))">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            ${!persistent ? '<div class="notification-progress"><div class="notification-progress-bar"></div></div>' : ''}
        `;

        if (actions.length > 0) {
            notification._actions = actions;
        }

        if (!persistent) {
            notification.addEventListener('mouseenter', () => {
                notification.classList.add('paused');
            });

            notification.addEventListener('mouseleave', () => {
                notification.classList.remove('paused');
            });
        }

        if (sound) {
            this.playNotificationSound(type);
        }

        this.notificationContainer.appendChild(notification);

        if (!persistent && duration > 0) {
            notification._dismissTimer = setTimeout(() => {
                this.dismissNotification(notification);
            }, duration);
        }

        this.activeNotifications.push(notification);

        return notification;
    }

    getNotificationTitle(type) {
        const titles = {
            success: 'Uğurlu',
            error: 'Xəta',
            warning: 'Xəbərdarlıq',
            info: 'Məlumat'
        };
        return titles[type] || 'Bildiriş';
    }

    dismissNotification(notification) {
        if (!notification || !notification.parentElement) return;

        clearTimeout(notification._dismissTimer);
        notification.classList.add('dismissing');

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
                this.activeNotifications = this.activeNotifications.filter(n => n !== notification);
            }
        }, 300);
    }

    handleNotificationAction(notificationId, actionIndex) {
        const notification = this.activeNotifications.find(n => n._notificationId === notificationId);
        if (!notification || !notification._actions) return;

        const action = notification._actions[actionIndex];
        if (action && typeof action.handler === 'function') {
            action.handler();
        }

        if (!action.keepOpen) {
            this.dismissNotification(notification);
        }
    }

    playNotificationSound(type) {
        try {
            const audioContext = new(window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            const frequencies = {
                success: 800,
                error: 400,
                warning: 600,
                info: 500
            };

            oscillator.frequency.setValueAtTime(frequencies[type] || 500, audioContext.currentTime);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.warn('Error playing notification sound:', error);
        }
    }

    showSuccessNotification(message, options = {}) {
        return this.showNotification(message, 'success', options);
    }

    showErrorNotification(message, options = {}) {
        const effectiveMessage = typeof message === 'object' && message !== null && message.message ? message.message : String(message);

        return this.showNotification(effectiveMessage, 'error', {
            ...options,
            persistent: options.persistent !== false
        });
    }

    showWarningNotification(message, options = {}) {
        return this.showNotification(message, 'warning', options);
    }

    showInfoNotification(message, options = {}) {
        return this.showNotification(message, 'info', options);
    }

    showActionNotification(message, type, actions, options = {}) {
        return this.showNotification(message, type, {
            ...options,
            actions,
            persistent: true
        });
    }

    clearAllNotifications() {
        this.activeNotifications.forEach(notification => {
            this.dismissNotification(notification);
        });
    }

    updateFirebaseStatusIcon() {
        const iconElement = document.getElementById('firebaseStatusIcon');
        if (!iconElement) return;

        const iconI = iconElement.querySelector('i');
        if (!iconI) return;

        iconI.classList.remove('fa-question-circle', 'fa-check-circle', 'fa-times-circle');
        iconElement.classList.remove('connected', 'disconnected');

        if (this.firebaseConnected) {
            iconI.classList.add('fa-check-circle');
            iconElement.classList.add('connected');
            iconElement.title = "Firebase Status: Qoşulub";
        } else {
            iconI.classList.add('fa-times-circle');
            iconElement.classList.add('disconnected');
            iconElement.title = "Firebase Status: Qoşulmayıb";
        }
    }

    async fetchApiData(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, options);
            if (!response.ok) {
                console.warn(`API endpoint ${endpoint} returned ${response.status}`);
                return null;
            }
            return response.json();
        }
        catch (error) {
            console.warn(`API fetch error for ${endpoint}:`, error.message);
            return null;
        }
    }

    async logout() {
        if (this.firebaseAuth && this.firebaseAuth.currentUser) {
            try {
                await signOut(this.firebaseAuth);
                this.showSuccessNotification('Sistemdən uğurla çıxış edildi.');
            } catch (error) {
                console.error("Firebase Logout Error:", error);
                this.showErrorNotification(`Çıxış zamanı xəta: ${error.message}`);
            }
        } else {
            this.logoutCleanup();
            this.showSuccessNotification('Sistemdən çıxış edildi.');
        }
    }

    logoutCleanup() {
        this.currentUser = null;
        this.currentTenant = null;
        localStorage.clear();
        
        const landingPage = document.getElementById('landingPage');
        const appContainer = document.getElementById('appContainer');

        if (landingPage) {
            landingPage.style.display = 'block'; // Make landing page visible
        }
        if (appContainer) {
            appContainer.innerHTML = ''; // Clear app content
            appContainer.style.display = 'none'; // Hide app container
        }
        // IMPORTANT: Do NOT call showBusinessSelection() here. This function's purpose is to return to the *landing page*.
        // The onAuthStateChanged listener handles showing business selection if a user logs in again after signing out.
    }

    handleEntityOp(module, operation, id) {
        console.log(`Operation: ${operation} on ${module} with ID: ${id || 'new'}`);

        const formActions = ['create', 'edit', 'view'];
        if (formActions.includes(operation)) {
            this.showModuleForm(module, operation, id); 
            return;
        }

        switch (module) {
            case 'sales-invoices':
                this.handleSalesInvoiceOperation(operation, id);
                break;
            case 'cash-accounts':
                if (operation === 'transfer') {
                    this.showCashTransferModal();
                } else if (operation === 'delete') {
                    this.handleDeleteOperation(module, id);
                } else {
                    this.showInfoNotification(`${operation} əməliyyatı ${module} modulunda icra edilir...`);
                }
                break;
            case 'warehouse':
                if (operation === 'transfer') {
                    this.showWarehouseTransferModal();
                } else if (operation === 'delete') {
                    this.handleDeleteOperation(module, id);
                } else {
                    this.showInfoNotification(`${operation} əməliyyatı ${module} modulunda icra edilir...`);
                }
                break;
            case 'delete': 
                this.handleDeleteOperation(module, id);
                break;
            default:
                this.showInfoNotification(`${operation} əməliyyatı ${module} modulunda icra edilir...`);
        }
    }

    handleSalesInvoiceOperation(operation, id) {
        switch (operation) {
            case 'print':
                this.printInvoice(id);
                break;
            case 'download':
                this.downloadInvoice(id);
                break;
            case 'send-reminder':
                this.sendInvoiceReminder(id);
                break;
            case 'duplicate':
                this.duplicateInvoice(id);
                break;
            case 'archive':
                this.archiveInvoice(id);
                break;
            case 'send-notice':
                this.sendOverdueNotice(id);
                break;
            case 'collection':
                this.initiateCollection(id);
                break;
            case 'bulk-send':
                this.bulkSendInvoices();
                break;
            case 'bulk-export':
                this.bulkExportInvoices();
                break;
            case 'bulk-print':
                this.bulkPrintInvoices();
                break;
            case 'bulk-reminder':
                this.bulkSendReminders();
                break;
            default:
                this.showInfoNotification(`${operation} əməliyyatı satış fakturaları modulunda icra edilir...`);
        }
    }

    printInvoice(id) {
        if (!id) {
            this.showWarningNotification('Çap etmək üçün faktura seçin.');
            return;
        }
        this.showInfoNotification(`Faktura "${id}" çap üçün hazırlanır...`, {
            title: 'Faktura Çapı',
            duration: 2000
        });
        window.print();
    }

    downloadInvoice(id) {
        if (!id) {
            this.showWarningNotification('Yükləmək üçün faktura seçin.');
            return;
        }
        this.showSuccessNotification(`Faktura "${id}" yüklənir...`, {
            title: 'Faktura Yükləmə'
        });
    }

    sendInvoiceReminder(id) {
        if (!id) {
            this.showWarningNotification('Xatırlatma göndərmək üçün faktura seçin.');
            return;
        }
        this.showActionNotification(`Faktura "${id}" üçün xatırlatma göndərilsin?`, 'info', [{
            label: 'Göndər',
            style: 'primary',
            handler: () => {
                this.showSuccessNotification(`Faktura "${id}" üçün xatırlatma göndərildi.`);
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Xatırlatma Göndər'
        });
    }

    duplicateInvoice(id) {
        if (!id) {
            this.showWarningNotification('Dublikat yaratmaq üçün faktura seçin.');
            return;
        }
        this.showActionNotification(`Faktura "${id}" dublikat yaradılsın?`, 'info', [{
            label: 'Bəli, yarat',
            style: 'primary',
            handler: () => {
                const newId = `SINV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}-COPY`;
                this.showSuccessNotification(`Faktura "${id}" dublikatı "${newId}" yaradıldı.`);
                this.navigateTo('sales-invoices'); 
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Dublikat Faktura'
        });
    }

    archiveInvoice(id) {
        if (!id) {
            this.showWarningNotification('Arxivləşdirmək üçün faktura seçin.');
            return;
        }
        this.showActionNotification(`Faktura "${id}" arxivləşdirilsin?`, 'warning', [{
            label: 'Arxivləşdir',
            style: 'primary',
            handler: () => {
                this.showSuccessNotification(`Faktura "${id}" arxivləşdirildi.`);
                this.navigateTo('sales-invoices'); 
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Faktura Arxivləşdirmə'
        });
    }

    sendOverdueNotice(id) {
        if (!id) {
            this.showWarningNotification('Bildiriş göndərmək üçün faktura seçin.');
            return;
        }
        this.showActionNotification(`Faktura "${id}" üçün gecikmə bildirişi göndərilsin?`, 'danger', [{
            label: 'Göndər',
            style: 'primary',
            handler: () => {
                this.showSuccessNotification(`Faktura "${id}" üçün gecikmə bildirişi göndərildi.`);
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Gecikmə Bildirişi'
        });
    }

    initiateCollection(id) {
        if (!id) {
            this.showWarningNotification('İcraata başlamaq üçün faktura seçin.');
            return;
        }
        this.showActionNotification(`Faktura "${id}" üçün icraat prosesinə başlamaq istəyirsiniz?`, 'danger', [{
            label: 'Başla',
            style: 'primary',
            handler: () => {
                this.showSuccessNotification(`Faktura "${id}" üçün icraat prosesinə başlanıldı.`);
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'İcraat Prosesi'
        });
    }

    bulkSendInvoices() {
        this.showActionNotification(`Seçilmiş fakturalar (3 ədəd) göndərilsin?`, 'info', [{
            label: 'Göndər',
            style: 'primary',
            handler: () => {
                this.showSuccessNotification(`Seçilmiş fakturalar uğurla göndərildi.`);
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Toplu Göndərmə'
        });
    }

    bulkExportInvoices() {
        this.showActionNotification(`Seçilmiş fakturalar (3 ədəd) Excel-ə ixrac edilsin?`, 'info', [{
            label: 'İxrac et',
            style: 'primary',
            handler: () => {
                this.showSuccessNotification(`Seçilmiş fakturalar Excel-ə ixrac edildi.`);
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Toplu İxrac'
        });
    }

    bulkPrintInvoices() {
        this.showActionNotification(`Seçilmiş fakturalar (3 ədəd) çap edilsin?`, 'info', [{
            label: 'Çap et',
            style: 'primary',
            handler: () => {
                this.showInfoNotification(`Seçilmiş fakturalar çap üçün hazırlanır...`);
                setTimeout(() => window.print(), 1000);
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Toplu Çap'
        });
    }

    bulkSendReminders() {
        this.showActionNotification(`Seçilmiş fakturalar (2 ədəd) üçün xatırlatma göndərilsin?`, 'info', [{
            label: 'Göndər',
            style: 'primary',
            handler: () => {
                this.showSuccessNotification(`Seçilmiş fakturalar üçün xatırlatmalar göndərildi.`);
            }
        }, {
            label: 'Ləğv et',
            style: 'secondary'
        }], {
            title: 'Toplu Xatırlatma'
        });
    }

    showCashTransferModal() {
        const mainContent = document.getElementById('appMainContent');
        const modal = mainContent ? mainContent.querySelector('#transferModal') : null;
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        } else {
            this.showWarningNotification('Transfer modalı tapılmadı.');
        }
    }

    closeTransferModal() {
        const modal = document.getElementById('transferModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }

    processTransfer(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log('Processing cash transfer:', data);
        this.showSuccessNotification(`₼${data.amount} köçürmə uğurlu oldu!`);
        this.closeTransferModal();
        this.navigateTo('cash-accounts');
    }

    showWarehouseTransferModal() {
        const modal = document.getElementById('warehouseTransferModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        } else {
            this.showWarningNotification('Anbar transfer modalı tapılmadı.');
        }
    }

    closeWarehouseTransferModal() {
        const modal = document.getElementById('warehouseTransferModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }

    processWarehouseTransfer(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log('Processing warehouse transfer:', data);
        this.showSuccessNotification(`"${data.product}" məhsulundan ${data.quantity} ədəd transfer olundu!`);
        this.closeWarehouseTransferModal();
        this.navigateTo('warehouse');
    }

    handleEditOperation(module, id) {
        this.navigateToForm(module, 'edit', id);
    }

    handleViewOperation(module, id) {
        this.navigateToForm(module, 'view', id);
    }

    handleDeleteOperation(module, id) {
        this.showActionNotification('Bu elementi silmək istədiyinizə əminsiniz?', 'warning', [{
            label: 'Ləğv et',
            style: 'secondary',
            handler: () => {
                console.log('Deletion cancelled.');
            }
        }, {
            label: 'Sil',
            style: 'danger',
            handler: () => {
                console.log(`Deleting ${module} with ID: ${id}`);
                this.showSuccessNotification(`${this.getEntityName(module)} silindi (ID: ${id})`);
                setTimeout(() => {
                    this.navigateTo(module);
                }, 500);
            }
        }], {
            title: `Silməni təsdiqlə`,
            persistent: true
        });
    }

    getEntityName(module) {
        const names = {
            'products': 'Məhsul',
            'customers': 'Müştəri',
            'employees': 'İşçi',
            'users': 'İstifadəçi',
            'tenants': 'Tenant (Biznes)',
            'sales-invoices': 'Satış Fakturası',
            'sales-offers': 'Satış Təklifi',
            'purchase-invoices': 'Alış Fakturası',
            'purchase-offers': 'Alış Təklifi',
            'suppliers': 'Təchizatçı',
            'warehouse': 'Anbar',
            'contracts': 'Müqavilə',
            'fixed-assets': 'Əsas Vəsait',
            'intangible-assets': 'Qeyri-Maddi Aktiv',
            'investments': 'İnvestisiya',
            'credit-notes': 'Kredit Not',
            'debit-notes': 'Debit Not',
            'journal-entries': 'Jurnal Yazılışı',
            'cash-accounts': 'Kassa/Bank Hesabı',
            'payroll': 'Əmək Haqqı',
            'attendance': 'Davamiyyət Qeydiyyatı',
            'production-orders': 'İstehsalat Sifarişi',
            'tax-reports': 'Vergi Hesabatı',
            'financial-reports': 'Maliyyə Hesabatı',
            'balance-sheet': 'Balans Hesabatı',
            'profit-loss': 'Mənfəət və Zərər Hesabatı',
            'transfers': 'Köçürmə',
            'chart-of-accounts': 'Hesab',
            'inventory': 'Stok Hərəkəti',
            'pos-settings': 'POS Tənzimləməsi',
            'templates': 'Şablon',
            'folders': 'Qovluq',
            'capital-accounts': 'Kapital Əməliyyatı',
            'direct-correspondence': 'Birbaşa Müxabirləşmə',
            'documents': 'Sənəd'
        };
        return names[module] || 'Element';
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('appSidebar');
        const overlay = document.getElementById('mobileMenuOverlay');
        const toggleButton = document.getElementById('mobileMenuToggle');
        if (sidebar && overlay && toggleButton) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
            toggleButton.classList.toggle('active'); 
        }
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('appSidebar');
        const overlay = document.getElementById('mobileMenuOverlay');
        const toggleButton = document.getElementById('mobileMenuToggle');
        if (sidebar && overlay && toggleButton) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            toggleButton.classList.remove('active'); 
        }
    }

    openLoginModal() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.style.display = 'flex';
            setTimeout(() => loginModal.classList.add('show'), 10);
            const errorMsgDiv = document.getElementById('loginErrorMsg');
            if (errorMsgDiv) {
                errorMsgDiv.style.display = 'none';
                errorMsgDiv.textContent = '';
            }
        }
    }

    closeLoginModal() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.remove('show');
            setTimeout(() => loginModal.style.display = 'none', 300);
        }
    }

    openConsultationModal() {
        const consultationModal = document.getElementById('consultationModal');
        if (consultationModal) {
            consultationModal.style.display = 'flex';
            setTimeout(() => consultationModal.classList.add('show'), 10);
        }
    }

    closeConsultationModal() {
        const consultationModal = document.getElementById('consultationModal');
        if (consultationModal) {
            consultationModal.classList.remove('show');
            setTimeout(() => consultationModal.style.display = 'none', 300);
        }
    }

    scrollToFeatures() {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    togglePasswordVisibility(inputId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = passwordInput.nextElementSibling.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }

    forgotPassword() {
        this.showInfoNotification('Şifrənin bərpası funksiyası hələ işlənməyib. Zəhmət olmasa, admin ilə əlaqə saxlayın.', {
            title: 'Şifrəni Bərpa Et',
            persistent: true,
            duration: 7000
        });
    }

    demoLogin() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.elements.email.value = 'demo@example.com';
            loginForm.elements.password.value = 'demo123';
            loginForm.elements.rememberMe.checked = true;
            this.handleFirebaseLoginFormSubmit({ target: loginForm, preventDefault: () => {} });
        } else {
            this.showErrorNotification('Login form tapılmadı.', { title: 'Demo Giriş Xətası' });
        }
    }
}

window.app = new MuhasibatProApp();