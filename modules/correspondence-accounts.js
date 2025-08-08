export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Müxabirləşmə Hesabları</h1>
            <p>Maliyyə əməliyyatlarında istifadə olunan müxabirləşmə hesabları.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('correspondence-accounts', 'create')">
                <i class="fas fa-plus"></i> Yeni Hesab
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Hesab Nömrəsi</th>
                        <th>Ad</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>41001</td>
                        <td>Bank hesabı 1</td>
                        <td><span class="status-badge active">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('correspondence-accounts', 'view', 'CORR-0001')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('correspondence-accounts', 'edit', 'CORR-0001')"><i class="fas fa-edit"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `;
}

// FORM
export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Müxabirləşmə Hesabı' : action === 'edit' ? 'Müxabirləşmə Hesabını Redaktə Et' : 'Müxabirləşmə Hesabı Məlumatları';
    
    const newId = action === 'create' ? 'CORR-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni müxabirləşmə hesabı əlavə edin' : 'Müxabirləşmə hesabı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('correspondence-accounts')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="correspondenceAccountsForm" onsubmit="app.submitForm(event, 'correspondence-accounts', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Hesab Nömrəsi *</label>
                                <input type="text" name="accountNumber" class="form-input" value="${data.accountNumber || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab Adı *</label>
                                <input type="text" name="accountName" class="form-input" value="${data.accountName || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip</label>
                                <select name="type" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="asset" ${data.type === 'asset' ? 'selected' : ''}>Aktiv</option>
                                    <option value="liability" ${data.type === 'liability' ? 'selected' : ''}>Öhdəlik</option>
                                    <option value="equity" ${data.type === 'equity' ? 'selected' : ''}>Kapital</option>
                                    <option value="revenue" ${data.type === 'revenue' ? 'selected' : ''}>Gəlir</option>
                                    <option value="expense" ${data.type === 'expense' ? 'selected' : ''}>Xərc</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir</label>
                                <textarea name="description" class="form-textarea" ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('correspondence-accounts')">
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

