export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>Satış Fakturaları</h1>
                    <p>Müştərilərə satılan məhsul və xidmətlər üçün fakturalar.</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('sales-invoices', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('sales-invoices', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Faktura
                    </button>
                </div>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-receipt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>67</h3>
                            <p>Bu Ay Faktura</p>
                            <div class="stat-change positive">+18% artım</div>
                        </div>
                    </div>

                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼45,230</h3>
                            <p>Ümumi Satış</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼8,140</h3>
                            <p>ƏDV</p>
                            <div class="stat-change neutral">18%</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>5</h3>
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
                            <th>Müştəri</th>
                            <th>Tarix</th>
                            <th>Məbləğ</th>
                            <th>ƏDV</th>
                            <th>Ümumi</th>
                            <th>Son Ödəmə</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SINV-2024-003</td>
                            <td>Rövşən Bəgirov</td>
                            <td>16.02.2024</td>
                            <td>₼1,600.00</td>
                            <td>₼288.00</td>
                            <td>₼1,888.00</td>
                            <td>16.03.2024</td>
                            <td><span class="status-badge paid">Ödənilib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'view', 'SINV-2024-003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'print', 'SINV-2024-003')">
                                        <i class="fas fa-print"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'download', 'SINV-2024-003')">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>SINV-2024-004</td>
                            <td>Əli Məmmədov</td>
                            <td>18.02.2024</td>
                            <td>₼850.00</td>
                            <td>₼153.00</td>
                            <td>₼1,003.00</td>
                            <td>18.03.2024</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'view', 'SINV-2024-004')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'edit', 'SINV-2024-004')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'send-reminder', 'SINV-2024-004')">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>SINV-2024-005</td>
                            <td>Leyla Həsənova</td>
                            <td>19.02.2024</td>
                            <td>₼2,450.00</td>
                            <td>₼441.00</td>
                            <td>₼2,891.00</td>
                            <td>19.03.2024</td>
                            <td><span class="status-badge completed">Tamamlandı</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'view', 'SINV-2024-005')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'duplicate', 'SINV-2024-005')">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'archive', 'SINV-2024-005')">
                                        <i class="fas fa-archive"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>SINV-2024-006</td>
                            <td>Vüqar Abbasov</td>
                            <td>20.02.2024</td>
                            <td>₼675.00</td>
                            <td>₼121.50</td>
                            <td>₼796.50</td>
                            <td>05.02.2024</td>
                            <td><span class="status-badge inactive">Vaxtı keçib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'view', 'SINV-2024-006')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'send-notice', 'SINV-2024-006')">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('sales-invoices', 'collection', 'SINV-2024-006')">
                                        <i class="fas fa-gavel"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('sales-invoices', 'bulk-send')">
                            <i class="fas fa-paper-plane"></i>
                            Seçilmişləri Göndər
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('sales-invoices', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('sales-invoices', 'bulk-print')">
                            <i class="fas fa-print"></i>
                            Toplu Çap
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('sales-invoices', 'bulk-reminder')">
                            <i class="fas fa-bell"></i>
                            Xatırlatma Göndər
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
    const title = action === 'create' ? 'Yeni Satış Fakturası' : action === 'edit' ? 'Fakturanı Redaktə Et' : 'Faktura Məlumatları';
    
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni satış fakturası yaradın' : 'Faktura məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('sales-invoices')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    ${isView ? `
                        <button class="btn btn-primary" onclick="app.printInvoice('${data.id}')">
                            <i class="fas fa-print"></i> Çap Et
                        </button>
                    ` : ''}
                </div>
            </div>
            
            <form id="salesInvoiceForm" onsubmit="app.submitModuleForm(event, 'sales-invoices', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Faktura Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Faktura Nömrəsi</label>
                                <input type="text" name="invoiceNumber" class="form-input" value="${data.invoiceNumber || 'SINV-' + new Date().getFullYear() + '-AUTO'}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Son Ödəmə Tarixi</label>
                                <input type="date" name="dueDate" class="form-input" value="${data.dueDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Müştəri *</label>
                                <select name="customerId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Müştəri seçin...</option>
                                    <option value="cust1" ${data.customerId === 'cust1' ? 'selected' : ''}>Əli Məmmədov</option>
                                    <option value="cust2" ${data.customerId === 'cust2' ? 'selected' : ''}>Leyla Həsənova</option>
                                    <option value="cust3" ${data.customerId === 'cust3' ? 'selected' : ''}>Vüqar Abbasov</option>
                                </select>
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
                                                <option value="prod1">Dell Laptop Inspiron 15</option>
                                                <option value="prod2">Logitech Wireless Mouse</option>
                                                <option value="prod3">Samsung Galaxy A54</option>
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
                                    <option value="cash" ${data.paymentMethod === 'cash' ? 'selected' : ''}>Nağd</option>
                                    <option value="card" ${data.paymentMethod === 'card' ? 'selected' : ''}>Kart</option>
                                    <option value="bank_transfer" ${data.paymentMethod === 'bank_transfer' ? 'selected' : ''}>Bank Köçürməsi</option>
                                    <option value="check" ${data.paymentMethod === 'check' ? 'selected' : ''}>Çek</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="sent" ${data.status === 'sent' ? 'selected' : ''}>Göndərilib</option>
                                    <option value="paid" ${data.status === 'paid' ? 'selected' : ''}>Ödənilib</option>
                                    <option value="overdue" ${data.status === 'overdue' ? 'selected' : ''}>Vaxtı keçib</option>
                                    <option value="cancelled" ${data.status === 'cancelled' ? 'selected' : ''}>Ləğv edilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('sales-invoices')">
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