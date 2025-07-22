export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Büdcə və Planlaşdırma Hesabatları</h1>
                <p>Maliyyə planlarınızın faktiki nəticələrlə müqayisəsi və büdcədən yayınma təhlili.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('budget-planning', 'create')">
                    <i class="fas fa-plus"></i> Yeni Büdcə
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-money-check-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼150,000</h3>
                            <p>Planlaşdırılmış Gəlir</p>
                            <div class="stat-change positive">+10% artım</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼142,000</h3>
                            <p>Faktiki Gəlir</p>
                            <div class="stat-change negative">-5.3% yayınma</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼8,000</h3>
                            <p>Mənfi Yayınma</p>
                            <div class="stat-change negative">Gəlir</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-tasks"></i>
                        </div>
                        <div class="stat-content">
                            <h3>85%</h3>
                            <p>Büdcə İcraı</p>
                            <div class="stat-change positive">Cari vəziyyət</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <h3>Büdcə Müqayisəsi - Gəlirlər</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kateqoriya</th>
                            <th>Planlaşdırılmış (₼)</th>
                            <th>Faktiki (₼)</th>
                            <th>Fərq (₼)</th>
                            <th>Yayınma (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Məhsul Satışı</td>
                            <td>120,000</td>
                            <td>115,000</td>
                            <td>-5,000</td>
                            <td><span class="stat-change negative">-4.17%</span></td>
                        </tr>
                        <tr>
                            <td>Xidmət Gəlirləri</td>
                            <td>25,000</td>
                            <td>22,000</td>
                            <td>-3,000</td>
                            <td><span class="stat-change negative">-12.00%</span></td>
                        </tr>
                        <tr>
                            <td>Digər Gəlirlər</td>
                            <td>5,000</td>
                            <td>5,000</td>
                            <td>0</td>
                            <td><span class="stat-change neutral">0.00%</span></td>
                        </tr>
                        <tr>
                            <td><strong>Ümumi Gəlir</strong></td>
                            <td><strong>150,000</strong></td>
                            <td><strong>142,000</strong></td>
                            <td><strong>-8,000</strong></td>
                            <td><span class="stat-change negative"><strong>-5.33%</strong></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data-table-container">
                <h3>Büdcə Müqayisəsi - Xərclər</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kateqoriya</th>
                            <th>Planlaşdırılmış (₼)</th>
                            <th>Faktiki (₼)</th>
                            <th>Fərq (₼)</th>
                            <th>Yayınma (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Əmək Haqqı</td>
                            <td>50,000</td>
                            <td>52,000</td>
                            <td>+2,000</td>
                            <td><span class="stat-change positive">+4.00%</span></td>
                        </tr>
                        <tr>
                            <td>İcarə</td>
                            <td>5,000</td>
                            <td>5,000</td>
                            <td>0</td>
                            <td><span class="stat-change neutral">0.00%</span></td>
                        </tr>
                        <tr>
                            <td>Marketinq</td>
                            <td>10,000</td>
                            <td>8,000</td>
                            <td>-2,000</td>
                            <td><span class="stat-change positive">-20.00%</span></td>
                        </tr>
                        <tr>
                            <td><strong>Ümumi Xərc</strong></td>
                            <td><strong>100,000</strong></td>
                            <td><strong>98,000</strong></td>
                            <td><strong>-2,000</strong></td>
                            <td><span class="stat-change positive"><strong>-2.00%</strong></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">Proqnozlaşdırılmış Gəlir və Xərc Hesabatları</h2>
                <div class="data-table-container">
                    <h3>Gələcək Dövr Üçün Proqnoz (Növbəti Rüblük)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Kateqoriya</th>
                                <th>Proqnozlaşdırılmış Gəlir (₼)</th>
                                <th>Proqnozlaşdırılmış Xərc (₼)</th>
                                <th>Proqnozlaşdırılmış Mənfəət (₼)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Q1 2025</td>
                                <td>160,000</td>
                                <td>110,000</td>
                                <td>50,000</td>
                            </tr>
                            <tr>
                                <td>Q2 2025</td>
                                <td>175,000</td>
                                <td>115,000</td>
                                <td>60,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Büdcə Planı' : action === 'edit' ? 'Büdcə Planını Redaktə Et' : 'Büdcə Planı Məlumatları';
    
    const newId = action === 'create' ? 'BGT-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni büdcə planı yaradın' : 'Büdcə planı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('budget-planning')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="budgetPlanningForm" onsubmit="app.submitForm(event, 'budget-planning', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Büdcə Detalları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Büdcə №</label>
                                <input type="text" name="budgetId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ad *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Dövr *</label>
                                <input type="month" name="period" class="form-input" value="${data.period || new Date().toISOString().slice(0, 7)}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tip</label>
                                <select name="type" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="annual" ${data.type === 'annual' ? 'selected' : ''}>İllik</option>
                                    <option value="quarterly" ${data.type === 'quarterly' ? 'selected' : ''}>Rüblük</option>
                                    <option value="monthly" ${data.type === 'monthly' ? 'selected' : ''}>Aylıq</option>
                                    <option value="project" ${data.type === 'project' ? 'selected' : ''}>Layihə</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Planlaşdırılmış Gəlir *</label>
                                <input type="number" name="plannedRevenue" class="form-input" value="${data.plannedRevenue || '0'}" min="0" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Planlaşdırılmış Xərc *</label>
                                <input type="number" name="plannedExpense" class="form-input" value="${data.plannedExpense || '0'}" min="0" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Qeydlər</label>
                                <textarea name="notes" class="form-textarea" ${isView ? 'readonly' : ''}>${data.notes || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('budget-planning')">
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

