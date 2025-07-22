export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Maliyyə Hesabatları</h1>
                <p>Maliyyə vəziyyəti və hesabat dövrü üzrə analitik hesabatlar.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('financial-reports', 'create')">
                    <i class="fas fa-plus"></i> Yeni Hesabat
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼45,230</h3>
                            <p>Aylıq Gəlir</p>
                            <div class="stat-change positive">+12.5% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼12,450</h3>
                            <p>Xalis Mənfəət</p>
                            <div class="stat-change positive">+8.3% artım</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-file-invoice-dollar"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Hesabat Sayı</p>
                            <div class="stat-change neutral">Bu ay</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesabat #</th>
                            <th>Ad</th>
                            <th>Dövr</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FIN-2024-001</td>
                            <td>Mənfəət və Zərər</td>
                            <td>Yanvar 2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-download"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-print"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>FIN-2024-002</td>
                            <td>Balans Hesabatı</td>
                            <td>Yanvar 2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-download"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-print"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Maliyyə Hesabatı' : action === 'edit' ? 'Maliyyə Hesabatını Redaktə Et' : 'Maliyyə Hesabatı Məlumatları';
    
    const newId = action === 'create' ? 'FIN-RPT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni maliyyə hesabatı yaradın' : 'Maliyyə hesabatı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('financial-reports')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="financialReportsForm" onsubmit="app.submitModuleForm(event, 'financial-reports', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Hesabat Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Hesabat №</label>
                                <input type="text" name="reportId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Dövr *</label>
                                <input type="month" name="period" class="form-input" value="${data.period || new Date().toISOString().slice(0, 7)}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="profit-loss" ${data.type === 'profit-loss' ? 'selected' : ''}>Mənfəət və Zərər</option>
                                    <option value="balance-sheet" ${data.type === 'balance-sheet' ? 'selected' : ''}>Balans Hesabatı</option>
                                    <option value="cash-flow" ${data.type === 'cash-flow' ? 'selected' : ''}>Pul Axını Hesabatı</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Yaradılma Tarixi</label>
                                <input type="date" name="generatedDate" class="form-input" value="${data.generatedDate || new Date().toISOString().split('T')[0]}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="ready" ${data.status === 'ready' ? 'selected' : ''}>Hazır</option>
                                    <option value="published" ${data.status === 'published' ? 'selected' : ''}>Nəşr edilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('financial-reports')">
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