export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Kassa Hesabları</h1>
                <p>Kassa hesabları və bank hesabları üzərindən əməliyyatların icra olunması.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('cash-accounts', 'transfer')">
                        <i class="fas fa-exchange-alt"></i>
                        Köçürmə
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('cash-accounts', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Hesab
                    </button>
                </div>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-university"></i>
                        </div>
                        <div class="stat-content">
                            <h3>6</h3>
                            <p>Aktiv Hesab</p>
                            <div class="stat-change positive">2 bank, 4 kassa</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼45,670</h3>
                            <p>Ümumi Balans</p>
                            <div class="stat-change positive">+8.5% artım</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼12,340</h3>
                            <p>Nağd Pul</p>
                            <div class="stat-change neutral">Kassalarda</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Minimum Limitdə</p>
                            <div class="stat-change negative">Diqqət!</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Növ</th>
                            <th>Balans</th>
                            <th>Limit</th>
                            <th>Valyuta</th>
                            <th>Son Əməliyyat</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Əsas Kassa</td>
                            <td>Nağd</td>
                            <td>₼5,600.00</td>
                            <td>₼1,000.00</td>
                            <td>AZN</td>
                            <td>19.02.2024 15:30</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'view', 'main-cash')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'edit', 'main-cash')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'transactions', 'main-cash')">
                                        <i class="fas fa-list"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>KapitalBank AZN</td>
                            <td>Bank</td>
                            <td>₼23,450.00</td>
                            <td>₼5,000.00</td>
                            <td>AZN</td>
                            <td>19.02.2024 14:15</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'view', 'kapital-azn')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'edit', 'kapital-azn')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'transactions', 'kapital-azn')">
                                        <i class="fas fa-list"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Rabitəbank USD</td>
                            <td>Bank</td>
                            <td>$8,750.00</td>
                            <td>$1,000.00</td>
                            <td>USD</td>
                            <td>19.02.2024 11:45</td>
                            <td><span class="status-badge warning">Limit</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'view', 'rabita-usd')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'edit', 'rabita-usd')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('cash-accounts', 'transactions', 'rabita-usd')">
                                        <i class="fas fa-list"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-actions">
                <div class="bulk-actions">
                    <h4>Toplu Əməliyyatlar</h4>
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('cash-accounts', 'bulk-balance')">
                            <i class="fas fa-sync"></i>
                            Balansı Yenilə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('cash-accounts', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('cash-accounts', 'bulk-statements')">
                            <i class="fas fa-file-alt"></i>
                            Çıxarış
                        </button>
                    </div>
                </div>
            </div>

            <!-- Transfer Modal -->
            <div id="transferModal" class="modal-overlay" style="display: none;">
                <div class="modal-container">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Hesablar Arası Köçürmə</h3>
                            <button class="btn-close" onclick="app.closeTransferModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="transferForm" onsubmit="app.processTransfer(event)">
                                <div class="form-group">
                                    <label class="form-label">Çıxış Hesabı</label>
                                    <select class="form-input" name="fromAccount" required>
                                        <option value="main-cash">Əsas Kassa (₼5,600.00)</option>
                                        <option value="kapital-azn">KapitalBank AZN (₼23,450.00)</option>
                                        <option value="rabita-usd">Rabitəbank USD ($8,750.00)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Daxil Hesabı</label>
                                    <select class="form-input" name="toAccount" required>
                                        <option value="kapital-azn">KapitalBank AZN (₼23,450.00)</option>
                                        <option value="main-cash">Əsas Kassa (₼5,600.00)</option>
                                        <option value="rabita-usd">Rabitəbank USD ($8,750.00)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Məbləğ</label>
                                    <input type="number" class="form-input" name="amount" step="0.01" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Qeyd</label>
                                    <textarea class="form-input" name="note" rows="3"></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onclick="app.closeTransferModal()">
                                        Ləğv et
                                    </button>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-exchange-alt"></i>
                                        Köçür
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// FORM
export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Kassa/Bank Hesabı' : action === 'edit' ? 'Hesabı Redaktə Et' : 'Hesab Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni kassa və ya bank hesabı məlumatlarını daxil edin' : 'Hesab məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('cash-accounts')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="cashAccountForm" onsubmit="app.submitModuleForm(event, 'cash-accounts', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Hesab Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Hesab ID</label>
                                <input type="text" name="accountIdDisplay" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab Növü *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="cash" ${data.type === 'cash' ? 'selected' : ''}>Kassa</option>
                                    <option value="bank" ${data.type === 'bank' ? 'selected' : ''}>Bank</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta *</label>
                                <select name="currency" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                    <option value="EUR" ${data.currency === 'EUR' ? 'selected' : ''}>EUR</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Başlanğıc Balans *</label>
                                <input type="number" name="balance" class="form-input" value="${data.balance || '0'}" min="0" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Minimum Limit</label>
                                <input type="number" name="minLimit" class="form-input" value="${data.minLimit || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Bank Məlumatları (Əgər bank hesabıdırsa)</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Bank Adı</label>
                                <input type="text" name="bankName" class="form-input" value="${data.bankName || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab Nömrəsi (IBAN)</label>
                                <input type="text" name="accountNumber" class="form-input" value="${data.accountNumber || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Qeydlər</label>
                                <textarea name="notes" class="form-textarea" ${isView ? 'readonly' : ''}>${data.notes || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('cash-accounts')">
                                <i class="fas fa-times"></i> Ləğv et
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> ${action === 'create' ? 'Yarat' : 'Yadda Saxla'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}