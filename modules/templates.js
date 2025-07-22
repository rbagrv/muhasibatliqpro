export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Şablonlar</h1>
            <p>Tez-tez istifadə olunan sənəd və formalar üçün şablonlar.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('templates', 'create')">
                <i class="fas fa-plus"></i> Yeni Şablon
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Tip</th>
                        <th>Yaradılma Tarixi</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alış Fakturası Şablonu</td>
                        <td>Faktura</td>
                        <td>10.01.2024</td>
                        <td><span class="badge badge-success">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('templates', 'view', 'TPL-0001')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('templates', 'edit', 'TPL-0001')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni Şablon' : action === 'edit' ? 'Şablonu Redaktə Et' : 'Şablon Məlumatları';
    
    const newId = action === 'create' ? 'TPL-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni şablon əlavə edin' : 'Şablon məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('templates')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="templatesForm" onsubmit="app.submitForm(event, 'templates', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Şablon Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Şablon №</label>
                                <input type="text" name="templateId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="invoice" ${data.type === 'invoice' ? 'selected' : ''}>Faktura</option>
                                    <option value="report" ${data.type === 'report' ? 'selected' : ''}>Hesabat</option>
                                    <option value="contract" ${data.type === 'contract' ? 'selected' : ''}>Müqavilə</option>
                                    <option value="email" ${data.type === 'email' ? 'selected' : ''}>Email</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Yaradılma Tarixi</label>
                                <input type="date" name="creationDate" class="form-input" value="${data.creationDate || new Date().toISOString().split('T')[0]}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Məzmun (HTML/Text)</label>
                                <textarea name="content" class="form-textarea" rows="10" ${isView ? 'readonly' : ''}>${data.content || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('templates')">
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



