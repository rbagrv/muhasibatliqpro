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
                            <div class="data-table-container">
                                <table class="data-table" id="apiKeysTable">
                                    <thead>
                                        <tr>
                                            <th>Ad</th>
                                            <th>Açar</th>
                                            <th>Əməliyyatlar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="api-key">
                                            <td class="key-info"><span>Production</span></td>
                                            <td><code>pk_live_*****</code></td>
                                            <td><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button></td>
                                        </tr>
                                        <tr class="api-key">
                                            <td class="key-info"><span>Test</span></td>
                                            <td><code>pk_test_*****</code></td>
                                            <td><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="api-card">
                        <div class="card-header">
                            <h3>Webhooks</h3>
                        </div>
                        <div class="card-content">
                            <div class="data-table-container">
                                <table class="data-table" id="webhooksTable">
                                    <thead>
                                        <tr>
                                            <th>URL</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="webhook-url">
                                            <td><code>https://api.muhasibatliqpro.az/webhook</code></td>
                                            <td><span class="status-badge active">Aktiv</span></td>
                                        </tr>
                                    </tbody>
                                </table>
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
                    <div class="data-table-container">
                        <table class="data-table" id="apiEndpointsTable">
                            <thead>
                                <tr>
                                    <th>Method</th>
                                    <th>Endpoint</th>
                                    <th>Təsvir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="endpoint">
                                    <td><div class="method get">GET</div></td>
                                    <td><code>/api/v2/products</code></td>
                                    <td>Məhsullar siyahısı</td>
                                </tr>
                                <tr class="endpoint">
                                    <td><div class="method post">POST</div></td>
                                    <td><code>/api/v2/sales</code></td>
                                    <td>Yeni satış</td>
                                </tr>
                                <tr class="endpoint">
                                    <td><div class="method put">PUT</div></td>
                                    <td><code>/api/v2/customers/{id}</code></td>
                                    <td>Müştəri redaktəsi</td>
                                </tr>
                                <tr class="endpoint">
                                    <td><div class="method delete">DELETE</div></td>
                                    <td><code>/api/v2/products/{id}</code></td>
                                    <td>Məhsul silinməsi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

