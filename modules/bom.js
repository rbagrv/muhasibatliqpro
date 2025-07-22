export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Texnoloji Xəritələr (BOM)</h1>
            <p>İstehsalat üçün tələb olunan xammal və materialların siyahısı.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('bom', 'create')">
                <i class="fas fa-plus"></i> Yeni Texnoloji Xəritə
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Kod</th>
                        <th>Tərkib</th>
                        <th>Yığılan Məhsul</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Laptop BOM</td>
                        <td>BOM-001</td>
                        <td>12 hissə</td>
                        <td>Dell Laptop</td>
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
    const title = action === 'create' ? 'Yeni Texnoloji Xəritə (BOM)' : action === 'edit' ? 'Texnoloji Xəritəni Redaktə Et' : 'Texnoloji Xəritə Məlumatları';
    
    const newId = action === 'create' ? 'BOM-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni texnoloji xəritə əlavə edin' : 'Texnoloji xəritə məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('bom')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="bomForm" onsubmit="app.submitModuleForm(event, 'bom', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Kod *</label>
                                <input type="text" name="code" class="form-input" value="${data.code || newId}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Yığılan Məhsul *</label>
                                <select name="assembledProduct" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="prod1" ${data.assembledProduct === 'prod1' ? 'selected' : ''}>Dell Laptop</option>
                                    <option value="prod2" ${data.assembledProduct === 'prod2' ? 'selected' : ''}>Gaming PC</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir</label>
                                <textarea name="description" class="form-textarea" ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-section">
                        <h3>Tərkib Hissələri</h3>
                        <div class="invoice-items-container">
                            <table class="invoice-items-table">
                                <thead>
                                    <tr>
                                        <th>Hissə/Məhsul</th>
                                        <th>Miqdar</th>
                                        <th>Vahid</th>
                                        ${!isView ? '<th>Əməliyyat</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="bomItemsBody">
                                    <tr class="bom-item-row">
                                        <td>
                                            <select name="componentId[]" class="form-input" required ${isView ? 'disabled' : ''}>
                                                <option value="">Seçin...</option>
                                                <option value="comp1">CPU Intel i7</option>
                                                <option value="comp2">RAM 8GB DDR4</option>
                                            </select>
                                        </td>
                                        <td><input type="number" name="componentQuantity[]" class="form-input" value="1" min="0.01" step="0.01" required ${isView ? 'readonly' : ''}></td>
                                        <td>
                                            <select name="componentUnit[]" class="form-input" ${isView ? 'disabled' : ''}>
                                                <option value="pcs">Ədəd</option>
                                                <option value="kg">Kiloqram</option>
                                            </select>
                                        </td>
                                        ${!isView ? '<td><button type="button" class="btn btn-ghost btn-sm" onclick="app.removeBomRow(this)"><i class="fas fa-trash"></i></button></td>' : ''}
                                    </tr>
                                </tbody>
                            </table>
                            ${!isView ? `
                                <div class="invoice-actions">
                                    <button type="button" class="btn btn-secondary" onclick="app.addBomRow()">
                                        <i class="fas fa-plus"></i> Hissə Əlavə Et
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('bom')">
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