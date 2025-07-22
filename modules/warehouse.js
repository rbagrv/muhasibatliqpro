export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Anbar</h1>
                <p>Şirkət daxilindəki anbarların siyahısı və əsas məlumatları.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('warehouse', 'transfer')">
                        <i class="fas fa-exchange-alt"></i>
                        Transfer
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('warehouse', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Anbar
                    </button>
                </div>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-warehouse"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Aktiv Anbar</p>
                            <div class="stat-change positive">+1 bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2,456</h3>
                            <p>Ümumi Məhsul</p>
                            <div class="stat-change positive">Bütün anbarlar</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Az Stok</p>
                            <div class="stat-change negative">Diqqət tələb edir</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Hərəkət</p>
                            <div class="stat-change positive">Bu gün</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Lokalizasiya</th>
                            <th>Məsul şəxs</th>
                            <th>Məhsul sayı</th>
                            <th>Ümumi dəyər</th>
                            <th>Son hərəkət</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Baş Anbar</td>
                            <td>Bakı, Yasamal</td>
                            <td>Vüqar Abbasov</td>
                            <td>1,234</td>
                            <td>₼234,560</td>
                            <td>19.02.2024 15:30</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'view', 'main')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'edit', 'main')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'inventory', 'main')">
                                        <i class="fas fa-boxes"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Filial Anbar</td>
                            <td>Bakı, Nərimanov</td>
                            <td>Leyla Həsənova</td>
                            <td>789</td>
                            <td>₼123,450</td>
                            <td>19.02.2024 14:45</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'view', 'branch')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'edit', 'branch')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'inventory', 'branch')">
                                        <i class="fas fa-boxes"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Ehtiyat Anbar</td>
                            <td>Sumqayıt</td>
                            <td>Rəşad Məmmədov</td>
                            <td>433</td>
                            <td>₼89,670</td>
                            <td>19.02.2024 12:15</td>
                            <td><span class="status-badge inactive">Təmir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'view', 'reserve')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'edit', 'reserve')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('warehouse', 'maintenance', 'reserve')">
                                        <i class="fas fa-tools"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('warehouse', 'bulk-inventory')">
                            <i class="fas fa-clipboard-check"></i>
                            İnventarizasiya
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('warehouse', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('warehouse', 'bulk-report')">
                            <i class="fas fa-file-alt"></i>
                            Hesabat
                        </button>
                    </div>
                </div>
            </div>

            <!-- Transfer Modal -->
            <div id="warehouseTransferModal" class="modal-overlay" style="display: none;">
                <div class="modal-container">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Anbarlar Arası Transfer</h3>
                            <button class="btn-close" onclick="app.closeWarehouseTransferModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="warehouseTransferForm" onsubmit="app.processWarehouseTransfer(event)">
                                <div class="form-group">
                                    <label class="form-label">Çıxış Anbar</label>
                                    <select class="form-input" name="fromWarehouse" required>
                                        <option value="main">Baş Anbar</option>
                                        <option value="branch">Filial Anbar</option>
                                        <option value="reserve">Ehtiyat Anbar</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Daxil Anbar</label>
                                    <select class="form-input" name="toWarehouse" required>
                                        <option value="branch">Filial Anbar</option>
                                        <option value="main">Baş Anbar</option>
                                        <option value="reserve">Ehtiyat Anbar</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Məhsul</label>
                                    <select class="form-input" name="product" required>
                                        <option value="prod1">Dell Laptop (15 ədəd)</option>
                                        <option value="prod2">iPhone 15 (25 ədəd)</option>
                                        <option value="prod3">Samsung TV (8 ədəd)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Miqdar</label>
                                    <input type="number" class="form-input" name="quantity" min="1" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Qeyd</label>
                                    <textarea class="form-input" name="note" rows="3"></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onclick="app.closeWarehouseTransferModal()">
                                        Ləğv et
                                    </button>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-exchange-alt"></i>
                                        Transfer et
                                    </button>
                                </div>
                            </form>
                        </div>
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
    const title = action === 'create' ? 'Yeni Anbar' : action === 'edit' ? 'Anbarı Redaktə Et' : 'Anbar Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni anbar məlumatlarını daxil edin' : 'Anbar məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('warehouse')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="warehouseForm" onsubmit="app.submitModuleForm(event, 'warehouse', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Anbar Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Anbar ID</label>
                                <input type="text" name="warehouseIdDisplay" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Anbar Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Lokalizasiya *</label>
                                <input type="text" name="location" class="form-input" value="${data.location || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məsul Şəxs</label>
                                <input type="text" name="responsiblePerson" class="form-input" value="${data.responsiblePerson || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tutumu (m³)</label>
                                <input type="number" name="capacity" class="form-input" value="${data.capacity || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Anbar Növü</label>
                                <select name="type" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="general" ${data.type === 'general' ? 'selected' : ''}>Ümumi</option>
                                    <option value="cold" ${data.type === 'cold' ? 'selected' : ''}>Soyuq Anbar</option>
                                    <option value="bonded" ${data.type === 'bonded' ? 'selected' : ''}>Gömrük Anbarı</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
                                    <option value="maintenance" ${data.status === 'maintenance' ? 'selected' : ''}>Təmir</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('warehouse')">
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