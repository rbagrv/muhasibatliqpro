export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Analitika və İdarəetmə Hesabatları</h1>
                <p>Maliyyə, satış və xərc analitikası, göstəricilər və segment hesabatları.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.exportAnalytics()">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button class="btn btn-primary" onclick="app.refreshAnalytics()">
                        <i class="fas fa-sync"></i> Yenilə
                    </button>
                </div>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼45,230</h3>
                            <p>Bu Ay Satış</p>
                            <div class="stat-change positive">+15% artım</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>234</h3>
                            <p>Aktiv Müştəri</p>
                            <div class="stat-change positive">+8% artım</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="stat-content">
                            <h3>78%</h3>
                            <p>Ümumi Gəlir Marjası</p>
                            <div class="stat-change positive">+2% artım</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <div class="stat-content">
                            <h3>18%</h3>
                            <p>ROI (Geri Dönüş)</p>
                            <div class="stat-change positive">+1% artım</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="analytics-grid">
                <div class="analytics-card">
                    <div class="card-header">
                        <h3>Satış Analitikası</h3>
                    </div>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-chart-line"></i>
                            <p>Satış qrafiki burada görünsəcək (Məhsul, Müştəri, Region üzrə)</p>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <div class="card-header">
                        <h3>Xərc Analitikası</h3>
                    </div>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-chart-area"></i>
                            <p>Xərc qrafiki burada görünsəcək</p>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <div class="card-header">
                        <h3>Əsas Performans Göstəriciləri (KPI)</h3>
                    </div>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-tachometer-alt"></i>
                            <p>KPI göstəriciləri burada görünsəcək (Satış, Rentabellik, Xərclər)</p>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <div class="card-header">
                        <h3>Segment və Layihə Hesabatları</h3>
                    </div>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-project-diagram"></i>
                            <p>Segment və layihə üzrə gəlirlilik analizi</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-table-container">
                <h3>Əsas Maliyyə Göstəriciləri</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Göstərici</th>
                            <th>Cari Dəyər</th>
                            <th>Keçən Ay</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ROI (İnvestisiya Geri Dönüşü)</td>
                            <td>18%</td>
                            <td>17%</td>
                            <td><span class="stat-change positive">+1%</span></td>
                        </tr>
                        <tr>
                            <td>ROE (Kapital Geri Dönüşü)</td>
                            <td>25%</td>
                            <td>24%</td>
                            <td><span class="stat-change positive">+1%</span></td>
                        </tr>
                        <tr>
                            <td>Gross Margin (Ümumi Gəlir Marjası)</td>
                            <td>78%</td>
                            <td>76%</td>
                            <td><span class="stat-change positive">+2%</span></td>
                        </tr>
                        <tr>
                            <td>Net Profit Margin (Xalis Mənfəət Marjası)</td>
                            <td>27%</td>
                            <td>25%</td>
                            <td><span class="stat-change positive">+2%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}



