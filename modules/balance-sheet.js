export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Balans Hesabatı</h1>
                <p>Aktivlər, öhdəliklər və kapital üzrə balans hesabatı.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('financial-reports', 'create')">
                    <i class="fas fa-plus"></i> Yeni Maliyyə Hesabatı
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
                            <td><span class="change positive">+7.3%</span></td>
                        </tr>
                        <tr>
                            <td>Bank hesabları</td>
                            <td>₼38,500</td>
                            <td>₼35,000</td>
                            <td><span class="change positive">+10%</span></td>
                        </tr>
                        <tr>
                            <td>Debitor borcları</td>
                            <td>₼78,900</td>
                            <td>₼75,200</td>
                            <td><span class="change positive">+4.9%</span></td>
                        </tr>
                        <tr>
                            <td>Ehtiyatlar</td>
                            <td>₼25,000</td>
                            <td>₼23,000</td>
                            <td><span class="change positive">+8.7%</span></td>
                        </tr>
                        <tr>
                            <td>Əsas vəsaitlər</td>
                            <td>₼132,650</td>
                            <td>₼129,800</td>
                            <td><span class="change positive">+2.2%</span></td>
                        </tr>
                         <tr>
                            <td>Qeyri-maddi aktivlər</td>
                            <td>₼96,000</td>
                            <td>₼98,000</td>
                            <td><span class="change negative">-2.0%</span></td>
                        </tr>
                        <tr>
                            <td>Digər cari aktivlər</td>
                            <td>₼12,000</td>
                            <td>₼10,500</td>
                            <td><span class="change positive">+14.3%</span></td>
                        </tr>
                         <tr>
                            <td><strong>Ümumi Aktivlər</strong></td>
                            <td><strong>₼428,280</strong></td>
                            <td><strong>₼413,650</strong></td>
                            <td><span class="change positive">+3.5%</span></td>
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
                            <td><span class="change negative">+5.4%</span></td>
                        </tr>
                        <tr>
                            <td>Bank kreditləri</td>
                            <td>₼63,890</td>
                            <td>₼65,400</td>
                            <td><span class="change positive">-2.3%</span></td>
                        </tr>
                        <tr>
                            <td>Ödəniləcək vergilər</td>
                            <td>₼8,140</td>
                            <td>₼7,800</td>
                            <td><span class="change negative">+4.3%</span></td>
                        </tr>
                        <tr>
                            <td>Digər cari öhdəliklər</td>
                            <td>₼15,000</td>
                            <td>₼14,200</td>
                            <td><span class="change negative">+5.6%</span></td>
                        </tr>
                        <tr>
                            <td>Uzunmüddətli borclar</td>
                            <td>₼80,000</td>
                            <td>₼85,000</td>
                            <td><span class="change positive">-5.9%</span></td>
                        </tr>
                        <tr>
                            <td><strong>Ümumi Öhdəliklər</strong></td>
                            <td><strong>₼201,590</strong></td>
                            <td><strong>₼205,200</strong></td>
                            <td><span class="change negative">-1.76%</span></td>
                        </tr>
                    </tbody>
                </table>

                <h3>Kapital</h3>
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
                            <td>Nizamnamə kapitalı</td>
                            <td>₼150,000</td>
                            <td>₼150,000</td>
                            <td><span class="change neutral">0%</span></td>
                        </tr>
                        <tr>
                            <td>Bölüşdürülməmiş mənfəət</td>
                            <td>₼76,690</td>
                            <td>₼58,450</td>
                            <td><span class="change positive">+31.2%</span></td>
                        </tr>
                        <tr>
                            <td>Yenidən qiymətləndirmə ehtiyatı</td>
                            <td>₼0</td>
                            <td>₼0</td>
                            <td><span class="change neutral">0%</span></td>
                        </tr>
                        <tr>
                            <td><strong>Ümumi Kapital</strong></td>
                            <td><strong>₼226,690</strong></td>
                            <td><strong>₼208,450</strong></td>
                            <td><span class="change positive">+8.75%</span></td>
                        </tr>
                    </tbody>
                </table>
                 <div class="module-section">
                    <h2 class="section-title">Hesabat Qeydləri (IFRS-ə Uyğun)</h2>
                    <div class="content-card">
                        <p>Bu bölmə Maliyyə Hesabatlarının Beynəlxalq Standartlarına (IFRS) uyğun olaraq Balans Hesabatına dair ətraflı qeydləri əks etdirir.</p>
                        <ul>
                            <li><strong>Pul vəsaitləri və ekvivalentləri:</strong> Nağd pul, bank hesablarında olan vəsaitlər və qısa müddətli, yüksək likvidli investisiyalar daxildir.</li>
                            <li><strong>Debitor borcları:</strong> Müştərilərdən alınacaq məbləğlərdir. Şübhəli borclar üzrə düzəlişlər tanınır.</li>
                            <li><strong>Ehtiyatlar:</strong> Xammal, yarımfabrikat və hazır məhsul ehtiyatları əhatə edir. Stoklar FIFO və ya weighted average metodu ilə qiymətləndirilir.</li>
                            <li><strong>Əsas vəsaitlər:</strong> Torpaq, tikili, avadanlıq və digər maddi aktivlərdir. Tarixi maya dəyəri ilə uçota alınır və faydalı ömürləri ərzində amortizasiya edilir.</li>
                            <li><strong>Qeyri-maddi aktivlər:</strong> Patentlər, lisenziyalar, ticarət nişanları kimi identifikasiya edilə bilən qeyri-pul aktivlərdir. Faydalı ömrü ərzində amortizasiya edilir.</li>
                            <li><strong>Kreditor borcları:</strong> Təchizatçılara, işçilərə və digər tərəflərə olan qısamüddətli öhdəliklərdir.</li>
                            <li><strong>Bank kreditləri:</strong> Həm qısa, həm də uzunmüddətli bank borclarını əhatə edir. Effektiv faiz dərəcəsi metodu ilə tanınır.</li>
                            <li><strong>Təxirə salınmış vergi öhdəlikləri:</strong> Gələcək dövrlərdə ödəniləcək vergiləri əks etdirir, əsasən mühasibat və vergi mənfəəti arasındakı müvəqqəti fərqlərdən yaranır.</li>
                            <li><strong>Kapital:</strong> Nizamnamə kapitalı, emissiya gəliri, digər kapital ehtiyatları və bölüşdürülməmiş mənfəətdən ibarətdir.</li>
                        </ul>
                    </div>
                </div>
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
            <form id="balanceSheetForm" onsubmit="app.submitForm(event, 'balance-sheet', '${action}', '${newId}')">
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



