export function bootstrap() {
    // Initialize inventory module
}
export function onNavigateIn() {
    // Called when navigating in to Inventory page
}
export function onNavigateOut() {
    // Called when navigating out of Inventory page
}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Stok İdarəetməsi</h1>
                <p>Anbarlardakı stokların avtomatik və əl ilə idarəsi, stok səviyyələrinin nəzarəti.</p>
                <button class="btn btn-primary" onclick="app.navigateToForm('inventory', 'create')">
                    <i class="fas fa-plus"></i> Yeni Stok Hərəkəti
                </button>
            </div>
            <div class="module-overview">
                <div class="stat-card primary">
                    <div class="stat-icon"><i class="fas fa-boxes"></i></div>
                    <div class="stat-content">
                        <h3>156</h3>
                        <p>Cari Stok Növləri</p>
                    </div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-icon"><i class="fas fa-triangle-exclamation"></i></div>
                    <div class="stat-content">
                        <h3>3</h3>
                        <p>Minimal Limitdə Stok</p>
                    </div>
                </div>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Məhsul</th>
                            <th>Anbar</th>
                            <th>Miqdar</th>
                            <th>Minimal Səviyyə</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop Dell</td>
                            <td>Baş Anbar</td>
                            <td>14</td>
                            <td>2</td>
                            <td><span class="status-badge active">Yetərli</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('inventory', 'edit', 'STK-0001')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni Stok Hərəkəti' : action === 'edit' ? 'Stok Hərəktini Redaktə Et' : 'Stok Hərəkəti Məlumatları';

    // Example new ID for stock movement
    const newId = action === 'create' ? 'STK-' + new Date().getFullYear() + '-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni stok hərəkəti qeyd edin' : 'Stok hərəkətini görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('inventory')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="inventoryForm" onsubmit="app.submitForm(event, 'inventory', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Stok Hərəkəti Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Hərəkət №</label>
                                <input type="text" name="movementNumber" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="in" ${data.type === 'in' ? 'selected' : ''}>Giriş (anbara)</option>
                                    <option value="out" ${data.type === 'out' ? 'selected' : ''}>Çıxış (anbardan)</option>
                                    <option value="transfer" ${data.type === 'transfer' ? 'selected' : ''}>Transfer</option>
                                    <option value="correction" ${data.type === 'correction' ? 'selected' : ''}>Düzəliş</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Anbar *</label>
                                <select name="warehouse" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="main">Baş Anbar</option>
                                    <option value="branch">Filial Anbar</option>
                                    <option value="reserve">Ehtiyat Anbar</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-section">
                        <h3>Məhsul Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Məhsul *</label>
                                <select name="product" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="prod1">Dell Laptop</option>
                                    <option value="prod2">Logitech Mouse</option>
                                    <option value="prod3">Samsung TV</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Miqdar *</label>
                                <input type="number" name="quantity" class="form-input" value="${data.quantity || '1'}" min="0.01" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Vahid Qiymət</label>
                                <input type="number" name="unitPrice" class="form-input" value="${data.unitPrice || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ümumi Məbləğ</label>
                                <input type="number" name="total" class="form-input" value="${data.total || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''} readonly>
                            </div>
                        </div>
                    </div>
                    <div class="form-section">
                        <h3>Əlavə Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Əməliyyatçı</label>
                                <input type="text" name="operator" class="form-input" value="${data.operator || ''}" ${isView ? 'readonly' : ''}>
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
                                <label class="form-label">Qeydlər</label>
                                <textarea name="notes" class="form-textarea" ${isView ? 'readonly' : ''}>${data.notes || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('inventory')">
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