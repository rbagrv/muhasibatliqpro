// Dashboard module logic (example placeholder)
export function bootstrap() {
    // Dashboard module initialization (if necessary)
    // Called when module is loaded
}

export function onNavigateIn() {
    // Called when dashboard module becomes active
    // E.g. refresh stats
}

export function onNavigateOut() {
    // Called when switching away from dashboard
}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>İdarə Paneli</h1>
                <p>Biznesinizin ümumi vəziyyətinə sürətli baxış.</p>
            </div>

            <!-- Overall Business Performance -->
            <div class="module-section">
                <h2 class="section-title">Ümumi Göstəricilər</h2>
                <div class="dashboard-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon"><i class="fas fa-dollar-sign"></i></div>
                        <div class="stat-content">
                            <h3>₼45,230</h3>
                            <p>Aylıq Gəlir</p>
                            <div class="stat-change positive">+12.5% artım</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                        <div class="stat-content">
                            <h3>89</h3>
                            <p>Yeni Müştəri</p>
                            <div class="stat-change positive">+8 yeni</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon"><i class="fas fa-receipt"></i></div>
                        <div class="stat-content">
                            <h3>156</h3>
                            <p>Fakturalar</p>
                            <div class="stat-change neutral">Bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div class="stat-content">
                            <h3>5</h3>
                            <p>Ödənməmiş</p>
                            <div class="stat-change negative">Vaxtı keçib</div>
                        </div>
                    </div>
                    <div class="stat-card purple">
                        <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="stat-content">
                            <h3>₼12,450</h3>
                            <p>Xalis Mənfəət</p>
                            <div class="stat-change positive">+22% artım</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sales & Purchase Statistics -->
            <div class="module-section">
                <h2 class="section-title">Satış və Alış Statistikası</h2>
                <div class="dashboard-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon"><i class="fas fa-file-invoice-dollar"></i></div>
                        <div class="stat-content">
                            <h3>67</h3>
                            <p>Satış Fakturası</p>
                            <div class="stat-change positive">+18% artım</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon"><i class="fas fa-receipt"></i></div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Alış Fakturası</p>
                            <div class="stat-change positive">+12% artım</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                        <div class="stat-content">
                            <h3>234</h3>
                            <p>Aktiv Müştəri</p>
                            <div class="stat-change positive">+8% artım</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon"><i class="fas fa-handshake"></i></div>
                        <div class="stat-content">
                            <h3>10</h3>
                            <p>Gözləyən Təkliflər</p>
                            <div class="stat-change neutral">Yeni</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Inventory & Production Statistics -->
            <div class="module-section">
                <h2 class="section-title">Anbar və İstehsalat Statistikası</h2>
                <div class="dashboard-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon"><i class="fas fa-boxes"></i></div>
                        <div class="stat-content">
                            <h3>156</h3>
                            <p>Cari Stok Növü</p>
                            <div class="stat-change neutral">Ümumi</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon"><i class="fas fa-triangle-exclamation"></i></div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Az Stok Məhsul</p>
                            <div class="stat-change negative">Təcili sifariş</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon"><i class="fas fa-industry"></i></div>
                        <div class="stat-content">
                            <h3>34</h3>
                            <p>Aktiv İstehsalat</p>
                            <div class="stat-change positive">+8 yeni</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="stat-content">
                            <h3>85%</h3>
                            <p>İstehsal Effektivliyi</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Financial & Accounting Statistics -->
            <div class="module-section">
                <h2 class="section-title">Maliyyə və Mühasibat Statistikası</h2>
                <div class="dashboard-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                        <div class="stat-content">
                            <h3>₼45,670</h3>
                            <p>Ümumi Kassa/Bank</p>
                            <div class="stat-change positive">+8.5% artım</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon"><i class="fas fa-book"></i></div>
                        <div class="stat-content">
                            <h3>234</h3>
                            <p>Jurnal Yazılışı</p>
                            <div class="stat-change positive">+18 bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon"><i class="fas fa-sitemap"></i></div>
                        <div class="stat-content">
                            <h3>127</h3>
                            <p>Aktiv Hesab</p>
                            <div class="stat-change neutral">Hesablar planı</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon"><i class="fas fa-percent"></i></div>
                        <div class="stat-content">
                            <h3>₼8,140</h3>
                            <p>Aylıq ƏDV</p>
                            <div class="stat-change neutral">Təqdim gözləyir</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- HR & Other Statistics -->
            <div class="module-section">
                <h2 class="section-title">Kadrlar və Digər Statistikalar</h2>
                <div class="dashboard-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon"><i class="fas fa-user-friends"></i></div>
                        <div class="stat-content">
                            <h3>89</h3>
                            <p>Cəmi İşçi</p>
                            <div class="stat-change positive">+5 yeni</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon"><i class="fas fa-file-signature"></i></div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Aktiv Müqavilə</p>
                            <div class="stat-change neutral">HR</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon"><i class="fas fa-user-clock"></i></div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Bu Gün Gecikən</p>
                            <div class="stat-change negative">Davamiyyət</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon"><i class="fas fa-cash-register"></i></div>
                        <div class="stat-content">
                            <h3>₼5,200</h3>
                            <p>Gündəlik POS Satış</p>
                            <div class="stat-change positive">Bugün</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="directory-card">
                    <div class="card-header">
                        <h3>Son Aktivlər</h3>
                    </div>
                    <div class="card-content">
                        <ul class="simple-list">
                            <li><i class="fas fa-shopping-cart"></i> SINV-2024-005: ₼2,891.00</li>
                            <li><i class="fas fa-receipt"></i> PINV-2024-002: ₼12,800.00</li>
                            <li><i class="fas fa-file-invoice-dollar"></i> SO-2024-006: ₼15,500.00</li>
                            <li><i class="fas fa-exchange-alt"></i> TRF-2024-001: ₼1,000.00</li>
                        </ul>
                    </div>
                </div>
                <div class="directory-card">
                    <div class="card-header">
                        <h3>Sistem Analitikası</h3>
                    </div>
                    <div class="card-content">
                        <div class="api-stats">
                            <div class="api-stat-item">
                                <span class="api-stat-label">API Status</span>
                                <span class="api-stat-value text-success">Aktiv</span>
                            </div>
                            <div class="api-stat-item">
                                <span class="api-stat-label">WebSocket</span>
                                <span class="api-stat-value text-success">Aktiv</span>
                            </div>
                            <div class="api-stat-item">
                                <span class="api-stat-label">Database</span>
                                <span class="api-stat-value text-success">Aktiv</span>
                            </div>
                            <div class="api-stat-item">
                                <span class="api-stat-label">Yüklənmə vaxtı</span>
                                <span class="api-stat-value">~200ms</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="directory-card">
                    <div class="card-header">
                        <h3>Ödənilməmiş Fakturalar</h3>
                    </div>
                    <div class="card-content">
                        <ul class="simple-list">
                            <li><i class="fas fa-exclamation-triangle text-danger"></i> SINV-2024-006: ₼796.50 (vaxtı keçib)</li>
                            <li><i class="fas fa-clock text-warning"></i> SINV-2024-004: ₼1,003.00 (gözləyir)</li>
                        </ul>
                    </div>
                </div>
                <div class="directory-card">
                    <div class="card-header">
                        <h3>Son Jurnal Qeydləri</h3>
                    </div>
                    <div class="card-content">
                        <ul class="simple-list">
                            <li><i class="fas fa-book"></i> JE-2024-001: Kassa mədaxil - satış</li>
                            <li><i class="fas fa-book"></i> JE-2024-002: Bank köçürməsi</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}