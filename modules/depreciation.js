export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Köhnəlmə Əməliyyatları</h1>
            <p>Əsas və qeyri-maddi aktivlər üzrə köhnəlmə hesablamaları və qeydləri.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('depreciation', 'create')">
                <i class="fas fa-plus"></i> Yeni Köhnəlmə
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Aktiv</th>
                        <th>İl</th>
                        <th>Köhnəlmə</th>
                        <th>Yekun Məbləğ</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dell Server</td>
                        <td>2022</td>
                        <td>₼2,000</td>
                        <td>₼6,500</td>
                        <td><span class="status-badge completed">Hesablanıb</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('depreciation', 'view', 'DEPR-0001')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('depreciation', 'edit', 'DEPR-0001')"><i class="fas fa-edit"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="module-section">
            <h2 class="section-title">Əsas Vəsaitlər Üzərində Köhnəlmə Cədvəli</h2>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Aktiv Adı</th>
                            <th>Alış Tarixi</th>
                            <th>İlkin Dəyər</th>
                            <th>Qalıq Dəyəri</th>
                            <th>Faydalı Ömür (il)</th>
                            <th>Köhnəlmə Metodu</th>
                            <th>İllik Köhnəlmə</th>
                            <th>Yığılmış Köhnəlmə</th>
                            <th>Cari Balans Dəyəri</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ofis Binası</td>
                            <td>01.01.2022</td>
                            <td>₼500,000</td>
                            <td>₼0</td>
                            <td>50</td>
                            <td>Düzxəttli</td>
                            <td>₼10,000</td>
                            <td>₼20,000</td>
                            <td>₼480,000</td>
                        </tr>
                        <tr>
                            <td>Nəqliyyat Vasitəsi</td>
                            <td>15.06.2022</td>
                            <td>₼45,000</td>
                            <td>₼5,000</td>
                            <td>5</td>
                            <td>Azalan Balans</td>
                            <td>₼8,000</td>
                            <td>₼14,000</td>
                            <td>₼31,000</td>
                        </tr>
                        <tr>
                            <td>Server Dell PowerEdge</td>
                            <td>10.01.2023</td>
                            <td>₼25,000</td>
                            <td>₼1,000</td>
                            <td>4</td>
                            <td>Düzxəttli</td>
                            <td>₼6,000</td>
                            <td>₼12,000</td>
                            <td>₼13,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
}

// FORM
export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Köhnəlmə Hesablaması' : action === 'edit' ? 'Köhnəlməni Redaktə Et' : 'Köhnəlmə Məlumatları';
    
    const newId = action === 'create' ? 'DEPR-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni köhnəlmə hesablaması qeyd edin' : 'Köhnəlmə məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('depreciation')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="depreciationForm" onsubmit="app.submitForm(event, 'depreciation', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Hesablama Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Köhnəlmə №</label>
                                <input type="text" name="depreciationId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Aktiv *</label>
                                <select name="assetId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="FA-2023-001" ${data.assetId === 'FA-2023-001' ? 'selected' : ''}>Server Dell PowerEdge</option>
                                    <option value="FA-2022-001" ${data.assetId === 'FA-2022-001' ? 'selected' : ''}>Ofis Binası</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesabat Dövrü *</label>
                                <input type="month" name="period" class="form-input" value="${data.period || new Date().toISOString().slice(0, 7)}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesablanmış Məbləğ *</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || '0'}" min="0" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="calculated" ${data.status === 'calculated' ? 'selected' : ''}>Hesablanıb</option>
                                    <option value="posted" ${data.status === 'posted' ? 'selected' : ''}>Yerləşdirilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('depreciation')">
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



