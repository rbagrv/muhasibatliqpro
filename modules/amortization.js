export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Amortizasiya Əməliyyatları</h1>
            <p>Qeyri-maddi aktivlər üzrə amortizasiya və hesabatlar.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('amortization', 'create')">
                <i class="fas fa-plus"></i> Yeni Amortizasiya
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Aktiv</th>
                        <th>Başlanğıc Tarix</th>
                        <th>Məbləğ</th>
                        <th>Amortizasiya Faizi</th>
                        <th>Yekun</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Logo Lisenziya</td>
                        <td>15.01.2023</td>
                        <td>₼3,000</td>
                        <td>20%</td>
                        <td>₼2,400</td>
                        <td><span class="status-badge completed">Hesablanıb</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
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
    const title = action === 'create' ? 'Yeni Amortizasiya Qeydi' : action === 'edit' ? 'Amortizasiya Qeydini Redaktə Et' : 'Amortizasiya Məlumatları';
    
    const newId = action === 'create' ? 'AMORT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni amortizasiya qeydi əlavə edin' : 'Amortizasiya məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('amortization')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="amortizationForm" onsubmit="app.submitModuleForm(event, 'amortization', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Amortizasiya Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Qeyd №</label>
                                <input type="text" name="amortizationId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Aktiv *</label>
                                <select name="assetId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="IA-2023-001" ${data.assetId === 'IA-2023-001' ? 'selected' : ''}>ERP Lisenziyası</option>
                                    <option value="IA-2022-001" ${data.assetId === 'IA-2022-001' ? 'selected' : ''}>Ticarət Markası</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('amortization')">
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