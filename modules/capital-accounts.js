export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Kapital Hesabları</h1>
            <p>Şirkətin kapitalının uçotu və dəyişməsi.</p>
            <button class="btn btn-primary" onclick="app.navigateToForm('capital-accounts', 'create')">
                <i class="fas fa-plus"></i> Yeni Kapital Əlavəsi
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ad</th>
                        <th>Məbləğ</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Səhmdar Əli Məmmədov</td>
                        <td>₼10,000</td>
                        <td><span class="status-badge completed">Tam ödənilib</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('capital-accounts', 'view', 'CAPITAL-0001')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('capital-accounts', 'edit', 'CAPITAL-0001')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni Kapital Əməliyyatı' : action === 'edit' ? 'Kapital Əməliyyatını Redaktə Et' : 'Kapital Əməliyyatı Məlumatları';
    
    const newId = action === 'create' ? 'CAPITAL-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni kapital əməliyyatı əlavə edin' : 'Kapital əməliyyatı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('capital-accounts')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="capitalAccountsForm" onsubmit="app.submitForm(event, 'capital-accounts', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əməliyyat Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Əməliyyat №</label>
                                <input type="text" name="transactionId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="investment" ${data.type === 'investment' ? 'selected' : ''}>Sərmayə</option>
                                    <option value="withdrawal" ${data.type === 'withdrawal' ? 'selected' : ''}>Çıxarış</option>
                                    <option value="dividend" ${data.type === 'dividend' ? 'selected' : ''}>Dividend</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məbləğ *</label>
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
                                <label class="form-label">Mənbə/Şəxs</label>
                                <input type="text" name="sourcePerson" class="form-input" value="${data.sourcePerson || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('capital-accounts')">
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

