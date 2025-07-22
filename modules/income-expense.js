export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Mədaxil və Məxaric</h1>
                <p>Pulların daxil olması və çıxması əməliyyatlarının qeydi.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('income-expense', 'create')">
                    <i class="fas fa-plus"></i> Əlavə Et
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Tarix</th>
                            <th>Əməliyyat</th>
                            <th>Məbləğ</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15.02.2024</td>
                            <td>Mədaxil</td>
                            <td>₼550.00</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// FORM
export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Mədaxil/Məxaric Qeydi' : action === 'edit' ? 'Qeydi Redaktə Et' : 'Qeyd Məlumatları';
    
    const newId = action === 'create' ? 'INCEXP-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni mədaxil və ya məxaric əməliyyatı qeyd edin' : 'Əməliyyat məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('income-expense')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="incomeExpenseForm" onsubmit="app.submitModuleForm(event, 'income-expense', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əməliyyat Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Qeyd №</label>
                                <input type="text" name="recordId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Əməliyyat Tipi *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="income" ${data.type === 'income' ? 'selected' : ''}>Mədaxil</option>
                                    <option value="expense" ${data.type === 'expense' ? 'selected' : ''}>Məxaric</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab *</label>
                                <select name="account" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="main-cash" ${data.account === 'main-cash' ? 'selected' : ''}>Əsas Kassa</option>
                                    <option value="kapital-azn" ${data.account === 'kapital-azn' ? 'selected' : ''}>KapitalBank AZN</option>
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
                                <label class="form-label">Kateqoriya</label>
                                <input type="text" name="category" class="form-input" value="${data.category || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="confirmed" ${data.status === 'confirmed' ? 'selected' : ''}>Təsdiqlənib</option>
                                    <option value="cancelled" ${data.status === 'cancelled' ? 'selected' : ''}>Ləğv edilib</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir</label>
                                <textarea name="description" class="form-textarea" ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('income-expense')">
                                <i class="fas fa-times"></i> Ləğv et
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> ${action === 'create' ? 'Qeyd et' : 'Yadda Saxla'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}