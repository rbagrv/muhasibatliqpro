export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
    <div class="pos-fullscreen">
        <div class="pos-header">
            <div class="pos-branding">
                <i class="fas fa-calculator"></i>
                <span>MühasibatlıqPro POS</span>
            </div>
            <div class="pos-header-actions">
                <div class="pos-time">${new Date().toLocaleTimeString()}</div>
                <div class="pos-user">
                    <i class="fas fa-user"></i>
                    Operator
                </div>
                <button class="btn btn-danger btn-sm" onclick="app.exitPOS()">
                    <i class="fas fa-power-off"></i>
                    Çıxış
                </button>
            </div>
        </div>
        
        <div class="pos-main">
            <div class="pos-left-panel">
                <div class="pos-categories">
                    <button class="pos-category active">Hamısı</button>
                    <button class="pos-category">Elektronika</button>
                    <button class="pos-category">Qida</button>
                    <button class="pos-category">Geyim</button>
                    <button class="pos-category">Digər</button>
                </div>
                
                <div class="pos-products-grid">
                    <div class="pos-product" onclick="app.addToCart('prod1')">
                        <div class="pos-product-img">📱</div>
                        <div class="pos-product-info">
                            <h4>Ləptop</h4>
                            <div class="pos-product-price">₼1,200.00</div>
                            <div class="pos-product-stock">Stok: 15</div>
                        </div>
                    </div>
                    
                    <div class="pos-product" onclick="app.addToCart('prod2')">
                        <div class="pos-product-img">🖱️</div>
                        <div class="pos-product-info">
                            <h4>Siçan</h4>
                            <div class="pos-product-price">₼45.00</div>
                            <div class="pos-product-stock">Stok: 25</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pos-right-panel">
                <div class="pos-cart-header">
                    <h3>Cari Satış</h3>
                    <button class="btn btn-ghost btn-sm" onclick="app.clearCart()">
                        <i class="fas fa-trash"></i>
                        Təmizlə
                    </button>
                </div>
                
                <div class="pos-cart-items" id="posCartItems">
                    <div class="pos-empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Səbət boşdur</p>
                    </div>
                </div>
                
                <div class="pos-cart-summary">
                    <div class="summary-row">
                        <span>Məhsul sayı:</span>
                        <span id="posItemCount">0</span>
                    </div>
                    <div class="summary-row">
                        <span>Alt cəm:</span>
                        <span id="posSubtotal">₼0.00</span>
                    </div>
                    <div class="summary-row">
                        <span>ƏDV (18%):</span>
                        <span id="posVat">₼0.00</span>
                    </div>
                    <div class="summary-row total">
                        <span>Yekun:</span>
                        <span id="posTotal">₼0.00</span>
                    </div>
                </div>
                
                <div class="pos-actions">
                    <button class="btn btn-lg btn-secondary" onclick="app.holdSale()">
                        <i class="fas fa-pause"></i>
                        Gözlət
                    </button>
                    <button class="btn btn-lg btn-primary" onclick="app.processSale()">
                        <i class="fas fa-money-bill-wave"></i>
                        Ödəniş
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}


