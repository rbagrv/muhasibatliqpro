export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="page-content">
        <div class="page-header">
            <h1>Müxabirləşmə Hesabları</h1>
            <p>Maliyyə əməliyyatlarında istifadə olunan müxabirləşmə hesabları.</p>
            <button class="btn btn-primary" onclick="app.handleEntityOp('correspondence-accounts', 'create')">
                <i class="fas fa-plus"></i> Yeni Hesab
            </button>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Hesab Nömrəsi</th>
                        <th>Ad</th>
                        <th>Status</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>41001</td>
                        <td>Bank hesabı 1</td>
                        <td><span class="status-badge active">Aktiv</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('correspondence-accounts', 'view', 'CORR-0001')"><i class="fas fa-eye"></i></button>
                                <button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('correspondence-accounts', 'edit', 'CORR-0001')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni Müxabirləşmə Hesabı' : action === 'edit' ? 'Müxabirləşmə Hesabını Redaktə Et' : 'Müxabirləşmə Hesabı Məlumatları';
    
    const newId = action === 'create' ? 'CORR-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni müxabirləşmə hesabı əlavə edin' : 'Müxabirləşmə hesabı məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('correspondence-accounts')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="correspondenceAccountsForm" onsubmit="app.submitForm(event, 'correspondence-accounts', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Əsas Məlumatlar</h3>
                        <div class="

