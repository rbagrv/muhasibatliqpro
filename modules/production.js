export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>İstehsalat</h1>
                <p>İstehsal proseslərinin idarə edilməsi və yeni sifarişlərin yaradılması.</p>
                <button class="btn btn-primary" onclick="app.navigateToForm('production', 'create')">
                    <i class="fas fa-plus"></i> Yeni İstehsalat Sifarişi
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Məhsul</th>
                            <th>Miqdar</th>
                            <th>Başlanğıc Tarix</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Dell Laptop</td>
                            <td>25</td>
                            <td>10 Fev 2024</td>
                            <td><span class="badge badge-warning">Hazırlanır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('production', 'view', 'PRDORD-0001')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('production', 'edit', 'PRDORD-0001')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni İstehsalat Sifarişi' : action === 'edit' ? 'İstehsalat Sifarişini Redaktə Et' : 'İstehsalat Sifarişi Məlumatları';
    
    const newId = action === 'create' ? 'PRD-ORD-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni istehsalat sifarişi əlavə edin' : 'İstehsalat sifarişi məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('production')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="productionForm" onsubmit="app.submitForm(event, 'production', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Sifariş Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Sifariş №</label>
                                <input type="text" name="orderId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məhsul *</label>
                                <select name="product" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="prod1" ${data.product === 'prod1' ? 'selected' : ''}>Dell Laptop</option>
                                    <option value="prod2" ${data.product === 'prod2' ? 'selected' : ''}>Gaming PC</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Miqdar *</label>
                                <input type="number" name="quantity" class="form-input" value="${data.quantity || '1'}" min="1" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Başlanğıc Tarix *</label>
                                <input type="date" name="startDate" class="form-input" value="${data.startDate || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Bitmə Tarixi</label>
                                <input type="date" name="endDate" class="form-input" value="${data.endDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="in_progress" ${data.status === 'in_progress' ? 'selected' : ''}>Hazırlanır</option>
                                    <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Tamamlanıb</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('production')">
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

