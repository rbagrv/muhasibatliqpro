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
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'view', 'FIN-2024-001')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'download', 'FIN-2024-001')"><i class="fas fa-download"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'print', 'FIN-2024-001')"><i class="fas fa-print"></i></button>
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
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'view', 'FIN-2024-002')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'download', 'FIN-2024-002')"><i class="fas fa-download"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'print', 'FIN-2024-002')"><i class="fas fa-print"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>FIN-2024-003</td>
                            <td>Pul Vəsaitlərinin Hərəkəti</td>
                            <td>Yanvar 2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'view', 'FIN-2024-003')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'download', 'FIN-2024-003')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>FIN-2024-004</td>
                            <td>Kapitalda Dəyişikliklər</td>
                            <td>Yanvar 2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'view', 'FIN-2024-004')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'download', 'FIN-2024-004')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>FIN-2024-005</td>
                            <td>Maliyyə Hesabatlarına Qeydlər</td>
                            <td>Yanvar 2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'view', 'FIN-2024-005')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('financial-reports', 'download', 'FIN-2024-005')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">IFRS-ə Uyğun Qeydlər və Əlavə Hesabatlar</h2>
                <div class="content-card">
                    <p>Bu bölmə Beynəlxalq Maliyyə Hesabatı Standartlarına (IFRS) uyğun olaraq hazırlanan hesabatlara dair əlavə məlumat və izahları ehtiva edir.</p>
                    <ul>
                        <li><strong>Pul vəsaitlərinin hərəkəti hesabatı:</strong> Əməliyyat, İnvestisiya və Maliyyə fəaliyyətləri üzrə pul vəsaitlərinin hərəkəti birbaşa metodla təqdim olunur.</li>
                        <li><strong>Kapitalda dəyişikliklər hesabatı:</strong> Nizamnamə kapitalı, emissiya gəliri, bölüşdürülməmiş mənfəət və digər ehtiyatlar üzrə hesabat dövründəki dəyişiklikləri göstərir.</li>
                        <li><strong>Maliyyə hesabatlarına qeydlər:</strong> Əhəmiyyətli mühasibat siyasətləri, pul vahidi məlumatları, əsas və qeyri-maddi aktivlər, debitor/kreditor borcları və təxirə salınmış vergi məlumatları kimi detallı izahları əhatə edir.</li>
                        <li><strong>Konsolidasiya olunmuş hesabatlar:</strong> Ana şirkət və törəmə müəssisələrin maliyyə məlumatlarının vahid iqtisadi subyekt kimi təqdim olunması (əgər qrup şirkəti varsa).</li>
                        <li><strong>Valyuta məzənnəsi fərqləri hesabatı:</strong> Xarici valyuta əməliyyatları və balans maddələrinin qiymətləndirilməsindən yaranan məzənnə fərqlərini əks etdirir.</li>
                        <li><strong>Multi-currency balans hesabatı:</strong> Şirkətin müxtəlif valyutalarda saxlanılan aktivlərini və öhdəliklərini vahid hesabatda təqdim edir.</li>
                        <li><strong>Audit üçün data export:</strong> Audit prosesi üçün lazım olan bütün maliyyə məlumatlarının IFRS tələblərinə uyğun formatda ixrac edilməsi imkanı.</li>
                    </ul>
                </div>
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
            <form id="financialReportsForm" onsubmit="app.submitForm(event, 'financial-reports', '${action}', '${newId}')">
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
                                    <option value="changes-in-equity" ${data.type === 'changes-in-equity' ? 'selected' : ''}>Kapitalda Dəyişikliklər</option>
                                    <option value="notes" ${data.type === 'notes' ? 'selected' : ''}>Maliyyə Hesabatlarına Qeydlər</option>
                                    <option value="consolidated" ${data.type === 'consolidated' ? 'selected' : ''}>Konsolidasiya</option>
                                    <option value="fx-differences" ${data.type === 'fx-differences' ? 'selected' : ''}>Valyuta Fərqləri</option>
                                    <option value="multi-currency-balance" ${data.type === 'multi-currency-balance' ? 'selected' : ''}>Multi-valyuta Balansı</option>
                                    <option value="audit-export" ${data.type === 'audit-export' ? 'selected' : ''}>Audit Exportu</option>
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

