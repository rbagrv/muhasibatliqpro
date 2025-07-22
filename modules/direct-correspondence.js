export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Birbaşa Müxabirləşmələr</h1>
            <p>Giriş və çıxış əməliyyatları üçün müxabirləşmənin avtomatik/proqram tərəfindən aparılması.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('direct-correspondence', 'create')">
                <i class="fas fa-plus"></i> Yeni Müxabirləşmə
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Əməliyyat #</th>
                        <th>Məbləğ</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>OP-2024-001</td>
                        <td>₼1,200</td>
                        <td><span class="status-badge completed">Tam</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni Birbaşa Müxabirləşmə' : action === 'edit' ? 'Birbaşa Müxabirləşməni Redaktə Et' : 'Birbaşa Müxabirləşmə Məlumatları';
    
    const newId = action === 'create' ? 'DCORR-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni birbaşa müxabirləşmə əlavə edin' : 'Birbaşa müxabirləşmə məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('direct-correspondence')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="directCorrespondenceForm" onsubmit="app.submitModuleForm(event, 'direct-correspondence', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Müxabirləşmə Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Əməliyyat №</label>
                                <input type="text" name="operationId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Debet Hesabı *</label>
                                <select name="debitAccount" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="101" ${data.debitAccount === '101' ? 'selected' : ''}>101 - Kassa</option>
                                    <option value="223" ${data.debitAccount === '223' ? 'selected' : ''}>223 - Bank hesabları AZN</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Kredit Hesabı *</label>
                                <select name="creditAccount" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="601" ${data.creditAccount === '601' ? 'selected' : ''}>601 - Satış</option>
                                    <option value="701" ${data.creditAccount === '701' ? 'selected' : ''}>701 - Xərclər</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məbləğ *</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || '0'}" min="0.01" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Tamamlandı</option>
                                    <option value="cancelled" ${data.status === 'cancelled' ? 'selected' : ''}>Ləğv edilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('direct-correspondence')">
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