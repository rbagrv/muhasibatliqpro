export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Vergi Hesabatları</h1>
                <p>ƏDV, sadələşdirilmiş vergi və digər vergi hesabatları.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('tax-reports', 'create')">
                    <i class="fas fa-plus"></i> Yeni Hesabat
                </button>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-percent"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼8,140</h3>
                            <p>Bu Ay ƏDV</p>
                            <div class="stat-change positive">18% dərəcə</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Təqdim Edilmiş</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Gözləyir</p>
                            <div class="stat-change neutral">Təsdiq</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesabat #</th>
                            <th>Tip</th>
                            <th>Dövr</th>
                            <th>Məbləğ</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>VH-2024-001</td>
                            <td>ƏDV</td>
                            <td>Yanvar 2024</td>
                            <td>₼2,340.00</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-print"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>VH-2024-002</td>
                            <td>Sadələşdirilmiş</td>
                            <td>Yanvar 2024</td>
                            <td>₼890.00</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-upload"></i></button>
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
    const title = action === 'create' ? 'Yeni Vergi Hesabatı' : action === 'edit' ? 'Vergi Hesabatını Redaktə Et' : 'Vergi Hesabatı Məlumatları';
    
    const newId = action === 'create' ? 'TX-RPT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni vergi hesabatı yaradın' : 'Vergi hesabatı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('tax-reports')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="taxReportsForm" onsubmit="app.submitModuleForm(event, 'tax-reports', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Hesabat Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Hesabat №</label>
                                <input type="text" name="reportId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="vat" ${data.type === 'vat' ? 'selected' : ''}>ƏDV</option>
                                    <option value="simplified" ${data.type === 'simplified' ? 'selected' : ''}>Sadələşdirilmiş</option>
                                    <option value="income-tax" ${data.type === 'income-tax' ? 'selected' : ''}>Gəlir Vergisi</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Dövr *</label>
                                <input type="month" name="period" class="form-input" value="${data.period || new Date().toISOString().slice(0, 7)}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məbləğ</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Göndərmə Tarixi</label>
                                <input type="date" name="submissionDate" class="form-input" value="${data.submissionDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="submitted" ${data.status === 'submitted' ? 'selected' : ''}>Təqdim edilib</option>
                                    <option value="confirmed" ${data.status === 'confirmed' ? 'selected' : ''}>Təsdiqlənib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('tax-reports')">
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