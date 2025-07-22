export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Mənfəət və Zərər Hesabatı</h1>
                <p>Müəyyən dövr üzrə gəlir və xərclərin təhlili.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('profit-loss', 'create')">
                    <i class="fas fa-plus"></i> Yeni P&L Hesabatı
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼45,230</h3>
                            <p>Ümumi Gəlir</p>
                            <div class="stat-change positive">+15% artım</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-minus-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼32,780</h3>
                            <p>Ümumi Xərc</p>
                            <div class="stat-change negative">+8% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼12,450</h3>
                            <p>Xalis Mənfəət</p>
                            <div class="stat-change positive">+22% artım</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesab</th>
                            <th>Bu Ay</th>
                            <th>Keçən Ay</th>
                            <th>Dəyişiklik</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Satış Gəliri</strong></td>
                            <td>₼45,230</td>
                            <td>₼39,450</td>
                            <td><span class="stat-change positive">+15%</span></td>
                            <td><i class="fas fa-chart-line" style="color: var(--success-500);"></i></td>
                        </tr>
                        <tr>
                            <td><strong>Əməliyyat Xərcləri</strong></td>
                            <td>₼32,780</td>
                            <td>₼30,350</td>
                            <td><span class="stat-change negative">+8%</span></td>
                            <td><i class="fas fa-chart-line" style="color: var(--warning-500);"></i></td>
                        </tr>
                        <tr>
                            <td><strong>Xalis Mənfəət</strong></td>
                            <td>₼12,450</td>
                            <td>₼9,100</td>
                            <td><span class="stat-change positive">+22%</span></td>
                            <td><i class="fas fa-chart-line" style="color: var(--success-500);"></i></td>
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
    const title = action === 'create' ? 'Yeni Mənfəət və Zərər Hesabatı' : action === 'edit' ? 'Hesabatı Redaktə Et' : 'Hesabat Məlumatları';
    
    const newId = action === 'create' ? 'PL-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni mənfəət və zərər hesabatı yaradın' : 'Mənfəət və zərər hesabatı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('profit-loss')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="profitLossForm" onsubmit="app.submitModuleForm(event, 'profit-loss', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Hesabat Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Hesabat №</label>
                                <input type="text" name="reportId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Dövr *</label>
                                <input type="month" name="period" class="form-input" value="${data.period || new Date().toISOString().slice(0, 7)}" required ${isView ? 'readonly' : ''}>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('profit-loss')">
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