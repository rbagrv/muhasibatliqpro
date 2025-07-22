export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Əmək Haqqı</h1>
                <p>Hesablanmış əmək haqqılar və maaş ödənişləri.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('payroll', 'create')">
                    <i class="fas fa-plus"></i> Yeni Əmək Haqqı
                </button>
            </div>
            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>İşçi</th>
                            <th>Ay</th>
                            <th>Məbləğ</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Əli Məmmədov</td>
                            <td>Yanvar 2024</td>
                            <td>₼1,800</td>
                            <td><span class="status-badge paid">Ödənilib</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('payroll', 'view', 'PAY-0001')"><i class="fas fa-eye"></i></button>
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
    const title = action === 'create' ? 'Yeni Əmək Haqqı' : action === 'edit' ? 'Əmək Haqqını Redaktə Et' : 'Əmək Haqqı Məlumatları';
    
    // Generate a placeholder ID for create operations, or use existing for edit/view
    const displayId = action === 'create' ? 'Avtomatik Təyin Ediləcək' : data.id || 'N/A';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni əmək haqqı qeydi yaradın' : 'Əmək haqqı qeydini görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('payroll')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            
            <form id="payrollForm" onsubmit="app.submitModuleForm(event, 'payroll', '${action}', '${data.id || ''}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əmək Haqqı Hesablanması</h3>
                    </div>
                </div>
            </form>
        </div>
    `;
}