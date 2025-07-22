export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>POS Tənzimləmələri</h1>
            <p>POS sisteminin əsas parametrləri və cihazlara ayarlamalar.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('pos-settings', 'create')">
                <i class="fas fa-plus"></i> Yeni Ayar
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Parametr</th>
                        <th>Dəyər</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Kassa Printer</td>
                        <td>Epson TM-T20</td>
                        <td><span class="status-badge active">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
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
    const title = action === 'create' ? 'Yeni POS Tənzimləməsi' : action === 'edit' ? 'POS Tənzimləməsini Redaktə Et' : 'POS Tənzimləmə Məlumatları';
    
    const newId = action === 'create' ? 'POS-SET-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni POS tənzimləməsi əlavə edin' : 'POS tənzimləməsi məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('pos-settings')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="posSettingsForm" onsubmit="app.submitModuleForm(event, 'pos-settings', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Tənzimləmə Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Ayar Adı *</label>
                                <input type="text" name="settingName" class="form-input" value="${data.settingName || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Dəyər *</label>
                                <input type="text" name="value" class="form-input" value="${data.value || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ayar Tipi</label>
                                <select name="settingType" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="text" ${data.settingType === 'text' ? 'selected' : ''}>Mətn</option>
                                    <option value="number" ${data.settingType === 'number' ? 'selected' : ''}>Rəqəm</option>
                                    <option value="boolean" ${data.settingType === 'boolean' ? 'selected' : ''}>Bəli/Xeyr</option>
                                    <option value="select" ${data.settingType === 'select' ? 'selected' : ''}>Seçim</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('pos-settings')">
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