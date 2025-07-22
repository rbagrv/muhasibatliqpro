export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Qeyri-Maddi Aktivlər</h1>
                <p>Patent, proqram təminatı, marka və digər qeyri-maddi aktivlərin qeydiyyatı və amortizasiyası.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('intangible-assets', 'create')">
                    <i class="fas fa-plus"></i> Yeni Aktiv
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼350,000</h3>
                            <p>Ümumi Dəyər</p>
                            <div class="stat-change positive">+15% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼70,000</h3>
                            <p>İllik Amortizasiya</p>
                            <div class="stat-change neutral">Hesablanıb</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Aktiv Patent</p>
                            <div class="stat-change positive">+2 yeni</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Vaxtı Bitir</p>
                            <div class="stat-change negative">90 gün ərzində</div>
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
                            <th>Qeydiyyat Tarixi</th>
                            <th>Bitmə Tarixi</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ERP Lisenziyası</td>
                            <td>Proqram Təminatı</td>
                            <td>₼120,000</td>
                            <td>₼96,000</td>
                            <td>01.01.2023</td>
                            <td>31.12.2025</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'view', 'IA-2023-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'edit', 'IA-2023-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'chart-line', 'IA-2023-001')">
                                        <i class="fas fa-chart-line"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Ticarət Markası</td>
                            <td>Marka</td>
                            <td>₼85,000</td>
                            <td>₼85,000</td>
                            <td>15.06.2022</td>
                            <td>15.06.2032</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'view', 'IA-2022-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'edit', 'IA-2022-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'file-contract', 'IA-2022-001')">
                                        <i class="fas fa-file-contract"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Patent X-125</td>
                            <td>Patent</td>
                            <td>₼45,000</td>
                            <td>₼36,000</td>
                            <td>10.03.2022</td>
                            <td>10.03.2024</td>
                            <td><span class="status-badge warning">Vaxtı bitir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'view', 'IA-2022-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'edit', 'IA-2022-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('intangible-assets', 'sync', 'IA-2022-002')">
                                        <i class="fas fa-sync"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('intangible-assets', 'bulk-amortization')">
                            <i class="fas fa-calculator"></i>
                            Amortizasiya Hesabla
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('intangible-assets', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('intangible-assets', 'bulk-renewal')">
                            <i class="fas fa-sync"></i>
                            Yenilənmə
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
    const title = action === 'create' ? 'Yeni Qeyri-Maddi Aktiv' : action === 'edit' ? 'Qeyri-Maddi Aktivi Redaktə Et' : 'Qeyri-Maddi Aktiv Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni qeyri-maddi aktiv məlumatlarını daxil edin' : 'Qeyri-maddi aktiv məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('intangible-assets')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="intangibleAssetForm" onsubmit="app.submitModuleForm(event, 'intangible-assets', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Aktiv Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Aktiv ID</label>
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
                                    <option value="software_license" ${data.category === 'software_license' ? 'selected' : ''}>Proqram Lisenziyası</option>
                                    <option value="patent" ${data.category === 'patent' ? 'selected' : ''}>Patent</option>
                                    <option value="trademark" ${data.category === 'trademark' ? 'selected' : ''}>Ticarət Markası</option>
                                    <option value="copyright" ${data.category === 'copyright' ? 'selected' : ''}>Müəllif Hüququ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Qeydiyyat Tarixi *</label>
                                <input type="date" name="acquisitionDate" class="form-input" value="${data.acquisitionDate || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
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
                            <div class="form-group">
                                <label class="form-label">Bitmə Tarixi</label>
                                <input type="date" name="expirationDate" class="form-input" value="${data.expirationDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir</label>
                                <textarea name="description" class="form-textarea" ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Amortizasiya Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Amortizasiya Metodu *</label>
                                <select name="amortizationMethod" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="straight_line" ${data.amortizationMethod === 'straight_line' ? 'selected' : ''}>Düzxəttli</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Faydalı Ömür (il) *</label>
                                <input type="number" name="usefulLife" class="form-input" value="${data.usefulLife || '0'}" min="1" step="1" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="expired" ${data.status === 'expired' ? 'selected' : ''}>Bitib</option>
                                    <option value="amortized" ${data.status === 'amortized' ? 'selected' : ''}>Tam Amortizasiya Olunmuş</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('intangible-assets')">
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