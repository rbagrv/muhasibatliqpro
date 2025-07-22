export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>Kredit Notlar</h1>
                    <p>Müştərilərə göndərilən kredit notları və geri qaytarmalar.</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('credit-notes', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('credit-notes', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Kredit Not
                    </button>
                </div>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-file-plus"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Bu Ay Kredit Not</p>
                            <div class="stat-change positive">+4 keçən aya nisbətən</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-money-bill-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼3,240</h3>
                            <p>Ümumi Məbləğ</p>
                            <div class="stat-change negative">Bu ay qaytarma</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>10</h3>
                            <p>Təsdiqlənib</p>
                            <div class="stat-change positive">83% təsdiq nisbəti</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2</h3>
                            <p>Gözləyən</p>
                            <div class="stat-change neutral">İnceleme</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kredit Not #</th>
                            <th>Müştəri</th>
                            <th>Əlaqəli Faktura</th>
                            <th>Səbəb</th>
                            <th>Məbləğ</th>
                            <th>Tarix</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CN-2024-001</td>
                            <td>Rövşən Bəgirov</td>
                            <td>SINV-2024-001</td>
                            <td>Məhsul qaytarma</td>
                            <td>₼450.00</td>
                            <td>12.02.2024</td>
                            <td><span class="status-badge completed">Tamamlandı</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'view', 'CN-2024-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'print', 'CN-2024-001')">
                                        <i class="fas fa-print"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'download', 'CN-2024-001')">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>CN-2024-002</td>
                            <td>Əli Məmmədov</td>
                            <td>SINV-2024-002</td>
                            <td>Qiymət fərqi</td>
                            <td>₼125.50</td>
                            <td>14.02.2024</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'view', 'CN-2024-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'edit', 'CN-2024-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'approve', 'CN-2024-002')">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>CN-2024-003</td>
                            <td>Leyla Həsənova</td>
                            <td>SINV-2024-003</td>
                            <td>Çatdırılma problemi</td>
                            <td>₼75.00</td>
                            <td>16.02.2024</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'view', 'CN-2024-003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'refund', 'CN-2024-003')">
                                        <i class="fas fa-money-bill"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'archive', 'CN-2024-003')">
                                        <i class="fas fa-archive"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>CN-2024-004</td>
                            <td>Vüqar Abbasov</td>
                            <td>SINV-2024-004</td>
                            <td>Keyfiyyət problemi</td>
                            <td>₼890.00</td>
                            <td>18.02.2024</td>
                            <td><span class="status-badge pending">İnceleme</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'view', 'CN-2024-004')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'edit', 'CN-2024-004')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'investigate', 'CN-2024-004')">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>CN-2024-005</td>
                            <td>Sənan Qədirov</td>
                            <td>SINV-2024-005</td>
                            <td>Endirim tənzimlənməsi</td>
                            <td>₼65.50</td>
                            <td>20.02.2024</td>
                            <td><span class="status-badge active">Yeni</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'view', 'CN-2024-005')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'edit', 'CN-2024-005')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('credit-notes', 'approve', 'CN-2024-005')">
                                        <i class="fas fa-check"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('credit-notes', 'bulk-approve')">
                            <i class="fas fa-check-double"></i>
                            Seçilmişləri Təsdiqlə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('credit-notes', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('credit-notes', 'bulk-refund')">
                            <i class="fas fa-money-bill-wave"></i>
                            Toplu Geri Ödəmə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('credit-notes', 'bulk-archive')">
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
    const title = action === 'create' ? 'Yeni Kredit Not' : action === 'edit' ? 'Kredit Notu Redaktə Et' : 'Kredit Not Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni kredit notu yaradın' : 'Kredit notu məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('credit-notes')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="creditNoteForm" onsubmit="app.submitForm(event, 'credit-notes', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Kredit Not Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Kredit Not Nömrəsi</label>
                                <input type="text" name="creditNoteNumber" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Müştəri *</label>
                                <select name="customerId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Müştəri seçin...</option>
                                    <option value="cust1" ${data.customerId === 'cust1' ? 'selected' : ''}>Əli Məmmədov</option>
                                    <option value="cust2" ${data.customerId === 'cust2' ? 'selected' : ''}>Leyla Həsənova</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Əlaqəli Faktura</label>
                                <input type="text" name="relatedInvoice" class="form-input" value="${data.relatedInvoice || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məbləğ *</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || ''}" min="0" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Səbəb *</label>
                                <textarea name="reason" class="form-textarea" required ${isView ? 'readonly' : ''}>${data.reason || ''}</textarea>
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
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Tamamlandı</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('credit-notes')">
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