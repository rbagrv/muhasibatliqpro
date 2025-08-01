export function bootstrap() {
    // Initialize suppliers module
}
export function onNavigateIn() {
}
export function onNavigateOut() {
}
export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Təchizatçılar</h1>
            <p>Təchizatçı şirkətlərin siyahısı və idarə olunması.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('suppliers', 'create')">
                <i class="fas fa-plus"></i> Yeni Təchizatçı
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Əlaqə Şəxsi</th>
                        <th>Telefon</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ABC Təchizat MMC</td>
                        <td>Əli Məmmədov</td>
                        <td>+994 50 123 45 67</td>
                        <td>ali@abc-supply.az</td>
                        <td><span class="badge badge-success">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('suppliers', 'view', 'S-0001')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('suppliers', 'edit', 'S-0001')"><i class="fas fa-edit"></i></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>XYZ Materials LTD</td>
                        <td>Vüqar Həsənov</td>
                        <td>+994 12 765 43 21</td>
                        <td>vugar@xyz-mat.com</td>
                        <td><span class="badge badge-success">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('suppliers', 'view', 'S-0002')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('suppliers', 'edit', 'S-0002')"><i class="fas fa-edit"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="module-section">
            <h2 class="section-title">Kreditor Borcları Üzərində Analiz</h2>
            <div class="data-table-container">
                <h3>Kreditor Borcları Yaşlandırma Hesabatı</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Təchizatçı</th>
                            <th>Faktura №</th>
                            <th>Məbləğ</th>
                            <th>Cari (0-30 gün)</th>
                            <th>31-60 gün</th>
                            <th>61-90 gün</th>
                            <th>90+ gün</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ABC Təchizat MMC</td>
                            <td>PINV-2024-010</td>
                            <td>₼1,200.00</td>
                            <td>₼1,200.00</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>XYZ Materials LTD</td>
                            <td>PINV-2023-045</td>
                            <td>₼850.00</td>
                            <td>-</td>
                            <td>₼850.00</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Global Supply Co.</td>
                            <td>PINV-2023-030</td>
                            <td>₼2,500.00</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₼1,500.00</td>
                            <td>₼1,000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data-table-container">
                <h3>Daxil Olan və Çıxan Ödənişlər Üzərində Özet Hesabat</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Tarix</th>
                            <th>Təchizatçı</th>
                            <th>Növ</th>
                            <th>Məbləğ</th>
                            <th>Valyuta</th>
                            <th>Qeyd</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>20.02.2024</td>
                            <td>ABC Təchizat MMC</td>
                            <td>Ödəniş</td>
                            <td>₼1,500.00</td>
                            <td>AZN</td>
                            <td>PINV-2024-009 ödənildi</td>
                        </tr>
                        <tr>
                            <td>18.02.2024</td>
                            <td>XYZ Materials LTD</td>
                            <td>Qaytaran</td>
                            <td>₼200.00</td>
                            <td>AZN</td>
                            <td>Qüsurlu mal qaytarma</td>
                        </tr>
                        <tr>
                            <td>15.02.2024</td>
                            <td>Global Supply Co.</td>
                            <td>Ödəniş</td>
                            <td>$500.00</td>
                            <td>USD</td>
                            <td>Xammal alışı</td>
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
    const title = action === 'create' ? 'Yeni Təchizatçı' : action === 'edit' ? 'Təchizatçını Redaktə Et' : 'Təchizatçı Məlumatları';
    const newId = action === 'create' ? 'S-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni təchizatçı əlavə edin' : 'Təchizatçı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('suppliers')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="supplierForm" onsubmit="app.submitForm(event, 'suppliers', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Təchizatçı №</label>
                                <input type="text" name="supplierId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Əlaqə Şəxsi</label>
                                <input type="text" name="contactPerson" class="form-input" value="${data.contactPerson || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Telefon *</label>
                                <input type="tel" name="phone" class="form-input" value="${data.phone || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" name="email" class="form-input" value="${data.email || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">VÖEN</label>
                                <input type="text" name="taxId" class="form-input" value="${data.taxId || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>
                    <div class="form-section">
                        <h3>Ünvan Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label class="form-label">Ünvan</label>
                                <textarea name="address" class="form-textarea" ${isView ? 'readonly' : ''}>${data.address || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Şəhər</label>
                                <input type="text" name="city" class="form-input" value="${data.city || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Rayon</label>
                                <input type="text" name="district" class="form-input" value="${data.district || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Poçt Kodu</label>
                                <input type="text" name="zipCode" class="form-input" value="${data.zipCode || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>
                    <div class="form-section">
                        <h3>Əlavə Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Qeyd</label>
                                <textarea name="notes" class="form-textarea" ${isView ? 'readonly' : ''}>${data.notes || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('suppliers')">
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