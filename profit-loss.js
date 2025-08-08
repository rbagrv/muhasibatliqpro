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
                <table class="data-table" id="profitLossStatementTable">
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
                            <td><span class="change positive">+15%</span></td>
                            <td><i class="fas fa-chart-line text-success"></i></td>
                        </tr>
                        <tr>
                            <td>Satılmış malların maya dəyəri (COGS)</td>
                            <td>₼18,000</td>
                            <td>₼16,000</td>
                            <td><span class="change negative">+12.5%</span></td>
                            <td><i class="fas fa-chart-line text-danger"></i></td>
                        </tr>
                        <tr>
                            <td>Ümumi Mənfəət</td>
                            <td>₼27,230</td>
                            <td>₼23,450</td>
                            <td><span class="change positive">+16.1%</span></td>
                            <td><i class="fas fa-chart-line text-success"></i></td>
                        </tr>
                        <tr>
                            <td>Əməliyyat Xərcləri</td>
                            <td>₼14,780</td>
                            <td>₼14,000</td>
                            <td><span class="change negative">+5.6%</span></td>
                            <td><i class="fas fa-chart-line text-warning"></i></td>
                        </tr>
                        <tr>
                            <td>Digər Gəlirlər</td>
                            <td>₼2,000</td>
                            <td>₼1,500</td>
                            <td><span class="change positive">+33.3%</span></td>
                            <td><i class="fas fa-chart-line text-success"></i></td>
                        </tr>
                        <tr>
                            <td>Digər Xərclər</td>
                            <td>₼1,200</td>
                            <td>₼1,000</td>
                            <td><span class="change negative">+20%</span></td>
                            <td><i class="fas fa-chart-line text-danger"></i></td>
                        </tr>
                        <tr>
                            <td>Vergidən əvvəlki mənfəət</td>
                            <td>₼13,250</td>
                            <td>₼9,950</td>
                            <td><span class="change positive">+33.2%</span></td>
                            <td><i class="fas fa-chart-line text-success"></i></td>
                        </tr>
                        <tr>
                            <td>Vergi Xərci</td>
                            <td>₼800</td>
                            <td>₼850</td>
                            <td><span class="change positive">-5.9%</span></td>
                            <td><i class="fas fa-chart-line text-info"></i></td>
                        </tr>
                        <tr>
                            <td><strong>Xalis Mənfəət</strong></td>
                            <td><strong>₼12,450</strong></td>
                            <td><strong>₼9,100</strong></td>
                            <td><span class="change positive"><strong>+22%</strong></span></td>
                            <td><i class="fas fa-chart-line text-success"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">Hesabat Qeydləri (IFRS-ə Uyğun)</h2>
                <div class="content-card">
                    <p>Bu bölmə Maliyyə Hesabatlarının Beynəlxalq Standartlarına (IFRS) uyğun olaraq Mənfəət və Zərər Hesabatına dair ətraflı qeydləri əks etdirir.</p>
                    <ul>
                        <li><strong>Gəlirlərin tanınması:</strong> Satış gəlirləri məhsulların müştəriyə təhvil verildiyi və ya xidmətlərin göstərildiyi zaman, ödənişin alınması ehtimalı yüksək olduqda tanınır.</li>
                        <li><strong>Satılmış malların maya dəyəri:</strong> COGS stokun FIFO qiymətləndirmə metodu ilə hesablanır və satın alınmış xammal, istehsal xərcləri, habelə məhsulların anbara gətirilməsi ilə bağlı bütün xərcləri əhatə edir.</li>
                        <li><strong>Əməliyyat xərcləri:</strong> İnzibati və satış xərcləri funksional təsnifatına görə təqdim edilir. Bura əmək haqqı, kommunal xərclər, amortizasiya, icarə və marketinq xərcləri daxildir.</li>
                        <li><strong>Vergi xərci:</strong> Cari vergi və təxirə salınmış vergi xərclərini əhatə edir. Təxirə salınmış vergi aktivləri və öhdəlikləri müvəqqəti fərqlərə görə yaranır.</li>
                        <li><strong>Valyuta məzənnəsi fərqləri:</strong> Xarici valyuta əməliyyatlarından yaranan mənfəət və zərərlər hesabat dövründə tanınır və Mənfəət və Zərər Hesabatında "Digər Gəlirlər/Xərclər" hissəsində göstərilir.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Mənfəət və Zərər Hesabatı' : action === 'edit' ? 'Mənfəət və Zərər Hesabatını Redaktə Et' : 'Mənfəət və Zərər Hesabatı Məlumatları';

    const newId = action === 'create' ? 'PL-RPT-' + String(Date.now()).slice(-4) : data.id;

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
            <form id="profitLossForm" onsubmit="app.submitForm(event, 'profit-loss', '${action}', '${newId}')">
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
                                <input type="text" name="name" class="form-input" value="${data.name || 'Mənfəət və Zərər Hesabatı'}" required ${isView ? 'readonly' : ''}>
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

