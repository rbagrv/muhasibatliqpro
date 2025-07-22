class TableManager {
    constructor() {
        this.activeSort = {}; 
        this.activeFilters = {}; 
        this.activeSearchTerm = {}; 
    }

    init(tableId, options = {}) {
        const table = document.getElementById(tableId);
        if (!table) {
            console.warn(`Table with ID '${tableId}' not found for TableManager initialization.`);
            return;
        }

        const headers = table.querySelectorAll('thead th');
        headers.forEach((th, index) => {
            const initialText = th.textContent.trim();
            th.innerHTML = `
                <div class="th-content">
                    <span>${initialText}</span>
                    <div class="th-controls">
                        <span class="sort-icon" data-column-index="${index}" data-sort-direction="asc">
                            <i class="fas fa-sort"></i>
                        </span>
                        <input type="text" class="column-filter-input" placeholder="Axtar..." data-column-index="${index}" />
                    </div>
                </div>
            `;

            const sortIcon = th.querySelector('.sort-icon');
            if (sortIcon) {
                sortIcon.addEventListener('click', () => this.handleSort(tableId, index));
            }

            const filterInput = th.querySelector('.column-filter-input');
            if (filterInput) {
                filterInput.addEventListener('input', (e) => this.handleFilter(tableId, index, e.target.value));
            }

            this._applyTableState(tableId);
        });

        console.log(`TableManager initialized for table: ${tableId}`);
    }

    handleSort(tableId, columnIndex) {
        const table = document.getElementById(tableId);
        if (!table) return;

        let currentDirection = 'asc';
        if (this.activeSort[tableId] && this.activeSort[tableId].columnIndex === columnIndex) {
            currentDirection = this.activeSort[tableId].direction === 'asc' ? 'desc' : 'asc';
        }

        this.activeSort[tableId] = { columnIndex, direction: currentDirection };

        const sortIcon = table.querySelector(`th:nth-child(${columnIndex + 1}) .sort-icon`);
        if (sortIcon) {
            sortIcon.innerHTML = `<i class="fas fa-sort-${currentDirection === 'asc' ? 'up' : 'down'}"></i>`;
        }

        this._sortRows(tableId, columnIndex, currentDirection);
        this._applyFiltersAndSearch(tableId); 
    }

    _sortRows(tableId, columnIndex, direction) {
        const table = document.getElementById(tableId);
        if (!table) return;

        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const aText = a.children[columnIndex]?.textContent || '';
            const bText = b.children[columnIndex]?.textContent || '';

            let aValue = aText;
            let bValue = bText;

            if (!isNaN(parseFloat(aText)) && !isNaN(parseFloat(bText))) {
                aValue = parseFloat(aText.replace(/[^0-9.-]/g, '')); 
                bValue = parseFloat(bText.replace(/[^0-9.-]/g, ''));
            }

            if (direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        rows.forEach(row => tbody.appendChild(row));
    }

    handleFilter(tableId, columnIndex, filterValue) {
        if (!this.activeFilters[tableId]) {
            this.activeFilters[tableId] = {};
        }
        if (filterValue.trim() === '') {
            delete this.activeFilters[tableId][columnIndex];
        } else {
            this.activeFilters[tableId][columnIndex] = { type: 'text', value: filterValue.toLowerCase() };
        }
        this._applyFiltersAndSearch(tableId);
    }

    handleGlobalSearch(tableId, searchTerm) {
        this.activeSearchTerm[tableId] = searchTerm.toLowerCase();
        this._applyFiltersAndSearch(tableId);
    }

    _applyFiltersAndSearch(tableId) {
        const table = document.getElementById(tableId);
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');
        const filters = this.activeFilters[tableId] || {};
        const globalSearchTerm = this.activeSearchTerm[tableId] || '';

        rows.forEach(row => {
            let matchesAllFilters = true;
            let matchesGlobalSearch = false;

            Array.from(row.children).forEach((cell, cellIndex) => {
                const cellText = cell.textContent.toLowerCase();
                if (filters[cellIndex] && !cellText.includes(filters[cellIndex].value)) {
                    matchesAllFilters = false;
                }
                if (globalSearchTerm && cellText.includes(globalSearchTerm)) {
                    matchesGlobalSearch = true;
                }
            });

            const shouldBeVisible = matchesAllFilters && (globalSearchTerm === '' || matchesGlobalSearch);
            row.style.display = shouldBeVisible ? '' : 'none';
        });
    }

    _applyTableState(tableId) {
        const table = document.getElementById(tableId);
        if (!table) return;

        if (this.activeSort[tableId]) {
            const { columnIndex, direction } = this.activeSort[tableId];
            this._sortRows(tableId, columnIndex, direction);

            const currentSortIcon = table.querySelector(`th:nth-child(${columnIndex + 1}) .sort-icon`);
            if (currentSortIcon) {
                currentSortIcon.innerHTML = `<i class="fas fa-sort-${direction === 'asc' ? 'up' : 'down'}"></i>`;
            }
        }

        if (this.activeFilters[tableId]) {
            for (const colIndex in this.activeFilters[tableId]) {
                const filterValue = this.activeFilters[tableId][colIndex].value;
                const filterInput = table.querySelector(`th:nth-child(${parseInt(colIndex) + 1}) .column-filter-input`);
                if (filterInput) {
                    filterInput.value = filterValue;
                }
            }
        }

        this._applyFiltersAndSearch(tableId); 
    }
}

const tableManager = new TableManager(); 

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
        this._pendingImportData = null; 

        this.landingPageSettings = this.getDefaultLandingPageSettings();
        this.contactMessages = this.getMockContactMessages();

        this.init();
    }

    async init() {
        console.log('MühasibatlıqPro v2.0 - Multi-Tenant SaaS Platform');

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

        window.addEventListener('load', () => {
            if (performance && performance.timing) {
                const perf = performance.timing;
                const loadTime = perf.loadEventEnd - perf.navigationStart;
                fetch('/api/v2/performance-log', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'page_load',
                        loadTime: loadTime,
                        url: window.location.href
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }).catch(e => console.error("Failed to log performance metric:", e));
            }
        });

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
            landingPage.style.display = 'none'; 
        }
        if (appContainer) {
            appContainer.style.display = 'block'; 
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
                is_active: true,
                nextBillingDate: '2024-04-20',
                warningSent: false,
                description: 'Böyük pərakəndə satış şəbəkəsi və distribyutor.',
                stats: {
                    totalSales: '₼1.2M',
                    activeUsers: 45,
                    totalInvoices: 560
                },
                telegramChatId: null, // Default value
                telegramNotificationsEnabled: false,
                telegramNotificationTypes: []
            },
            {
                id: 'xyz-holdings',
                name: 'XYZ Holdings',
                type: 'Enterprise',
                status: 'active',
                is_active: true,
                nextBillingDate: '2024-03-25', 
                warningSent: false,
                description: 'Texnologiya və investisiya holdinqi.',
                stats: {
                    totalSales: '₼3.5M',
                    activeUsers: 120,
                    totalInvoices: 1800
                },
                telegramChatId: 'YOUR_XYZ_TENANT_CHAT_ID', // Example for XYZ
                telegramNotificationsEnabled: true,
                telegramNotificationTypes: ['new_sales', 'daily_report']
            },
            {
                id: 'demo-biznes',
                name: 'Demo Biznes',
                type: 'Basic',
                status: 'trial',
                is_active: false, 
                nextBillingDate: '2024-02-01', 
                warningSent: true, 
                description: 'Platformanın sınaq versiyası üçün nümunə biznes.',
                stats: {
                    totalSales: '₼50K',
                    activeUsers: 8,
                    totalInvoices: 150
                },
                telegramChatId: null,
                telegramNotificationsEnabled: false,
                telegramNotificationTypes: []
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
            Object.assign(this.currentBusinessSettings, {
                is_active: selectedBusiness.is_active,
                nextBillingDate: selectedBusiness.nextBillingDate,
                warningSent: selectedBusiness.warningSent,
                telegramChatId: selectedBusiness.telegramChatId,
                telegramNotificationsEnabled: selectedBusiness.telegramNotificationsEnabled,
                telegramNotificationTypes: selectedBusiness.telegramNotificationTypes
            });

            document.querySelectorAll('.business-card').forEach(card => {
                card.classList.remove('active');
                if (card.dataset.businessId === businessId) {
                    card.classList.add('active');
                }
            });

            if (!this.currentTenant.is_active) {
                this.showErrorNotification(`Seçdiyiniz "${selectedBusiness.name}" biznes hesabının xidmətləri deaktivdir.`, {
                    title: 'Xidmət Deaktivdir',
                    persistent: true,
                    actions: [
                        { label: 'Əlaqə', handler: () => this.navigateTo('contact'), style: 'primary' },
                        { label: 'Biznes Seç', handler: () => this.showBusinessSelection(), style: 'secondary' }
                    ]
                });
                this.showSuspendedAccountMessage(selectedBusiness.name);
            } else {
                this.showSuccessNotification(`"${selectedBusiness.name}" seçildi. Sistem yüklənir...`, {
                    duration: 2000
                });

                setTimeout(() => {
                    this.loadMainApplication();
                }, 1000);
            }
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
                is_active: true,
                nextBillingDate: '2024-04-20',
                warningSent: false,
                description: 'Böyük pərakəndə satış şəbəkəsi və distribyutor.',
                stats: {
                    totalSales: '₼1.2M',
                    activeUsers: 45,
                    totalInvoices: 560
                },
                telegramChatId: null, // Default value
                telegramNotificationsEnabled: false,
                telegramNotificationTypes: []
            },
            {
                id: 'xyz-holdings',
                name: 'XYZ Holdings',
                type: 'Enterprise',
                status: 'active',
                is_active: true,
                nextBillingDate: '2024-03-25', 
                warningSent: false,
                description: 'Texnologiya və investisiya holdinqi.',
                stats: {
                    totalSales: '₼3.5M',
                    activeUsers: 120,
                    totalInvoices: 1800
                },
                telegramChatId: 'YOUR_XYZ_TENANT_CHAT_ID', // Example for XYZ
                telegramNotificationsEnabled: true,
                telegramNotificationTypes: ['new_sales', 'daily_report']
            },
            {
                id: 'demo-biznes',
                name: 'Demo Biznes',
                type: 'Basic',
                status: 'trial',
                is_active: false, 
                nextBillingDate: '2024-02-01', 
                warningSent: true, 
                description: 'Platformanın sınaq versiyası üçün nümunə biznes.',
                stats: {
                    totalSales: '₼50K',
                    activeUsers: 8,
                    totalInvoices: 150
                },
                telegramChatId: null,
                telegramNotificationsEnabled: false,
                telegramNotificationTypes: []
            },
        ];

        return businesses.map(business => `
            <div class="business-card" data-business-id="${business.id}" onclick="app.selectBusiness('${business.id}')">
                <div class="business-info">
                    <h3>${business.name}</h3>
                    <div class="business-meta">
                        <span class="business-type">${business.type}</span>
                        <span class="business-name ${business.status}">${business.status === 'active' ? 'Aktiv' : (business.status === 'trial' ? 'Sınaq' : 'Deaktiv')}</span>
                        ${!business.is_active ? '<span class="status-badge error">Deaktiv</span>' : ''}
                    </div>
                    <p class="business-description">${business.description}</p>
                    <div class="business-billing-status">
                        <small>Növbəti Ödəniş: ${new Date(business.nextBillingDate).toLocaleDateString('az-AZ')}</small>
                        ${!business.is_active ? '<small class="text-danger"><i class="fas fa-exclamation-circle"></i> Xidmət dayandırılıb</small>' : ''}
                        ${(new Date(business.nextBillingDate) - new Date()) / (1000 * 60 * 60 * 24) <= 3 && business.is_active && !business.warningSent ? '<small class="text-warning"><i class="fas fa-exclamation-triangle"></i> Ödəniş vaxtı yaxınlaşır!</small>' : ''}
                    </div>
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
        const isAdminPanelVisible = this.currentUser && this.currentUser.role === 'superadmin';

        return `
            <div class="business-selection-container">
                <div class="business-selection-header">
                    <div class="brand-icon"><i class="fas fa-calculator"></i></div>
                    <h1>Biznes Seçimi</h1>
                    <p>Davam etmək üçün bir biznes (tenant) seçin${isAdminPanelVisible ? ' və ya admin panelinə daxil olun' : ''}.</p>
                </div>

                <div class="business-selection-tabs">
                    <button class="modern-tab-button active" data-tab="businesses">
                        <span class="tab-btn-icon"><i class="fas fa-building"></i></span>
                        <span class="tab-btn-label">Bizneslər</span>
                    </button>
                    ${isAdminPanelVisible ? `
                        <button class="modern-tab-button" data-tab="admin">
                            <span class="tab-btn-icon"><i class="fas fa-user-shield"></i></span>
                            <span class="tab-btn-label">Admin Panel</span>
                        </button>
                    ` : ''}
                </div>

                <div class="business-selection-content">
                    <div id="businessesTab" class="tab-content active">
                        <div class="businesses-grid">
                            ${this.getBusinessesListHTML()}
                        </div>
                    </div>
                    ${isAdminPanelVisible ? `
                        <div id="adminTab" class="tab-content">
                            ${this.getAdminPanelStructureHTML()}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getSuspendedAccountHTML(businessName) {
        return `
            <div class="suspended-account-container">
                <i class="fas fa-exclamation-triangle icon-large"></i>
                <h1>Xidmət Deaktivdir</h1>
                <p>Hörmətli müştəri, sizin <strong>${businessName}</strong> biznes hesabınızın ödəniş vaxtı keçmişdir və xidmətlər hazırda dayandırılmışdır.</p>
                <p>Xidmətlərdən yenidən istifadə etmək üçün ödənişinizi tamamlamağınızı xahiş edirik.</p>
                <div class="btn-group">
                    <button class="btn btn-primary btn-lg" onclick="app.navigateTo('contact')">
                        <i class="fas fa-headset"></i> Dəstək ilə Əlaqə
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="app.showBusinessSelection()">
                        <i class="fas fa-arrow-left"></i> Biznes Seçimə Qayıt
                    </button>
                </div>
            </div>
        `;
    }

    showSuspendedAccountMessage(businessName) {
        const appContainer = document.getElementById('appContainer');
        if (appContainer) {
            appContainer.innerHTML = this.getSuspendedAccountHTML(businessName);
            appContainer.style.display = 'block';
            document.getElementById('landingPage').style.display = 'none';
        }
    }

    initializeBusinessSelectionComponents() {
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

                tabContents.forEach(content => {
                    if (content.id === `${targetTab}Tab`) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });

                if (targetTab === 'admin') {
                    const adminTab = document.getElementById('adminTab');
                    adminTab.innerHTML = this.getAdminPanelStructureHTML();
                    this.initializeAdminNav(); 
                    this.loadAdminPanelData();
                }
            });
        });

        const initialActiveTab = document.querySelector('.business-selection-tabs .modern-tab-button.active');
        if (initialActiveTab && initialActiveTab.dataset.tab === 'admin') {
            const adminTab = document.getElementById('adminTab');
            adminTab.innerHTML = this.getAdminPanelStructureHTML();
            this.initializeAdminNav();
            this.loadAdminPanelData();
        }

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

    getAdminPanelStructureHTML() {
        return `
            <div class="admin-content">
                <div class="admin-navigation">
                    <button class="modern-admin-nav-button active" data-section="system-check">
                        <span class="tab-btn-icon"><i class="fas fa-heartbeat"></i></span>
                        <span class="tab-btn-label">Sistem Vəziyyəti</span>
                    </button>
                    <button class="modern-admin-nav-button" data-section="business-settings">
                        <span class="tab-btn-icon"><i class="fas fa-cogs"></i></span>
                        <span class="tab-btn-label">Platforma Parametrləri</span>
                    </button>
                    <button class="modern-admin-nav-button" data-section="landing-page-settings">
                        <span class="tab-btn-icon"><i class="fas fa-globe"></i></span>
                        <span class="tab-btn-label">Əsas Səhifə</span>
                    </button>
                    <button class="modern-admin-nav-button" data-section="contact-messages">
                        <span class="tab-btn-icon"><i class="fas fa-envelope-open-text"></i></span>
                        <span class="tab-btn-label">Əlaqə Mesajları</span>
                    </button>
                    <button class="modern-admin-nav-button" data-section="users">
                        <span class="tab-btn-icon"><i class="fas fa-users-cog"></i></span>
                        <span class="tab-btn-label">İstifadəçilər</span>
                    </button>
                    <button class="modern-admin-nav-button" data-section="tenants">
                        <span class="tab-btn-icon"><i class="fas fa-building"></i></span>
                        <span class="tab-btn-label">Tenantlar</span>
                    </button>
                </div>
                <div class="admin-sections">
                    <div id="system-check-section" class="admin-section active">
                        <div class="loading"><div class="spinner"></div><span>Sistem vəziyyəti yüklənir...</span></div>
                    </div>
                    <div id="admin-settings-section" class="admin-section">
                        <div class="loading"><div class="spinner"></div><span>Platforma parametrləri yüklənir...</span></div>
                    </div>
                    <div id="landing-page-settings-section" class="admin-section">
                        <div class="loading"><div class="spinner"></div><span>Əsas Səhifə parametrləri yüklənir...</span></div>
                    </div>
                    <div id="contact-messages-section" class="admin-section">
                        <div class="loading"><div class="spinner"></div><span>Əlaqə mesajları yüklənir...</span></div>
                    </div>
                    <div id="users-section" class="admin-section">
                        <div class="loading"><div class="spinner"></div><span>İstifadəçilər yüklənir...</span></div>
                    </div>
                    <div id="tenants-section" class="admin-section">
                        <div class="loading"><div class="spinner"></div><span>Tenantlar yüklənir...</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadAdminPanelData() {
        const systemCheckSection = document.getElementById('system-check-section');
        const adminSettingsSection = document.getElementById('admin-settings-section');
        const landingPageSettingsSection = document.getElementById('landing-page-settings-section');
        const contactMessagesSection = document.getElementById('contact-messages-section');
        const usersSection = document.getElementById('users-section');
        const tenantsSection = document.getElementById('tenants-section');

        try {
            const healthData = await this.fetchApiData('/health');
            if (systemCheckSection) {
                systemCheckSection.innerHTML = this.getSystemCheckHTML(healthData);
            }
            if (adminSettingsSection) {
                adminSettingsSection.innerHTML = await this.getAdminSettingsHTML(healthData);
            }
        } catch (error) {
            console.error("Failed to load admin panel dynamic data (health/admin settings):", error);
            if (systemCheckSection) {
                systemCheckSection.innerHTML = `<div class="error-message">Sistem vəziyyəti yoxlanılır...</div>`;
            }
            if (adminSettingsSection) {
                adminSettingsSection.innerHTML = `<div class="error-message">Platforma tənzimləmələri yoxlanılır...</div>`;
            }
        }

        if (landingPageSettingsSection) {
            landingPageSettingsSection.innerHTML = this.getLandingPageSettingsHTML(this.landingPageSettings);
        }
        if (contactMessagesSection) {
            contactMessagesSection.innerHTML = this.getContactMessagesHTML(this.contactMessages);
        }

        try {
            const usersData = await this.fetchApiData('/users'); 
            if (usersSection) {
                usersSection.innerHTML = this.getUsersAdminHTML(usersData);
            }
        } catch (error) {
            console.error("Failed to load users data:", error);
            if (usersSection) {
                usersSection.innerHTML = `<div class="error-message">İstifadəçi məlumatları yoxlanılır...</div>`;
            }
        }

        try {
            const tenantsData = await this.fetchApiData('/businesses'); 
            if (tenantsSection) {
                tenantsSection.innerHTML = this.getTenantsAdminHTML(tenantsData);
            }
        } catch (error) {
            console.error("Failed to load tenants data:", error);
            if (tenantsSection) {
                tenantsSection.innerHTML = `<div class="error-message">Tenant məlumatları yoxlanılır...</div>`;
            }
        }
    }

    getUsersAdminHTML(usersData) {
        if (!usersData) {
            return `<div class="loading"><div class="spinner"></div><span>İstifadəçilər yüklənir...</span></div>`;
        }
        const allUsers = usersData.users || []; 

        const displayedUsers = (this.currentUser?.role === 'superadmin')
            ? allUsers
            : allUsers.filter(user => user.businessId === this.currentTenant?.id);

        return `
            <h3>İstifadəçilər</h3>
            <p>Sistemdə qeydiyyatda olan istifadəçilərin siyahısı. ${this.currentUser?.role !== 'superadmin' ? '(Yalnız sizin biznesinizin istifadəçiləri)' : ''}</p>
            <div class="data-table-container">
                <table class="data-table" id="usersTable">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Rol</th>
                            ${this.currentUser?.role === 'superadmin' ? '<th>Biznes</th>' : ''}
                            <th>Status</th>
                            <th>Son Giriş</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${displayedUsers.length > 0 ? displayedUsers.map(user => `
                            <tr>
                                <td>${user.email}</td>
                                <td>${user.role}</td>
                                ${this.currentUser?.role === 'superadmin' ? `<td>${user.businessId || 'Global'}</td>` : ''}
                                <td>${user.is_active ? 'Aktiv' : 'Deaktiv'}</td>
                                <td>${user.last_login ? new Date(user.last_login).toLocaleString('az-AZ') : 'N/A'}</td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="${this.currentUser?.role === 'superadmin' ? '5' : '4'}" style="text-align: center;">İstifadəçi tapılmadı.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="app.showInfoNotification('İstifadəçi əlavə et funksiyası pending.')">
                    <i class="fas fa-plus"></i> Yeni İstifadəçi
                </button>
            </div>
        `;
    }

    getTenantsAdminHTML(tenantsData) {
        if (!tenantsData) {
            return `<div class="loading"><div class="spinner"></div><span>Tenantlar yüklənir...</span></div>`;
        }
        const tenants = tenantsData.businesses || []; 

        return `
            <h3>Tenantlar</h3>
            <p>Sistemdə qeydiyyatda olan biznes (tenant) siyahısı.</p>
            <div class="data-table-container">
                <table class="data-table" id="tenantsTable">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Plan</th>
                            <th>Növbəti Ödəniş</th>
                            <th>Aktivdir?</th>
                            <th>Xəbərdarlıq?</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tenants.length > 0 ? tenants.map(tenant => `
                            <tr>
                                <td>${tenant.name}</td>
                                <td>${tenant.plan}</td>
                                <td>${tenant.next_billing_date ? new Date(tenant.next_billing_date).toLocaleDateString('az-AZ') : 'N/A'}</td>
                                <td>${tenant.is_active ? 'Bəli' : 'Xeyr'}</td>
                                <td>${tenant.warning_sent ? 'Bəli' : 'Xeyr'}</td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="5" style="text-align: center;">Tenant tapılmadı.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="app.showInfoNotification('Tenant əlavə et funksiyası pending.')">
                    <i class="fas fa-plus"></i> Yeni Tenant
                </button>
            </div>
        `;
    }

    async getGlobalTelegramSettingsData() {
        try {
            const response = await this.fetchApiData('/admin/global-telegram-settings');
            return response;
        } catch (error) {
            console.error("Failed to load global Telegram settings:", error);
            return null;
        }
    }

    async getAdminSettingsHTML(healthData) {
        const globalTelegramSettings = await this.loadGlobalTelegramSettingsData();
        
        if (!healthData) { 
            return `
                <h3>Platforma Tənzimləmələri</h3>
                <div class="settings-grid">
                    <div class="setting-group">
                        <h4>Database Tənzimləmələri (Read-Only)</h4>
                        <div class="loading"><div class="spinner"></div><span>Məlumat yüklənir...</span></div>
                    </div>
                    <div class="setting-group">
                        <h4>Server Tənzimləmələri (Read-Only)</h4>
                        <div class="loading"><div class="spinner"></div><span>Məlumat yüklənir...</span></div>
                    </div>
                    ${await this.getGlobalTelegramSettingsHTML(globalTelegramSettings)}
                    <div class="setting-group">
                        <h4>WhatsApp İnteqrasiyası</h4>
                        <div class="loading"><div class="spinner"></div><span>Məlumat yüklənir...</span></div>
                    </div>
                </div>
            `;
        }
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
                                <span class="info-value">${healthData.uptime ? `${Math.floor(healthData.uptime / 3600)}saat ${Math.floor((healthData.uptime % 3600) / 60)}dəq` : 'Unknown'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Memory Used:</span>
                                <span class="info-value">${healthData.memory?.used || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                ${await this.getGlobalTelegramSettingsHTML(globalTelegramSettings)}
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
                                    <i class="fas fa-lock"></i> Yalnız Backenddən İdarə Edilir
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    getDefaultLandingPageSettings() {
        return {
            brandName: 'MühasibatlıqPro',
            brandBadge: 'v2.0',
            heroTitle: 'Müasir Mühasibatlıq və Biznes İdarəetməsi',
            heroSubtitle: 'React + TypeScript + PostgreSQL əsasında qurulmuş, Multi-tenant SaaS arxitekturası ilə professional mühasibatlıq həlli',
            contactPhone: '+994 12 123 45 67',
            contactEmail: 'info@muhasibatliqpro.az',
            contactTelegram: '@muhasibatliqpro_bot',
            pricingPlans: [
                { name: 'Başlanğıc', price: '₼99', features: ['1 Biznes (Tenant)', '5 İstifadəçi', 'POS Sistemi'] },
                { name: 'Professional', price: '₼299', features: ['5 Biznes (Tenant)', '25 İstifadəçi', 'Tam Mühasibatlıq'] },
                { name: 'Enterprise', price: '₼799', features: ['Limitsiz Biznes', 'Limitsiz İstifadəçi', 'White Label'] }
            ],
        };
    }

    getLandingPageSettingsHTML(settings) {
        return `
            <h3>Əsas Səhifə Parametrləri</h3>
            <p>Veb-saytın əsas səhifəsinin məzmununu və əlaqə məlumatlarını idarə edin.</p>
            <form id="landingPageSettingsForm" onsubmit="app.saveLandingPageSettings(event)">
                <div class="form-container">
                    <div class="form-section">
                        <h4>Ümumi Parametrlər</h4>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Brend Adı</label>
                                <input type="text" name="brandName" class="form-input" value="${settings.brandName}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Brend Versiyası (Badge)</label>
                                <input type="text" name="brandBadge" class="form-input" value="${settings.brandBadge}">
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h4>Hero Bölməsi</h4>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label class="form-label">Başlıq</label>
                                <textarea name="heroTitle" class="form-textarea" rows="2">${settings.heroTitle}</textarea>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Alt Başlıq</label>
                                <textarea name="heroSubtitle" class="form-textarea" rows="3">${settings.heroSubtitle}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h4>Əlaqə Məlumatları</h4>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Telefon</label>
                                <input type="tel" name="contactPhone" class="form-input" value="${settings.contactPhone}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" name="contactEmail" class="form-input" value="${settings.contactEmail}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Telegram İstifadəçi Adı</label>
                                <input type="text" name="contactTelegram" class="form-input" value="${settings.contactTelegram}">
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h4>Qiymət Planları (Redaktə üçün klikləyin)</h4>
                        ${settings.pricingPlans.map((plan, index) => `
                            <div class="setting-group" style="margin-bottom: var(--spacing-4);">
                                <h5>${plan.name} Plan</h5>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label class="form-label">Ad</label>
                                        <input type="text" name="pricingPlans[${index}].name" class="form-input" value="${plan.name}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Qiymət</label>
                                        <input type="text" name="pricingPlans[${index}].price" class="form-input" value="${plan.price}">
                                    </div>
                                    <div class="form-group full-width">
                                        <label class="form-label">Xüsusiyyətlər (hər sətir yeni xüsusiyyət)</label>
                                        <textarea name="pricingPlans[${index}].features" class="form-textarea" rows="3">${plan.features.join('\n')}</textarea>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Dəyişiklikləri Yadda Saxla
                        </button>
                    </div>
                </div>
            </form>
        `;
    }

    saveLandingPageSettings(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const newSettings = {};

        newSettings.brandName = formData.get('brandName');
        newSettings.brandBadge = formData.get('brandBadge');
        newSettings.heroTitle = formData.get('heroTitle');
        newSettings.heroSubtitle = formData.get('heroSubtitle');
        newSettings.contactPhone = formData.get('contactPhone');
        newSettings.contactEmail = formData.get('contactEmail');
        newSettings.contactTelegram = formData.get('contactTelegram');

        newSettings.pricingPlans = [];
        const planCount = this.landingPageSettings.pricingPlans.length; 
        for (let i = 0; i < planCount; i++) {
            newSettings.pricingPlans.push({
                name: formData.get(`pricingPlans[${i}].name`),
                price: formData.get(`pricingPlans[${i}].price`),
                features: formData.get(`pricingPlans[${i}].features`).split('\n').map(f => f.trim()).filter(f => f !== '')
            });
        }

        this.landingPageSettings = { ...this.landingPageSettings, ...newSettings };
        this.showSuccessNotification('Əsas səhifə parametrləri uğurla yadda saxlanıldı!');
        console.log('Updated Landing Page Settings:', this.landingPageSettings);
    }

    getMockContactMessages() {
        return [
            {
                id: 'msg-001',
                name: 'Vüqar Məmmədov',
                company: 'Vüqar MMC',
                email: 'v.memmedov@email.com',
                message: 'Platformanız haqqında ətraflı məlumat almaq istəyirəm. Zəhmət olmasa, mənə zəng edin.',
                date: '2024-03-01 10:30',
                status: 'new'
            },
            {
                id: 'msg-002',
                name: 'Nigar Rüstəmova',
                company: 'Happy Kids',
                email: 'nigar@happykids.az',
                message: 'POS sistemi barədə demo görmək istəyirik. Nə vaxt görüş təyin edə bilərik?',
                date: '2024-02-28 15:00',
                status: 'read'
            },
            {
                id: 'msg-003',
                name: 'Elvin Əliyev',
                company: '',
                email: 'elvin.aliyev@mail.ru',
                message: 'Qiymət planlarınız haqqında sualım var. Enterprise planı üçün əlavə detallar varmı?',
                date: '2024-02-25 09:00',
                status: 'new'
            }
        ];
    }

    getContactMessagesHTML(messages) {
        return `
            <h3>Əlaqə Mesajları</h3>
            <p>İstifadəçilər tərəfindən göndərilmiş əlaqə mesajlarına baxın.</p>
            <div class="data-table-container">
                <table class="data-table" id="contactMessagesTable">
                    <thead>
                        <tr>
                            <th>Ad Soyad</th>
                            <th>Şirkət</th>
                            <th>Email</th>
                            <th>Tarix</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${messages.length > 0 ? messages.map(msg => `
                            <tr class="${msg.status === 'new' ? 'font-bold' : ''}">
                                <td>${msg.name}</td>
                                <td>${msg.company || 'Yoxdur'}</td>
                                <td>${msg.email}</td>
                                <td>${msg.date}</td>
                                <td><span class="status-badge ${msg.status === 'new' ? 'warning' : 'info'}">${msg.status === 'new' ? 'Yeni' : 'Oxundu'}</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-ghost btn-sm" onclick="app.viewContactMessage('${msg.id}')" title="Görüntülə"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-ghost btn-sm" onclick="app.markContactMessageStatus('${msg.id}', '${msg.status === 'new' ? 'read' : 'new'}')" title="${msg.status === 'new' ? 'Oxundu olaraq işarələ' : 'Yeni olaraq işarələ'}"><i class="fas fa-envelope-${msg.status === 'new' ? 'open' : 'circle'}"></i></button>
                                        <button class="btn btn-ghost btn-sm" onclick="app.deleteContactMessage('${msg.id}')" title="Sil"><i class="fas fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="6" style="text-align: center;">Yeni mesaj yoxdur.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        `;
    }

    viewContactMessage(messageId) {
        const message = this.contactMessages.find(msg => msg.id === messageId);
        if (message) {
            this.showInfoNotification(`Mesaj: ${message.message}`, {
                title: `Mesaj: ${message.name} (${message.email})`,
                duration: 0, 
                persistent: true,
                actions: [
                    { label: 'Oxundu olaraq işarələ', handler: () => this.markContactMessageStatus(message.id, 'read', false) },
                    { label: 'Bağla', handler: (notification) => app.dismissNotification(notification) }
                ]
            });
            this.markContactMessageStatus(messageId, 'read');
        } else {
            this.showErrorNotification('Mesaj tapılmadı.');
        }
    }

    markContactMessageStatus(messageId, newStatus, reload = true) {
        const index = this.contactMessages.findIndex(msg => msg.id === messageId);
        if (index > -1) {
            this.contactMessages[index].status = newStatus;
            this.showSuccessNotification(`Mesaj "${newStatus === 'read' ? 'oxundu' : 'yeni'}" olaraq işarələndi.`);
            if (reload) {
                this.loadAdminPanelData(); 
            }
        } else {
            this.showErrorNotification('Mesaj tapılmadı.');
        }
    }

    deleteContactMessage(messageId) {
        if (confirm('Bu mesajı silmək istədiyinizə əminsiniz?')) {
            this.contactMessages = this.contactMessages.filter(msg => msg.id !== messageId);
            this.showSuccessNotification('Mesaj uğurla silindi.');
            this.loadAdminPanelData(); 
        }
    }

    submitContactForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const newMessage = {
            id: `msg-${String(Date.now()).slice(-4)}`,
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toLocaleString('az-AZ'),
            status: 'new'
        };

        this.contactMessages.unshift(newMessage); 
        this.showSuccessNotification('Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq!');
        form.reset(); 
        console.log('New contact message received:', newMessage);
    }

    async loadMainApplication() {
        const appContainer = document.getElementById('appContainer');
        if (!appContainer) return;

        appContainer.innerHTML = this.getMainApplicationHTML();

        this.initializeApplicationComponents();
        this.updateFirebaseStatusIcon(); 
        this.navigateTo('dashboard');

        console.log('Main application loaded');
    }

    getSidebarHTML() {
        const currentUserRole = this.currentUser?.role;

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
                    <li class="sidebar-item" data-module="sales-history">
                        <i class="fas fa-history"></i>
                        <span>Satış Tarixçəsi</span>
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
                    <li class="sidebar-item" data-module="production">
                        <i class="fas fa-industry"></i>
                        <span>İstehsalat</span>
                    </li>
                     <li class="sidebar-item" data-module="production-orders">
                        <i class="fas fa-industry"></i>
                        <span>İstehsalat Sifarişləri</span>
                    </li>
                    <li class="sidebar-item" data-module="bom">
                        <i class="fas fa-sitemap"></i>
                        <span>Texnoloji Xəritələr (BOM)</span>
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
                    <li class="sidebar-item" data-module="depreciation">
                        <i class="fas fa-calculator"></i>
                        <span>Köhnəlmə</span>
                    </li>
                    <li class="sidebar-item" data-module="amortization">
                        <i class="fas fa-chart-area"></i>
                        <span>Amortizasiya</span>
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
                    <li class="sidebar-item" data-module="direct-correspondence">
                        <i class="fas fa-comment-dollar"></i>
                        <span>Birbaşa Müxabirləşmələr</span>
                    </li>
                    <li class="sidebar-item" data-module="correspondence-accounts">
                        <i class="fas fa-handshake"></i>
                        <span>Müxabirləşmə Hesabları</span>
                    </li>
                    <li class="sidebar-item" data-module="income-expense">
                        <i class="fas fa-exchange-alt"></i>
                        <span>Mədaxil & Məxaric</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="reports">
                <h3 class="sidebar-title">
                    <span>Hesabatlar</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="financial-reports">
                        <i class="fas fa-chart-bar"></i>
                        <span>Maliyyə Hesabatları</span>
                    </li>
                    <li class="sidebar-item" data-module="profit-loss">
                        <i class="fas fa-chart-pie"></i>
                        <span>Mənfəət & Zərər</span>
                    </li>
                    <li class="sidebar-item" data-module="balance-sheet">
                        <i class="fas fa-balance-scale"></i>
                        <span>Balans Hesabatı</span>
                    </li>
                    <li class="sidebar-item" data-module="tax-reports">
                        <i class="fas fa-percent"></i>
                        <span>Vergi Hesabatları</span>
                    </li>
                    <li class="sidebar-item" data-module="custom-reports">
                        <i class="fas fa-file-alt"></i>
                        <span>Xüsusi Hesabatlar</span>
                    </li>
                    <li class="sidebar-item" data-module="analytics">
                        <i class="fas fa-chart-area"></i>
                        <span>Analitika & İdarəetmə</span>
                    </li>
                    <li class="sidebar-item" data-module="budget-planning">
                        <i class="fas fa-money-check-alt"></i>
                        <span>Büdcə & Planlama</span>
                    </li>
                    <li class="sidebar-item" data-module="technical-reports">
                        <i class="fas fa-file-invoice"></i>
                        <span>Texniki Hesabatlar</span>
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

            <div class="sidebar-section" data-section="documents-templates">
                <h3 class="sidebar-title">
                    <span>Sənədlər & Şablonlar</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="documents">
                        <i class="fas fa-folder-open"></i>
                        <span>Sənədlər</span>
                    </li>
                    <li class="sidebar-item" data-module="folders">
                        <i class="fas fa-folder"></i>
                        <span>Qovluqlar</span>
                    </li>
                    <li class="sidebar-item" data-module="templates">
                        <i class="fas fa-file-invoice"></i>
                        <span>Şablonlar</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-section" data-section="integrations">
                <h3 class="sidebar-title">
                    <span>İnteqrasiyalar</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </h3>
                <ul class="sidebar-menu">
                    <li class="sidebar-item" data-module="api">
                        <i class="fas fa-key"></i>
                        <span>API İdarəetməsi</span>
                    </li>
                    <li class="sidebar-item" data-module="telegram">
                        <i class="fab fa-telegram-plane"></i>
                        <span>Telegram Botu</span>
                    </li>
                    <li class="sidebar-item" data-module="pos-settings">
                        <i class="fas fa-cogs"></i>
                        <span>POS Tənzimləmələri</span>
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
                    <li class="sidebar-item" data-module="users">
                        <i class="fas fa-users"></i>
                        <span>İstifadəçilər</span>
                    </li>
                    <li class="sidebar-item" data-module="tenants" data-roles="superadmin">
                        <i class="fas fa-building"></i>
                        <span>Tenantlar</span>
                    </li>
                </ul>
            </div>
        `;
    }

    getMainApplicationHTML() {
        const tenantName = this.currentTenant ? this.currentTenant.name : 'Müəssisə';
        const sidebarHTML = this.getSidebarHTML();

        const bottomNavModules = [
            { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Panel' },
            { id: 'sales-invoices', icon: 'fas fa-file-invoice-dollar', label: 'Satış' },
            { id: 'purchase-invoices', icon: 'fas fa-receipt', label: 'Alış' },
            { id: 'products', icon: 'fas fa-box', label: 'Məhsul' },
            { id: 'cash-accounts', icon: 'fas fa-cash-register', label: 'Kassa' },
            { id: 'journal-entries', icon: 'fas fa-book', label: 'Jurnal' },
            { id: 'pos', icon: 'fas fa-cash-register', label: 'POS' },
            { id: 'employees', icon: 'fas fa-user-friends', label: 'Kadrlar' },
            { id: 'chart-of-accounts', icon: 'fas fa-sitemap', label: 'Hesablar' },
            { id: 'warehouse', icon: 'fas fa-warehouse', label: 'Anbar' },
            { id: 'financial-reports', icon: 'fas fa-chart-line', label: 'Hesabat' },
            { id: 'tax-reports', icon: 'fas fa-percent', label: 'Vergi' },
            { id: 'business-settings', icon: 'fas fa-cogs', label: 'Parametr' },
            ...(this.currentUser?.role === 'superadmin' ? [{ id: 'tenants', icon: 'fas fa-building', label: 'Tenantlar' }] : [])
        ];

        const bottomNavHTML = `
            <nav class="bottom-nav-bar no-print" id="bottomNavBar">
                ${bottomNavModules.map(module => `
                    <a href="#" class="bottom-nav-item" data-module="${module.id}">
                        <i class="${module.icon}"></i>
                        <span>${module.label}</span>
                    </a>
                `).join('')}
            </nav>
        `;

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
                ${bottomNavHTML}
                <div class="mobile-menu-overlay" id="appMobileMenuOverlay"></div>
            </div>
        `;
    }

    async handleEntityOp(moduleName, action, id = null, extraData = {}) {
        console.log(`Handling entity operation: Module=${moduleName}, Action=${action}, ID=${id}, ExtraData=`, extraData);

        if (moduleName === 'tenants' && this.currentUser?.role !== 'superadmin') {
            this.showErrorNotification('Bu modul üçün icazəniz yoxdur. Yalnız SuperAdmin baxa bilər.', { title: 'İcazə Xətası' });
            return;
        }

        if (['create', 'view', 'edit'].includes(action)) {
            if (moduleName === 'chart-of-accounts' && extraData.isSubAccount) {
                this.navigateToForm(moduleName, action, id, true, extraData.parentId);
            } else {
                this.navigateToForm(moduleName, action, id);
            }
            return;
        }

        if (moduleName === 'sales-invoices' && action === 'import') {
            this.initiateFileImport('sales-invoices');
            return;
        }

        if (moduleName === 'cash-accounts' && action === 'transfer') {
            this.openTransferModal();
            return;
        }

        if (moduleName === 'warehouse' && action === 'transfer') {
            this.openWarehouseTransferModal();
            return;
        }

        if (moduleName === 'tenants') {
            if (action === 'activate') {
                this.showInfoNotification(`Tenant "${id}" aktivləşdirilir...`, { duration: 1500 });
            } else if (action === 'confirm-payment') {
                this.showInfoNotification(`Tenant "${id}" üçün ödəniş təsdiqlənir...`, { duration: 1500 });
            }
            return;
        }

        const actionMessages = {
            'print': 'Çap əməliyyatı',
            'download': 'Yükləmə əməliyyatı',
            'send-reminder': 'Xatırlatma göndərmə əməliyyatı',
            'convert': 'Çevirmə əməliyyatı',
            'archive': 'Arxivləşdirmə əməliyyatı',
            'pay': 'Ödəniş əməliyyatı',
            'negotiate': 'Müzakirə əməliyyatı',
            'sign': 'İmzalanma əməliyyatı',
            'renew': 'Yenilənmə əməliyyatı',
            'terminate': 'Ləğv etmə əməliyyatı',
            'approve': 'Təsdiqləmə əməliyyatı',
            'reject': 'Rədd etmə əməliyyatı',
            'duplicate': 'Dublikat yaratma əməliyyatı',
            'send-notice': 'Bildiriş göndərmə əməliyyatı',
            'collection': 'Borc yığma əməliyyatı',
            'bulk-send': 'Toplu göndərmə əməliyyatı',
            'bulk-convert': 'Toplu çevirmə əməliyyatı',
            'bulk-export': 'Toplu export əməliyyatı',
            'bulk-reminder': 'Toplu xatırlatma əməliyyatı',
            'bulk-archive': 'Toplu arxivləşdirmə əməliyyatı',
            'bulk-approve': 'Toplu təsdiqləmə əməliyyatı',
            'bulk-refund': 'Toplu geri ödəmə əməliyyatı',
            'bulk-start': 'Toplu başlatma əməliyyatı',
            'bulk-complete': 'Toplu tamamlama əməliyyatı',
            'bulk-inventory': 'Toplu inventarizasiya əməliyyatı',
            'bulk-report': 'Toplu hesabat əməliyyatı',
            'bulk-balance': 'Toplu balans yeniləmə əməliyyatı',
            'bulk-print': 'Toplu çap əməliyyatı',
            'bulk-activate': 'Toplu aktivləşdirmə əməliyyatı',
            'bulk-deactivate': 'Toplu deaktiv etmə əməliyyatı',
            'bulk-delete': 'Toplu silmə əməliyyatı',
            'export': 'Export əməliyyatı',
            'transfer': 'Transfer əməliyyatı', 
            'transactions': 'Əməliyyatları göstər', 
            'chart-line': 'Qrafiki göstər',
            'file-contract': 'Müqaviləni göstər',
            'sync': 'Yenilə',
            'warning': 'Xəbərdarlıq',
            'play': 'Başlat',
            'cog': 'Tənzimləmələr',
            'check': 'Yoxla',
            'sign-out-alt': 'Çıxış qeyd et',
            'calendar': 'Təqvim',
            'comment': 'Şərh əlavə et',
            'export-audit-data': 'Audit data exportu'
        };

        const message = actionMessages[action] ? `${actionMessages[action]} icra edildi.` : `Bilinməyən əməliyyat: ${action}`;
        this.showInfoNotification(message);
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
                parentData = this.getSampleData(module, parentId);
                if (!parentData || Object.keys(parentData).length === 0) {
                    parentData = {
                        id: parentId,
                        code: parentId,
                        name: `Hesab ${parentId}`
                    };
                }
                if (id) {
                    data = this.getSampleData(module, id);
                }
                html = moduleObj.getSubAccountFormHTML(action, parentData, data);
            } else {
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
                is_active: true,
                nextBillingDate: '2024-04-20',
                warningSent: false,
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
                is_active: true,
                nextBillingDate: '2024-03-25', 
                warningSent: false,
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
                is_active: false, 
                nextBillingDate: '2024-02-01', 
                warningSent: true, 
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
                    paymentTerms: '30 gün'
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
                    businessId: 'abc-company' 
                },
                user2: {
                    id: 'user2',
                    firstName: 'Leyla',
                    lastName: 'Həsənova',
                    email: 'l.hasanova@example.com',
                    phone: '+994 50 123 45 67',
                    role: 'admin',
                    businessId: 'abc-company'
                },
                user3: {
                    id: 'user3',
                    firstName: 'Elşən',
                    lastName: 'Məmmədli',
                    email: 'e.mammadli@example.com',
                    phone: '+994 55 987 65 43',
                    role: 'operator',
                    businessId: 'abc-company'
                },
                user4: { 
                    id: 'user4',
                    firstName: 'Vüqar',
                    lastName: 'Abbasov',
                    email: 'v.abbasov@xyz.com',
                    phone: '+994 70 555 44 33',
                    role: 'admin',
                    businessId: 'xyz-holdings'
                },
                user5: { 
                    id: 'user5',
                    firstName: 'Aynur',
                    lastName: 'Nəsibova',
                    email: 'a.nesibova@xyz.com',
                    phone: '+994 77 123 12 12',
                    role: 'user',
                    businessId: 'xyz-holdings'
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
                    type: 'vat',
                    period: '2024-01',
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
                    period: '2024-01',
                    generatedDate: '2024-02-22',
                    status: 'ready',
                    type: 'profit-loss',
                    notes: 'Aylıq Mənfəət və Zərər Hesabatı.'
                }
            },
            'balance-sheet': {
                bs1: {
                    id: 'BAL-2024-001',
                    reportNumber: 'BAL-2024-001',
                    name: 'Balans Hesabatı',
                    period: '2024-01',
                    generatedDate: '2024-02-22',
                    status: 'ready',
                    notes: 'Aylıq Balans Hesabatı.'
                }
            },
            'profit-loss': {
                pl1: {
                    id: 'PL-2024-001',
                    reportNumber: 'PL-2024-001',
                    name: 'Mənfəət və Zərər Hesabatı',
                    period: '2024-01',
                    generatedDate: '2024-02-22',
                    status: 'ready',
                    notes: 'Aylıq Mənfəət və Zərər Hesabatı.'
                }
            },
            'technical-reports': {
                techrep1: {
                    id: 'TECH-2024-001',
                    reportId: 'TECH-2024-001',
                    name: 'Konsolidasiya Balansı',
                    type: 'consolidated',
                    period: '2023-12',
                    generatedDate: '2024-01-15',
                    status: 'ready',
                    notes: 'Qrup şirkətləri üçün konsolidasiya edilmiş balans hesabatı.'
                }
            },
            'budget-planning': {
                bud1: {
                    id: 'BGT-2024-001',
                    budgetId: 'BGT-2024-001',
                    name: 'Yanvar 2024 Büdcəsi',
                    period: '2024-01',
                    type: 'monthly',
                    plannedRevenue: 50000,
                    plannedExpense: 30000,
                    notes: 'Yanvar ayı üçün əməliyyat büdcəsi.'
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

    async submitForm(event, module, action, id, isSubAccount = false, parentId = null) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        let data = Object.fromEntries(formData);

        if (module === 'sales-invoices' || module === 'sales-offers' || module === 'purchase-invoices' || module === 'purchase-offers') {
            data.items = this.getInvoiceItems(formData);
        } else if (module === 'journal-entries') {
            data.entries = this.getJournalEntriesFromForm(formData);
        } else if (module === 'bom') {
            data.components = this.getBomItemsFromForm(formData);
        } else if (module === 'chart-of-accounts' && !isSubAccount) {
            if (action === 'create') {
                data.code = this.coaFormData.selectedAccountCode || data.code;
                data.name = this.coaFormData.selectedAccountName || data.name;
                data.accountType = this.coaFormData.selectedAccountType || 'Unknown';
                delete data.section;
                delete data.article;
                delete data.account;
            }
        }

        if (id) {
            data.id = id;
        } else {
            data.id = `${module.toUpperCase().replace('-', '_')}-${String(Date.now()).slice(-6)}`;
        }

        if (isSubAccount && parentId) {
            data.parentId = parentId;
            data.code = `${parentId}.${String(Date.now()).slice(-3)}`;
        }

        this._createOrUpdateEntity(module, action, data);
    }

    async _createOrUpdateEntity(module, action, data) {
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
                const tenantId = this.currentTenant?.id || 'unknown_tenant';
                const collectionPath = `tenants/${tenantId}/${module}`;

                const docData = {
                    ...data,
                    _localAction: action, 
                    _localId: data.id, 
                    _timestamp: serverTimestamp(), 
                    _tenantId: tenantId,
                    _userId: this.currentUser?.id || 'unknown_user'
                };

                const docRef = await addDoc(collection(this.firebaseDb, collectionPath), docData);
                console.log(`Document for ${module} (${action}) written to Firebase with ID: ${docRef.id} in collection: ${collectionPath}`);
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

        const mobileMenuToggle = document.getElementById('mobileMenuToggle'); 
        const appSidebar = document.getElementById('appSidebar'); 
        const appMobileMenuOverlay = document.getElementById('appMobileMenuOverlay'); 

        if (mobileMenuToggle && appSidebar && appMobileMenuOverlay) {
            mobileMenuToggle.addEventListener('click', () => this.toggleAppMobileMenu());
            appMobileMenuOverlay.addEventListener('click', () => this.closeAppMobileMenu());
        }

        document.querySelectorAll('#bottomNavBar .bottom-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault(); 
                const module = e.currentTarget.dataset.module;
                if (module) {
                    this.navigateTo(module);
                }
            });
        });

        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const module = e.currentTarget.dataset.module;
                if (module) {
                    this.navigateTo(module);
                    this.closeAppMobileMenu(); 
                }
            });
        });

        const currentUserRole = this.currentUser?.role;
        document.querySelectorAll('.app-sidebar .sidebar-item').forEach(item => {
            const requiredRoles = item.dataset.roles; 
            if (requiredRoles) {
                const rolesArray = requiredRoles.split(',').map(r => r.trim());
                if (!rolesArray.includes(currentUserRole)) {
                    item.style.display = 'none'; 
                }
            }
        });

        if (this.currentModule) {
            this.updateBottomNavActiveState(this.currentModule);
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
            const token = localStorage.getItem('auth_token'); 
            if (token) {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`
                };
            }
            if (this.currentTenant && this.currentUser?.role !== 'superadmin') {
                 options.headers = {
                    ...options.headers,
                    'X-Tenant-ID': this.currentTenant.id
                };
            } else if (this.currentUser?.role === 'superadmin' && this.currentTenant === null) {
                options.headers = {
                    ...options.headers,
                    'X-Tenant-ID': 'global' 
                };
            }

            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, options);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                console.warn(`API endpoint ${endpoint} returned ${response.status}:`, errorData);
                this.showErrorNotification(`API Xətası (${response.status}): ${errorData.message || 'Bilinməyən xəta'}`, {
                    title: 'API Sorğu Xətası'
                });
                return null;
            }
            return response.json();
        }
        catch (error) {
            console.warn(`API fetch error for ${endpoint}:`, error.message);
            this.showErrorNotification(`API bağlantısı qurulmadı: ${error.message}`, {
                title: 'Bağlantı Xətası'
            });
            return null;
        }
    }

    updateBottomNavActiveState(moduleId) {
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            if (item.dataset.module === moduleId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    toggleAppMobileMenu() {
        const appSidebar = document.getElementById('appSidebar');
        const appMobileMenuOverlay = document.getElementById('appMobileMenuOverlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (appSidebar && appMobileMenuOverlay && mobileMenuToggle) {
            appSidebar.classList.toggle('open');
            appMobileMenuOverlay.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); 
        }
    }

    closeAppMobileMenu() {
        const appSidebar = document.getElementById('appSidebar');
        const appMobileMenuOverlay = document.getElementById('appMobileMenuOverlay');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (appSidebar && appMobileMenuOverlay && mobileMenuToggle) {
            appSidebar.classList.remove('open');
            appMobileMenuOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active'); 
        }
    }

    async initiateFileImport(moduleName) {
        if (!['sales-invoices', 'purchase-invoices'].includes(moduleName)) {
            this.showErrorNotification(`"${moduleName}" modulu üçün import dəstəklənmir.`);
            return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xml,.html,.txt'; 
        input.style.display = 'none';
        document.body.appendChild(input);

        input.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) {
                this.showWarningNotification('Fayl seçilmədi.');
                document.body.removeChild(input);
                return;
            }

            this.showInfoNotification(`"${file.name}" faylı yüklənir...`);

            try {
                const fileContent = await this._readFileAsText(file);
                await this.processImportedFile(moduleName, fileContent, file.name);
                document.body.removeChild(input);
            } catch (error) {
                console.error('Fayl oxuma xətası:', error);
                this.showErrorNotification(`Faylı oxuyarkən xəta: ${error.message}`);
                document.body.removeChild(input);
            }
        });

        input.click(); 
    }

    _readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('FileReader error: ' + e.target.error));
            reader.readAsText(file);
        });
    }

    async processImportedFile(moduleName, fileContent, fileName) {
        console.log(`Processing imported file for ${moduleName}:`, fileName, fileContent.substring(0, 100)); 

        if (moduleName === 'sales-invoices') {
            try {
                const simulatedInvoiceData = this._simulateInvoiceParsing(fileContent, fileName);

                const mockFormEvent = {
                    preventDefault: () => {},
                    target: {
                        elements: {} 
                    }
                };

                const formData = new FormData();
                formData.append('invoiceNumber', simulatedInvoiceData.invoiceNumber);
                formData.append('date', simulatedInvoiceData.date);
                formData.append('dueDate', simulatedInvoiceData.dueDate);
                formData.append('customerId', simulatedInvoiceData.customerId);
                formData.append('paymentMethod', simulatedInvoiceData.paymentMethod);
                formData.append('status', simulatedInvoiceData.status);
                formData.append('notes', simulatedInvoiceData.notes);

                simulatedInvoiceData.items.forEach((item, index) => {
                    formData.append(`productId[]`, item.productId);
                    formData.append(`quantity[]`, item.quantity);
                    formData.append(`unitPrice[]`, item.unitPrice);
                    formData.append(`discount[]`, item.discount);
                    formData.append(`taxRate[]`, item.taxRate);
                });

                Object.defineProperty(mockFormEvent.target, 'elements', {
                    get: () => {
                        const elements = {};
                        for (const [key, value] of formData.entries()) {
                            if (key.endsWith('[]')) {
                                const baseKey = key.slice(0, -2);
                                if (!elements[baseKey]) elements[baseKey] = [];
                                elements[baseKey].push({ value: value });
                            } else {
                                elements[key] = { value: value };
                            }
                        }
                        return elements;
                    }
                });

                const originalFormData = window.FormData;
                window.FormData = function(formElement) {
                    if (formElement === mockFormEvent.target) {
                        return formData;
                    }
                    return new originalFormData(formElement);
                };

                await this.submitForm(mockFormEvent, moduleName, 'create', null);

                window.FormData = originalFormData;

                this.showSuccessNotification(`"${fileName}" faylından yeni satış fakturası uğurla import edildi!`);
            } catch (error) {
                console.error('Import process failed:', error);
                this.showErrorNotification(`Faktura importu zamanı xəta: ${error.message}`);
            }
        } else {
            this.showWarningNotification(`Import funksiyası "${moduleName}" modulu üçün tam tətbiq edilməyib.`);
        }
    }

    _simulateInvoiceParsing(fileContent, fileName) {
        const invoiceNumberMatch = fileContent.match(/<invoiceNumber>(.*?)<\/invoiceNumber>/);
        const customerNameMatch = fileContent.match(/<customerName>(.*?)<\/customerName>/);

        const currentTimestamp = Date.now();
        const date = new Date().toISOString().split('T')[0];
        const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; 

        return {
            invoiceNumber: invoiceNumberMatch ? invoiceNumberMatch[1] : `IMPORTED-${String(currentTimestamp).slice(-6)}`,
            date: date,
            dueDate: dueDate,
            customerId: 'cust1', 
            paymentMethod: 'bank_transfer',
            status: 'sent',
            notes: `Fayldan import edildi: ${fileName}`,
            items: [
                {
                    productId: 'prod1', 
                    quantity: 1,
                    unitPrice: 1200,
                    discount: 0,
                    taxRate: 18
                },
                {
                    productId: 'prod2', 
                    quantity: 2,
                    unitPrice: 45,
                    discount: 0,
                    taxRate: 18
                }
            ]
        };
    }

    getEntityName(moduleName) {
        const names = {
            'documents': 'Sənəd',
            'custom-reports': 'Xüsusi Hesabat',
            'capital-accounts': 'Kapital Hesabı Əməliyyatı',
            'dashboard': 'Panel',
            'production': 'İstehsalat Sifarişi',
            'pos': 'POS Satış',
            'balance-sheet': 'Balans Hesabatı',
            'analytics': 'Analitika',
            'api': 'API Ayarı',
            'telegram': 'Telegram Bot Ayarı',
            'tenants': 'Tenant (Biznes)',
            'employees': 'İşçi',
            'sales-offers': 'Satış Təklifi',
            'transfers': 'Köçürmə',
            'debit-notes': 'Debit Not',
            'direct-correspondence': 'Birbaşa Müxabirləşmə',
            'templates': 'Şablon',
            'suppliers': 'Təchizatçı',
            'depreciation': 'Köhnəlmə Hesablaması',
            'amortization': 'Amortizasiya Qeydi',
            'production-orders': 'İstehsalat Sifarişi',
            'inventory': 'Stok Hərəkəti',
            'purchase-invoices': 'Alış Fakturası',
            'bom': 'Texnoloji Xəritə',
            'credit-notes': 'Kredit Not',
            'purchase-offers': 'Alış Təklifi',
            'journal-entries': 'Jurnal Yazılışı',
            'payroll': 'Əmək Haqqı',
            'contracts': 'Müqavilə',
            'intangible-assets': 'Qeyri-Maddi Aktiv',
            'warehouse': 'Anbar',
            'cash-accounts': 'Kassa/Bank Hesabı',
            'investments': 'İnvestisiya Layihəsi',
            'financial-reports': 'Maliyyə Hesabatı',
            'users': 'İstifadəçi',
            'chart-of-accounts': 'Hesab',
            'sales-invoices': 'Satış Fakturası',
            'products': 'Məhsul',
            'customers': 'Müştəri',
            'sales-history': 'Satış Qeydi',
            'pos-settings': 'POS Tənzimləməsi',
            'attendance': 'Davamiyyət Qeydiyyatı',
            'tax-reports': 'Vergi Hesabatı',
            'correspondence-accounts': 'Müxabirləşmə Hesabı',
            'profit-loss': 'Mənfəət & Zərər Hesabatı',
            'folders': 'Qovluq',
            'fixed-assets': 'Əsas Vəsait',
            'income-expense': 'Mədaxil/Məxaric Qeydi',
            'technical-reports': 'Texniki Hesabat',
            'budget-planning': 'Büdcə Planı',
        };
        return names[moduleName] || 'Obyekt';
    }

    setupFirebaseAuthStateListener() {
        if (!this.firebaseAuth) {
            console.error("Firebase Auth not initialized. Cannot set up auth state listener.");
            return;
        }

        onAuthStateChanged(this.firebaseAuth, (user) => {
            if (user) {
                this.postFirebaseLoginSetup(user);
            } else {
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
        let userRole = 'user';
        if (firebaseUser.email === 'r.bagrv1@gmail.com') {
            userRole = 'superadmin';
        } else if (firebaseUser.email.endsWith('@admin.com')) { 
            userRole = 'admin';
        }

        this.currentUser = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            role: userRole, 
            permissions: ['all'], 
            firstName: firebaseUser.displayName || 'Demo',
            lastName: '', 
            phone: firebaseUser.phoneNumber || '',
        };

        const demoTenantData = {
            id: 'demo-biznes',
            name: 'Demo Biznes',
            domain: 'demo.muhasibatliqpro.az',
            plan: 'basic',
            is_active: false, 
            nextBillingDate: '2024-02-01', 
            warningSent: true,
        };
        this.currentTenant = (this.currentUser?.role === 'superadmin') ? null : demoTenantData;

        if (this.currentTenant) { 
            if (!this.allBusinessSettings.has(this.currentTenant.id)) {
                this.allBusinessSettings.set(this.currentTenant.id, this.getDefaultBusinessSettings(this.currentTenant.id));
            }
            this.currentBusinessSettings = this.allBusinessSettings.get(this.currentTenant.id);
            this.currentBusinessSettings.is_active = this.currentTenant.is_active;
            this.currentBusinessSettings.nextBillingDate = this.currentTenant.nextBillingDate;
            this.currentBusinessSettings.warningSent = this.currentTenant.warningSent;
        } else {
             this.currentBusinessSettings = this.getDefaultBusinessSettings('global_admin');
        }

        localStorage.setItem('auth_token', `firebase_token_${firebaseUser.uid}`); 
        localStorage.setItem('current_user', JSON.stringify(this.currentUser));

        console.log('User logged in via Firebase:', this.currentUser.email, 'with role:', this.currentUser.role, 'and tenant:', this.currentTenant?.name || 'N/A (SuperAdmin)');
        this.showBusinessSelection(); 
    }

    async navigateTo(moduleId) {
        if (!moduleId) return;

        const sidebarItem = document.querySelector(`.sidebar-item[data-module="${moduleId}"]`);
        const requiredRole = sidebarItem ? sidebarItem.dataset.roles : null;

        if (requiredRole && this.currentUser?.role !== requiredRole) {
            this.showErrorNotification('Bu modul üçün icazəniz yoxdur. Yalnız SuperAdmin baxa bilər.', { title: 'İcazə Xətası' });
            return;
        }

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

        this.updateBottomNavActiveState(moduleId);

        this.currentModule = moduleId;

        try {
            const module = await this.loadModule(moduleId);
            if (module && typeof module.getHTML === 'function') {
                const html = module.getHTML();
                mainContent.innerHTML = html;

                const tableId = `${moduleId}Table`;
                if (document.getElementById(tableId)) {
                    tableManager.init(tableId);
                }

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
}

window.app = new MuhasibatProApp();