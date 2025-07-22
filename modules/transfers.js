export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Hesablararası Köçürmələr</h1>
                <p>Kassa və bank hesabları arasında köçürmə əməliyyatları.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('transfers', 'create')">
                    <i class="fas fa-plus"></i> Yeni Köçürmə
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Tarix</th>
                            <th>Çıxış Hesabı</th>
                            <th>Daxil Hesabı</th>
                            <th>Məbləğ</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>14.02.2024</td>
                            <td>Kassa</td>
                            <td>KapitalBank</td>
                            <td>₼1,000.00</td>
                            <td><span class="status-badge success">Uğurlu</span></td>
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
    const title = action === 'create' ? 'Yeni Hesablararası Köçürmə' : action === 'edit' ? 'Köçürməni Redaktə Et' : 'Köçürmə Məlumatları';
    
    const newId = action === 'create' ? 'TRF-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni hesablararası köçürmə qeyd edin' : 'Köçürmə məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('transfers')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="transfersForm" onsubmit="app.submitModuleForm(event, 'transfers', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Köçürmə Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Köçürmə №</label>
                                <input type="text" name="transferNumber" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Çıxış Hesabı *</label>
                                <select name="fromAccount" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="main-cash" ${data.fromAccount === 'main-cash' ? 'selected' : ''}>Əsas Kassa</option>
                                    <option value="kapital-azn" ${data.fromAccount === 'kapital-azn' ? 'selected' : ''}>KapitalBank AZN</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Daxil Hesabı *</label>
                                <select name="toAccount" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="kapital-azn" ${data.toAccount === 'kapital-azn' ? 'selected' : ''}>KapitalBank AZN</option>
                                    <option value="main-cash" ${data.toAccount === 'main-cash' ? 'selected' : ''}>Əsas Kassa</option>
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
                            <div class="form-group full-width">
                                <label class="form-label">Qeydlər</label>
                                <textarea name="notes" class="form-textarea" ${isView ? 'readonly' : ''}>${data.notes || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('transfers')">
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