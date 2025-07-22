export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>Debit Notlar</h1>
                    <p>Alıcılara göndərilən debit notları və onların idarə edilməsi.</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('debit-notes', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('debit-notes', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Debit Not
                    </button>
                </div>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-file-minus"></i>
                        </div>
                        <div class="stat-content">
                            <h3>8</h3>
                            <p>Bu Ay Debit Not</p>
                            <div class="stat-change positive">+3 keçən aya nisbətən</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼5,670</h3>
                            <p>Ümumi Məbləğ</p>
                            <div class="stat-change negative">Bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>6</h3>
                            <p>Təsdiqlənib</p>
                            <div class="stat-change positive">75% təsdiq nisbəti</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2</h3>
                            <p>Gözləyən</p>
                            <div class="stat-change neutral">Müştəri cavabı</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Debit Not #</th>
                            <th>Müştəri</th>
                            <th>Səbəb</th>
                            <th>Məbləğ</th>
                            <th>Tarix</th>
                            <th>Müddət</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>DN-2024-001</td>
                            <td>Rövşən Bəgirov</td>
                            <td>Gecikmə faizi</td>
                            <td>₼150.00</td>
                            <td>10.02.2024</td>
                            <td>15 gün</td>
                            <td><span class="status-badge completed">Ödənilib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'view', 'DN-2024-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'print', 'DN-2024-001')">
                                        <i class="fas fa-print"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'download', 'DN-2024-001')">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>DN-2024-002</td>
                            <td>Əli Məmmədov</td>
                            <td>Əlavə xidmət haqqı</td>
                            <td>₼320.00</td>
                            <td>12.02.2024</td>
                            <td>30 gün</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'view', 'DN-2024-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'edit', 'DN-2024-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'send-reminder', 'DN-2024-002')">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>DN-2024-003</td>
                            <td>Leyla Həsənova</td>
                            <td>Çatdırılma xidməti</td>
                            <td>₼85.50</td>
                            <td>14.02.2024</td>
                            <td>7 gün</td>
                            <td><span class="status-badge completed">Ödənilib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'view', 'DN-2024-003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'archive', 'DN-2024-003')">
                                        <i class="fas fa-archive"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>DN-2024-004</td>
                            <td>Vüqar Abbasov</td>
                            <td>Zərər kompensasiyası</td>
                            <td>₼450.00</td>
                            <td>16.02.2024</td>
                            <td>45 gün</td>
                            <td><span class="status-badge pending">Müzakirə</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'view', 'DN-2024-004')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'edit', 'DN-2024-004')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'negotiate', 'DN-2024-004')">
                                        <i class="fas fa-comments"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>DN-2024-005</td>
                            <td>Sənan Qədirov</td>
                            <td>Bank komissiyası</td>
                            <td>₼75.00</td>
                            <td>18.02.2024</td>
                            <td>14 gün</td>
                            <td><span class="status-badge active">Yeni</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'view', 'DN-2024-005')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'edit', 'DN-2024-005')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('debit-notes', 'send', 'DN-2024-005')">
                                        <i class="fas fa-share"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('debit-notes', 'bulk-send')">
                            <i class="fas fa-paper-plane"></i>
                            Seçilmişləri Göndər
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('debit-notes', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('debit-notes', 'bulk-reminder')">
                            <i class="fas fa-bell"></i>
                            Xatırlatma Göndər
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('debit-notes', 'bulk-archive')">
                            <i class="fas fa-archive"></i>
                            Arxivləşdir
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
    const title = action === 'create' ? 'Yeni Debit Not' : action === 'edit' ? 'Debit Notu Redaktə Et' : 'Debit Not Məlumatları';

    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni debit notu yaradın' : 'Debit notu məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('debit-notes')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>

            <form id="debitNoteForm" onsubmit="app.submitForm(event, 'debit-notes', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Debit Not Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Debit Not Nömrəsi</label>
                                <input type="text" name="debitNoteNumber" class="form-input" value="${displayId}" readonly>
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
                                <label class="form-label">Son Ödəmə Tarixi</label>
                                <input type="date" name="dueDate" class="form-input" value="${data.dueDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('debit-notes')">
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

