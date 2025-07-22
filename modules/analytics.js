export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Analitika</h1>
                <p>Maliyyə, satış və xərc analitikası. Vizual qrafik və cədvəllər.</p>
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
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <div class="stat-content">
                            <h3>78%</h3>
                            <p>Konversiya</p>
                            <div class="stat-change positive">+2% artım</div>
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
                            <p>Satış qrafiki burada görünsəcək</p>
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
                        <h3>Top Məhsullar</h3>
                    </div>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-chart-bar"></i>
                            <p>Məhsul statistikası burada görünsəcək</p>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <div class="card-header">
                        <h3>Müştəri Statistikası</h3>
                    </div>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-chart-pie"></i>
                            <p>Müştəri qrafiki burada görünsəcək</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

