export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Xüsusi Hesabatlar</h1>
                <p>Biznesinizə uyğun xüsusi hesabatlar və analitik görünüşlər.</p>
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
                <table class="data-table">
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
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-download"></i></button>
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
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-download"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

