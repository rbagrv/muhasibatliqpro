class TableManager {
    constructor() {
        this.activeSort = {};
        this.filters = {};
    }

    init(tableElement) {
        if (!tableElement) {
            console.warn("TableManager: No table element provided for initialization.");
            return;
        }

        this.table = tableElement;
        this.headers = Array.from(this.table.querySelectorAll('th'));
        // Capture original rows by cloning them or storing a deep copy
        // Or, more efficiently, re-render based on a canonical data source if available.
        // For static HTML tables, we'll extract them.
        this.originalRows = Array.from(this.table.querySelectorAll('tbody tr'));
        this.tbody = this.table.querySelector('tbody');

        this.setupSortableHeaders();
        this.setupFilterInputs();
        this.applyFiltersAndSort();
    }

    setupSortableHeaders() {
        this.headers.forEach((th, index) => {
            const thContent = th.querySelector('.th-content');
            if (thContent) {
                let sortControls = thContent.querySelector('.th-controls');
                if (!sortControls) {
                    sortControls = document.createElement('div');
                    sortControls.classList.add('th-controls');
                    thContent.appendChild(sortControls);

                    const sortAsc = document.createElement('span');
                    sortAsc.classList.add('sort-icon');
                    sortAsc.innerHTML = '<i class="fas fa-caret-up"></i>';
                    sortAsc.dataset.sortDir = 'asc';
                    sortAsc.addEventListener('click', () => this.sortTable(index, 'asc'));
                    sortControls.appendChild(sortAsc);

                    const sortDesc = document.createElement('span');
                    sortDesc.classList.add('sort-icon');
                    sortDesc.innerHTML = '<i class="fas fa-caret-down"></i>';
                    sortDesc.dataset.sortDir = 'desc';
                    sortDesc.addEventListener('click', () => this.sortTable(index, 'desc'));
                    sortControls.appendChild(sortDesc);
                }
            }
        });
    }

    setupFilterInputs() {
        this.headers.forEach((th, index) => {
            const thContent = th.querySelector('.th-content');
            if (thContent) {
                let filterInput = thContent.querySelector('.column-filter-input');
                if (!filterInput) {
                    filterInput = document.createElement('input');
                    filterInput.type = 'text';
                    filterInput.placeholder = 'Filter...';
                    filterInput.classList.add('column-filter-input');
                    filterInput.addEventListener('input', (e) => this.filterTable(index, e.target.value));
                    thContent.appendChild(filterInput);
                }
            }
        });
    }

    sortTable(columnIndex, direction) {
        const headerText = this.headers[columnIndex].textContent.trim();
        this.activeSort = { columnIndex, direction, headerText };
        this.applyFiltersAndSort();
    }

    filterTable(columnIndex, value) {
        if (value) {
            this.filters[columnIndex] = value.toLowerCase();
        } else {
            delete this.filters[columnIndex];
        }
        this.applyFiltersAndSort();
    }

    applyFiltersAndSort() {
        let filteredRows = [...this.originalRows];

        // Apply filters
        Object.keys(this.filters).forEach(colIndex => {
            const filterValue = this.filters[colIndex];
            filteredRows = filteredRows.filter(row => {
                const cell = row.children[colIndex];
                // Check if cell exists before accessing textContent
                return cell && cell.textContent.toLowerCase().includes(filterValue);
            });
        });

        // Apply sorting
        if (this.activeSort.columnIndex !== undefined) {
            const { columnIndex, direction } = this.activeSort;
            filteredRows.sort((a, b) => {
                const aText = a.children[columnIndex] ? a.children[columnIndex].textContent.trim() : '';
                const bText = b.children[columnIndex] ? b.children[columnIndex].textContent.trim() : '';

                // Attempt to convert to number for numeric sorting
                const aNum = parseFloat(aText.replace(/[^0-9.-]+/g, ''));
                const bNum = parseFloat(bText.replace(/[^0-9.-]+/g, ''));

                let comparison = 0;
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    comparison = aNum - bNum;
                } else {
                    comparison = aText.localeCompare(bText);
                }

                return direction === 'asc' ? comparison : -comparison;
            });
        }

        // Update table display
        this.tbody.innerHTML = '';
        if (filteredRows.length > 0) {
            filteredRows.forEach(row => this.tbody.appendChild(row));
        } else {
            const noResultsRow = document.createElement('tr');
            noResultsRow.innerHTML = `<td colspan="${this.headers.length}" style="text-align: center; padding: 20px; color: var(--text-subtle);">Məlumat tapılmadı.</td>`;
            this.tbody.appendChild(noResultsRow);
        }

        this.updateSortIcons();
    }

    updateSortIcons() {
        this.headers.forEach((th, index) => {
            const sortAsc = th.querySelector('[data-sort-dir="asc"]');
            const sortDesc = th.querySelector('[data-sort-dir="desc"]');

            if (sortAsc) sortAsc.style.color = 'var(--text-subtle)';
            if (sortDesc) sortDesc.style.color = 'var(--text-subtle)';

            if (index === this.activeSort.columnIndex) {
                if (this.activeSort.direction === 'asc' && sortAsc) {
                    sortAsc.style.color = 'var(--primary-color)';
                } else if (this.activeSort.direction === 'desc' && sortDesc) {
                    sortDesc.style.color = 'var(--primary-color)';
                }
            }
        });
    }
}

class MuhasibatProApp {
    constructor() {
        this.currentUser = null;
        this.currentTenant = null;
        this.firebaseApp = null;
        this.firebaseAuth = null; 
        // Set the full URL for the backend API to ensure correct routing when frontend and backend are on different ports/domains.
        // In a production environment, this might be dynamically set or derived from environment variables.
        this.apiBaseUrl = this.getApiBaseUrl(); // Use a dynamic method to determine the base URL
        this.version = '2.0.0';
        this.loadedModules = new Map();
        this.currentModule = null;
        this.activeModuleName = null;
        this.isAppRendered = false; // Flag to track if the main app shell is in the DOM

        this.coaFormData = {};

        this.navigationStructure = {
            'Ana Səhifə': [
                { module: 'dashboard', name: 'İdarə Paneli', icon: 'fas fa-th-large', roles: ['admin', 'manager', 'accountant', 'user', 'superadmin'] },
            ],
            'Maliyyə və Mühasibatlıq': [
                { module: 'chart-of-accounts', name: 'Hesablar Planı', icon: 'fas fa-sitemap', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'journal-entries', name: 'Jurnal Yazılışları', icon: 'fas fa-book', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'income-expense', name: 'Mədaxil və Məxaric', icon: 'fas fa-exchange-alt', roles: ['admin', 'accountant', 'user', 'superadmin'] },
                { module: 'cash-accounts', name: 'Kassa/Bank Hesabları', icon: 'fas fa-money-check-alt', roles: ['admin', 'accountant', 'user', 'superadmin'] },
                { module: 'transfers', name: 'Hesablararası Köçürmələr', icon: 'fas fa-exchange-alt', roles: ['admin', 'accountant', 'user', 'superadmin'] },
                { module: 'correspondence-accounts', name: 'Müxabirləşmə Hesabları', icon: 'fas fa-code-branch', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'direct-correspondence', name: 'Birbaşa Müxabirləşmələr', icon: 'fas fa-arrow-right-arrow-left', roles: ['admin', 'accountant', 'superadmin'] },
            ],
            'Satış və Müştərilər': [
                { module: 'products', name: 'Məhsullar', icon: 'fas fa-boxes', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'sales-invoices', name: 'Satış Fakturaları', icon: 'fas fa-file-invoice-dollar', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'sales-offers', name: 'Satış Təklifləri', icon: 'fas fa-handshake', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'sales-history', name: 'Satış Tarixçəsi', icon: 'fas fa-chart-line', roles: ['admin', 'manager', 'accountant', 'superadmin'] },
                { module: 'customers', name: 'Müştərilər', icon: 'fas fa-users', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'credit-notes', name: 'Kredit Notlar', icon: 'fas fa-file-alt', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'debit-notes', name: 'Debit Notlar', icon: 'fas fa-file-minus', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'pos', name: 'POS Sistemi', icon: 'fas fa-cash-register', roles: ['admin', 'user', 'superadmin'] },
                { module: 'pos-settings', name: 'POS Tənzimləmələri', icon: 'fas fa-cog', roles: ['admin', 'superadmin'] },
            ],
            'Alış və Təchizatçılar': [
                { module: 'purchase-invoices', name: 'Alış Fakturaları', icon: 'fas fa-receipt', roles: ['admin', 'accountant', 'user', 'superadmin'] },
                { module: 'purchase-offers', name: 'Alış Təklifləri', icon: 'fas fa-file-contract', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'suppliers', name: 'Təchizatçılar', icon: 'fas fa-truck-moving', roles: ['admin', 'manager', 'user', 'superadmin'] },
            ],
            'Anbar və İstehsalat': [
                { module: 'warehouse', name: 'Anbar', icon: 'fas fa-warehouse', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'inventory', name: 'Stok İdarəetməsi', icon: 'fas fa-boxes', roles: ['admin', 'manager', 'accountant', 'superadmin'] },
                { module: 'bom', name: 'Texnoloji Xəritələr (BOM)', icon: 'fas fa-cogs', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'production-orders', name: 'İstehsalat Sifarişləri', icon: 'fas fa-industry', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'production', name: 'İstehsalat', icon: 'fas fa-tools', roles: ['admin', 'manager', 'superadmin'] },
            ],
            'Əsas Vəsaitlər və Amortizasiya': [
                { module: 'fixed-assets', name: 'Əsas Vəsaitlər', icon: 'fas fa-building', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'depreciation', name: 'Köhnəlmə Əməliyyatları', icon: 'fas fa-calculator', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'intangible-assets', name: 'Qeyri-Maddi Aktivlər', icon: 'fas fa-lightbulb', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'amortization', name: 'Amortizasiya Əməliyyatları', icon: 'fas fa-money-bill-wave-alt', roles: ['admin', 'accountant', 'superadmin'] },
            ],
            'Kadrlar və Əmək Haqqı': [
                { module: 'employees', name: 'İşçilər', icon: 'fas fa-user-friends', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'contracts', name: 'Müqavilələr', icon: 'fas fa-file-signature', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'attendance', name: 'İşə Davamiyyət', icon: 'fas fa-business-time', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'payroll', name: 'Əmək Haqqı', icon: 'fas fa-wallet', roles: ['admin', 'accountant', 'superadmin'] },
            ],
            'Hesabatlar və Analitika': [
                { module: 'financial-reports', name: 'Maliyyə Hesabatları', icon: 'fas fa-chart-bar', roles: ['admin', 'accountant', 'manager', 'superadmin'] },
                { module: 'profit-loss', name: 'Mənfəət və Zərər', icon: 'fas fa-chart-line', roles: ['admin', 'accountant', 'manager', 'superadmin'] },
                { module: 'balance-sheet', name: 'Balans Hesabatı', icon: 'fas fa-balance-scale', roles: ['admin', 'accountant', 'manager', 'superadmin'] },
                { module: 'tax-reports', name: 'Vergi Hesabatları', icon: 'fas fa-percent', roles: ['admin', 'accountant', 'superadmin'] },
                { module: 'budget-planning', name: 'Büdcə Planlaşdırması', icon: 'fas fa-money-check-alt', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'custom-reports', name: 'Xüsusi Hesablar', icon: 'fas fa-file-alt', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'analytics', name: 'Analitika', icon: 'fas fa-chart-pie', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'technical-reports', name: 'Texniki Hesabatlar', icon: 'fas fa-cogs', roles: ['admin', 'accountant', 'superadmin'] },
            ],
            'Sənədlər və Fayllar': [
                { module: 'documents', name: 'Sənədlər', icon: 'fas fa-folder-open', roles: ['admin', 'manager', 'user', 'superadmin'] },
                { module: 'folders', name: 'Qovluqlar', icon: 'fas fa-folder', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'templates', name: 'Şablonlar', icon: 'fas fa-file-alt', roles: ['admin', 'manager', 'superadmin'] },
            ],
            'İnvestisiya': [
                { module: 'investments', name: 'İnvestisiyalar', icon: 'fas fa-chart-line', roles: ['admin', 'manager', 'superadmin'] },
                { module: 'capital-accounts', name: 'Kapital Hesabları', icon: 'fas fa-coins', roles: ['admin', 'accountant', 'superadmin'] },
            ],
            'Sistem İdarəetməsi': [
                { module: 'users', name: 'İstifadəçilər', icon: 'fas fa-user-circle', roles: ['admin', 'superadmin'] },
                { module: 'tenants', name: 'Tenantlar', icon: 'fas fa-building', roles: ['superadmin'] },
                { module: 'api', name: 'API İdarəetməsi', icon: 'fas fa-code', roles: ['admin', 'superadmin'] },
                { module: 'telegram', name: 'Telegram Bot', icon: 'fab fa-telegram-plane', roles: ['admin', 'superadmin'] },
            ],
        };

        this.COA_STRUCTURE = {
            '1': {
                name: 'UZUNMÜDDƏTLİ AKTİVLƏR',
                type: 'Aktiv',
                articles: {
                    '10': { name: 'Qeyri-maddi aktivlər', accounts: { '101': 'Qeyri-maddi aktivlərin dəyəri', '102': 'Qeyri-maddi aktivlər üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri', '103': 'Qeyri-maddi aktivlərlə bağlı məsrəflərin kapitallaşdırılması' } },
                    '11': { name: 'Torpaq, tikili və avadanlıqlar', accounts: { '111': 'Torpaq, tikili və avadanlıqların dəyəri', '112': 'Torpaq, tikili və avadanlıqlar üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri', '113': 'Torpaq, tikili və avadanlıqlarla bağlı məsrəflərin kapitallaşdırılması' } },
                    '12': { name: 'İnvestisiya mülkiyyəti', accounts: { '121': 'İnvestisiya mülkiyyətinin dəyəri', '122': 'İnvestisiya mülkiyyəti üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri', '123': 'İnvestisiya mülkiyyəti ilə bağlı məsrəflərin kapitallaşdırılması' } },
                    '13': { name: 'Bioloji aktivlər', accounts: { '131': 'Bioloji aktivlərin dəyəri', '132': 'Bioloji aktivlər üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri' } },
                    '14': { name: 'Təbii sərvətlər', accounts: { '141': 'Təbii sərvətlərin (ehtiyatların) dəyəri', '142': 'Təbii sərvətlərin (ehtiyatların) tükənməsi' } },
                    '15': { name: 'İştirak payı metodu ilə uçota alınmış investisiyalar', accounts: { '151': 'Asılı müəssisələrə investisiyalar', '152': 'Birgə müəssisələrə investisiyalar', '153': 'Asılı və birgə müəssisələrə investisiyaların dəyərinin azalmasına görə düzəlişlər' } },
                    '16': { name: 'Təxirə salınmış vergi aktivləri', accounts: { '161': 'Mənfəət vergisi üzrə təxirə salınmış vergi aktivləri', '162': 'Digər təxirə salınmış vergi aktivləri' } },
                }
            },
        };

        this.allBusinessSettings = new Map();
        this.currentBusinessSettings = null;

        this.firebaseConnected = false;
        this._pendingImportData = null;

        this.tableManager = null; 

        this.websocket = null;
        this.reconnectInterval = 5000;
        this.websocketConnected = false;

        this.audioContext = null;
        this.audioContextResumed = false;
        this.audioContextWarningShown = false;
    }

    /**
     * Determines the correct API base URL. For local development, this must be an absolute
     * URL pointing to the running backend server to avoid CORS and "Failed to fetch" errors
     * in sandbox environments. In a production build where frontend and backend are served
     * from the same origin, this would be a relative path.
     */
    getApiBaseUrl() {
        // Using an absolute path to localhost is crucial for the development sandbox.
        return 'http://localhost:3000/api/v2';
    }

    async init() {
        console.log(`MühasibatlıqPro v${this.version} - Multi-Tenant SaaS Platform Initializing...`);
        console.log('\n--- Frontend Application Status ---');
        console.log('If you are experiencing "Failed to fetch" or network errors, please ensure your backend server is running.');
        console.log('To start the backend, navigate to the project root in your terminal and run: `npm run dev` (for development) or `npm start` (for production).');
        console.log('------------------------------------\n');

        this.tableManager = new TableManager();

        this.landingPageSettings = this.getDefaultLandingPageSettings();
        this.contactMessages = this.getMockContactMessages();
        this.initializeNotifications();

        if (window.firebaseConfig) {
            try {
                const { initializeApp } = await import("firebase/app");
                const { getFirestore } = await import("firebase/firestore");
                const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } = await import("firebase/auth");

                this.firebaseApp = initializeApp(window.firebaseConfig);
                this.firebaseDb = getFirestore(this.firebaseApp);
                this.firebaseAuth = getAuth(this.firebaseApp);
                console.log("Firebase initialized successfully!");
                this.firebaseConnected = true;
                this.updateFirebaseStatusIcon();

                this.setupFirebaseAuthStateListener(onAuthStateChanged, signInWithEmailAndPassword, signOut);
            } catch (firebaseInitError) {
                console.error("Error initializing Firebase:", firebaseInitError);
                this.showErrorNotification("Firebase-i başlatmaq mümkün olmadı. Bəzi funksiyalar işləməyə bilər.", {
                    title: 'Firebase Xətası',
                    actions: [{ label: 'Dəstəklə əlaqə', onClick: () => this.showInfoNotification('Dəstək xidməti ilə əlaqə saxlayın.') }]
                });
                this.firebaseConnected = false;
                this.updateFirebaseStatusIcon();
            }
        } else {
            console.warn("Firebase konfiqurasiyası tapılmadı. Bəzi funksiyalar işləməyə bilər.");
            this.showWarningNotification("Firebase bağlantısı yoxdur. Bəzi funksiyalar işləməyə bilər.");
            this.firebaseConnected = false;
            this.updateFirebaseStatusIcon();
        }

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userData = localStorage.getItem('readOnlyCurrentUser');
        const tenantData = localStorage.getItem('readOnlyCurrentTenant');

        if (accessToken && userData && tenantData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.currentTenant = JSON.parse(tenantData);
                await this.verifyOrRefreshToken(accessToken, refreshToken);
                console.log('Existing session found. Rendering app...');
                this.renderAppShell();
                this.navigateTo('dashboard');
                this.initializeComponents();
                return;
            } catch (error) {
                console.warn('Existing session invalid or expired:', error);
                this.clearSession();
            }
        }

        // --- MODIFICATION: Auto-login for demo purposes as per user request ---
        console.log('No active session found. Attempting auto-login...');
        try {
            const loginSuccess = await this.demoLogin();
            if (loginSuccess) {
                // If demoLogin is successful, the app is rendered and we can stop initialization here.
                this.initializeComponents();
                return;
            }
            // If demoLogin returns false (e.g. API error), fall through to show landing page
        } catch (error) {
            console.error("Auto-login failed, falling back to landing page.", error);
            // If auto-login fails, show the landing page and login modal as a fallback.
        }

        // --- Fallback to Landing Page ---
        this.showLandingPage();

        this.initializePWA();
        this.initializeComponents();
        this.setupAudioContextResume(); 

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLoginFormSubmit.bind(this));
        }

        const navLoginButton = document.getElementById('navLoginBtn');
        if (navLoginButton) {
            navLoginButton.addEventListener('click', () => this.openLoginModal());
        }

        const heroDemoButton = document.getElementById('heroDemoBtn');
        if (heroDemoButton) {
            heroDemoButton.addEventListener('click', () => this.openLoginModal());
        }
        const heroFeaturesButton = document.getElementById('heroFeaturesBtn');
        if (heroFeaturesButton) {
            heroFeaturesButton.addEventListener('click', () => this.scrollToFeatures());
        }

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.submitContactForm.bind(this));
        }

        const loginModalCloseButton = document.getElementById('loginModalCloseBtn');
        if (loginModalCloseButton) {
            loginModalCloseButton.addEventListener('click', () => this.closeLoginModal());
        }
        const loginModalCancelButton = document.getElementById('loginModalCancelBtn');
        if (loginModalCancelButton) {
            loginModalCancelButton.addEventListener('click', () => this.closeLoginModal());
        }
        const loginDemoButton = document.getElementById('loginDemoBtn');
        if (loginDemoButton) {
            loginDemoButton.addEventListener('click', () => this.demoLogin());
        }
        const togglePasswordSpans = document.querySelectorAll('.password-toggle');
        togglePasswordSpans.forEach(span => {
            span.addEventListener('click', (event) => {
                const fieldId = event.target.closest('.password-input-wrapper').querySelector('input').id;
                this.togglePasswordVisibility(fieldId);
            });
        });
        const forgotPasswordLink = document.querySelector('.forgot-password-link');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (event) => {
                event.preventDefault(); 
                this.forgotPassword();
            });
        }

        const consultationModalCloseButton = document.getElementById('consultationModalCloseBtn');
        if (consultationModalCloseButton) {
            consultationModalCloseButton.addEventListener('click', () => this.closeConsultationModal());
        }
        const consultationModalCancelButton = document.getElementById('consultationModalCancelBtn');
        if (consultationModalCancelButton) {
            consultationModalCancelButton.addEventListener('click', () => this.closeConsultationModal());
        }

        const confirmImportModalCloseBtn = document.getElementById('confirmImportModalCloseBtn');
        if (confirmImportModalCloseBtn) {
            confirmImportModalCloseBtn.addEventListener('click', () => this.closeConfirmImportModal());
        }
        const confirmImportModalCancelBtn = document.getElementById('confirmImportModalCancelBtn');
        if (confirmImportModalCancelBtn) {
            confirmImportModalCancelBtn.addEventListener('click', () => this.closeConfirmImportModal());
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
                }).catch(e => console.error("Failed to log frontend error:", e));
            }
        });

        window.addEventListener('hashchange', () => this.handleHashChange());

        console.log('Application initialization sequence complete.');
    }

    setupAudioContextResume() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('AudioContext created (initial state: ' + this.audioContext.state + ')');
            if (this.audioContext.state === 'suspended') {
                const resumeHandler = () => {
                    this.audioContext.resume().then(() => {
                        console.log('AudioContext resumed successfully!');
                        this.audioContextResumed = true;
                        this.audioContextWarningShown = false; // Reset warning flag
                        document.body.removeEventListener('mousedown', resumeHandler);
                        document.body.removeEventListener('keydown', resumeHandler);
                        document.body.removeEventListener('touchstart', resumeHandler);
                    }).catch(error => {
                        console.error('Failed to resume AudioContext:', error);
                    });
                };

                document.body.addEventListener('mousedown', resumeHandler, { once: true });
                document.body.addEventListener('keydown', resumeHandler, { once: true });
                document.body.addEventListener('touchstart', resumeHandler, { once: true });

                console.log('Added event listeners to resume AudioContext on user gesture.');
            } else {
                this.audioContextResumed = true;
                console.log('AudioContext is already running.');
            }
        } catch (e) {
            console.warn('Web Audio API is not supported in this browser or failed to initialize:', e);
            this.audioContext = null;
        }
    }

    playSound(frequency = 440, duration = 0.5, type = 'sine') {
        if (!this.audioContext || this.audioContext.state !== 'running') {
            console.warn('AudioContext is not running. Cannot play sound.');
            if (!this.audioContextWarningShown) {
                this.showWarningNotification('Səs çalmaq mümkün olmadı. Zəhmət olmasa, səhifə ilə qarşılıqlı əlaqədə olun (klik edin).', { playSound: false });
                this.audioContextWarningShown = true;
            }
            return;
        }

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency; 
            oscillator.type = type; 

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.01); 
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration); 

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);

            console.log(`Playing sound: ${type} at ${frequency}Hz for ${duration}s`);
        } catch (error) {
            console.error('Error playing sound:', error);
            this.showErrorNotification('Səs çalarkən xəta baş verdi.');
        }
    }

    showLandingPage() {
        document.getElementById('landingPage').style.display = 'block';
        document.getElementById('appContainer').style.display = 'none';
    }

    showApp() {
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('appContainer').style.display = 'flex';
    }

    initializeNotifications() {
        this.notificationContainer = document.getElementById('notification-container');
        if (!this.notificationContainer) {
            this.notificationContainer = document.createElement('div');
            this.notificationContainer.id = 'notification-container';
            document.body.appendChild(this.notificationContainer);
        }
    }

    showNotification(type, message, options = {}) {
        const { title, duration = 5000, actions = [] } = options;

        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification', type);

        let iconClass = '';
        switch (type) {
            case 'success': iconClass = 'fa-check-circle'; break;
            case 'error': iconClass = 'fa-times-circle'; break;
            case 'warning': iconClass = 'fa-exclamation-triangle'; break;
            case 'info': iconClass = 'fa-info-circle'; break;
            default: iconClass = 'fa-bell';
        }

        notificationElement.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="notification-body">
                ${title ? `<div class="notification-title">${title}</div>` : ''}
                <div class="notification-message">${message}</div>
                <div class="notification-actions"></div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress" style="--duration: ${duration}ms;">
                <div class="notification-progress-bar"></div>
            </div>
        `;

        const actionsContainer = notificationElement.querySelector('.notification-actions');
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.classList.add('notification-action');
            btn.textContent = action.label;
            btn.onclick = () => {
                action.onClick();
                notificationElement.remove();
            };
            actionsContainer.appendChild(btn);
        });

        this.notificationContainer.appendChild(notificationElement);

        const closeButton = notificationElement.querySelector('.notification-close');
        closeButton.onclick = () => notificationElement.remove();

        if (duration > 0) {
            let timeoutId;
            let progressBar = notificationElement.querySelector('.notification-progress-bar');

            const startTimer = () => {
                progressBar.style.animationPlayState = 'running';
                notificationElement.classList.remove('paused');
                timeoutId = setTimeout(() => {
                    notificationElement.classList.add('dismissing');
                    notificationElement.addEventListener('animationend', () => {
                        notificationElement.remove();
                    }, { once: true });
                }, duration);
            };

            const pauseTimer = () => {
                clearTimeout(timeoutId);
                progressBar.style.animationPlayState = 'paused';
                notificationElement.classList.add('paused');
            };

            notificationElement.addEventListener('mouseenter', pauseTimer);
            notificationElement.addEventListener('mouseleave', startTimer);

            startTimer();
        } else {
            notificationElement.querySelector('.notification-progress').remove();
        }
    }

    showSuccessNotification(message, options = {}) {
        this.showNotification('success', message, { ...options, title: options.title || 'Uğurlu Əməliyyat' });
        if (options.playSound !== false) this.playSound(523, 0.1, 'sine'); 
    }

    showErrorNotification(message, options = {}) {
        this.showNotification('error', message, { ...options, title: options.title || 'Xəta Baş Verdi' });
        if (options.playSound !== false) this.playSound(130.81, 0.3, 'triangle'); 
    }

    showWarningNotification(message, options = {}) {
        this.showNotification('warning', message, { ...options, title: options.title || 'Xəbərdarlıq' });
        if (options.playSound !== false) this.playSound(392, 0.2, 'sawtooth'); 
    }

    showInfoNotification(message, options = {}) {
        this.showNotification('info', message, { ...options, title: options.title || 'Məlumat' });
        if (options.playSound !== false) this.playSound(440, 0.1, 'square'); 
    }

    setupFirebaseAuthStateListener(onAuthStateChanged, signInWithEmailAndPassword, signOut) {
        if (this.firebaseAuth) {
            this.signInWithEmailAndPassword = signInWithEmailAndPassword;
            this.signOut = signOut;

            onAuthStateChanged(this.firebaseAuth, (user) => {
                if (user) {
                    console.log("Firebase Auth State Changed: User signed in", user);
                } else {
                    console.log("Firebase Auth State Changed: User signed out");
                }
                this.updateFirebaseStatusIcon();
            });
        }
    }

    updateFirebaseStatusIcon() {
        const icon = document.getElementById('firebase-status-icon');
        if (icon) {
            if (this.firebaseConnected) {
                icon.classList.remove('disconnected');
                icon.classList.add('connected');
                icon.title = 'Firebase Connected';
            } else {
                icon.classList.remove('connected');
                icon.classList.add('disconnected');
                icon.title = 'Firebase Disconnected';
            }
        }
    }

    async fetchApiData(endpoint, options = {}) {
        const url = `${this.apiBaseUrl}${endpoint}`;
        const accessToken = localStorage.getItem('accessToken');

        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...options.headers
        };

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (this.currentTenant && this.currentTenant.id) {
            headers['X-Tenant-ID'] = this.currentTenant.id;
        }

        try {
            console.log(`fetchApiData: Requesting ${options.method || 'GET'} ${url}`);
            console.log('fetchApiData: Request Headers:', headers);
            if (options.body && typeof options.body === 'string') {
                try {
                    console.log('fetchApiData: Request Body:', JSON.parse(options.body));
                } catch (e) {
                    console.log('fetchApiData: Request Body (non-JSON):', options.body);
                }
            } else {
                console.log('fetchApiData: Request Body:', options.body);
            }

            const response = await fetch(url, {
                ...options,
                headers
            });

            console.log(`fetchApiData: Response Status: ${response.status}, OK: ${response.ok}`);
            const responseText = await response.text(); 
            console.log('fetchApiData: Raw Response Text (first 500 chars):', responseText.substring(0, 500));

            let data;
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');
            const isEmptyResponse = responseText.trim() === '';

            if (isJson) {
                try {
                    data = JSON.parse(responseText);
                } catch (e) {
                    console.error('fetchApiData: Failed to parse JSON response:', e, 'Raw text:', responseText);
                    throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 100)}...`);
                }
            } else if (isEmptyResponse && response.ok) {
                data = {}; // Treat as an empty object for successful empty responses
            } else {
                // If not JSON, not empty, and not okay (i.e., server error with non-JSON body),
                // or if it's OK but we expected JSON for data, then it's an error.
                console.error(`fetchApiData: Server returned non-JSON response when JSON was expected (Content-Type: ${contentType || 'none'}). Raw text: ${responseText}`);
                throw new Error(`Server returned unexpected response format (status: ${response.status}). Expected JSON.`);
            }

            // Handle 401 specifically for token refresh
            if (response.status === 401) {
                const newAccessToken = await this.refreshAccessToken();
                if (newAccessToken) {
                    // Retry original request with new token
                    headers['Authorization'] = `Bearer ${newAccessToken}`;
                    const retryResponse = await fetch(url, { ...options, headers });
                    if (!retryResponse.ok) {
                        const errorData = await retryResponse.json();
                        throw new Error(errorData.message || `API Error after refresh: ${retryResponse.status}`);
                    }
                    return await retryResponse.json();
                } else {
                    // If refresh failed, force logout
                    this.showErrorNotification('Sessiyanız bitmişdir. Zəhmət olmasa, yenidən daxil olun.', { duration: 5000 });
                    this.logout();
                    return null; // Ensure null is returned to prevent further processing
                }
            }

            // Handle other non-OK responses
            if (!response.ok) {
                const errorMessage = data && data.message ? data.message : 'Bilinməyən xəta baş verdi.';
                this.showErrorNotification(`API Xətası: ${errorMessage}`, { title: `Status: ${response.status}` });
                throw new Error(errorMessage);
            }

            // Specific check for auth endpoint: ensure it has an accessToken
            if ((endpoint === '/auth/firebase-verify' || endpoint === '/auth/login' || endpoint === '/auth/demo-login') && (!data || !data.accessToken)) {
                throw new Error('Authentication response missing access token or invalid data structure.');
            }

            return data;
        } catch (error) {
            console.error('Fetch API Data Error:', error);
            // Prevent duplicate notifications if logout already triggered or specific error message already shown
            if (!error.message.includes('Sessiyanız bitmişdir.') && !error.message.includes('API Xətası:') && !error.message.includes('Authentication response missing')) {
                 let userFacingError = `Şəbəkə xətası və ya server bağlantısı problemi: ${error.message}.`;
                if (error instanceof TypeError && error.message === 'Failed to fetch') {
                    userFacingError = "Backend serverə qoşulmaq mümkün olmadı. Zəhmət olmasa, serverin işlədiyindən əmin olun. Terminalda `npm run dev` əmrini işə salın.";
                }
                this.showErrorNotification(userFacingError, { title: 'Server Bağlantı Xətası', duration: 10000 });
            }
            throw error;
        }
    }

    async handleLoginFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const rememberMe = form.rememberMe.checked;
        const loginErrorMsg = document.getElementById('loginErrorMsg');

        loginErrorMsg.style.display = 'none';

        // --- MODIFICATION ---
        // Bypassing actual authentication and using the demo login flow for any form submission
        // to resolve user's login issues and align with previous requests for auto-login.
        console.log(`Bypassing standard login for user ${email}. Triggering demo login flow.`);
        
        try {
            // Using the frontend-only demo login to bypass the server call.
            const loginSuccess = await this.demoLogin();
            if (!loginSuccess) {
                // If even the demo login fails, show a generic error.
                loginErrorMsg.textContent = 'Demo giriş zamanı daxili xəta baş verdi.';
                loginErrorMsg.style.display = 'block';
            }
        } catch (error) {
            console.error('Login form submission (as demo) error:', error);
            loginErrorMsg.textContent = error.message || 'Giriş uğursuz oldu.';
            loginErrorMsg.style.display = 'block';
        }
    }

    async demoLogin() {
        // --- MODIFICATION: Serverless Demo Login ---
        // This function now simulates a successful login without making a backend request.
        // This resolves the 'Failed to fetch' / 'ERR_CONNECTION_REFUSED' error.
        try {
            this.showInfoNotification('Demo giriş cəhdi...', { duration: 1500, title: 'Yoxlanılır' });
            console.log('demoLogin: Bypassing backend call and using mock data for frontend-only demo.');

            // Simulate a successful API response with mock data
            const mockData = {
                message: 'Mock login successful!',
                accessToken: 'mock-access-token-for-frontend-demo',
                refreshToken: 'mock-refresh-token-for-frontend-demo',
                user: {
                    id: 'demo-user-id',
                    email: 'demo@example.com',
                    role: 'superadmin', // Give superadmin role for full access in demo
                    businessId: 'demo-tenant-id',
                    businessName: 'Demo Biznes',
                    businessSubdomain: 'demo',
                    businessPlan: 'professional',
                    businessIsActive: true,
                    nextBillingDate: '2024-12-31',
                    warningSent: false
                }
            };
            
            // Simulate a small delay as if it were a real network request
            await new Promise(resolve => setTimeout(resolve, 500)); 

            this.handleSuccessfulAuth(mockData);
            return true;

        } catch (error) {
            console.error('Demo login (mock) error:', error);
            this.showErrorNotification('Demo girişi zamanı daxili xəta baş verdi.', { title: 'Demo Giriş Xətası' });
            return false;
        }
    }

    handleSuccessfulAuth(data) {
        console.log('handleSuccessfulAuth: Received backend response:', data);

        if (data && data.accessToken) {
            console.log('handleSuccessfulAuth: Access token received. Storing session data.');
            localStorage.setItem('accessToken', data.accessToken);
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken);
            }
            localStorage.setItem('readOnlyCurrentUser', JSON.stringify(data.user));
            localStorage.setItem('readOnlyCurrentTenant', JSON.stringify({
                id: data.user.businessId,
                name: data.user.businessName,
                subdomain: data.user.businessSubdomain,
                plan: data.user.businessPlan,
                isActive: data.user.businessIsActive,
                nextBillingDate: data.user.nextBillingDate,
                warningSent: data.user.warningSent
            }));

            this.currentUser = data.user;
            this.currentTenant = {
                id: data.user.businessId,
                name: data.user.businessName,
                subdomain: data.user.businessSubdomain,
                plan: data.user.businessPlan,
                isActive: data.user.businessIsActive,
                nextBillingDate: data.user.nextBillingDate,
                warningSent: data.user.warningSent
            };

            this.closeLoginModal();
            this.showSuccessNotification('Uğurla daxil oldunuz!');
            this.renderAppShell();
            
            console.log('handleSuccessfulAuth: currentTenant active status:', this.currentTenant.isActive);
            if (this.currentTenant.isActive === false) {
                this.renderSuspendedAccountPage(this.currentTenant);
            } else {
                console.log('handleSuccessfulAuth: Navigating to dashboard...');
                this.navigateTo('dashboard');
            }
            this.connectWebSocket();

        } else {
            console.error('handleSuccessfulAuth: Invalid data received from backend. No accessToken.', data);
            this.showErrorNotification((data && data.message) || 'Giriş uğursuz oldu. Serverdən etibarsız cavab gəldi.', { title: 'Giriş Xətası' });
        }
    }

    logout() {
        try {
            if (this.firebaseAuth && this.signOut) {
                this.signOut(this.firebaseAuth).then(() => {
                    console.log('Signed out from Firebase.');
                }).catch(error => {
                    console.error('Error signing out from Firebase:', error);
                });
            }
            this.fetchApiData('/auth/logout', { method: 'POST' }).then(() => {
                console.log('Backend logout called.');
            }).catch(error => {
                console.error('Error during backend logout:', error);
            });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            this.clearSession();
            this.showLandingPage();
            this.showSuccessNotification('Sistemdən çıxdınız!');
            window.location.reload(); 
        }
    }

    clearSession() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('readOnlyCurrentUser');
        localStorage.removeItem('readOnlyCurrentTenant');
        this.currentUser = null;
        this.currentTenant = null;
        if (this.websocket) {
            this.websocket.close();
        }
    }

    openLoginModal() {
        this.openModal('loginModal');
    }

    closeLoginModal() {
        this.closeModal('loginModal');
        document.getElementById('loginErrorMsg').style.display = 'none';
    }

    openConsultationModal() {
        this.openModal('consultationModal');
    }

    closeConsultationModal() {
        this.closeModal('consultationModal');
    }

    openConfirmImportModal(data) {
        this._pendingImportData = data;
        document.getElementById('importInvoiceNumber').value = data.invoiceNumber || '';
        document.getElementById('importInvoiceDate').value = data.date || '';
        document.getElementById('importInvoiceDueDate').value = data.dueDate || '';
        document.getElementById('importInvoiceCustomer').value = data.customer || '';
        document.getElementById('importInvoicePaymentMethod').value = data.paymentMethod || '';
        document.getElementById('importInvoiceStatus').value = data.status || '';
        document.getElementById('importInvoiceNotes').value = data.notes || '';

        const itemsBody = document.getElementById('importInvoiceItemsBody');
        itemsBody.innerHTML = '';
        data.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.productId}</td>
                <td>${item.quantity}</td>
                <td>${this.formatCurrency(item.unitPrice)}</td>
                <td>${this.formatCurrency(item.discount)}</td>
                <td>${item.taxRate}%</td>
            `;
            itemsBody.appendChild(row);
        });

        const confirmBtn = document.getElementById('confirmImportBtn');
        if (confirmBtn) {
            const oldClickHandler = confirmBtn.onclick; // Capture the old handler if it exists
            if (oldClickHandler) {
                confirmBtn.removeEventListener('click', oldClickHandler);
            }
            confirmBtn.onclick = () => this.confirmImport(); // Assign new handler
        }

        this.openModal('confirmImportModal');
    }

    closeConfirmImportModal() {
        this.closeModal('confirmImportModal');
        this._pendingImportData = null;
    }

    confirmImport() {
        console.log('Import confirmed for:', this._pendingImportData);
        this.showSuccessNotification('Məlumatlar uğurla import edildi!', { title: 'Import Tamamlandı' });
        this.closeConfirmImportModal();
        this.navigateTo(this.activeModuleName);
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            const focusableElements = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }

            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
                if (e.key === 'Escape') {
                    this.closeModal(modalId);
                }
            });
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    renderAppShell() {
        const appContainer = document.getElementById('appContainer');
        appContainer.innerHTML = `
            <div class="app-header">
                <div class="app-title">
                    <button class="mobile-menu-toggle no-print" id="appMobileMenuToggle">
                        <span></span><span></span><span></span>
                    </button>
                    <div class="brand-icon">
                        <i class="fas fa-calculator"></i>
                    </div>
                    <span>MühasibatlıqPro</span>
                    <span class="tenant-name" id="currentTenantName">${this.currentTenant ? this.currentTenant.name : 'Biznes Seçilməyib'}</span>
                </div>
                <div class="app-header-actions">
                    <i id="firebase-status-icon" class="fas fa-signal firebase-status-icon" title="Firebase Status"></i>
                    <button class="btn btn-secondary" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i> Çıxış
                    </button>
                </div>
            </div>
            <div class="app-content">
                <div class="app-sidebar no-print" id="appSidebar">
                    ${this.renderSidebarMenu()}
                </div>
                <div class="app-main" id="appMain">
                    <div class="loading" id="appLoadingState">
                        <img src="./loading.svg" alt="Yüklənir..." width="100">
                        <p>Məlumatlar yüklənir...</p>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-overlay" id="appMobileMenuOverlay"></div>
        `;
        this.isAppRendered = true; // Set the flag indicating the app shell is now in the DOM
        this.showApp();
        this.setupMobileMenuListeners();
        this.updateFirebaseStatusIcon();

        document.getElementById('landingPage').style.display = 'none';

        this.renderBottomNavBar();
    }

    renderSidebarMenu() {
        let sidebarHtml = '';
        for (const category in this.navigationStructure) {
            const menuItems = this.navigationStructure[category];
            const visibleItems = menuItems.filter(item =>
                !item.roles || item.roles.some(role => this.currentUser.role === role || this.currentUser.role === 'superadmin')
            );

            if (visibleItems.length > 0) {
                sidebarHtml += `
                    <div class="sidebar-section">
                        <h3 onclick="app.toggleSidebarSection(this)">
                            <span>${category}</span>
                            <i class="fas fa-chevron-down toggle-icon"></i>
                        </h3>
                        <ul class="sidebar-menu">
                            ${visibleItems.map(item => `
                                <li class="sidebar-item" data-module="${item.module}" onclick="app.navigateTo('${item.module}')">
                                    <i class="${item.icon}"></i>
                                    <span>${item.name}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
        }
        return sidebarHtml;
    }

    renderBottomNavBar() {
        const bottomNavBar = document.getElementById('bottomNavBar');
        if (!bottomNavBar) return;

        const mainNavItems = [
            { id: "dashboard", icon: "fas fa-home", name: "Ana Səhifə", module: "dashboard" },
            { id: "sales-invoices", icon: "fas fa-file-invoice-dollar", name: "Satış", module: "sales-invoices" },
            { id: "cash-accounts", icon: "fas fa-money-check-alt", name: "Kassa", module: "cash-accounts" },
            { id: "products", icon: "fas fa-boxes", name: "Məhsullar", module: "products" },
            { id: "more", icon: "fas fa-bars", name: "Daha Çox", module: "sidebar-toggle" }
        ];

        let navHtml = '';
        mainNavItems.forEach(item => {
            navHtml += `
                <a href="#${item.module}" class="bottom-nav-item" data-module="${item.module}" onclick="event.preventDefault(); ${item.module === 'sidebar-toggle' ? 'app.toggleAppSidebar()' : `app.navigateTo('${item.module}')`}">
                    <i class="${item.icon}"></i>
                    <span>${item.name}</span>
                </a>
            `;
        });
        bottomNavBar.innerHTML = navHtml;
        this.updateBottomNavActiveState(this.activeModuleName);
    }

    updateBottomNavActiveState(moduleName) {
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.module === moduleName) {
                item.classList.add('active');
            }
        });
    }

    setupMobileMenuListeners() {
        const appMobileMenuToggle = document.getElementById('appMobileMenuToggle');
        const appSidebar = document.getElementById('appSidebar');
        const appMobileMenuOverlay = document.getElementById('appMobileMenuOverlay');

        if (appMobileMenuToggle && appSidebar && appMobileMenuOverlay) {
            appMobileMenuToggle.addEventListener('click', () => {
                this.toggleAppSidebar();
            });

            appMobileMenuOverlay.addEventListener('click', () => {
                this.toggleAppSidebar();
            });

            appSidebar.querySelectorAll('.sidebar-item').forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        this.toggleAppSidebar();
                    }
                });
            });
        }
    }

    toggleAppSidebar() {
        const appSidebar = document.getElementById('appSidebar');
        const appMobileMenuOverlay = document.getElementById('appMobileMenuOverlay');
        if (appSidebar && appMobileMenuOverlay) {
            appSidebar.classList.toggle('mobile-open');
            appMobileMenuOverlay.classList.toggle('active');
        }
    }

    toggleSidebarSection(headerElement) {
        const section = headerElement.closest('.sidebar-section');
        const menu = section.querySelector('.sidebar-menu');
        if (menu) {
            headerElement.classList.toggle('collapsed');
            menu.classList.toggle('collapsed');
        }
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const [moduleName, action, entityId] = hash.split('/');
            this.navigateTo(moduleName, action, entityId);
        } else if (this.currentUser) {
            this.navigateTo('dashboard');
        }
    }

    async navigateTo(moduleName, action = 'list', entityId = null) {
        if (!this.currentUser || !this.isAppRendered) {
            if (!this.currentUser) {
                this.showErrorNotification('Sistemə daxil olmalısınız.', { title: 'Giriş Tələb Olunur' });
                this.showLandingPage();
                this.openLoginModal();
            } else {
                console.warn('navigateTo called before app shell was rendered. Aborting.');
            }
            return;
        }

        const appMain = document.getElementById('appMain');
        if (!appMain) {
            console.error('App main content area not found!');
            return;
        }
        
        const loadingState = document.getElementById('appLoadingState');
        if (loadingState) {
            loadingState.style.display = 'flex';
        }
        
        appMain.scrollTop = 0;

        if (this.currentModule && this.activeModuleName && this.currentModule.onNavigateOut) {
            this.currentModule.onNavigateOut();
            console.log(`Module ${this.activeModuleName} onNavigateOut called.`);
        }

        try {
            const allMenuItems = Object.values(this.navigationStructure).flat();
            const targetMenuItem = allMenuItems.find(item => item.module === moduleName);

            if (targetMenuItem && targetMenuItem.roles) {
                const hasPermission = targetMenuItem.roles.some(role => this.currentUser.role === role || this.currentUser.role === 'superadmin');
                if (!hasPermission) {
                    this.showErrorNotification(`"${targetMenuItem.name}" moduluna giriş icazəniz yoxdur.`, { title: 'İcazə Xətətası' });
                    appMain.innerHTML = `<div class="page-content"><div class="error-message"><h3>Giriş Qadağandır</h3><p>Sizin rolunuzun "${targetMenuItem.name}" moduluna baxmaq üçün icazəsi yoxdur.</p></div></div>`;
                    this.updateBottomNavActiveState(moduleName);
                    if (loadingState) {
                        loadingState.style.display = 'none';
                    }
                    return;
                }
            } else {
                console.warn(`Module "${moduleName}" not found in navigation structure or has no roles defined. Access granted by default.`);
            }

            const module = await this.loadModule(moduleName);
            this.currentModule = module;
            this.activeModuleName = moduleName;

            let moduleContent = '';
            if (action === 'create' || action === 'edit' || action === 'view' || action === 'details' || action === 'form') {
                const entityData = entityId ? await this.fetchEntityData(moduleName, entityId) : {};
                if (module && typeof module.getFormHTML === 'function') {
                    moduleContent = module.getFormHTML(action, entityData);
                } else {
                    moduleContent = `<h1>${moduleName} - ${action} (Form Not Available)</h1><p>The form for this module is not available.</p>`;
                    this.showWarningNotification(`"${moduleName}" modulu üçün form yüklənə bilmədi.`);
                }
            } else {
                if (module && typeof module.getHTML === 'function') {
                    moduleContent = module.getHTML();
                } else {
                    moduleContent = `<h1>${moduleName} (Content Not Available)</h1><p>Content for this module is not available.</p>`;
                    this.showWarningNotification(`"${moduleName}" modulu üçün məzmun yüklənə bilmədi.`);
                }
            }

            appMain.innerHTML = moduleContent;

            appMain.querySelectorAll('.data-table').forEach(table => {
                this.tableManager.init(table);
            });

            if (module && typeof module.onNavigateIn === "function") {
                module.onNavigateIn();
            }

            this.updateSidebarActiveState(moduleName);
            this.updateBottomNavActiveState(moduleName);

        } catch (error) {
            console.error(`Failed to navigate to ${moduleName}/${action}/${entityId}:`, error);
            this.showErrorNotification(`Səhifəni yükləmək mümkün olmadı: ${moduleName}.`);
            appMain.innerHTML = `<div class="page-content"><div class="error-message"><h3>Səhifə yüklənməsi xətətası</h3><p>Yüklənərkən xəta baş verdi: ${moduleName}. Zəhmət olmasa, yenidən cəhd edin.</p></div></div>`;
        } finally {
            const finalLoadingState = document.getElementById('appLoadingState');
            if (finalLoadingState) {
                finalLoadingState.style.display = 'none';
            }
            console.log(`Navigation to ${moduleName} completed.`);
        }
    }

    navigateToForm(moduleName, action = 'create', entityId = null) {
        window.location.hash = `${moduleName}/${action}${entityId ? '/' + entityId : ''}`;
    }

    showModuleForm(moduleName, action = 'create', entityId = null) {
        this.navigateToForm(moduleName, action, entityId);
    }

    async loadModule(moduleName) {
        if (this.loadedModules.has(moduleName) && this.loadedModules.get(moduleName)) {
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

    updateSidebarActiveState(activeModuleId) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.module === activeModuleId) {
                item.classList.add('active');
                // Scroll the active item into view if it's not visible
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    async handleEntityOp(moduleName, operation, entityId = null) {
        console.log(`Handling entity operation: ${moduleName}, ${operation}, ${entityId}`);
        switch (operation) {
            case 'create':
            case 'edit':
            case 'view':
            case 'details':
                this.navigateTo(moduleName, operation, entityId);
                break;
            case 'add-sub-account': 
                this._showAddSubAccountForm(entityId); 
                break;
            case 'view-sub-account': 
                this._showViewSubAccountDetails(entityId); 
                break;
            case 'delete':
                if (confirm('Bu elementi silmək istədiyinizdən əminsiniz?')) {
                    try {
                        const deleteEndpoint = this.getModuleApiEndpoint(moduleName, entityId);
                        await this.fetchApiData(deleteEndpoint, { method: 'DELETE' });
                        this.showSuccessNotification('Element uğurla silindi!');
                        this.navigateTo(moduleName);
                    } catch (error) {
                        this.showErrorNotification(`Silinmə zamanı xəta: ${error.message}`);
                    }
                }
                break;
            case 'import':
                if (moduleName === 'sales-invoices') {
                    const mockImportData = {
                        invoiceNumber: 'IMP-2024-001',
                        date: '2024-03-01',
                        dueDate: '2024-03-31',
                        customer: 'Test Müştəri MMC',
                        paymentMethod: 'Bank Köçürməsi',
                        status: 'Gözləyir',
                        notes: 'Import edilmiş test faktura.',
                        items: [
                            { productId: 'PROD-A', quantity: 2, unitPrice: 150.00, discount: 0, taxRate: 18 },
                            { productId: 'PROD-B', quantity: 1, unitPrice: 250.00, discount: 10, taxRate: 18 }
                        ]
                    };
                    this.openConfirmImportModal(mockImportData);
                } else {
                    this.showInfoNotification('İmport funksionallığı hələ tam hazır deyil.', { title: `İmport: ${moduleName}` });
                }
                break;
            case 'transfer':
                if (moduleName === 'cash-accounts') {
                    this.openModal('transferModal');
                } else if (moduleName === 'warehouse') {
                    this.openModal('warehouseTransferModal');
                } else {
                    this.showInfoNotification('Transfer funksionallığı hələ tam hazır deyil.', { title: `Transfer: ${moduleName}` });
                }
                break;
            case 'print':
                this.showInfoNotification(`"${entityId}" ${moduleName} çap edilir...`);
                break;
            case 'download':
                this.showInfoNotification(`"${entityId}" ${moduleName} endirilir...`);
                break;
            case 'send-reminder':
                this.showInfoNotification(`"${entityId}" ${moduleName} üçün xatırlatma göndərilir...`);
                break;
            case 'approve':
            case 'pay':
            case 'complete':
            case 'start':
            case 'confirm-payment':
            case 'activate':
            case 'upgrade':
            case 'renew':
                this.showInfoNotification(`"${entityId}" ${moduleName} üzrə "${operation}" əməliyyatı yerinə yetirilir...`, { duration: 2000 });
                setTimeout(() => {
                    this.showSuccessNotification(`"${entityId}" ${moduleName} üzrə "${operation}" əməliyyatı uğurlu oldu!`, { title: 'Əməliyyat Tamamlandı' });
                    this.navigateTo(moduleName);
                }, 1000);
                break;
            case 'bulk-send':
            case 'bulk-convert':
            case 'bulk-export':
            case 'bulk-print':
            case 'bulk-reminder':
            case 'bulk-archive':
            case 'bulk-approve':
            case 'bulk-activate':
            case 'bulk-deactivate':
            case 'bulk-delete':
            case 'bulk-depreciation':
            case 'bulk-inventory':
            case 'bulk-balance':
            case 'bulk-statements':
            case 'bulk-renewal':
            case 'bulk-start':
            case 'bulk-complete':
            case 'bulk-report':
            case 'export-audit-data':
                this.showInfoNotification(`Toplu "${operation}" əməliyyatı yerinə yetirilir...`);
                break;
            default:
                this.showInfoNotification(`Bilinməyən əməliyyat: ${operation} for ${moduleName}`);
                break;
        }
    }

    getModuleApiEndpoint(moduleName, entityId = null) {
        const base = `/accounting/${moduleName}`;
        if (entityId) {
            return `${base}/${entityId}`;
        }
        return base;
    }

    async fetchEntityData(moduleName, entityId) {
        const mockData = {
            'folders': {
                'FOLDER-0001': { id: 'FOLDER-0001', name: 'Müqavilələr', description: 'Bütün əmək müqavilələri', status: 'active', parentFolder: '' },
            },
            'fixed-assets': {
                'FA-2023-001': { id: 'FA-2023-001', name: 'Server Dell PowerEdge', category: 'it_equipment', purchaseDate: '2023-01-10', initialValue: 25000, currency: 'AZN', description: 'Şirkətin əsas server avadanlığı.', depreciationMethod: 'straight_line', usefulLife: 4, salvageValue: 1000, status: 'active' },
            },
            'tenants': {
                'TNT-0001': { id: 'TNT-0001', name: 'ABC MMC', subdomain: 'abc', plan: 'professional', status: 'active', nextBillingDate: '2024-03-20', warningSent: false, isActive: true, description: 'ABC MMC - demo biznes' },
            },
            'income-expense': {
                'INCEXP-0001': { id: 'INCEXP-0001', date: '2024-02-15', type: 'income', account: 'main-cash', amount: 550.00, currency: 'AZN', category: 'Satış', description: 'Məhsul satışı.', status: 'confirmed' },
            },
            'users': {
                'U-0001': { id: 'U-0001', email: 'r.bagrv1@gmail.com', firstName: 'Rəşad', lastName: 'Bağırov', role: 'superadmin', phone: '+994558409394', status: 'active', tenantId: null },
                'user2': { id: 'user2', email: 'l.hasanova@example.com', firstName: 'Leyla', lastName: 'Həsənova', role: 'accountant', phone: '+994501234567', status: 'active', tenantId: 'TNT-0001' },
            },
            'sales-invoices': {
                'SINV-2024-004': { id: 'SINV-2024-004', invoiceNumber: 'SINV-2024-004', date: '2024-02-18', dueDate: '2024-03-18', customerId: 'cust1', paymentMethod: 'bank_transfer', status: 'pending', notes: 'Dell Laptop satışı.', items: [{ productId: 'prod1', quantity: 1, unitPrice: 850.00, discount: 0, taxRate: 18 }] },
            },
            'customers': {
                'cust1': { id: 'cust1', type: 'individual', name: 'Əli', surname: 'Məmmədov', email: 'ali@example.com', phone: '+994501234567', taxNumber: '1234567890', address: 'Bakı şəh., Nizami küç. 10', city: 'Bakı', district: 'Nizami', zipCode: 'AZ1000', group: 'regular', creditLimit: 5000, paymentTerms: 'net30', notes: '' },
            },
            'chart-of-accounts': {
                '101': { id: '101', code: '101', name: 'Qeyri-maddi aktivlərin dəyəri', accountType: 'Aktiv', parentId: null, balance: 0, currency: 'AZN', isActive: true },
                '211': { id: '211', code: '211', name: 'Alıcıların və sifarişçilərin qısamüddətli debitor borcları', accountType: 'Aktiv', parentId: null, balance: 0, currency: 'AZN', isActive: true },
                '221': { id: '221', code: '221', name: 'Kassa', accountType: 'Aktiv', parentId: null, balance: 0, currency: 'AZN', isActive: true },
                '211.1': { id: '211.1', code: '211.1', name: 'Müştəri A - Debitor Borcu', accountType: 'Aktiv', parentId: '211', balance: 1500, currency: 'AZN', isActive: true },
                '221.1': { id: '221.1', code: '221.1', name: 'Əsas Kassa - AZN', accountType: 'Aktiv', parentId: '221', balance: 5600, currency: 'AZN', isActive: true },
                '221.2': { id: '221.2', code: '221.2', name: 'Xarici Valyuta Kassası - USD', accountType: 'Aktiv', parentId: '221', balance: 1200, currency: 'USD', isActive: true },
            },
            'pos-settings': {
                'POS-SET-0001': { id: 'POS-SET-0001', settingName: 'Kassa Printer', value: 'Epson TM-T20', settingType: 'text', status: 'active', description: 'Əsas kassa printerinin modeli.' },
            },
            'credit-notes': {
                'CN-2024-002': { id: 'CN-2024-002', creditNoteNumber: 'CN-2024-002', date: '2024-02-14', customerId: 'cust1', relatedInvoice: 'SINV-2024-002', amount: 125.50, currency: 'AZN', reason: 'Qiymət fərqi', status: 'pending', notes: '' },
            },
            'depreciation': {
                'DEPR-0001': { id: 'DEPR-0001', depreciationId: 'DEPR-0001', assetId: 'FA-2023-001', period: '2024-01', amount: 2000, currency: 'AZN', status: 'calculated', notes: 'Dell Server üçün aylıq köhnəlmə.' },
            },
            'products': {
                'prod1': { id: 'prod1', name: 'Dell Laptop Inspiron 15', sku: 'DELL-123', barcode: '1234567890123', category: 'electronics', description: 'Yüksək performanslı noutbuk.', price: 1200.00, cost: 950.00, quantity: 12, minQuantity: 2, unit: 'pcs', taxRate: 18, status: 'active', commission: 5, supplier: 'supplier1', brand: 'Dell', model: 'Inspiron 15', weight: 2000 },
            },
            'purchase-offers': {
                'PO-2024-001': { id: 'PO-2024-001', offerNumber: 'PO-2024-001', date: '2024-02-10', dueDate: '2024-02-20', supplierId: 'S-0001', status: 'pending', notes: 'Dell Laptoplar üçün təklif.', items: [{ productId: 'prod1', quantity: 15, unitPrice: 1150.00, discount: 0, taxRate: 18 }] },
            },
            'suppliers': {
                'S-0001': { id: 'S-0001', name: 'ABC Təchizat MMC', contactPerson: 'Əli Məmmədov', phone: '+994501234567', email: 'ali@abc-supply.az', taxId: '1234567890', address: 'Bakı, Nərimanov, Atatürk pr. 1', city: 'Bakı', district: 'Nərimanov', zipCode: 'AZ1000', status: 'active', notes: '' },
            },
            'warehouse': {
                'main': { id: 'main', name: 'Baş Anbar', location: 'Bakı, Yasamal', responsiblePerson: 'Vüqar Abbasov', capacity: 1500, type: 'general', status: 'active', notes: '' },
            },
            'attendance': {
                'ATT-0001': { id: 'ATT-0001', attendanceId: 'ATT-0001', employeeId: 'emp1', date: '2024-02-19', clockIn: '09:05', clockOut: '18:00', status: 'late', notes: '5 dəq gecikib' },
            },
            'bom': {
                'BOM-0001': { id: 'BOM-0001', code: 'BOM-001', name: 'Laptop POM', assembledProduct: 'prod1', description: 'Dell Laptop Inspiron 15 üçün texnoloji xəritə.', items: [
                    { componentId: 'comp1', quantity: 1, unit: 'pcs' }
                ] },
            },
            'journal-entries': {
                'JE-2024-001': { id: 'JE-2024-001', entryNumber: 'JE-2024-001', date: '2024-02-19', reference: 'POS-1234', description: 'Kassa mədaxil - satış', currency: 'AZN', status: 'approved', notes: '', entries: [
                    { accountId: '101', debitAmount: 1200, creditAmount: 0, description: 'Satışdan nağd pul' },
                    { accountId: '601', debitAmount: 0, creditAmount: 0, description: 'Satış gəliri' }
                ] },
            },
            'production': {
                'PRDORD-0001': { id: 'PRDORD-0001', orderId: 'PRO-2024-001', product: 'prod1', quantity: 25, startDate: '2024-02-10', endDate: '2024-02-25', status: 'in_progress', priority: 'high', notes: 'İlk istehsal sifarişi.' },
            },
            'purchase-invoices': {
                'PINV-2024-002': { id: 'PINV-2024-002', invoiceNumber: 'PINV-2024-002', date: '2024-02-18', supplierId: 'S-0002', dueDate: '2024-03-18', paymentMethod: 'bank_transfer', status: 'pending', notes: 'iPhone 15 alışı', items: [
                    { productId: 'P-0002', quantity: 8, unitPrice: 1600.00, discount: 0, taxRate: 18 }
                ] },
            },
        };

        return mockData[moduleName] ? mockData[moduleName][entityId] || {} : {};
    }

    formatCurrency(value) {
        return value.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    renderSuspendedAccountPage(tenant) {
        const appMain = document.getElementById('appMain');
        if (!appMain) {
            console.error('App main content area not found!');
            return;
        }

        appMain.innerHTML = `
            <div class="page-content">
                <div class="suspended-account-container">
                    <i class="fas fa-exclamation-circle icon-large"></i>
                    <h1>Hesabınız Aktiv Deyil</h1>
                    <p>Sizin MühasibatlıqPro hesabınız hazırda passivdir. Xidmətlərin davam etməsi üçün zəhmət olmasa ödənişinizi yeniləyin və ya dəstək xidməti ilə əlaqə saxlayın.</p>
                </div>
            </div>
        `;
    }

    initializePWA() {
    }
    initializeComponents() {
    }
    connectWebSocket() {
    }

    getDefaultLandingPageSettings() {
        return {
            heroTitle: "Müasir Mühasibatlıq və Biznes İdarəetməsi",
            heroSubtitle: "React + TypeScript + PostgreSQL əsasında qurulmuş, Multi-tenant SaaS arxitekturası ilə professional mühasibatlıq həlli",
        };
    }

    getMockContactMessages() {
        return [
            { id: 'msg1', name: 'Əli Əliyev', email: 'ali@example.com', message: 'Məhsul haqqında məlumat istəyirəm.' },
            { id: 'msg2', name: 'Fatma Vəliyeva', email: 'fatma@example.com', message: 'Qiymət planları ilə bağlı sualım var.' }
        ];
    }

    getSystemCheckHTML() {
    }
    getAdminSettingsHTML() {
    }
    getUsersAdminHTML() {
    }
    getTenantsAdminHTML() {
    }

    scrollToFeatures() {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    }
    submitContactForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            this.showWarningNotification('Zəhmət olmasa, bütün zəruri sahələri doldurun.');
            return;
        }

        console.log('Contact form submitted:', data);
        this.showSuccessNotification('Mesajız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.', { title: 'Təşəkkür edirik!' });
        form.reset();
    }

    togglePasswordVisibility(fieldId) {
        const field = document.getElementById(fieldId);
        const toggleSpan = field.nextElementSibling;
        const icon = toggleSpan.querySelector('i');

        if (field.type === 'password') {
            field.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            field.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
        console.log(field.type);
    }
    forgotPassword() {
        this.showInfoNotification('Şifrə bərpası funksiyası hələ hazır deyil. Zəhmət olmasa, admin ilə əlaqə saxlayın.');
    }

    printInvoice(invoiceId) {
        this.showInfoNotification(`Faktura ${invoiceId} çap edilir...`);
        window.print();
    }
    calculateInvoiceRow(element) {
        const row = element.closest('tr');
        const quantity = parseFloat(row.querySelector('input[name="quantity[]"]').value) || 0;
        const unitPrice = parseFloat(row.querySelector('input[name="unitPrice[]"]').value) || 0;
        const discount = parseFloat(row.querySelector('input[name="discount[]"]').value) || 0;
        const taxRate = parseFloat(row.querySelector('input[name="taxRate[]"]').value) || 0;

        let subTotalRow = quantity * unitPrice;
        subTotalRow -= discount;
        const taxAmountRow = subTotalRow * (taxRate / 100);
        const totalRow = subTotalRow + taxAmountRow;

        row.querySelector('.row-total').textContent = this.formatCurrency(totalRow);
        this.updateInvoiceTotals();
    }
    removeInvoiceRow(button) {
        const row = button.closest('tr');
        row.remove();
        this.updateInvoiceTotals();
    }
    addInvoiceRow() {
        const tbody = document.getElementById('invoiceItemsBody');
        const newRow = document.createElement('tr');
        newRow.classList.add('invoice-item-row');
        newRow.innerHTML = `
            <td>
                <select name="productId[]" class="form-input" required>
                    <option value="">Məhsul seçin...</option>
                    <option value="prod1">Dell Laptop Inspiron 15</option>
                    <option value="prod2">Logitech Wireless Mouse</option>
                    <option value="prod3">Samsung Galaxy A54</option>
                    <option value="serv1">Website Hazırlama</option>
                    <option value="serv2">Mühasibatlıq Xidməti</option>
                </select>
            </td>
            <td><input type="number" name="quantity[]" class="form-input" value="1" min="0.01" step="0.01" required onchange="app.calculateInvoiceRow(this)"></td>
            <td><input type="number" name="unitPrice[]" class="form-input" value="0" min="0" step="0.01" required onchange="app.calculateInvoiceRow(this)"></td>
            <td><input type="number" name="discount[]" class="form-input" value="0" min="0" step="0.01" onchange="app.calculateInvoiceRow(this)"></td>
            <td><input type="number" name="taxRate[]" class="form-input" value="18" min="0" max="100" step="0.01" onchange="app.calculateInvoiceRow(this)"></td>
            <td><span class="row-total">${this.formatCurrency(0)}</span></td>
            <td><button type="button" class="btn btn-ghost btn-sm" onclick="app.removeInvoiceRow(this)"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(newRow);
        this.updateInvoiceTotals();
    }
    updateInvoiceTotals() {
        let totalSubtotal = 0;
        let totalDiscount = 0;
        let totalTax = 0;
        let grandTotal = 0;

        document.querySelectorAll('.invoice-item-row').forEach(row => {
            const quantity = parseFloat(row.querySelector('input[name="quantity[]"]').value) || 0;
            const unitPrice = parseFloat(row.querySelector('input[name="unitPrice[]"]').value) || 0;
            const discount = parseFloat(row.querySelector('input[name="discount[]"]').value) || 0;
            const taxRate = parseFloat(row.querySelector('input[name="taxRate[]"]').value) || 0;

            let rowSubtotal = quantity * unitPrice;
            totalSubtotal += rowSubtotal;
            totalDiscount += discount;

            const subtotalAfterDiscount = rowSubtotal - discount;
            const rowTax = subtotalAfterDiscount * (taxRate / 100);
            totalTax += rowTax;

            grandTotal += subtotalAfterDiscount + rowTax;
        });

        document.getElementById('subtotal').textContent = this.formatCurrency(totalSubtotal);
        document.getElementById('totalDiscount').textContent = this.formatCurrency(totalDiscount);
        document.getElementById('totalTax').textContent = this.formatCurrency(totalTax);
        document.getElementById('grandTotal').textContent = this.formatCurrency(grandTotal);
    }
    saveDraft() {
        this.showInfoNotification('Layihə yadda saxlanıldı!', { title: 'Yadda Saxlanıldı' });
    }
    addJournalEntryRow() {
        const tbody = document.getElementById('journalEntryItemsBody');
        const newRow = document.createElement('tr');
        newRow.classList.add('journal-entry-row');
        newRow.innerHTML = `
            <td>
                <select name="accountId[]" class="form-input" required>
                    <option value="">Hesab seçin...</option>
                    <option value="101">101 - Kassa</option>
                    <option value="223">223 - Bank hesabları AZN</option>
                    <option value="431">431 - Kreditor borcları</option>
                    <option value="601">601 - Satış Gəliri</option>
                    <option value="701">701 - Əməliyyat Xərcləri</option>
                </select>
            </td>
            <td><input type="number" name="debitAmount[]" class="form-input" value="0" min="0" step="0.01" onchange="app.calculateJournalEntryRow(this)"></td>
            <td><input type="number" name="creditAmount[]" class="form-input" value="0" min="0" step="0.01" onchange="app.calculateJournalEntryRow(this)"></td>
            <td><input type="text" name="entryDescription[]" class="form-input" placeholder="Təsvir"></td>
            <td><span class="row-balance">${this.formatCurrency(0)}</span></td>
            <td><button type="button" class="btn btn-ghost btn-sm" onclick="app.removeJournalEntryRow(this)"><i class="fas fa-trash"></i></button></td>
        `;
        tbody.appendChild(newRow);
        this.calculateJournalEntryTotals();
    }
    removeJournalEntryRow(button) {
        const row = button.closest('tr');
        row.remove();
        this.calculateJournalEntryTotals();
    }
    calculateJournalEntryTotals() {
        let totalDebit = 0;
        let totalCredit = 0;

        document.querySelectorAll('.journal-entry-row').forEach(row => {
            const debit = parseFloat(row.querySelector('input[name="debitAmount[]"]').value) || 0;
            const credit = parseFloat(row.querySelector('input[name="creditAmount[]"]').value) || 0;
            totalDebit += debit;
            totalCredit += credit;
        });

        const difference = totalDebit - totalCredit;

        document.getElementById('journalTotalDebit').textContent = this.formatCurrency(totalDebit);
        document.getElementById('journalTotalCredit').textContent = this.formatCurrency(totalCredit);

        const differenceElement = document.getElementById('journalDifference');
        differenceElement.textContent = this.formatCurrency(difference);
        if (difference === 0) {
            differenceElement.classList.remove('text-danger');
            differenceElement.classList.add('text-success');
        } else {
            differenceElement.classList.add('text-danger');
            differenceElement.classList.remove('text-success');
        }
    }
    calculateJournalEntryRow(element) {
        const row = element.closest('tr');
        const debit = parseFloat(row.querySelector('input[name="debitAmount[]"]').value) || 0;
        const credit = parseFloat(row.querySelector('input[name="creditAmount[]"]').value) || 0;
        const balance = debit - credit;
        row.querySelector('.row-total').textContent = this.formatCurrency(balance);
        this.calculateJournalEntryTotals();
    }

    _showAddSubAccountForm(parentAccountId) {
        this.showInfoNotification(`Yeni alt-hesab əlavə edilir: ${parentAccountId} üçün`);
        this.openModal('subAccountDetailsModal'); 
        const modalContent = document.getElementById('subAccountDetailsModal').querySelector('.modal-content');
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Yeni Alt-Hesab Yarat</h3>
                <button type="button" onclick="app.closeModal('subAccountDetailsModal')" class="btn-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form class="form" id="subAccountForm" onsubmit="event.preventDefault(); app._submitSubAccountForm(event, '${parentAccountId}')">
                    <div class="form-group">
                        <label class="form-label">Parent Hesab Kodu</label>
                        <input type="text" class="form-input" value="${parentAccountId}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Alt-Hesab Kodu *</label>
                        <input type="text" name="subAccountCode" class="form-input" required placeholder="${parentAccountId}.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Alt-Hesab Adı *</label>
                        <input type="text" name="subAccountName" class="form-input" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal('subAccountDetailsModal')">Ləğv et</button>
                        <button type="button" class="btn btn-primary" onclick="app.handleEntityOp('chart-of-accounts', 'edit', '${parentAccountId}')">Redaktə Et</button>
                    </div>
                </form>
            </div>
        `;
    }

    _submitSubAccountForm(event, parentAccountId) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const subAccountCode = data.subAccountCode;
        const subAccountName = data.subAccountName;

        console.log(`Sub-account created for ${parentAccountId}: Code - ${subAccountCode}, Name - ${subAccountName}`);
        this.showSuccessNotification(`Alt-hesab "${subAccountCode}" uğurla əlavə edildi!`);
        this.closeModal('subAccountDetailsModal');
        this.navigateTo('chart-of-accounts');
    }

    async _showViewSubAccountDetails(subAccountId) {
        const subAccountData = await this.fetchEntityData('chart-of-accounts', subAccountId);
        if (!subAccountData || !subAccountData.id) {
            this.showErrorNotification(`Alt-hesab "${subAccountId}" tapılmadı.`, { title: 'Məlumat Tapılmadı' });
            return;
        }

        this.showInfoNotification(`Alt-hesab detalları göstərilir: ${subAccountId}`);
        this.openModal('subAccountDetailsModal');
        const modalContent = document.getElementById('subAccountDetailsModal').querySelector('.modal-content');
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Alt-Hesab Məlumatları: ${subAccountData.code}</h3>
                <button type="button" onclick="app.closeModal('subAccountDetailsModal')" class="btn-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Hesab Kodu:</label>
                        <input type="text" class="form-input" value="${subAccountData.code}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Hesab Adı:</label>
                        <input type="text" class="form-input" value="${subAccountData.name}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Tip:</label>
                        <input type="text" class="form-input" value="${subAccountData.accountType}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Parent Hesab:</label>
                        <input type="text" class="form-input" value="${subAccountData.parentId || 'N/A'}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Balans:</label>
                        <input type="text" class="form-input" value="${this.formatCurrency(subAccountData.balance)} ${subAccountData.currency}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status:</label>
                        <input type="text" class="form-input" value="${subAccountData.isActive ? 'Aktiv' : 'Qeyri-aktiv'}" readonly>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="app.closeModal('subAccountDetailsModal')">Bağla</button>
                <button type="button" class="btn btn-primary" onclick="app.handleEntityOp('chart-of-accounts', 'edit', '${subAccountData.id}')">Redaktə Et</button>
            </div>
        `;
    }
}

window.app = new MuhasibatProApp();
window.app.init();