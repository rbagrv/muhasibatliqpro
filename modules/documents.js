export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Sənədlər</h1>
            <p>Bütün sənəd və faylların idarəsi və axtarışı.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('documents', 'create')">
                <i class="fas fa-plus"></i> Yeni Sənəd
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table" id="documentsTable">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Tip</th>
                        <th>Tarix</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Əmək müqaviləsi</td>
                        <td>PDF</td>
                        <td>12.02.2024</td>
                        <td><span class="badge badge-success">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('documents', 'view', 'DOC-0001')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('documents', 'edit', 'DOC-0001')"><i class="fas fa-edit"></i></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Satış Faktura No. SINV-2024-005</td>
                        <td>PDF</td>
                        <td>19.02.2024</td>
                        <td><span class="badge badge-success">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('documents', 'view', 'DOC-0002')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('documents', 'download', 'DOC-0002')"><i class="fas fa-download"></i></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Yanvar 2024 - P&L Hesabatı</td>
                        <td>XLSX</td>
                        <td>05.02.2024</td>
                        <td><span class="badge badge-info">Arxiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('documents', 'view', 'DOC-0003')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('documents', 'download', 'DOC-0003')"><i class="fas fa-download"></i></button>
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
    const title = action === 'create' ? 'Yeni Sənəd' : action === 'edit' ? 'Sənədi Redaktə Et' : 'Sənəd Məlumatları';

    const newId = action === 'create' ? 'DOC-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni sənəd əlavə edin' : 'Sənəd məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('documents')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="documentsForm" onsubmit="app.submitForm(event, 'documents', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Sənəd Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Sənəd №</label>
                                <input type="text" name="documentId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="pdf" ${data.type === 'pdf' ? 'selected' : ''}>PDF</option>
                                    <option value="image" ${data.type === 'image' ? 'selected' : ''}>Şəkil</option>
                                    <option value="word" ${data.type === 'word' ? 'selected' : ''}>Word Sənədi</option>
                                    <option value="excel" ${data.type === 'excel' ? 'selected' : ''}>Excel Sənədi</option>
                                    <option value="other" ${data.type === 'other' ? 'selected' : ''}>Digər</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="archived" ${data.status === 'archived' ? 'selected' : ''}>Arxivləşdirilmiş</option>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Fayl Yüklə</label>
                                <input type="file" name="file" class="form-input" ${isView ? 'disabled' : ''}>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Qeydlər</label>
                                <textarea name="notes" class="form-textarea" ${isView ? 'readonly' : ''}>${data.notes || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('documents')">
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

