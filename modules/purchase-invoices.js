export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>Alış Fakturaları</h1>
                    <p>Təchizatçılardan alınan məhsul və xidmətlər üçün fakturalar.</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('purchase-invoices', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('purchase-invoices', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Faktura
                    </button>
                </div>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-receipt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Bu Ay Faktura</p>
                            <div class="stat-change positive">+12% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼28,750</h3>
                            <p>Ümumi Alış</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Ödənilməmiş</p>
                            <div class="stat-change negative">Vaxtı keçib</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Faktura #</th>
                            <th>Təchizatçı</th>
                            <th>Tarix</th>
                            <th>Məbləğ</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PINV-2024-001</td>
                            <td>ABC Təchizat MMC</td>
                            <td>15.02.2024</td>
                            <td>₼5,400.00</td>
                            <td><span class="status-badge paid">Ödənilib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-invoices', 'view', 'PINV-2024-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-invoices', 'print', 'PINV-2024-001')">
                                        <i class="fas fa-print"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>PINV-2024-002</td>
                            <td>XYZ Electronics</td>
                            <td>18.02.2024</td>
                            <td>₼12,800.00</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-invoices', 'view', 'PINV-2024-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-invoices', 'edit', 'PINV-2024-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-invoices', 'pay', 'PINV-2024-002')">
                                        <i class="fas fa-credit-card"></i>
                                    </button>
                                </div>
                            </td>
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
    const title = action === 'create' ? 'Yeni Alış Fakturası' : action === 'edit' ? 'Fakturanı Redaktə Et' : 'Faktura Məlumatları';
    
    // Generate new ID for create operations
    const newId = action === 'create' ? 'PI-' + new Date().getFullYear() + '-' + String(Date.now()).slice(-4) : data.id;
    
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni alış fakturası yaradın' : 'Faktura məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('purchase-invoices')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="purchaseInvoiceForm" onsubmit="app.submitForm(event, 'purchase-invoices', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Faktura Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Faktura №</label>
                                <input type="text" name="invoiceNumber" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Təchizatçı *</label>
                                <select name="supplierId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Təchizatçı seçin...</option>
                                    <option value="S-0001">ABC Təchizat MMC</option>
                                    <option value="S-0002">XYZ Electronics</option>
                                    <option value="S-0003">Office Supplies Co</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Son Ödəmə Tarixi</label>
                                <input type="date" name="dueDate" class="form-input" value="${data.dueDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Məhsullar</h3>
                        <div class="invoice-items-container">
                            <table class="invoice-items-table">
                                <thead>
                                    <tr>
                                        <th>Məhsul</th>
                                        <th>Miqdar</th>
                                        <th>Vahid Qiymət</th>
                                        <th>Endirim</th>
                                        <th>ƏDV %</th>
                                        <th>Cəm</th>
                                        ${!isView ? '<th>Əməliyyat</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="invoiceItemsBody">
                                    <tr class="invoice-item-row">
                                        <td>
                                            <select name="productId[]" class="form-input" required ${isView ? 'disabled' : ''}>
                                                <option value="">Məhsul seçin...</option>
                                                <option value="P-0001">Dell Laptop Inspiron 15</option>
                                                <option value="P-0002">Logitech Wireless Mouse</option>
                                                <option value="P-0003">Samsung Galaxy A54</option>
                                            </select>
                                        </td>
                                        <td><input type="number" name="quantity[]" class="form-input" value="1" min="0.01" step="0.01" required ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><input type="number" name="unitPrice[]" class="form-input" value="0" min="0" step="0.01" required ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><input type="number" name="discount[]" class="form-input" value="0" min="0" step="0.01" ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><input type="number" name="taxRate[]" class="form-input" value="18" min="0" max="100" step="0.01" ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><span class="row-total">0.00</span></td>
                                        ${!isView ? '<td><button type="button" class="btn btn-ghost btn-sm" onclick="app.removeInvoiceRow(this)"><i class="fas fa-trash"></i></button></td>' : ''}
                                    </tr>
                                </tbody>
                            </table>
                            ${!isView ? `
                                <div class="invoice-actions">
                                    <button type="button" class="btn btn-secondary" onclick="app.addInvoiceRow()">
                                        <i class="fas fa-plus"></i> Məhsul Əlavə Et
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Hesablamalar</h3>
                        <div class="calculations-grid">
                            <div class="calculation-group">
                                <div class="calculation-row">
                                    <span>Alt Cəm:</span>
                                    <span id="subtotal">₼0.00</span>
                                </div>
                                <div class="calculation-row">
                                    <span>Endirim:</span>
                                    <span id="totalDiscount">₼0.00</span>
                                </div>
                                <div class="calculation-row">
                                    <span>ƏDV:</span>
                                    <span id="totalTax">₼0.00</span>
                                </div>
                                <div class="calculation-row total">
                                    <span>Yekun:</span>
                                    <span id="grandTotal">₼0.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Əlavə Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Ödəniş Metodu</label>
                                <select name="paymentMethod" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="cash">Nağd</option>
                                    <option value="card">Kart</option>
                                    <option value="bank_transfer">Bank Köçürməsi</option>
                                    <option value="check">Çek</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft">Layihə</option>
                                    <option value="pending">Gözləyir</option>
                                    <option value="paid">Ödənilib</option>
                                    <option value="cancelled">Ləğv edilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('purchase-invoices')">
                                <i class="fas fa-times"></i> Ləğv et
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="app.saveDraft()">
                                <i class="fas fa-save"></i> Layihə Yadda Saxla
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-check"></i> ${action === 'create' ? 'Faktura Yarat' : 'Yadda Saxla'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}