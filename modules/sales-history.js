export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Satış Tarixçəsi və Hesabatları</h1>
                <p>Aparılan satış əməliyyatlarının tarixçəsi və analitikası.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('sales-history', 'create')">
                    <i class="fas fa-plus"></i> Yeni Satış Əlavə Et
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Faktura #</th>
                            <th>Müştəri</th>
                            <th>Tarix</th>
                            <th>Məbləğ</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SINV-2024-004</td>
                            <td>Sərxan Qədirov</td>
                            <td>16.02.2024</td>
                            <td>₼890.00</td>
                            <td><span class="status-badge paid">Ödənilib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-history', 'view', 'SINV-2024-004')"><i class="fas fa-eye"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>SINV-2024-005</td>
                            <td>Leyla Həsənova</td>
                            <td>19.02.2024</td>
                            <td>₼2,891.00</td>
                            <td><span class="status-badge completed">Tamamlandı</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-history', 'view', 'SINV-2024-005')"><i class="fas fa-eye"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>SINV-2024-006</td>
                            <td>Vüqar Abbasov</td>
                            <td>20.02.2024</td>
                            <td>₼796.50</td>
                            <td><span class="status-badge inactive">Vaxtı keçib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-history', 'view', 'SINV-2024-006')"><i class="fas fa-eye"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">Satış Hesabatları</h2>
                <div class="data-table-container">
                    <h3>Məhsul Üzrə Satış Performansı</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Məhsul Adı</th>
                                <th>Satış Miqdarı</th>
                                <th>Ümumi Gəlir</th>
                                <th>Ən Çox Satılan Region</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dell Laptop Inspiron 15</td>
                                <td>50</td>
                                <td>₼60,000</td>
                                <td>Bakı</td>
                            </tr>
                            <tr>
                                <td>Logitech Wireless Mouse</td>
                                <td>150</td>
                                <td>₼6,750</td>
                                <td>Gəncə</td>
                            </tr>
                            <tr>
                                <td>Samsung Galaxy A54</td>
                                <td>80</td>
                                <td>₼36,000</td>
                                <td>Sumqayıt</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="data-table-container">
                    <h3>Müştəri Üzrə Satış Dəyəri</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Müştəri</th>
                                <th>Ümumi Alış Dəyəri</th>
                                <th>Son Alış Tarixi</th>
                                <th>Alış Sayı</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Əli Məmmədov</td>
                                <td>₼15,500.00</td>
                                <td>18.02.2024</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>Leyla Həsənova</td>
                                <td>₼8,200.00</td>
                                <td>19.02.2024</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>Vüqar Abbasov</td>
                                <td>₼3,100.00</td>
                                <td>20.02.2024</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="data-table-container">
                    <h3>Region Üzrə Satış Həcmi</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Ümumi Satış Həcmi</th>
                                <th>Satış Sayı</th>
                                <th>Orta Satış Dəyəri</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bakı</td>
                                <td>₼85,000.00</td>
                                <td>120</td>
                                <td>₼708.33</td>
                            </tr>
                            <tr>
                                <td>Gəncə</td>
                                <td>₼25,000.00</td>
                                <td>45</td>
                                <td>₼555.56</td>
                            </tr>
                            <tr>
                                <td>Sumqayıt</td>
                                <td>₼18,000.00</td>
                                <td>30</td>
                                <td>₼600.00</td>
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
    const title = action === 'create' ? 'Yeni Satış Qeydi' : action === 'edit' ? 'Satış Qeydini Redaktə Et' : 'Satış Məlumatları';
    
    const newId = action === 'create' ? 'SLS-HIST-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni satış qeydi əlavə edin' : 'Satış məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('sales-history')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="salesHistoryForm" onsubmit="app.submitForm(event, 'sales-history', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Satış Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Satış №</label>
                                <input type="text" name="salesId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Müştəri *</label>
                                <select name="customerId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="cust1" ${data.customerId === 'cust1' ? 'selected' : ''}>Əli Məmmədov</option>
                                    <option value="cust2" ${data.customerId === 'cust2' ? 'selected' : ''}>Leyla Həsənova</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məhsul/Xidmət *</label>
                                <select name="productId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="prod1" ${data.productId === 'prod1' ? 'selected' : ''}>Dell Laptop</option>
                                    <option value="serv1" ${data.productId === 'serv1' ? 'selected' : ''}>Website Hazırlama</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Miqdar *</label>
                                <input type="number" name="quantity" class="form-input" value="${data.quantity || '1'}" min="0.01" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ümumi Məbləğ *</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || '0'}" min="0.01" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ödəniş Statusu</label>
                                <select name="paymentStatus" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="paid" ${data.paymentStatus === 'paid' ? 'selected' : ''}>Ödənilib</option>
                                    <option value="pending" ${data.paymentStatus === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="cancelled" ${data.paymentStatus === 'cancelled' ? 'selected' : ''}>Ləğv edilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('sales-history')">
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



