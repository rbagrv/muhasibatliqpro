export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Telegram Bot İdarəetməsi</h1>
                <p>Telegram bot konfigurası və bildiriş parametrləri.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.testTelegramBot()">
                        <i class="fab fa-telegram"></i> Bot Test Et
                    </button>
                    <button class="btn btn-primary" onclick="app.saveTelegramSettings()">
                        <i class="fas fa-save"></i> Yadda Saxla
                    </button>
                </div>
            </div>
            
            <div class="telegram-grid">
                <div class="telegram-card">
                    <div class="card-header">
                        <h3>Bot Status</h3>
                        <div class="bot-status online">
                            <i class="fas fa-circle"></i>
                            Online
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="telegram-stats">
                            <div class="telegram-stat">
                                <div class="stat-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>127</h4>
                                    <p>Aktiv İstifadəçi</p>
                                </div>
                            </div>
                            <div class="telegram-stat">
                                <div class="stat-icon">
                                    <i class="fas fa-bell"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>1,234</h4>
                                    <p>Göndərilən Bildiriş</p>
                                </div>
                            </div>
                            <div class="telegram-stat">
                                <div class="stat-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="stat-info">
                                    <h4>24/7</h4>
                                    <p>İşləmə Vaxtı</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="telegram-card">
                    <div class="card-header">
                        <h3>Bot Tənzimləmələri</h3>
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label class="form-label">Bot Token</label>
                            <input type="password" class="form-input" value="1234567890:AABBCCDDEEFFgghhiijjkkllmmnnoopp" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Webhook URL</label>
                            <input type="url" class="form-input" value="https://api.muhasibatliqpro.az/webhook/telegram" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Admin Chat ID</label>
                            <input type="text" class="form-input" value="-1001234567890">
                        </div>
                    </div>
                </div>
                
                <div class="telegram-card">
                    <div class="card-header">
                        <h3>Bildiriş Növləri</h3>
                    </div>
                    <div class="card-content">
                        <div class="notification-types">
                            <div class="notification-type">
                                <div class="type-info">
                                    <span>Yeni Satış</span>
                                    <small>Hər yeni satış üçün bildiriş</small>
                                </div>
                                <div class="switch">
                                    <input type="checkbox" id="newSales" checked>
                                    <span class="slider"></span>
                                </div>
                            </div>
                            <div class="notification-type">
                                <div class="type-info">
                                    <span>Az Stok</span>
                                    <small>Məhsul azaldığında xəbərdarlıq</small>
                                </div>
                                <div class="switch">
                                    <input type="checkbox" id="lowStock" checked>
                                    <span class="slider"></span>
                                </div>
                            </div>
                            <div class="notification-type">
                                <div class="type-info">
                                    <span>Gündəlik Hesabat</span>
                                    <small>Hər gün saat 18:00-da</small>
                                </div>
                                <div class="switch">
                                    <input type="checkbox" id="dailyReport" checked>
                                    <span class="slider"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="telegram-card">
                    <div class="card-header">
                        <h3>Son Fəaliyyətlər</h3>
                    </div>
                    <div class="card-content">
                        <div class="activity-list">
                            <div class="activity-item">
                                <div class="activity-icon success">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <div class="activity-content">
                                    <p>Yeni satış bildirişi göndərildi</p>
                                    <div class="activity-time">2 dəqiqə əvvəl</div>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </div>
                                <div class="activity-content">
                                    <p>Az stok xəbərdarlığı göndərildi</p>
                                    <div class="activity-time">15 dəqiqə əvvəl</div>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon primary">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                                <div class="activity-content">
                                    <p>Gündəlik hesabat göndərildi</p>
                                    <div class="activity-time">6 saat əvvəl</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

