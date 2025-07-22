export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Kadrlar</h1>
                <p>Şirkət işçi heyətinin nəzərat, siyahı və idarəetməsi.</p>
                <button class="btn btn-primary" onclick="app.navigateToForm('employees', 'create')">
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
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('employees', 'view', 'emp1')"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm" onclick="app.navigateToForm('employees', 'edit', 'emp1')"><i class="fas fa-edit"></i></button>
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
    const title = action === 'create' ? 'Yeni İşçi' : action === 'edit' ? 'İşç

