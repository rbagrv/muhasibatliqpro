export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Əsas Vəsaitlər</h1>
                <p>Şirkətin əsas vəsaitlərinin qeydiyyatı və idarə olunması.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('fixed-assets', 'create')">
                    <i class="fas fa-plus"></i> Yeni Vəsait
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼850,000</h3>
                            <p>Ümumi Dəyər</p>
                            <div class="stat-change positive">+12% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼125,000</h3>
                            <p>İllik Köhnəlmə</p>
                            <div class="stat-change neutral">Hesablanıb</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Aktiv Vəsait</p>
                            <div class="stat-change positive">+3 yeni</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>5</h3>
                            <p>Köhnəlmiş</p>
                            <div class="stat-change negative">Yenilənməli</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Kateqoriya</th>
                            <th>İlkin Dəyər</th>
                            <th>Cari Dəyər</th>
                            <th>Alış Tarixi</th>
                            <th>Köhnəlmə</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Server Dell PowerEdge</td>
                            <td>IT Avadanlıq</td>
                            <td>₼25,000</td>
                            <td>₼18,750</td>
                            <td>10.01.2023</td>
                            <td>25%</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'view', 'FA-2023-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'edit', 'FA-2023-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'chart-line', 'FA-2023-001')">
                                        <i class="fas fa-chart-line"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Ofis Binası</td>
                            <td>Daşınmaz Əmlak</td>
                            <td>₼500,000</td>
                            <td>₼475,000</td>
                            <td>01.01.2022</td>
                            <td>5%</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'view', 'FA-2022-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'edit', 'FA-2022-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'chart-line', 'FA-2022-001')">
                                        <i class="fas fa-chart-line"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Nəqliyyat Vasitəsi</td>
                            <td>Avtomobil</td>
                            <td>₼45,000</td>
                            <td>₼31,500</td>
                            <td>15.06.2022</td>
                            <td>30%</td>
                            <td><span class="status-badge warning">Köhnəlir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'view', 'FA-2022-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'edit', 'FA-2022-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('fixed-assets', 'warning', 'FA-2022-002')">
                                        <i class="fas fa-exclamation-triangle"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('fixed-assets', 'bulk-depreciation')">
                            <i class="fas fa-calculator"></i>
                            Köhnəlmə Hesabla
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('fixed-assets', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('fixed-assets', 'bulk-archive')">
                            <i class="fas fa-archive"></i>
                            Arxivləşdir
                        </button>
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
    const title = action === 'create' ? 'Yeni Əsas Vəsait' : action === 'edit' ? 'Əsas Vəsaiti Redaktə Et' : 'Əsas Vəsait Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni əsas vəsait məlumatlarını daxil edin' : 'Əsas vəsait məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('fixed-assets')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="fixedAssetForm" onsubmit="app.submitModuleForm(event, 'fixed-assets', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Vəsait Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Vəsait ID</label>
                                <input type="text" name="assetIdDisplay" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Kateqoriya *</label>
                                <select name="category" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="it_equipment" ${data.category === 'it_equipment' ? 'selected' : ''}>IT Avadanlıq</option>
                                    <option value="real_estate" ${data.category === 'real_estate' ? 'selected' : ''}>Daşınmaz Əmlak</option>
                                    <option value="vehicle" ${data.category === 'vehicle' ? 'selected' : ''}>Nəqliyyat Vasitəsi</option>
                                    <option value="machinery" ${data.category === 'machinery' ? 'selected' : ''}>Maşın və Avadanlıq</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Alış Tarixi *</label>
                                <input type="date" name="purchaseDate" class="form-input" value="${data.purchaseDate || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">İlkin Dəyər *</label>
                                <input type="number" name="initialValue" class="form-input" value="${data.initialValue || ''}" min="0" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir</label>
                                <textarea name="description" class="form-textarea" ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Köhnəlmə Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Köhnəlmə Metodu *</label>
                                <select name="depreciationMethod" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="straight_line" ${data.depreciationMethod === 'straight_line' ? 'selected' : ''}>Düzxəttli</option>
                                    <option value="declining_balance" ${data.depreciationMethod === 'declining_balance' ? 'selected' : ''}>Azalan Balans</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Faydalı Ömür (il) *</label>
                                <input type="number" name="usefulLife" class="form-input" value="${data.usefulLife || '0'}" min="1" step="1" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Qalıq Dəyəri</label>
                                <input type="number" name="salvageValue" class="form-input" value="${data.salvageValue || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="disposed" ${data.status === 'disposed' ? 'selected' : ''}>Sərəncamdan Çıxarılıb</option>
                                    <option value="fully_depreciated" ${data.status === 'fully_depreciated' ? 'selected' : ''}>Tam Köhnəlmiş</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('fixed-assets')">
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