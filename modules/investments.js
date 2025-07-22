export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>İnvestisiya İdarəetməsi</h1>
                <p>Şirkətin investisiya layihələri və gəlirlilik göstəriciləri.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('investments', 'create')">
                    <i class="fas fa-plus"></i> Yeni İnvestisiya
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼450,000</h3>
                            <p>Ümumi İnvestisiya</p>
                            <div class="stat-change positive">+15% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12.5%</h3>
                            <p>ROI</p>
                            <div class="stat-change positive">Gözlənilən</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                        <div class="stat-content">
                            <h3>8</h3>
                            <p>Aktiv Layihə</p>
                            <div class="stat-change neutral">İcrada</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Gözləyən</p>
                            <div class="stat-change neutral">Təsdiq</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Layihə</th>
                            <th>Tip</th>
                            <th>İnvestisiya</th>
                            <th>Başlama</th>
                            <th>Müddət</th>
                            <th>ROI</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Anbar Kompleksi</td>
                            <td>Daşınmaz Əmlak</td>
                            <td>₼250,000</td>
                            <td>01.01.2024</td>
                            <td>24 ay</td>
                            <td>15%</td>
                            <td><span class="status-badge active">İcrada</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'view', 'INV-2024-001')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'edit', 'INV-2024-001')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'chart-bar', 'INV-2024-001')">
                                        <i class="fas fa-chart-bar"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>IT İnfrastruktur</td>
                            <td>Texnologiya</td>
                            <td>₼120,000</td>
                            <td>15.02.2024</td>
                            <td>12 ay</td>
                            <td>8%</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'view', 'INV-2024-002')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'edit', 'INV-2024-002')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'check', 'INV-2024-002')">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>E-commerce Platform</td>
                            <td>Proqram Təminatı</td>
                            <td>₼80,000</td>
                            <td>10.01.2024</td>
                            <td>6 ay</td>
                            <td>25%</td>
                            <td><span class="status-badge active">İcrada</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'view', 'INV-2024-003')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'edit', 'INV-2024-003')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('investments', 'chart-bar', 'INV-2024-003')">
                                        <i class="fas fa-chart-bar"></i>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('investments', 'bulk-approve')">
                            <i class="fas fa-check-double"></i>
                            Seçilmişləri Təsdiqlə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('investments', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('investments', 'bulk-archive')">
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
    const title = action === 'create' ? 'Yeni İnvestisiya' : action === 'edit' ? 'İnvestisiyanı Redaktə Et' : 'İnvestisiya Məlumatları';

    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni investisiya layihəsi məlumatlarını daxil edin' : 'İnvestisiya məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('investments')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>

            <form id="investmentForm" onsubmit="app.submitModuleForm(event, 'investments', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Layihə Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">İnvestisiya ID</label>
                                <input type="text" name="investmentIdDisplay" class="form-input" value="${displayId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Layihə Adı *</label>
                                <input type="text" name="projectName" class="form-input" value="${data.projectName || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Layihə Növü *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="real_estate" ${data.type === 'real_estate' ? 'selected' : ''}>Daşınmaz Əmlak</option>
                                    <option value="technology" ${data.type === 'technology' ? 'selected' : ''}>Texnologiya</option>
                                    <option value="software" ${data.type === 'software' ? 'selected' : ''}>Proqram Təminatı</option>
                                    <option value="startup" ${data.type === 'startup' ? 'selected' : ''}>Startup</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">İnvestisiya Məbləği *</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || ''}" min="0" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
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
                            <div class="form-group full-width">
                                <label class="form-label">Təsvir</label>
                                <textarea name="description" class="form-textarea" ${isView ? 'readonly' : ''}>${data.description || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Gəlirlilik və Status</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Gözlənilən ROI (%)</label>
                                <input type="number" name="expectedROI" class="form-input" value="${data.expectedROI || '0'}" min="0" max="100" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Gözlənilən Gəlir</label>
                                <input type="number" name="expectedRevenue" class="form-input" value="${data.expectedRevenue || '0'}" min="0" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>İcrada</option>
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Tamamlanıb</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('investments')">
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