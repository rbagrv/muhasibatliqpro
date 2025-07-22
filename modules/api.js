export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>API İdarəetməsi</h1>
                <p>API açarları və inteqrasiya parametrlərinin idarə edilməsi.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.generateApiKey()">
                        <i class="fas fa-key"></i> Yeni API Key
                    </button>
                    <button class="btn btn-primary" onclick="app.viewApiDocs()">
                        <i class="fas fa-book"></i> Dokumentasiya
                    </button>
                </div>
            </div>
            
            <div class="module-content">
                <div class="api-overview-cards">
                    <div class="api-card">
                        <div class="card-header">
                            <h3>API Status</h3>
                        </div>
                        <div class="card-content">
                            <div class="api-status active">
                                <i class="fas fa-check-circle"></i>
                                Aktiv
                            </div>
                            <div class="api-metrics">
                                <div class="metric">
                                    <span>Sorğu/dəq</span>
                                    <strong>234</strong>
                                </div>
                                <div class="metric">
                                    <span>Uğurlu</span>
                                    <strong>99.8%</strong>
                                </div>
                                <div class="metric">
                                    <span>Orta vaxt</span>
                                    <strong>145ms</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="api-card">
                        <div class="card-header">
                            <h3>API Açarları</h3>
                        </div>
                        <div class="card-content">
                            <div class="api-keys">
                                <div class="api-key">
                                    <div class="key-info">
                                        <span>Production</span>
                                        <code>pk_live_*****</code>
                                    </div>
                                    <button class="btn btn-ghost btn-sm">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <div class="api-key">
                                    <div class="key-info">
                                        <span>Test</span>
                                        <code>pk_test_*****</code>
                                    </div>
                                    <button class="btn btn-ghost btn-sm">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="api-card">
                        <div class="card-header">
                            <h3>Webhooks</h3>
                        </div>
                        <div class="card-content">
                            <div class="webhook-urls">
                                <div class="webhook-url">
                                    <div class="url-info">
                                        <span>Əsas URL</span>
                                        <code>https://api.muhasibatliqpro.az/webhook</code>
                                    </div>
                                    <span class="status-badge active">Aktiv</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="api-card">
                        <div class="card-header">
                            <h3>Rate Limiting</h3>
                        </div>
                        <div class="card-content">
                            <div class="rate-limits">
                                <div class="limit-item">
                                    <span>Sorğu limiti</span>
                                    <strong>1000/saat</strong>
                                </div>
                                <div class="limit-item">
                                    <span>Burst limiti</span>
                                    <strong>100/dəq</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="api-docs-section">
                    <div class="card-header">
                        <h3>API Endpoints</h3>
                    </div>
                    <div class="api-endpoints">
                        <div class="endpoint">
                            <div class="method get">GET</div>
                            <code>/api/v2/products</code>
                            <span>Məhsullar siyahısı</span>
                        </div>
                        <div class="endpoint">
                            <div class="method post">POST</div>
                            <code>/api/v2/sales</code>
                            <span>Yeni satış</span>
                        </div>
                        <div class="endpoint">
                            <div class="method put">PUT</div>
                            <code>/api/v2/customers/{id}</code>
                            <span>Müştəri redaktəsi</span>
                        </div>
                        <div class="endpoint">
                            <div class="method delete">DELETE</div>
                            <code>/api/v2/products/{id}</code>
                            <span>Məhsul silinməsi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

