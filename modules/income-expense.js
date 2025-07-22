export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Mədaxil və Məxaric</h1>
                <p>Pulların daxil olması və çıxması əməliyyatlarının qeydi.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('income-expense', 'create')">
                    <i class="fas fa-plus"></i> Əlavə Et
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Tarix</th>
                            <th>Əməliyyat</th>
                            <th>Məbləğ</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15.02.2024</td>
                            <td>Mədaxil</td>
                            <td>₼550.00</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('income-expense', 'view', 'INCEXP-0001')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('income-expense', 'edit', 'INCEXP-0001')"><i class="fas fa-edit"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>16.02.2024</td>
                            <td>Məxaric (İcarə haqqı)</td>
                            <td>₼1,200.00</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('income-expense', 'view', 'INCEXP-0002')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('income-expense', 'edit', 'INCEXP-0002')"><i class="fas fa-edit"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>17.02.2024</td>
                            <td>Mədaxil (Kassa satışı)</td>
                            <td>₼3,200.00</td>
                            <td><span class="status-badge completed">Təsdiqlənib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('income-expense', 'view', 'INCEXP-0003')"><i class="fas fa-eye"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="module-section">
                <h2 class="section-title">Gəlir və Xərclərin Təhlil Edilmiş Forması</h2>
                <div class="data-table-container">
                    <h3>Aylıq Gəlir Kateqoriyaları</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Kateqoriya</th>
                                <th>Bu Ay (₼)</th>
                                <th>Keçən Ay (₼)</th>
                                <th>Dəyişiklik (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Məhsul Satışı</td>
                                <td>35,000</td>
                                <td>30,000</td>
                                <td><span class="stat-change positive">+16.67%</span></td>
                            </tr>
                            <tr>
                                <td>Xidmət Gəlirləri</td>
                                <td>10,230</td>
                                <td>9,450</td>
                                <td><span class="stat-change positive">+8.25%</span></td>
                            </tr>
                            <tr>
                                <td>Digər Gəlirlər</td>
                                <td>2,500</td>
                                <td>1,800</td>
                                <td><span class="stat-change positive">+38.89%</span></td>
                            </tr>
                            <tr>
                                <td><strong>Ümumi Gəlir</strong></td>
                                <td><strong>47,730</strong></td>
                                <td><strong>41,250</strong></td>
                                <td><span class="stat-change positive">+15.71%</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="data-table-container">
                    <h3>Aylıq Xərc Kateqoriyaları</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Kateqoriya</th>
                                <th>Bu Ay (₼)</th>
                                <th>Keçən Ay (₼)</th>
                                <th>Dəyişiklik (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Əmək Haqqı</td>
                                <td>15,000</td>
                                <td>14,500</td>
                                <td><span class="stat-change negative">+3.45%</span></td>
                            </tr>
                            <tr>
                                <td>İcarə</td>
                                <td>2,500</td>
                                <td>2,500</td>
                                <td><span class="stat-change neutral">0%</span></td>
                            </tr>
                            <tr>
                                <td>Kommunal</td>
                                <td>800</td>
                                <td>750</td>
                                <td><span class="stat-change negative">+6.67%</span></td>
                            </tr>
                            <tr>
                                <td>Marketinq</td>
                                <td>1,500</td>
                                <td>1,000</td>
                                <td><span class="stat-change negative">+50.00%</span></td>
                            </tr>
                            <tr>
                                <td><strong>Ümumi Xərc</strong></td>
                                <td><strong>32,780</strong></td>
                                <td><strong>30,350</strong></td>
                                <td><span class="stat-change negative">+8.01%</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// FORM
export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Mədaxil/Məxaric Qeydi' : action === 'edit' ? 'Qeydi Redaktə Et' : 'Qeyd Məlumatları';
    
    const newId = action === 'create' ? 'INCEXP-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni mədaxil və ya məxaric əməliyyatı qeyd edin' : 'Əməliyyat məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('income-expense')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="incomeExpenseForm" onsubmit="app.submitForm(event, 'income-expense', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əməliyyat Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Qeyd №</label>
                                <input type="text" name="recordId" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Əməliyyat Tipi *</label>
                                <select name="type" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="income" ${data.type === 'income' ? 'selected' : ''}>Mədaxil</option>
                                    <option value="expense" ${data.type === 'expense' ? 'selected' : ''}>Məxaric</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab *</label>
                                <select name="account" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="main-cash" ${data.account === 'main-cash' ? 'selected' : ''}>Əsas Kassa</option>
                                    <option value="kapital-azn" ${data.account === 'kapital-azn' ? 'selected' : ''}>KapitalBank AZN</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məbləğ *</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || '0'}" min="0.01" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Kateqoriya</label>
                                <input type="text" name="category" class="form-input" value="${data.category || ''}" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Status</label>
                                <select name="status" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Layihə</option>
                                    <option value="confirmed" ${data.status === 'confirmed' ? 'selected' : ''}>Təsdiqlənib</option>
                                    <option value="cancelled" ${data.status === 'cancelled' ? 'selected' : ''}>Ləğv edilib</option>
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
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('income-expense')">
                                <i class="fas fa-times"></i> Ləğv et
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> ${action === 'create' ? 'Qeyd et' : 'Yadda Saxla'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}



