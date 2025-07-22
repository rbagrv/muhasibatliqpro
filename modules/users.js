export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>İstifadəçilər</h1>
                <p>Sistemdə mövcud olan istifadəçilərin idarəsi.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('users', 'create')">
                    <i class="fas fa-plus"></i> Yeni İstifadəçi
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Ümumi İstifadəçi</p>
                            <div class="stat-change positive">+3 bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="stat-content">
                            <h3>38</h3>
                            <p>Aktiv İstifadəçi</p>
                            <div class="stat-change positive">84% aktiv</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1</h3>
                            <p>SuperAdmin</p>
                            <div class="stat-change neutral">Sistem admini</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-user-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2</h3>
                            <p>Gözləyən</p>
                            <div class="stat-change neutral">Təsdiq gözləyir</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>İstifadəçi</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Rol</th>
                            <th>Son Giriş</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <div class="user-avatar">RB</div>
                                    <div>
                                        <div class="user-name">Rəşad Bağırov</div>
                                        <div class="user-email">r.bagrv1@gmail.com</div>
                                    </div>
                                </div>
                            </td>
                            <td>r.bagrv1@gmail.com</td>
                            <td>+994558409394</td>
                            <td><span class="badge badge-warning">SuperAdmin</span></td>
                            <td>Aktiv</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'view', 'U-0001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'edit', 'U-0001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <div class="user-avatar">LH</div>
                                    <div>
                                        <div class="user-name">Leyla Həsənova</div>
                                        <div class="user-email">l.hasanova@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td>l.hasanova@example.com</td>
                            <td>+994 50 123 45 67</td>
                            <td><span class="badge badge-success">Mühasib</span></td>
                            <td>1 saat əvvəl</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'view', 'user2')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'edit', 'user2')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'delete', 'user2')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <div class="user-avatar">EM</div>
                                    <div>
                                        <div class="user-name">Elşən Məmmədli</div>
                                        <div class="user-email">e.mammadli@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td>e.mammadli@example.com</td>
                            <td>+994 55 987 65 43</td>
                            <td><span class="badge badge-info">Operator</span></td>
                            <td>2 gün əvvəl</td>
                            <td><span class="status-badge pending">Təsdiq gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'view', 'user3')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'approve', 'user3')">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('users', 'delete', 'user3')">
                                        <i class="fas fa-trash"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('users', 'bulk-activate')">
                            <i class="fas fa-check-double"></i>
                            Seçilmişləri Aktivləşdir
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('users', 'bulk-deactivate')">
                            <i class="fas fa-ban"></i>
                            Deaktiv Et
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('users', 'bulk-delete')">
                            <i class="fas fa-trash"></i>
                            Seçilmişləri Sil
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('users', 'export')">
                            <i class="fas fa-download"></i>
                            Excel Export
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
    const title = action === 'create' ? 'Yeni İstifadəçi' : action === 'edit' ? 'İstifadəçini Redaktə Et' : 'İstifadəçi Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';
    
    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni istifadəçi məlumatlarını daxil edin' : 'İstifadəçi məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('users')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="userForm" onsubmit="app.submitModuleForm(event, 'users', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Şəxsi Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">İstifadəçi ID</label>
                                <input type="text" name="userIdDisplay" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad *</label>
                                <input type="text" name="firstName" class="form-input" value="${data.firstName || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Soyad *</label>
                                <input type="text" name="lastName" class="form-input" value="${data.lastName || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" name="email" class="form-input" value="${data.email || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Telefon</label>
                                <input type="tel" name="phone" class="form-input" value="${data.phone || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                             <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Deaktiv</option>
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyən</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Təhlükəsizlik və Rol</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Rol *</label>
                                <select name="role" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="user" ${data.role === 'user' ? 'selected' : ''}>İstifadəçi</option>
                                    <option value="accountant" ${data.role === 'accountant' ? 'selected' : ''}>Mühasib</option>
                                    <option value="manager" ${data.role === 'manager' ? 'selected' : ''}>Menecer</option>
                                    <option value="admin" ${data.role === 'admin' ? 'selected' : ''}>Admin</option>
                                    ${app.currentUser && app.currentUser.role === 'superadmin' ? `<option value="superadmin" ${data.role === 'superadmin' ? 'selected' : ''}>SuperAdmin</option>` : ''}
                                </select>
                            </div>
                            ${!isView ? `
                            <div class="form-group">
                                <label class="form-label">Şifrə ${action === 'create' ? '*' : '(boş buraxın dəyişmək istəmirsinizsə)'}</label>
                                <input type="password" name="password" class="form-input" ${action === 'create' ? 'required' : ''}>
                            </div>
                            ` : ''}
                            ${app.currentUser && app.currentUser.role === 'superadmin' ? `
                            <div class="form-group">
                                <label class="form-label">Tenant (Biznes)</label>
                                <select name="tenantId" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="t1" ${data.tenantId === 't1' ? 'selected' : ''}>ABC MMC</option>
                                    <option value="t2" ${data.tenantId === 't2' ? 'selected' : ''}>XYZ Holdings</option>
                                </select>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('users')">
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