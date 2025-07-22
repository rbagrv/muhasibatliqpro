export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Maliyyə Hesabatları</h1>
                <p>Maliyyə vəziyyəti və hesabat dövrü üzrə analitik hesabatlar.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('financial-reports', 'create')">
                    <i class="fas fa-plus"></i> Yeni Hesabat
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼45,230</h3>
                            <p>Aylıq Gəlir</p>
                            <div class="stat-change positive">+12.5% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼12,450</h3>
                            <p>Xalis Mənfəət</p>
                            <div class="stat-change positive">+8.3% artım</div>
                        </div>
                    </div>

                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-file-invoice-dollar"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Hesabat Sayı</p>
                            <div class="stat-change neutral">Bu ay</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesabat #</th>
                            <th>Ad</th>
                            <th>Dövr</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FIN-2024-001</td>
                            <td>Mənfəət və Zərər</td>
                            <td>Yanvar 2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-download"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-print"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>FIN-2024-002</td>
                            <td>Balans Hesabatı</td>
                            <td>Yanvar 2024</td>
                            <td><span class="status-badge completed">Hazır</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-download"></i></button>
                                    <button class="btn btn-ghost btn-sm"><i class="fas fa-print"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

