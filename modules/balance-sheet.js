export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Balans Hesabatı</h1>
                <p>Aktivlər, öhdəliklər və kapital üzrə balans hesabatı.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('balance-sheet', 'create')">
                    <i class="fas fa-plus"></i> Yeni Balans
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼256,780</h3>
                            <p>Ümumi Aktivlər</p>
                            <div class="stat-change positive">+5.2% artım</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼98,450</h3>
                            <p>Ümumi Öhdəliklər</p>
                            <div class="stat-change negative">+3.1% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼158,330</h3>
                            <p>Xalis Aktivlər</p>
                            <div class="stat-change positive">+7.4% artım</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <h3>Aktivlər</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesab</th>
                            <th>Məbləğ</th>
                            <th>Keçən Ay</th>
                            <th>Dəyişiklik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nağd vəsaitlər</td>
                            <td>₼45,230</td>
                            <td>₼42,150</td>
                            <td><span class="stat-change positive">+7.3%</span></td>
                        </tr>
                        <tr>
                            <td>Debitor borcları</td>
                            <td>₼78,900</td>
                            <td>₼75,200</td>
                            <td><span class="stat-change positive">+4.9%</span></td>
                        </tr>
                        <tr>
                            <td>Əsas vəsaitlər</td>
                            <td>₼132,650</td>
                            <td>₼129,800</td>
                            <td><span class="stat-change positive">+2.2%</span></td>
                        </tr>
                    </tbody>
                </table>

                <h3>Öhdəliklər</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesab</th>
                            <th>Məbləğ</th>
                            <th>Keçən Ay</th>
                            <th>Dəyişiklik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Kreditor borcları</td>
                            <td>₼34,560</td>
                            <td>₼32,800</td>
                            <td><span class="stat-change negative">+5.4%</span></td>
                        </tr>
                        <tr>
                            <td>Bank kreditləri</td>
                            <td>₼63,890</td>
                            <td>₼65,400</td>
                            <td><span class="stat-change positive">-2.3%</span></td>
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
    const title = action === 'create' ? 'Yeni Balans Hesabatı' : action === 'edit' ? 'Balans Hesabatını Redaktə Et' : 'Balans Hesabatı Məlumatları';
    
    const newId = action === 'create' ? 'BAL-SHT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni balans hesabatı yaradın' : 'Balans hesabatı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('balance-sheet')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="balanceSheetForm" onsubmit="app.submitModuleForm(event, 'balance-sheet', '${action}', '${newId}')">
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('balance-sheet')">
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