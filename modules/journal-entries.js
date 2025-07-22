export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Jurnal Yazılışları</h1>
                <p>Mühasibatlıq uçotu üçün jurnal yazılışları və onların təsviri.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('journal-entries', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.navigateToForm('journal-entries', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Yazılış
                    </button>
                </div>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="stat-content">
                            <h3>234</h3>
                            <p>Bu Ay Yazılış</p>
                            <div class="stat-change positive">+18 keçən aya nisbətən</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼89,450</h3>
                            <p>Debetlər</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-minus-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼89,450</h3>
                            <p>Kreditlər</p>
                            <div class="stat-change positive">Balansda</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2</h3>
                            <p>Xəta</p>
                            <div class="stat-change negative">Yoxlanılmalı</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Tarix</th>
                            <th>Yazılış №</th>
                            <th>Təsvir</th>
                            <th>Debet Hesabı</th>
                            <th>Kredit Hesabı</th>
                            <th>Məbləğ</th>
                            <th>Valyuta</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>19.02.2024</td>
                            <td>JE-2024-001</td>
                            <td>Kassa mədaxil - satış</td>
                            <td>101 - Kassa</td>
                            <td>601 - Satış</td>
                            <td>₼1,200.00</td>
                            <td>AZN</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('journal-entries', 'view', 'JE-2024-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('journal-entries', 'print', 'JE-2024-001')">
                                        <i class="fas fa-print"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('journal-entries', 'copy', 'JE-2024-001')">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>19.02.2024</td>
                            <td>JE-2024-002</td>
                            <td>Bank köçürməsi</td>
                            <td>223 - Bank</td>
                            <td>101 - Kassa</td>
                            <td>₼5,000.00</td>
                            <td>AZN</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('journal-entries', 'view', 'JE-2024-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('journal-entries', 'edit', 'JE-2024-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('journal-entries', 'approve', 'JE-2024-002')">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>18.02.2024</td>
                            <td>JE-2024-003</td>
                            <td>Əmək haqqı ödənişi</td>
                            <td>533 - ƏH öhdəliyi</td>
                            <td>223 - Bank</td>
                            <td>₼45,600.00</td>
                            <td>AZN</td>
                            <td><span class="status-badge warning">Xəta</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('journal-entries', 'view', 'JE-2024-003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('journal-entries', 'edit', 'JE-2024-003')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('journal-entries', 'fix', 'JE-2024-003')">
                                        <i class="fas fa-wrench"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('journal-entries', 'bulk-approve')">
                            <i class="fas fa-check-double"></i>
                            Seçilmişləri Təsdiqlə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('journal-entries', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('journal-entries', 'bulk-print')">
                            <i class="fas fa-print"></i>
                            Çap Et
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('journal-entries', 'bulk-archive')">
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
    const title = action === 'create' ? 'Yeni Jurnal Yazılışı' : action === 'edit' ? 'Jurnal Yazılışını Redaktə Et' : 'Jurnal Yazılışı Məlumatları';
    
    // Generate new ID for create operations
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';
    
    // Default entries for a new journal entry
    const defaultEntries = data.entries && data.entries.length > 0 ? data.entries : [
        { accountId: '', debitAmount: '', creditAmount: '', description: '' },
        { accountId: '', debitAmount: '', creditAmount: '', description: '' }
    ];

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni jurnal yazılışı əlavə edin' : 'Jurnal yazılışını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('journal-entries')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="journalEntryForm" onsubmit="app.submitForm(event, 'journal-entries', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Yazılış Nömrəsi</label>
                                <input type="text" name="entryNumber" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Referans</label>
                                <input type="text" name="reference" class="form-input" value="${data.reference || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir *</label>
                                <textarea name="description" class="form-textarea" required ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Debet və Kredit Yazılışları</h3>
                        <div class="invoice-items-container">
                            <table class="invoice-items-table">
                                <thead>
                                    <tr>
                                        <th>Hesab *</th>
                                        <th>Debet Məbləği</th>
                                        <th>Kredit Məbləği</th>
                                        <th>Qeyd</th>
                                        <th>Balans</th>
                                        ${!isView ? '<th>Əməliyyat</th>' : ''}
                                    </tr>
                                </thead>
                                <tbody id="journalEntryItemsBody">
                                    ${defaultEntries.map(entry => `
                                        <tr class="journal-entry-row">
                                            <td>
                                                <select name="accountId[]" class="form-input" required ${isView ? 'disabled' : ''}>
                                                    <option value="">Hesab seçin...</option>
                                                    <option value="101" ${entry.accountId === '101' ? 'selected' : ''}>101 - Kassa</option>
                                                    <option value="223" ${entry.accountId === '223' ? 'selected' : ''}>223 - Bank hesabları AZN</option>
                                                    <option value="431" ${entry.accountId === '431' ? 'selected' : ''}>431 - Kreditor borcları</option>
                                                    <option value="601" ${entry.accountId === '601' ? 'selected' : ''}>601 - Satış Gəliri</option>
                                                    <option value="701" ${entry.accountId === '701' ? 'selected' : ''}>701 - Əməliyyat Xərcləri</option>
                                                </select>
                                            </td>
                                            <td><input type="number" name="debitAmount[]" class="form-input" value="${entry.debitAmount || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''} onchange="app.calculateJournalEntryRow(this)"></td>
                                            <td><input type="number" name="creditAmount[]" class="form-input" value="${entry.creditAmount || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''} onchange="app.calculateJournalEntryRow(this)"></td>
                                            <td><input type="text" name="entryDescription[]" class="form-input" value="${entry.description || ''}" placeholder="Təsvir" ${isView ? 'readonly' : ''}></td>
                                            <td><span class="row-balance">0.00</span></td>
                                            ${!isView ? '<td><button type="button" class="btn btn-ghost btn-sm" onclick="app.removeJournalEntryRow(this)"><i class="fas fa-trash"></i></button></td>' : ''}
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                            ${!isView ? `
                                <div class="invoice-actions">
                                    <button type="button" class="btn btn-secondary" onclick="app.addJournalEntryRow()">
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
                                    <span>Ümumi Debet:</span>
                                    <span id="journalTotalDebit">₼0.00</span>
                                </div>
                                <div class="calculation-row">
                                    <span>Ümumi Kredit:</span>
                                    <span id="journalTotalCredit">₼0.00</span>
                                </div>
                                <div class="calculation-row total">
                                    <span>Fərq:</span>
                                    <span id="journalDifference" class="text-danger">₼0.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Əlavə Məlumatlar</h3>
                        <div class="form-grid">
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
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="approved" ${data.status === 'approved' ? 'selected' : ''}>Təsdiqlənib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('journal-entries')">
                                <i class="fas fa-times"></i> Ləğv et
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="app.saveDraft()">
                                <i class="fas fa-save"></i> Layihə Yadda Saxla
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-check"></i> ${action === 'create' ? 'Yazılış Yarat' : 'Yadda Saxla'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}