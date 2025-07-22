export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Tenant İdarəetməsi</h1>
                <p>Sistemdə qeydiyyatda olan şirkət (tenant) idarəetməsi.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('tenants', 'create')">
                    <i class="fas fa-plus"></i> Yeni Tenant
                </button>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-content">
                            <h3>24</h3>
                            <p>Aktiv Tenant</p>
                            <div class="stat-change positive">+3 bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>456</h3>
                            <p>Ümumi İstifadəçi</p>
                            <div class="stat-change positive">Bütün tenantlar</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼18,450</h3>
                            <p>Aylıq Gəlir</p>
                            <div class="stat-change positive">+12% artım</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Domain</th>
                            <th>Plan</th>
                            <th>İstifadəçi</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ABC MMC</td>
                            <td>abc.muhasibatliqpro.az</td>
                            <td><span class="badge badge-success">Professional</span></td>
                            <td>23</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'view', 'TNT-0001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'edit', 'TNT-0001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'cog', 'TNT-0001')">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>XYZ Holdings</td>
                            <td>xyz.muhasibatliqpro.az</td>
                            <td><span class="badge badge-primary">Enterprise</span></td>
                            <td>67</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'view', 'TNT-0002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'edit', 'TNT-0002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'cog', 'TNT-0002')">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Demo Biznes</td>
                            <td>demo.muhasibatliqpro.az</td>
                            <td><span class="badge badge-warning">Basic</span></td>
                            <td>5</td>
                            <td><span class="status-badge trial">Trial</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'view', 'TNT-0003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'edit', 'TNT-0003')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('tenants', 'upgrade', 'TNT-0003')">
                                        <i class="fas fa-upgrade"></i>
                                    </button>
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
    const title = action === 'create' ? 'Yeni Tenant (Biznes) Yarat' : action === 'edit' ? 'Tenantı Redaktə Et' : 'Tenant Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni biznes (tenant) məlumatlarını daxil edin' : 'Biznes (tenant) məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('tenants')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="tenantForm" onsubmit="app.submitModuleForm(event, 'tenants', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Tenant ID</label>
                                <input type="text" name="tenantIdDisplay" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Biznes Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Subdomain *</label>
                                <input type="text" name="subdomain" class="form-input" value="${data.subdomain || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Plan *</label>
                                <select name="plan" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="basic" ${data.plan === 'basic' ? 'selected' : ''}>Basic</option>
                                    <option value="professional" ${data.plan === 'professional' ? 'selected' : ''}>Professional</option>
                                    <option value="enterprise" ${data.plan === 'enterprise' ? 'selected' : ''}>Enterprise</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Deaktiv</option>
                                    <option value="trial" ${data.status === 'trial' ? 'selected' : ''}>Sınaq</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('tenants')">
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