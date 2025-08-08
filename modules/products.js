export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Məhsullar</h1>
                <p>Anbarda olan məhsullar və onların əsas məlumatları.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('products', 'create')">
                    <i class="fas fa-plus"></i> Yeni Məhsul
                </button>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="stat-content">
                            <h3>456</h3>
                            <p>Aktiv Məhsul</p>
                            <div class="stat-change positive">+23 bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Az Stok</p>
                            <div class="stat-change negative">Təcili</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3>78</h3>
                            <p>Top Satış</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kod/SKU</th>
                            <th>Ad</th>
                            <th>Kategoriya</th>
                            <th>Stok</th>
                            <th>Qiymət</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>DELL-123</td>
                            <td>Dell Laptop Inspiron 15</td>
                            <td>Elektronika</td>
                            <td>12</td>
                            <td>₼1,200.00</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('products', 'view', 'prod1')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('products', 'edit', 'prod1')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-chart-line"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>LOGI-456</td>
                            <td>Logitech Wireless Mouse</td>
                            <td>Elektronika</td>
                            <td>45</td>
                            <td>₼45.00</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('products', 'view', 'prod2')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('products', 'edit', 'prod2')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-chart-line"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>SAMSUNG-789</td>
                            <td>Samsung Galaxy A54</td>
                            <td>Elektronika</td>
                            <td>3</td>
                            <td>₼450.00</td>
                            <td><span class="status-badge warning">Az Stok</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('products', 'view', 'prod3')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('products', 'edit', 'prod3')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-plus"></i></button>
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
    const title = action === 'create' ? 'Yeni Məhsul' : action === 'edit' ? 'Məhsulu Redaktə Et' : 'Məhsul Məlumatları';
    
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni məhsul məlumatlarını daxil edin' : 'Məhsul məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('products')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="productForm" onsubmit="app.submitForm(event, 'products', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Məhsul Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">SKU/Kod</label>
                                <input type="text" name="sku" class="form-input" value="${data.sku || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Barkod</label>
                                <input type="text" name="barcode" class="form-input" value="${data.barcode || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Kateqoriya</label>
                                <select name="category" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="electronics" ${data.category === 'electronics' ? 'selected' : ''}>Elektronika</option>
                                    <option value="clothing" ${data.category === 'clothing' ? 'selected' : ''}>Geyim</option>
                                    <option value="food" ${data.category === 'food' ? 'selected' : ''}>Qida</option>
                                    <option value="books" ${data.category === 'books' ? 'selected' : ''}>Kitab</option>
                                    <option value="other" ${data.category === 'other' ? 'selected' : ''}>Digər</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir</label>
                                <textarea name="description" class="form-textarea" ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Qiymət və Stok</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Satış Qiyməti *</label>
                                <input type="number" name="price" class="form-input" value="${data.price || ''}" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Maya Dəyəri</label>
                                <input type="number" name="cost" class="form-input" value="${data.cost || ''}" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Miqdar</label>
                                <input type="number" name="quantity" class="form-input" value="${data.quantity || '0'}" min="0" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Minimum Səviyyə</label>
                                <input type="number" name="minQuantity" class="form-input" value="${data.minQuantity || '0'}" min="0" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ölçü Vahidi</label>
                                <select name="unit" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="pcs" ${data.unit === 'pcs' ? 'selected' : ''}>Ədəd</option>
                                    <option value="kg" ${data.unit === 'kg' ? 'selected' : ''}>Kiloqram</option>
                                    <option value="m" ${data.unit === 'm' ? 'selected' : ''}>Metr</option>
                                    <option value="l" ${data.unit === 'l' ? 'selected' : ''}>Litr</option>
                                    <option value="box" ${data.unit === 'box' ? 'selected' : ''}>Qutu</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">ƏDV Dərəcəsi (%)</label>
                                <input type="number" name="taxRate" class="form-input" value="${data.taxRate || '18'}" step="0.01" min="0" max="100" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Satış Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
                                    <option value="discontinued" ${data.status === 'discontinued' ? 'selected' : ''}>Dayandırılıb</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Satış Kommissiyası (%)</label>
                                <input type="number" name="commission" class="form-input" value="${data.commission || '0'}" step="0.01" min="0" max="100" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Təchizatçı</label>
                                <select name="supplier" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="supplier1" ${data.supplier === 'supplier1' ? 'selected' : ''}>ABC Təchizat MMC</option>
                                    <option value="supplier2" ${data.supplier === 'supplier2' ? 'selected' : ''}>XYZ Electronics</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Marka</label>
                                <input type="text" name="brand" class="form-input" value="${data.brand || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Model</label>
                                <input type="text" name="model" class="form-input" value="${data.model || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Çəki (qr)</label>
                                <input type="number" name="weight" class="form-input" value="${data.weight || ''}" step="0.01" min="0" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>

                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('products')">
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