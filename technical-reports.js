export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Əlavə və Texniki Hesabatlar</h1>
                <p>Qrup şirkətləri, valyuta fərqləri, multi-valyuta balansları və audit üçün xüsusi hesabatlar.</p>
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="app.handleEntityOp('technical-reports', 'create')">
                        <i class="fas fa-plus"></i> Yeni Hesabat
                    </button>
                </div>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-sitemap"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Konsolidasiya</h3>
                            <p>Son ən yenilənmiş</p>
                            <div class="stat-change neutral">05.02.2024</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼1,250</h3>
                            <p>Müsbət Valyuta Fərqi</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-money-bill-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼345,670</h3>
                            <p>USD Balansı</p>
                            <div class="stat-change neutral">Ümumi</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-file-export"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Audit Exportu</h3>
                            <p>Son: 12.01.2024</p>
                            <div class="stat-change positive">Uğurlu</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <h3>Konsolidasiya Olunmuş Hesabatlar</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesabat Adı</th>
                            <th>Dövr</th>
                            <th>Şirkətlər Qrupu</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Konsolidasiya Balansı</td>
                            <td>2023 Tam il</td>
                            <td>"Holding Qrup"</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('technical-reports', 'view', 'CONS-2023')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('technical-reports', 'download', 'CONS-2023')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Konsolidasiya P&L</td>
                            <td>2023 Tam il</td>
                            <td>"Holding Qrup"</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('technical-reports', 'view', 'CONS-PL-2023')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('technical-reports', 'download', 'CONS-PL-2023')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data-table-container">
                <h3>Valyuta Məzənnəsi Fərqləri Hesabatı</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Dövr</th>
                            <th>Valyuta</th>
                            <th>Realizə Olunmuş Fərq</th>
                            <th>Realizə Olunmamış Fərq</th>
                            <th>Xalis Fərq</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Yanvar 2024</td>
                            <td>USD</td>
                            <td>₼500 (Gəlir)</td>
                            <td>₼200 (Zərər)</td>
                            <td>₼300 (Gəlir)</td>
                        </tr>
                        <tr>
                            <td>Yanvar 2024</td>
                            <td>EUR</td>
                            <td>₼100 (Zərər)</td>
                            <td>₼300 (Gəlir)</td>
                            <td>₼200 (Gəlir)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data-table-container">
                <h3>Multi-Currency Balans Hesabatı (Əsas valyuta: AZN)</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesab</th>
                            <th>AZN Məbləği</th>
                            <th>USD Ekvivalent (Tarixi)</th>
                            <th>EUR Ekvivalent (Tarixi)</th>
                            <th>USD Cari Balans</th>
                            <th>EUR Cari Balans</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Kassa (AZN)</td>
                            <td>₼5,600</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Kassa (USD)</td>
                            <td>₼2,040</td>
                            <td>$1,200</td>
                            <td>€1,100</td>
                            <td>$1,200</td>
                            <td>€1,100</td>
                        </tr>
                        <tr>
                            <td>Bank Hesabı (USD)</td>
                            <td>₼14,450</td>
                            <td>$8,500</td>
                            <td>€7,800</td>
                            <td>$8,500</td>
                            <td>€7,800</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">Audit Üçün Data Exportu (IFRS Tələblərinə Uyğun)</h2>
                <div class="content-card">
                    <p>Mühasibat Proqramı audit proseslərini asanlaşdırmaq üçün IFRS tələblərinə uyğun olaraq xüsusi data ixracı funksionallığı təqdim edir. Bu, jurnal yazılışları, böyük kitab (ledger), balans hesabatı detalları və digər maliyyə tranzaksiyalarını əhatə edir.</p>
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="app.handleEntityOp('technical-reports', 'export-audit-data')">
                            <i class="fas fa-file-export"></i> Audit Data Export Et
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Texniki Hesabat' : action === 'edit' ? 'Texniki Hesabatı Redaktə Et' : 'Texniki Hesabat Məlumatları';
    
    const newId = action === 'create' ? 'TECH-RPT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni texniki hesabat yaradın' : 'Texniki hesabat məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('technical-reports')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="technicalReportsForm" onsubmit="app.submitForm(event, 'technical-reports', '${action}', '${newId}')">
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
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="consolidated" ${data.type === 'consolidated' ? 'selected' : ''}>Konsolidasiya</option>
                                    <option value="fx-differences" ${data.type === 'fx-differences' ? 'selected' : ''}>Valyuta Məzənnəsi Fərqləri</option>
                                    <option value="multi-currency-balance" ${data.type === 'multi-currency-balance' ? 'selected' : ''}>Multi-Currency Balansı</option>
                                    <option value="audit-export" ${data.type === 'audit-export' ? 'selected' : ''}>Audit üçün Data Export</option>
                                </select>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('technical-reports')">
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

