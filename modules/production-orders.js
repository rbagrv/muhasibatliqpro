export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>İstehsalat Sifarişləri</h1>
                <p>İstehsalat üçün yaradılmış sifarişlər və onların icra vəziyyəti.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('production-orders', 'create')">
                    <i class="fas fa-plus"></i> Yeni Sifariş
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-industry"></i>
                        </div>
                        <div class="stat-content">
                            <h3>34</h3>
                            <p>Aktiv Sifariş</p>
                            <div class="stat-change positive">+8 bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>28</h3>
                            <p>Tamamlanmış</p>
                            <div class="stat-change positive">85% effektivlik</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>6</h3>
                            <p>Gözləyən</p>
                            <div class="stat-change neutral">İcra gözləyir</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1,250</h3>
                            <p>Planlaşdırılan</p>
                            <div class="stat-change positive">Məhsul sayı</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Sifariş #</th>
                            <th>Məhsul</th>
                            <th>Miqdar</th>
                            <th>Başlama Tarixi</th>
                            <th>Son Tarix</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PRO-2024-001</td>
                            <td>Dell Laptop</td>
                            <td>25 ədəd</td>
                            <td>10.02.2024</td>
                            <td>25.02.2024</td>
                            <td><span class="status-badge active">İstehsalatda</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-cog"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>PRO-2024-002</td>
                            <td>Gaming PC</td>
                            <td>10 ədəd</td>
                            <td>12.02.2024</td>
                            <td>28.02.2024</td>
                            <td><span class="status-badge pending">Gözləyir</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-play"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>PRO-2024-003</td>
                            <td>iPhone 15</td>
                            <td>50 ədəd</td>
                            <td>15.02.2024</td>
                            <td>01.03.2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-print"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-archive"></i></button>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('production-orders', 'bulk-start')">
                            <i class="fas fa-play"></i>
                            Seçilmişləri Başlat
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('production-orders', 'bulk-complete')">
                            <i class="fas fa-check-double"></i>
                            Tamamlandı
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('production-orders', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('production-orders', 'bulk-archive')">
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
    const title = action === 'create' ? 'Yeni İstehsalat Sifarişi' : action === 'edit' ? 'İstehsalat Sifarişini Redaktə Et' : 'İstehsalat Sifarişi Məlumatları';
    
    const newId = action === 'create' ? 'PRD-ORD-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni istehsalat sifarişi əlavə edin' : 'İstehsalat sifarişi məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('production-orders')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="productionOrdersForm" onsubmit="app.submitModuleForm(event, 'production-orders', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Sifariş Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Sifariş №</label>
                                <input type="text" name="orderNumber" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məhsul *</label>
                                <select name="product" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="prod1" ${data.product === 'prod1' ? 'selected' : ''}>Dell Laptop</option>
                                    <option value="prod2" ${data.product === 'prod2' ? 'selected' : ''}>Gaming PC</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Miqdar *</label>
                                <input type="number" name="quantity" class="form-input" value="${data.quantity || '1'}" min="1" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Başlama Tarixi *</label>
                                <input type="date" name="startDate" class="form-input" value="${data.startDate || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Son Tarix</label>
                                <input type="date" name="endDate" class="form-input" value="${data.endDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Gözləyir</option>
                                    <option value="in_progress" ${data.status === 'in_progress' ? 'selected' : ''}>İstehsalatda</option>
                                    <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Tamamlandı</option>
                                    <option value="cancelled" ${data.status === 'cancelled' ? 'selected' : ''}>Ləğv edilib</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Prioritet</label>
                                <select name="priority" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="low" ${data.priority === 'low' ? 'selected' : ''}>Aşağı</option>
                                    <option value="medium" ${data.priority === 'medium' ? 'selected' : ''}>Orta</option>
                                    <option value="high" ${data.priority === 'high' ? 'selected' : ''}>Yüksək</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('production-orders')">
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