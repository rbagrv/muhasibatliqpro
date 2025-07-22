export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Balans Hesabatı</h1>
                <p>Aktivlər, öhdəliklər və kapital üzrə balans hesabatı.</p>
                <button class="btn btn-primary" onclick="app.handleEntityOp('balance-sheet', 'create')">
                    <i class="fas fa-plus"></i> Yeni Balans
                </button>
            </div>

            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼256,780</h3>
                            <p>Ümumi Aktivlər</p>
                            <div class="stat-change positive">+5.2% artım</div>
                        </div>
                    </div>

                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼98,450</h3>
                            <p>Ümumi Öhdəliklər</p>
                            <div class="stat-change negative">+3.1% artım</div>
                        </div>
                    </div>

                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼158,330</h3>
                            <p>Xalis Aktivlər</p>
                            <div class="stat-change positive">+7.4% artım</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <h3>Aktivlər</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesab</th>
                            <th>Məbləğ</th>
                            <th>Keçən Ay</th>
                            <th>Dəyişiklik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nağd vəsaitlər</td>
                            <td>₼45,230</td>
                            <td>₼42,150</td>
                            <td><span class="change positive">+7.3%</span></td>
                        </tr>
                        <tr>
                            <td>Debitor borcları</td>
                            <td>₼78,900</td>
                            <td>₼75,200</td>
                            <td><span class="change positive">+4.9%</span></td>
                        </tr>
                    </tbody>
                </table>

                <h3>Öhdəliklər</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hesab</th>
                            <th>Məbləğ</th>
                            <th>Keçən Ay</th>
                            <th>Dəyişiklik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Kreditor borcları</td>
                            <td>₼34,560</td>
                            <td>₼32,800</td>
                            <td><span class="change negative">+5.4%</span></td>
                        </tr>
                        <tr>
                            <td>Bank kreditləri</td>
                            <td>₼63,890</td>
                            <td>₼65,400</td>
                            <td><span class="change positive">-2.3%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

