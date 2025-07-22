export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>İşə Davamiyyət</h1>
                <p>İşçi heyətinin davamiyyət qeydlərinin idarə edilməsi.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('attendance', 'create')">
                    <i class="fas fa-plus"></i> Yeni Giriş/Çıxış Qeydiyyatı
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
                            <p>Bu gün İşdə</p>
                            <div class="stat-change positive">92% iştirak</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-user-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>3</h3>
                            <p>Gecikən</p>
                            <div class="stat-change negative">Bu gün</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-business-time"></i>
                        </div>
                        <div class="stat-content">
                            <h3>4</h3>
                            <p>Məzuniyyətdə</p>
                            <div class="stat-change neutral">Planlaşdırılmış</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>168</h3>
                            <p>İş Saatı</p>
                            <div class="stat-change positive">Bu ay</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>İşçi</th>
                            <th>Tarix</th>
                            <th>Giriş</th>
                            <th>Çıxış</th>
                            <th>İş Saatı</th>
                            <th>Qeyd</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Əli Məmmədov</td>
                            <td>19.02.2024</td>
                            <td>09:05</td>
                            <td>18:00</td>
                            <td>8.92</td>
                            <td>5 dəq gecikib</td>
                            <td><span class="status-badge warning">Gecikib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'view', 'ATT-0001')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'edit', 'ATT-0001')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'comment', 'ATT-0001')"><i class="fas fa-comment"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Leyla Həsənova</td>
                            <td>19.02.2024</td>
                            <td>08:55</td>
                            <td>18:00</td>
                            <td>9.08</td>
                            <td>-</td>
                            <td><span class="status-badge completed">Normal</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'view', 'ATT-0002')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'edit', 'ATT-0002')"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'check', 'ATT-0002')"><i class="fas fa-check"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Vüqar Abbasov</td>
                            <td>19.02.2024</td>
                            <td>09:00</td>
                            <td>-</td>
                            <td>-</td>
                            <td>İşdə</td>
                            <td><span class="status-badge active">İşdə</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'view', 'ATT-0003')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'sign-out-alt', 'ATT-0003')"><i class="fas fa-sign-out-alt"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Nigar Əliyeva</td>
                            <td>19.02.2024</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>İllik məzuniyyət</td>
                            <td><span class="status-badge info">Məzuniyyət</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'view', 'ATT-0004')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('attendance', 'calendar', 'ATT-0004')"><i class="fas fa-calendar"></i></button>
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
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('attendance', 'bulk-approve')">
                            <i class="fas fa-check-double"></i>
                            Seçilmişləri Təsdiqlə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('attendance', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('attendance', 'bulk-report')">
                            <i class="fas fa-file-alt"></i>
                            Hesabat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Davamiyyət Qeydiyyatı' : action === 'edit' ? 'Davamiyyət Qeydiyyatını Redaktə Et' : 'Davamiyyət Məlumatları';
    
    const newId = action === 'create' ? 'ATT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni davamiyyət qeydiyyatı əlavə edin' : 'Davamiyyət qeydiyyatı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('attendance')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="attendanceForm" onsubmit="app.submitForm(event, 'attendance', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Qeydiyyat Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Qeyd №</label>
                                <input type="text" name="attendanceId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">İşçi *</label>
                                <select name="employeeId" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="emp1" ${data.employeeId === 'emp1' ? 'selected' : ''}>Əli Məmmədov</option>
                                    <option value="emp2" ${data.employeeId === 'emp2' ? 'selected' : ''}>Leyla Həsənova</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Giriş Vaxtı *</label>
                                <input type="time" name="clockIn" class="form-input" value="${data.clockIn || '09:00'}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Çıxış Vaxtı</label>
                                <input type="time" name="clockOut" class="form-input" value="${data.clockOut || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="present" ${data.status === 'present' ? 'selected' : ''}>İşdə</option>
                                    <option value="absent" ${data.status === 'absent' ? 'selected' : ''}>Yox</option>
                                    <option value="late" ${data.status === 'late' ? 'selected' : ''}>Gecikib</option>
                                    <option value="leave" ${data.status === 'leave' ? 'selected' : ''}>Məzuniyyət</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('attendance')">
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

