export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>Alış Təklifləri</h1>
                    <p>Təchizatçılardan alınan təkliflər və onların idarə edilməsi.</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('purchase-offers', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.navigateToForm('purchase-offers', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Təklif
                    </button>
                </div>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="stat-content">
                            <h3>18</h3>
                            <p>Bu Ay Təklif</p>
                            <div class="stat-change positive">+6 keçən aya nisbətən</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Təsdiqlənib</p>
                            <div class="stat-change positive">67% qəbul nisbəti</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>4</h3>
                            <p>Gözləyən</p>
                            <div class="stat-change neutral">Cavab gözlənilir</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼34,570</h3>
                            <p>Ümumi Dəyər</p>
                            <div class="stat-change positive">Bu ay təkliflər</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Təklif #</th>
                            <th>Təchizatçı</th>
                            <th>Məhsul/Xidmət</th>
                            <th>Miqdar</th>
                            <th>Qiymət</th>
                            <th>Ümumi</th>
                            <th>Təklif Tarixi</th>
                            <th>Son Tarix</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PO-2024-001</td>
                            <td>ABC Təchizat MMC</td>
                            <td>Dell Laptoplar</td>
                            <td>15 ədəd</td>
                            <td>₼1,150.00</td>
                            <td>₼17,250.00</td>
                            <td>10.02.2024</td>
                            <td>20.02.2024</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('purchase-offers', 'view', 'PO-2024-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('purchase-offers', 'edit', 'PO-2024-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-offers', 'approve', 'PO-2024-001')">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-offers', 'reject', 'PO-2024-001')">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>PO-2024-002</td>
                            <td>XYZ Electronics</td>
                            <td>iPhone 15 Pro</td>
                            <td>8 ədəd</td>
                            <td>₼1,850.00</td>
                            <td>₼14,800.00</td>
                            <td>12.02.2024</td>
                            <td>25.02.2024</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('purchase-offers', 'view', 'PO-2024-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-offers', 'convert', 'PO-2024-002')">
                                        <i class="fas fa-file-invoice"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-offers', 'print', 'PO-2024-002')">
                                        <i class="fas fa-print"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>PO-2024-003</td>
                            <td>Tech Solutions Ltd</td>
                            <td>Samsung Galaxy S24</td>
                            <td>5 ədəd</td>
                            <td>₼1,200.00</td>
                            <td>₼6,000.00</td>
                            <td>14.02.2024</td>
                            <td>28.02.2024</td>
                            <td><span class="status-badge inactive">Rədd edilib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('purchase-offers', 'view', 'PO-2024-003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-offers', 'archive', 'PO-2024-003')">
                                        <i class="fas fa-archive"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>PO-2024-004</td>
                            <td>Office Supplies Co</td>
                            <td>Kağız və Qələmlər</td>
                            <td>100 dəst</td>
                            <td>₼25.00</td>
                            <td>₼2,500.00</td>
                            <td>16.02.2024</td>
                            <td>22.02.2024</td>
                            <td><span class="status-badge pending">Müzakirə</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('purchase-offers', 'view', 'PO-2024-004')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('purchase-offers', 'negotiate', 'PO-2024-004')">
                                        <i class="fas fa-comments"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-actions">
                <div class="bulk-actions">
                    <h4>Toplu Əməliyyatlar</h4>
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('purchase-offers', 'bulk-approve')">
                            <i class="fas fa-check-double"></i>
                            Seçilmişləri Təsdiqlə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('purchase-offers', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('purchase-offers', 'bulk-archive')">
                            <i class="fas fa-archive"></i>
                            Arxivləşdir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// FORM
export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Alış Təklifi' : action === 'edit' ? 'Təklifi Redaktə Et' : 'Təklif Məlumatları';
    
    // Generate new ID for create operations
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';
    
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni alış təklifi yaradın' : 'Təklif məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('purchase-offers')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="purchaseOfferForm" onsubmit="app.submitForm(event, 'purchase-offers', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Təklif Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Təklif Nömrəsi</label>
                                <input type="text" name="offerNumber" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Son Cavab Tarixi</label>
                                <input type="date" name="dueDate" class="form-input" value="${data.dueDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Təchizatçı *</label>
                                <select name="supplierId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Təchizatçı seçin...</option>
                                    <option value="S-0001" ${data.supplierId === 'S-0001' ? 'selected' : ''}>ABC Təchizat MMC</option>
                                    <option value="S-0002" ${data.supplierId === 'S-0002' ? 'selected' : ''}>XYZ Electronics</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Məhsullar/Xidmətlər</h3>
                        <div class="invoice-items-container">
                            <table class="invoice-items-table">
                                <thead>
                                    <tr>
                                        <th>Məhsul/Xidmət</th>
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
                                                <option value="">Seçin...</option>
                                                <option value="prod1">Dell Laptop Inspiron 15</option>
                                                <option value="prod2">Logitech Wireless Mouse</option>
                                                <option value="prod3">Samsung Galaxy A54</option>
                                            </select>
                                        </td>
                                        <td><input type="number" name="quantity[]" class="form-input" value="${(data.items && data.items[0]) ? data.items[0].quantity : '1'}" min="0.01" step="0.01" required ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><input type="number" name="unitPrice[]" class="form-input" value="${(data.items && data.items[0]) ? data.items[0].unitPrice : '0'}" min="0" step="0.01" required ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><input type="number" name="discount[]" class="form-input" value="${(data.items && data.items[0]) ? data.items[0].discount : '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><input type="number" name="taxRate[]" class="form-input" value="${(data.items && data.items[0]) ? data.items[0].taxRate : '18'}" min="0" max="100" step="0.01" ${isView ? 'readonly' : ''} onchange="app.calculateInvoiceRow(this)"></td>
                                        <td><span class="row-total">0.00</span></td>
                                        ${!isView ? '<td><button type="button" class="btn btn-ghost btn-sm" onclick="app.removeInvoiceRow(this)"><i class="fas fa-trash"></i></button></td>' : ''}
                                    </tr>
                                </tbody>
                            </table>
                            ${!isView ? `
                                <div class="invoice-actions">
                                    <button type="button" class="btn btn-secondary" onclick="app.addInvoiceRow()">
                                        <i class="fas fa-plus"></i> Sətir Əlavə Et
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
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="sent" ${data.status === 'sent' ? 'selected' : ''}>Göndərilib</option>
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="accepted" ${data.status === 'accepted' ? 'selected' : ''}>Qəbul Edilib</option>
                                    <option value="rejected" ${data.status === 'rejected' ? 'selected' : ''}>Rədd edilib</option>
                                    <option value="converted" ${data.status === 'converted' ? 'selected' : ''}>Fakturaya Çevrilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('purchase-offers')">
                                <i class="fas fa-times"></i> Ləğv et
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="app.saveDraft()">
                                <i class="fas fa-save"></i> Layihə Yadda Saxla
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-check"></i> ${action === 'create' ? 'Təklif Yarat' : 'Yadda Saxla'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}