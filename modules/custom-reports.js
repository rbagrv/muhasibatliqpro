export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1 class="page-title">Xüsusi Hesabatlar</h1>
                <p class="page-subtitle">Biznesinizə uyğun xüsusi hesabatlar və analitik görünüşlər.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('custom-reports', 'create')">
                    <i class="fas fa-plus"></i> Yeni Hesabat
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>15</h3>
                            <p>Aktiv Hesabatlar</p>
                            <div class="stat-change neutral">Bu ay</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>8</h3>
                            <p>Avtomat Hesabatlar</p>
                            <div class="stat-change positive">Planlaşdırılmış</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-download"></i>
                        </div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Yükləmə</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table" id="customReportsTable">
                    <thead>
                        <tr>
                            <th>Hesabat Adı</th>
                            <th>Tip</th>
                            <th>Tezlik</th>
                            <th>Son Yenilənmə</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Satış Performansı</td>
                            <td>Analitik</td>
                            <td>Həftəlik</td>
                            <td>2 saat əvvəl</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'view', 'CRPT-0001')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'edit', 'CRPT-0001')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'download', 'CRPT-0001')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Məhsul Kategoriyaları</td>
                            <td>Statistik</td>
                            <td>Aylıq</td>
                            <td>1 gün əvvəl</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'view', 'CRPT-0002')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'edit', 'CRPT-0002')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'download', 'CRPT-0002')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Debitor Borcları Üzərində Yaşlandırma</td>
                            <td>Maliyyə</td>
                            <td>Aylıq</td>
                            <td>3 gün əvvəl</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'view', 'CRPT-0003')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'download', 'CRPT-0003')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Xammal Sərfiyyatı Analizi</td>
                            <td>İstehsalat</td>
                            <td>Rüblük</td>
                            <td>Keçən həftə</td>
                            <td><span class="status-badge active">Aktiv</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'view', 'CRPT-0004')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'download', 'CRPT-0004')"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Büdcədən Yayınma Analizi</td>
                            <td>Büdcə</td>
                            <td>Aylıq</td>
                            <td>Bugün</td>
                            <td><span class="status-badge pending">Hesablanır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'view', 'CRPT-0005')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('custom-reports', 'edit', 'CRPT-0005')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni Xüsusi Hesabat' : action === 'edit' ? 'Xüsusi Hesabatı Redaktə Et' : 'Xüsusi Hesabat Məlumatları';

    const newId = action === 'create' ? 'CRPT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni xüsusi hesabat yaradın' : 'Xüsusi hesabat məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('custom-reports')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="customReportsForm" onsubmit="app.submitForm(event, 'custom-reports', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Hesabat Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Hesabat Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="analytical" ${data.type === 'analytical' ? 'selected' : ''}>Analitik</option>
                                    <option value="statistical" ${data.type === 'statistical' ? 'selected' : ''}>Statistik</option>
                                    <option value="financial" ${data.type === 'financial' ? 'selected' : ''}>Maliyyə</option>
                                    <option value="inventory" ${data.type === 'inventory' ? 'selected' : ''}>Anbar</option>
                                    <option value="production" ${data.type === 'production' ? 'selected' : ''}>İstehsalat</option>
                                    <option value="budget" ${data.type === 'budget' ? 'selected' : ''}>Büdcə</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tezlik</label>
                                <select name="frequency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="daily" ${data.frequency === 'daily' ? 'selected' : ''}>Gündəlik</option>
                                    <option value="weekly" ${data.frequency === 'weekly' ? 'selected' : ''}>Həftəlik</option>
                                    <option value="monthly" ${data.frequency === 'monthly' ? 'selected' : ''}>Aylıq</option>
                                    <option value="quarterly" ${data.frequency === 'quarterly' ? 'selected' : ''}>Rüblük</option>
                                    <option value="yearly" ${data.frequency === 'yearly' ? 'selected' : ''}>İllik</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Başlama Tarixi</label>
                                <input type="date" name="startDate" class="form-input" value="${data.startDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Bitmə Tarixi</label>
                                <input type="date" name="endDate" class="form-input" value="${data.endDate || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Aktiv</option>
                                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Qeyri-aktiv</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('custom-reports')">
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

