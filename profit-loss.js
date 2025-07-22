export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Mənfəət və Zərər Hesabatı</h1>
                <p>Müəyyən dövr üzrə gəlir və xərclərin təhlili.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('profit-loss', 'create')">
                    <i class="fas fa-plus"></i> Yeni P&L Hesabatı
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼45,230</h3>
                            <p>Ümumi Gəlir</p>
                            <div class="stat-change positive">+15% artım</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-minus-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼32,780</h3>
                            <p>Ümumi Xərc</p>
                            <div class="stat-change negative">+8% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼12,450</h3>
                            <p>Xalis Mənfəət</p>
                            <div class="stat-change positive">+22% artım</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesab</th>
                            <th>Bu Ay</th>
                            <th>Keçən Ay</th>
                            <th>Dəyişiklik</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Satış Gəliri</strong></td>
                            <td>₼45,230</td>
                            <td>₼39,450</td>
                            <td><span class="change positive">+15%</span></td>
                            <td><i class="fas fa-chart-line text-success"></i></td>
                        </tr>
                        <tr>
                            <td><strong>Əməliyyat Xərcləri</strong></td>
                            <td>₼32,780</td>
                            <td>₼30,350</td>
                            <td><span class="change negative">+8%</span></td>
                            <td><i class="fas fa-chart-line text-warning"></i></td>
                        </tr>
                        <tr>
                            <td><strong>Xalis Mənfəət</strong></td>
                            <td>₼12,450</td>
                            <td>₼9,100</td>
                            <td><span class="change positive">+22%</span></td>
                            <td><i class="fas fa-chart-line text-success"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

