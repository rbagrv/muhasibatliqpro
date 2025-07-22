export function bootstrap() {}
export function onNavigateIn() {
    // When navigating into the module, load settings
    app.loadTelegramSettings();
}
export function onNavigateOut() {}

export function getHTML() {
    const availableNotificationTypes = [
        { id: 'new_sales', label: 'Yeni Satış' },
        { id: 'low_stock', label: 'Az Stok' },
        { id: 'daily_report', label: 'Gündəlik Hesabat' },
        { id: 'overdue_invoice', label: 'Gecikmiş Faktura' }
    ];

    // Placeholder data, will be updated by loadTelegramSettings
    const settings = {
        telegramChatId: '',
        telegramNotificationsEnabled: false,
        telegramNotificationTypes: []
    };

    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Telegram Bot İdarəetməsi</h1>
                <p>Telegram bot konfigurası və bildiriş parametrləri.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.modules.telegram.testTelegramBot()">
                        <i class="fab fa-telegram"></i> Bot Test Et
                    </button>
                    <button class="btn btn-primary" onclick="app.modules.telegram.saveTelegramSettings()">
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
                            <label class="form-label">Telegram Chat ID</label>
                            <input type="text" class="form-input" id="telegramChatId" value="${settings.telegramChatId || ''}" placeholder="Məsələn: -1234567890">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Bildirişlər Aktivdir</label>
                            <select class="form-input" id="telegramNotificationsEnabled">
                                <option value="true" ${settings.telegramNotificationsEnabled ? 'selected' : ''}>Bəli</option>
                                <option value="false" ${!settings.telegramNotificationsEnabled ? 'selected' : ''}>Xeyr</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="telegram-card">
                    <div class="card-header">
                        <h3>Bildiriş Növləri</h3>
                    </div>
                    <div class="card-content">
                        <div class="notification-types">
                            ${availableNotificationTypes.map(type => `
                                <div class="notification-type">
                                    <div class="type-info">
                                        <span>${type.label}</span>
                                        <small>${type.id === 'new_sales' ? 'Hər yeni satış üçün bildiriş' : 
                                                type.id === 'low_stock' ? 'Məhsul azaldığında xəbərdarlıq' :
                                                type.id === 'daily_report' ? 'Hər gün saat 18:00-da' :
                                                type.id === 'overdue_invoice' ? 'Vaxtı keçmiş fakturalar barədə' : ''}</small>
                                    </div>
                                    <div class="switch">
                                        <input type="checkbox" id="${type.id}Notification" class="notification-type-checkbox" value="${type.id}" ${settings.telegramNotificationTypes.includes(type.id) ? 'checked' : ''}>
                                        <span class="slider"></span>
                                    </div>
                                </div>
                            `).join('')}
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

// Function to load Telegram settings for the current tenant
export async function loadTelegramSettings() {
    if (!app.currentTenant || !app.currentTenant.id) {
        app.showErrorNotification('Tenant seçilməyib. Telegram tənzimləmələri yüklənmədi.', { title: 'Xəta' });
        return;
    }

    try {
        const settings = await app.fetchApiData(`/integrations/telegram-settings/${app.currentTenant.id}`);
        if (settings) {
            document.getElementById('telegramChatId').value = settings.telegram_chat_id || '';
            document.getElementById('telegramNotificationsEnabled').value = settings.telegram_notifications_enabled ? 'true' : 'false';

            const checkboxes = document.querySelectorAll('.notification-type-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = settings.telegram_notification_types.includes(checkbox.value);
            });
            app.showSuccessNotification('Telegram tənzimləmələri yükləndi.');
        } else {
            app.showErrorNotification('Telegram tənzimləmələri yüklənə bilmədi.', { title: 'Yükləmə Xətası' });
        }
    } catch (error) {
        console.error('Failed to load Telegram settings:', error);
        app.showErrorNotification(`Telegram tənzimləmələrini yükləyərkən xəta: ${error.message}`, { title: 'API Xətası' });
    }
}

// Function to save Telegram settings for the current tenant
export async function saveTelegramSettings() {
    if (!app.currentTenant || !app.currentTenant.id) {
        app.showErrorNotification('Tenant seçilməyib. Telegram tənzimləmələri yadda saxlanıla bilmədi.', { title: 'Xəta' });
        return;
    }

    const telegramChatId = document.getElementById('telegramChatId').value.trim();
    const telegramNotificationsEnabled = document.getElementById('telegramNotificationsEnabled').value === 'true';
    const telegramNotificationTypes = Array.from(document.querySelectorAll('.notification-type-checkbox:checked')).map(cb => cb.value);

    const data = {
        telegramChatId,
        telegramNotificationsEnabled,
        telegramNotificationTypes
    };

    try {
        const response = await app.fetchApiData(`/integrations/telegram-settings/${app.currentTenant.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response) {
            app.showSuccessNotification('Telegram tənzimləmələri uğurla yadda saxlanıldı!');
            // Update local app.currentBusinessSettings as well
            Object.assign(app.currentBusinessSettings, {
                telegramChatId: response.settings.telegram_chat_id,
                telegramNotificationsEnabled: response.settings.telegram_notifications_enabled,
                telegramNotificationTypes: response.settings.telegram_notification_types
            });
        } else {
            app.showErrorNotification('Telegram tənzimləmələri yadda saxlanıla bilmədi.', { title: 'Saxlama Xətası' });
        }
    } catch (error) {
        console.error('Failed to save Telegram settings:', error);
        app.showErrorNotification(`Telegram tənzimləmələrini yadda saxlayarkən xəta: ${error.message}`, { title: 'API Xətası' });
    }
}

// Function to test the Telegram bot for the current tenant
export async function testTelegramBot() {
    if (!app.currentTenant || !app.currentTenant.id) {
        app.showErrorNotification('Tenant seçilməyib. Bot test edilə bilmədi.', { title: 'Xəta' });
        return;
    }
    
    const telegramChatId = document.getElementById('telegramChatId').value.trim();
    if (!telegramChatId) {
        app.showWarningNotification('Zəhmət olmasa, Telegram Chat ID daxil edin.', { title: 'Boş ID' });
        return;
    }

    app.showInfoNotification('Test mesajı göndərilir...', { duration: 2000 });

    try {
        const response = await app.fetchApiData('/integrations/telegram/test-send', { // Assuming a test send API endpoint exists
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                businessId: app.currentTenant.id,
                chatId: telegramChatId,
                message: `MühasibatlıqPro Bot Test Mesajı! Tenant: ${app.currentTenant.name}`
            })
        });

        if (response && response.success) {
            app.showSuccessNotification('Test mesajı uğurla göndərildi. Telegram-ınızı yoxlayın!', { title: 'Göndərildi' });
        } else {
            app.showErrorNotification(response?.message || 'Test mesajı göndərilə bilmədi.', { title: 'Göndərmə Xətası' });
        }
    } catch (error) {
        console.error('Failed to send test Telegram message:', error);
        app.showErrorNotification(`Test mesajı göndərərkən xəta: ${error.message}`, { title: 'API Xətası' });
    }
}