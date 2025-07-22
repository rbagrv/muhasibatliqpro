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
                <button class="btn btn-primary" onclick="app.handleEntityOp('inventory', 'create')">
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
                <div class="stat-card success">
                    <div class="stat-icon"><i class="fas fa-retweet"></i></div>
                    <div class="stat-content">
                        <h3>4.5x</h3>
                        <p>Aylıq Dövriyyə</p>
                    </div>
                </div>
                <div class="stat-card info">
                    <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="stat-content">
                        <h3>₼18,000</h3>
                        <p>Satılmış Malların Maya Dəyəri (COGS)</p>
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
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('inventory', 'edit', 'STK-0001')"><i class="fas fa-edit"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>iPhone 15</td>
                            <td>Filial Anbar</td>
                            <td>5</td>
                            <td>1</td>
                            <td><span class="status-badge warning">Az Stok</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('inventory', 'edit', 'STK-0002')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('products', 'edit', 'prod_iphone')"><i class="fas fa-plus"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">Anbar Dəyərləmə Hesabatları</h2>
                <div class="data-table-container">
                    <h3>Satılmış Malların Maya Dəyəri (COGS)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Dövr</th>
                                <th>Başlanğıc İnventar</th>
                                <th>Alışlar</th>
                                <th>Son İnventar</th>
                                <th>COGS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Yanvar 2024</td>
                                <td>₼100,000</td>
                                <td>₼50,000</td>
                                <td>₼70,000</td>
                                <td>₼80,000</td>
                            </tr>
                            <tr>
                                <td>Fevral 2024</td>
                                <td>₼70,000</td>
                                <td>₼40,000</td>
                                <td>₼62,000</td>
                                <td>₼48,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="data-table-container">
                    <h3>Anbar Qalığı və Dövriyyə Hesabatı</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Məhsul</th>
                                <th>Cari Qalıq (ədəd)</th>
                                <th>Cari Dəyər</th>
                                <th>Satış Həcmi (ədəd, son 30 gün)</th>
                                <th>Dövriyyə Nisbəti (aylıq)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Laptop Dell</td>
                                <td>14</td>
                                <td>₼16,800</td>
                                <td>28</td>
                                <td>2.0x</td>
                            </tr>
                            <tr>
                                <td>Logitech Mouse</td>
                                <td>45</td>
                                <td>₼2,025</td>
                                <td>90</td>
                                <td>2.0x</td>
                            </tr>
                            <tr>
                                <td>Samsung Galaxy A54</td>
                                <td>3</td>
                                <td>₼1,350</td>
                                <td>15</td>
                                <td>5.0x</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="data-table-container">
                    <h3>Qiymətləndirmə Metodu Analizi (FIFO/Weighted Average)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Məhsul</th>
                                <th>Metod</th>
                                <th>Son Qalıq Dəyəri</th>
                                <th>Satışın Maya Dəyəri</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Laptop Dell</td>
                                <td>FIFO</td>
                                <td>₼16,800</td>
                                <td>₼84,000</td>
                            </tr>
                            <tr>
                                <td>Laptop Dell</td>
                                <td>Weighted Average</td>
                                <td>₼17,200</td>
                                <td>₼83,600</td>
                            </tr>
                            <tr>
                                <td>iPhone 15</td>
                                <td>FIFO</td>
                                <td>₼9,250</td>
                                <td>₼5,550</td>
                            </tr>
                            <tr>
                                <td>iPhone 15</td>
                                <td>Weighted Average</td>
                                <td>₼9,000</td>
                                <td>₼5,800</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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