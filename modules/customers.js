export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Müştərilər</h1>
                <p>Müştəri məlumatları, satış tarixçəsi və əlaqə idarəetməsi.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('customers', 'create')">
                    <i class="fas fa-plus"></i> Yeni Müştəri
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ad Soyad</th>
                            <th>Tip</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Əli Məmmədov</td>
                            <td><span class="badge badge-primary">Fərdi</span></td>
                            <td>ali@example.com</td>
                            <td>+994 50 123 45 67</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('customers', 'view', 'cust1')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('customers', 'edit', 'cust1')"><i class="fas fa-edit"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Leyla Həsənova</td>
                            <td><span class="badge badge-primary">Şirkət</span></td>
                            <td>leyla@comp.az</td>
                            <td>+994 70 987 65 43</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('customers', 'view', 'cust2')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('customers', 'edit', 'cust2')"><i class="fas fa-edit"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">Debitor Borcları Hesabatları</h2>
                <div class="data-table-container">
                    <h3>Debitor Borcları Yaşlandırma Hesabatı (Aging Report)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Müştəri</th>
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
                                <td>Əli Məmmədov</td>
                                <td>SINV-2024-004</td>
                                <td>₼1,003.00</td>
                                <td>₼1,003.00</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Vüqar Abbasov</td>
                                <td>SINV-2024-006</td>
                                <td>₼796.50</td>
                                <td>-</td>
                                <td>₼796.50</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Test Şirkəti MMC</td>
                                <td>SINV-2023-123</td>
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
                    <h3>Gecikmiş Ödənişlər Üzərində Xəbərdarlıq Hesabatı</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Müştəri</th>
                                <th>Faktura №</th>
                                <th>Məbləğ</th>
                                <th>Ödəniş Tarixi</th>
                                <th>Gecikmə Günləri</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Vüqar Abbasov</td>
                                <td>SINV-2024-006</td>
                                <td>₼796.50</td>
                                <td>05.02.2024</td>
                                <td>15</td>
                                <td><span class="status-badge inactive">Vaxtı Keçib</span></td>
                            </tr>
                            <tr>
                                <td>Test Şirkəti MMC</td>
                                <td>SINV-2023-123</td>
                                <td>₼1,000.00</td>
                                <td>01.01.2024</td>
                                <td>50</td>
                                <td><span class="status-badge inactive">Vaxtı Keçib</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Müştəri' : action === 'edit' ? 'Müştərini Redaktə Et' : 'Müştəri Məlumatları';
    
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni müştəri məlumatlarını daxil edin' : 'Müştəri məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('customers')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="customerForm" onsubmit="app.submitForm(event, 'customers', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Müştəri Tipi *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="individual" ${data.type === 'individual' ? 'selected' : ''}>Fərdi</option>
                                    <option value="company" ${data.type === 'company' ? 'selected' : ''}>Şirkət</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad/Şirkət Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Soyad</label>
                                <input type="text" name="surname" class="form-input" value="${data.surname || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" name="email" class="form-input" value="${data.email || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Telefon *</label>
                                <input type="tel" name="phone" class="form-input" value="${data.phone || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">VÖEN</label>
                                <input type="text" name="taxNumber" class="form-input" value="${data.taxNumber || ''}" ${isView ? 'readonly' : ''}>
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
                                <label class="form-label">Müştəri Qrupu</label>
                                <select name="group" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="vip" ${data.group === 'vip' ? 'selected' : ''}>VIP</option>
                                    <option value="regular" ${data.group === 'regular' ? 'selected' : ''}>Adi</option>
                                    <option value="wholesale" ${data.group === 'wholesale' ? 'selected' : ''}>Topdan</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Kredit Limiti</label>
                                <input type="number" name="creditLimit" class="form-input" value="${data.creditLimit || ''}" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ödəniş Şərtləri</label>
                                <select name="paymentTerms" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="cash" ${data.paymentTerms === 'cash' ? 'selected' : ''}>Nağd</option>
                                    <option value="net30" ${data.paymentTerms === 'net30' ? 'selected' : ''}>30 gün</option>
                                    <option value="net60" ${data.paymentTerms === 'net60' ? 'selected' : ''}>60 gün</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('customers')">
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