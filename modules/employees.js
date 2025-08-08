export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Kadrlar</h1>
                <p>Şirkət işçi heyətinin nəzərat, siyahı və idarəetməsi.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('employees', 'create')">
                    <i class="fas fa-plus"></i> Yeni İşçi
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ad Soyad</th>
                            <th>Vəzifə</th>
                            <th>Şöbə</th>
                            <th>Əmək haqqı</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Rövşən Bəgırov</td>
                            <td>Baş Mühasib</td>
                            <td>Maliyyə</td>
                            <td>₼2,400</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('employees', 'view', 'emp1')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('employees', 'edit', 'emp1')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni İşçi' : action === 'edit' ? 'İşçini Redaktə Et' : 'İşçi Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni işçi məlumatlarını daxil edin' : 'İşçi məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('employees', 'list')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="employeeForm" onsubmit="app.handleEntityOp('employees', '${action === 'create' ? 'create' : 'save'}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Şəxsi Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">İşçi ID</label>
                                <input type="text" name="employeeIdDisplay" class="form-input" value="${displayId}" readonly>
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
                                <label class="form-label">Doğum Tarixi</label>
                                <input type="date" name="dateOfBirth" class="form-input" value="${data.dateOfBirth || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Ünvan</label>
                                <textarea name="address" class="form-textarea" ${isView ? 'readonly' : ''}>${data.address || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Vəzifə Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Vəzifə *</label>
                                <input type="text" name="position" class="form-input" value="${data.position || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Şöbə</label>
                                <input type="text" name="department" class="form-input" value="${data.department || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">İşə Başlama Tarixi *</label>
                                <input type="date" name="hireDate" class="form-input" value="${data.hireDate || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Əmək haqqı</label>
                                <input type="number" name="salary" class="form-input" value="${data.salary || ''}" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
                                    <option value="on_leave" ${data.status === 'on_leave' ? 'selected' : ''}>Məzuniyyətdə</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.handleEntityOp('employees', 'list')">
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