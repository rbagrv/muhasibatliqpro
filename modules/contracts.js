export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Əmək Müqavilələri</h1>
                <p>İşçilərlə imzalanan əmək müqavilələrinin qeydiyyatı və idarə edilməsi.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('contracts', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('contracts', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Müqavilə
                    </button>
                </div>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-file-signature"></i>
                        </div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Aktiv Müqavilə</p>
                            <div class="stat-change positive">+3 bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>5</h3>
                            <p>Bitir</p>
                            <div class="stat-change negative">30 gün ərzində</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2</h3>
                            <p>Yeni Müqavilə</p>
                            <div class="stat-change positive">Bu həftə</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-tasks"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Gözləyir</p>
                            <div class="stat-change neutral">İmzalanma</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Müqavilə №</th>
                            <th>İşçi</th>
                            <th>Vəzifə</th>
                            <th>Başlama</th>
                            <th>Bitmə</th>
                            <th>Əmək haqqı</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>EMP-2024-001</td>
                            <td>Rəşad Məmmədov</td>
                            <td>Baş Mühasib</td>
                            <td>01.01.2024</td>
                            <td>31.12.2024</td>
                            <td>₼2,500.00</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'view', 'EMP-2024-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'edit', 'EMP-2024-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'print', 'EMP-2024-001')">
                                        <i class="fas fa-print"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>EMP-2024-002</td>
                            <td>Leyla Əliyeva</td>
                            <td>HR Menecer</td>
                            <td>15.01.2024</td>
                            <td>14.01.2025</td>
                            <td>₼1,800.00</td>
                            <td><span class="status-badge pending">İmza gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'view', 'EMP-2024-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'edit', 'EMP-2024-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'sign', 'EMP-2024-002')">
                                        <i class="fas fa-signature"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>EMP-2023-045</td>
                            <td>Vüqar Həsənov</td>
                            <td>Satış Meneceri</td>
                            <td>01.03.2023</td>
                            <td>28.02.2024</td>
                            <td>₼1,500.00</td>
                            <td><span class="status-badge warning">Bitir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'view', 'EMP-2023-045')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'renew', 'EMP-2023-045')">
                                        <i class="fas fa-sync"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('contracts', 'terminate', 'EMP-2023-045')">
                                        <i class="fas fa-ban"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('contracts', 'bulk-sign')">
                            <i class="fas fa-file-signature"></i>
                            Seçilmişləri İmzala
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('contracts', 'bulk-print')">
                            <i class="fas fa-print"></i>
                            Çap Et
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('contracts', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('contracts', 'bulk-archive')">
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
    const title = action === 'create' ? 'Yeni Müqavilə' : action === 'edit' ? 'Müqaviləni Redaktə Et' : 'Müqavilə Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni müqavilə məlumatlarını daxil edin' : 'Müqavilə məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('contracts')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="contractForm" onsubmit="app.submitModuleForm(event, 'contracts', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Müqavilə Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Müqavilə Nömrəsi</label>
                                <input type="text" name="contractNumber" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">İşçi *</label>
                                <select name="employeeId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">İşçi seçin...</option>
                                    <option value="emp1" ${data.employeeId === 'emp1' ? 'selected' : ''}>Rövşən Bəgirov</option>
                                    <option value="emp2" ${data.employeeId === 'emp2' ? 'selected' : ''}>Leyla Həsənova</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Vəzifə *</label>
                                <input type="text" name="position" class="form-input" value="${data.position || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Müqavilə Növü *</label>
                                <select name="contractType" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="full_time" ${data.contractType === 'full_time' ? 'selected' : ''}>Tam Zamanlı</option>
                                    <option value="part_time" ${data.contractType === 'part_time' ? 'selected' : ''}>Yarı Zamanlı</option>
                                    <option value="service" ${data.contractType === 'service' ? 'selected' : ''}>Xidmət Müqaviləsi</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Başlama Tarixi *</label>
                                <input type="date" name="startDate" class="form-input" value="${data.startDate || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Bitmə Tarixi</label>
                                <input type="date" name="endDate" class="form-input" value="${data.endDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Əmək Haqqı</label>
                                <input type="number" name="salary" class="form-input" value="${data.salary || ''}" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                             <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Müqavilə Mətni (URL/Fayl)</label>
                                <input type="text" name="contractUrl" class="form-input" value="${data.contractUrl || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Əlavə Məlumatlar</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="expired" ${data.status === 'expired' ? 'selected' : ''}>Bitib</option>
                                    <option value="terminated" ${data.status === 'terminated' ? 'selected' : ''}>Ləğv edilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('contracts')">
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