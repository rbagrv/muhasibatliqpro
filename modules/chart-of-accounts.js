export function bootstrap() {}
export function onNavigateIn() {}
export function onNavigateOut() {}

export function getHTML() {
    return `
        <div class="page-content">
            <div class="page-header">
                <h1>Hesablar Planı</h1>
                <p>Şirkətin hesablar planı və müxabirləşmələr.</p>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.handleEntityOp('chart-of-accounts', 'import')">
                        <i class="fas fa-upload"></i>
                        İmport
                    </button>
                    <button class="btn btn-primary" onclick="app.handleEntityOp('chart-of-accounts', 'create')">
                        <i class="fas fa-plus"></i>
                        Yeni Hesab
                    </button>
                </div>
            </div>
            
            <div class="module-overview">
                <div class="module-stats">
                    <div class="stat-card primary">
                        <div class="stat-icon">
                            <i class="fas fa-sitemap"></i>
                        </div>
                        <div class="stat-content">
                            <h3>127</h3>
                            <p>Aktiv Hesab</p>
                            <div class="stat-change positive">+5 bu ay</div>
                        </div>
                    </div>
                    <div class="stat-card success">
                        <div class="stat-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼456,780</h3>
                            <p>Aktivlər</p>
                            <div class="stat-change positive">Hesab 100-199</div>
                        </div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼123,450</h3>
                            <p>Öhdəliklər</p>
                            <div class="stat-change negative">Hesab 200-299</div>
                        </div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <div class="stat-content">
                            <h3>₼333,330</h3>
                            <p>Kapital</p>
                            <div class="stat-change positive">Hesab 300-399</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="data-table-container">
                <style>
                    .group-header td {
                        background-color: var(--primary-900);
                        color: var(--gray-900);
                        font-weight: bold;
                        font-size: var(--font-size-lg);
                        text-align: center;
                        position: sticky;
                        top: 0;
                        z-index: 1;
                    }
                    .sub-group-header td {
                        background-color: var(--gray-100);
                        color: var(--gray-800);
                        font-weight: bold;
                        position: sticky;
                        top: 48px; 
                        z-index: 1;
                    }
                    .account-row td:first-child {
                        padding-left: var(--spacing-4);
                        display: flex;
                        align-items: center;
                        gap: var(--spacing-2);
                    }
                    .sub-account-row td:first-child {
                        padding-left: var(--spacing-8);
                    }
                    .toggle-sub-accounts {
                        background: none;
                        border: none;
                        color: var(--gray-600);
                        cursor: pointer;
                        padding: var(--spacing-1);
                        transition: transform var(--transition);
                        font-size: var(--font-size-xs);
                    }
                    .toggle-sub-accounts.expanded {
                        transform: rotate(90deg);
                    }
                </style>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kod</th>
                            <th>Ad</th>
                            <th>Tip</th>
                            <th>Balans</th>
                            <th>D/K</th>
                            <th>Valyuta</th>
                            <th>Status</th>
                            <th>Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="group-header"><td colspan="8">1. UZUNMÜDDƏTLİ AKTİVLƏR</td></tr>
                        <tr class="sub-group-header"><td colspan="8">10. Qeyri-maddi aktivlər</td></tr>
                        <tr class="account-row" data-account-id="101"><td><button class="toggle-sub-accounts" onclick="app.toggleSubAccounts('101')"><i class="fas fa-chevron-right"></i></button> 101</td><td>Qeyri-maddi aktivlərin dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button title="Sub-hesab əlavə et" class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '101')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>102</td><td>Qeyri-maddi aktivlər üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>103</td><td>Qeyri-maddi aktivlərlə bağlı məsrəflərin kapitallaşdırılması</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">11. Torpaq, tikili və avadanlıqlar</td></tr>
                        <tr class="account-row"><td>111</td><td>Torpaq, tikili və avadanlıqların dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '111')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>112</td><td>Torpaq, tikili və avadanlıqlar üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>113</td><td>Torpaq, tikili və avadanlıqlarla bağlı məsrəflərin kapitallaşdırılması</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">12. İnvestisiya mülkiyyəti</td></tr>
                        <tr class="account-row"><td>121</td><td>İnvestisiya mülkiyyətinin dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '121')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>122</td><td>İnvestisiya mülkiyyəti üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>123</td><td>İnvestisiya mülkiyyəti ilə bağlı məsrəflərin kapitallaşdırılması</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">13. Bioloji aktivlər</td></tr>
                        <tr class="account-row"><td>131</td><td>Bioloji aktivlərin dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '131')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>132</td><td>Bioloji aktivlər üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">14. Təbii sərvətlər</td></tr>
                        <tr class="account-row"><td>141</td><td>Təbii sərvətlərin (ehtiyatların) dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '141')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>142</td><td>Təbii sərvətlərin (ehtiyatların) tükənməsi</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">15. İştirak payı metodu ilə uçota alınmış investisiyalar</td></tr>
                        <tr class="account-row"><td>151</td><td>Asılı müəssisələrə investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '151')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>152</td><td>Birgə müəssisələrə investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>153</td><td>Asılı və birgə müəssisələrə investisiyaların dəyərinin azalmasına görə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">16. Təxirə salınmış vergi aktivləri</td></tr>
                        <tr class="account-row"><td>161</td><td>Mənfəət vergisi üzrə təxirə salınmış vergi aktivləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '161')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>162</td><td>Digər təxirə salınmış vergi aktivləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">17. Uzunmüddətli debitor borcları</td></tr>
                        <tr class="account-row"><td>171</td><td>Alıcıların və sifarişçilərin uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '171')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>172</td><td>Törəmə (asılı) müəssisələrin uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>173</td><td>Əsas idarəetmə heyətinin uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>174</td><td>İcarə üzrə uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>175</td><td>Tikinti müqavilələri üzrə uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>176</td><td>Faizlər üzrə uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>177</td><td>Digər uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">18. Sair uzunmüddətli maliyyə aktivləri</td></tr>
                        <tr class="account-row"><td>181</td><td>Ödənişə qədər saxlanılan uzunmüddətli investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '181')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>182</td><td>Verilmiş uzunmüddətli borclar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>183</td><td>Digər uzunmüddətli investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>184</td><td>Sair uzunmüddətli maliyyə aktivlərinin dəyərinin azalmasına görə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">19. Sair uzunmüddətli aktivlər</td></tr>
                        <tr class="account-row"><td>191</td><td>Gələcək hesabat dövrlərinin xərcləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '191')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>192</td><td>Verilmiş uzunmüddətli avanslar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>193</td><td>Digər uzunmüddətli aktivlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">2. QISAMÜDDƏTLİ AKTİVLƏR</td></tr>
                        <tr class="sub-group-header"><td colspan="8">20. Ehtiyatlar</td></tr>
                        <tr class="account-row"><td>201</td><td>Material ehtiyatları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '201')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>202</td><td>İstehsalat (iş və xidmət) məsrəfləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>203</td><td>Tikinti müqavilələri üzrə məsrəflər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>204</td><td>Hazır məhsul</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>205</td><td>Mallar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>206</td><td>Satış məqsədi ilə saxlanılan digər aktivlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>207</td><td>Digər ehtiyatlar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>208</td><td>Ehtiyatların dəyərinin azalmasına görə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">21. Qısamüddətli debitor borcları</td></tr>
                        <tr class="account-row" data-account-id="211"><td><button class="toggle-sub-accounts" onclick="app.toggleSubAccounts('211')"><i class="fas fa-chevron-right"></i></button> 211</td><td>Alıcıların və sifarişçilərin qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button title="Sub-hesab əlavə et" class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '211')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-account-row" data-parent-id="211" style="display: none;"><td>211.1</td><td>Müştəri A - Debitor Borcu</td><td>Aktiv</td><td>₼1,500.00</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountDetailsModal('chart-of-accounts', '211.1')"><i class="fas fa-eye"></i></button></div></td></tr>
                        <tr class="account-row"><td>212</td><td>Törəmə (asılı) müəssisələrin qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '212')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>213</td><td>Əsas idarəetmə heyətinin qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '213')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>214</td><td>İcarə üzrə qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '214')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>215</td><td>Tikinti müqavilələri üzrə qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '215')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>216</td><td>Faizlər üzrə qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '216')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>217</td><td>Digər qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '217')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>218</td><td>Şübhəli borclar üzrə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '218')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">22. Pul vəsaitləri və onların ekvivalentləri</td></tr>
                        <tr class="account-row"><td>221</td><td>Kassa</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '221')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-account-row" data-parent-id="221" style="display: none;"><td>221.1</td><td>Əsas Kassa - AZN</td><td>Aktiv</td><td>₼5,600.00</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountDetailsModal('chart-of-accounts', '221.1')"><i class="fas fa-eye"></i></button></div></td></tr>
                        <tr class="sub-account-row" data-parent-id="221" style="display: none;"><td>221.2</td><td>Xarici Valyuta Kassası - USD</td><td>Aktiv</td><td>$1,200.00</td><td>Debet</td><td>USD</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountDetailsModal('chart-of-accounts', '221.2')"><i class="fas fa-eye"></i></button></div></td></tr>
                        <tr class="account-row"><td>222</td><td>Yolda olan pul köçürmələri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '222')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>223</td><td>Bank hesablaşma hesabları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '223')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>224</td><td>Tələblərə əsasən açılan digər bank hesabları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '224')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>225</td><td>Pul vəsaitlərinin ekvivalentləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '225')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>226</td><td>ƏDV sub-uçot hesabı</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '226')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">23. Sair qısamüddətli maliyyə aktivləri</td></tr>
                        <tr class="account-row"><td>231</td><td>Satış məqsədi ilə saxlanılan qısamüddətli investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '231')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>232</td><td>Ödənişə qədər saxlanılan qısamüddətli investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>233</td><td>Verilmiş qısamüddətli borclar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '233')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>234</td><td>Digər qısamüddətli investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '234')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>235</td><td>Sair qısamüddətli maliyyə aktivlərinin dəyərinin azalmasına görə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '235')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">24. Sair qısamüddətli aktivlər</td></tr>
                        <tr class="account-row"><td>241</td><td>Əvəzləşdirilən vergilər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '241')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>402</td><td>Gələcək hesabat dövrünün xərcləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '242')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>243</td><td>Verilmiş qısamüddətli avanslar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '243')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>244</td><td>Təhtəlhesab məbləğlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '244')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>245</td><td>Digər qısamüddətli aktivlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '245')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">3. KAPİTAL</td></tr>
                        <tr class="sub-group-header"><td colspan="8">30. Ödənilmiş nizamnamə (nominal) kapital</td></tr>
                        <tr class="account-row"><td>301</td><td>Nizamnamə (nominal) kapitalı</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '301')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>302</td><td>Nizamnamə (nominal) kapitalın ödənilməmiş hissəsi</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">31. Emissiya gəliri</td></tr>
                        <tr class="account-row"><td>311</td><td>Emissiya gəliri</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '311')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">32. Geri alınmış kapital (səhmlər)</td></tr>
                        <tr class="account-row"><td>321</td><td>Geri alınmış kapital (səhmlər)</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '321')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">33. Kapital ehtiyatları</td></tr>
                        <tr class="account-row"><td>331</td><td>Yenidən qiymətləndirilmə üzrə ehtiyat</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '331')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>332</td><td>Məzənnə fərgləri üzrə ehtiyat</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>333</td><td>Qanunvericilik üzrə ehtiyat</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>334</td><td>Nizamnamə üzrə ehtiyat</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>335</td><td>Digər ehtiyatlar</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">34. Bölüşdürülməmiş mənfəət (ödənilməmiş zərər)</td></tr>
                        <tr class="account-row"><td>341</td><td>Hesabat dövründə xalis mənfəət (zərər)</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '341')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>342</td><td>Mühasibat uçotu siyasətində dəyişikliklərlə bağlı mənfəət (zərər) üzrə düzəlişlər</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>343</td><td>Keçmiş illər üzrə bölühdürülməmiş mənfəət (ödənilmərish zərər)</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>344</td><td>Elan edilmiş dividentlər</td><td>Kapital</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">4. UZUNMÜDDƏTLİ ÖHDƏLİKLƏR</td></tr>
                        <tr class="sub-group-header"><td colspan="8">40. Uzunmüddətli faiz xərcləri yaradan öhdəliklər</td></tr>
                        <tr class="account-row"><td>401</td><td>Uzunmüddətli bank kreditləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '401')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>402</td><td>İşçilər üçün uzunmüddətli bank kreditləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>403</td><td>Uzunmüddətli konvertasiya olunan istiqrazlar</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>404</td><td>Uzunmüddətli borclar</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>405</td><td>Geri alınan məhdud tədavül müddətli imtiyazlı səhmlər(uzunmüddətli)</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>406</td><td>Maliyyə icarəsi üzrə uzunmüddətli öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>407</td><td>Törəmə(asılı) müəssisələrin uzunmüddətli faiz xərcləri yaradan öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>408</td><td>Digər uzunmüddətli faiz xərcləri yaradan öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">41. Uzunmüddətli qiymətləndirilmiş öhdəliklər</td></tr>
                        <tr class="account-row"><td>411</td><td>İşdən azad olma ilə bağlı uzunmüddətli müavinətlər və öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '411')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>412</td><td>Uzunmüddətli zəmanət öhdəlikləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>413</td><td>Uzunmüddətli hüquqi öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>414</td><td>Digər uzunmüddətli qiymətləndirilmiş öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '414')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-account-row"><td>414-1</td><td>Sığorta müqavilələri üzerə uzunmüddətli öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">42. Təxirə salınmış vergi öhdəlikləri</td></tr>
                        <tr class="account-row"><td>421</td><td>Mənfəət vergisi üzrə təxirə salınmış vergi öhdəlikləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '421')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>422</td><td>Digər təxirə salınmış vergi öhdəlikləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">43. Uzunmüddətli kreditor borcları</td></tr>
                        <tr class="account-row"><td>431</td><td>Malsatan və podratçılara uzunmüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '431')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>432</td><td>Törəmə(asılı) cəmiyyətlərə uzunmüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>433</td><td>Tikinti müqavilələri üzrə uzunmüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>434</td><td>Faizlər üzrə uzunmüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>435</td><td>Digər uzunmüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">44. Sair uzunmüddətli öhdəliklər</td></tr>
                        <tr class="account-row"><td>441</td><td>Uzunmüddətli pensiya öhdəlikləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '441')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">5. QISAMÜDDƏTLİ ÖHDƏLİKLƏR</td></tr>
                        <tr class="sub-group-header"><td colspan="8">50. Qısamüddətli faiz xərcləri yaradan öhdəliklər</td></tr>
                        <tr class="account-row"><td>501</td><td>Qısamüddətli bank kreditləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '501')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-account-row"><td>501-1</td><td>Bank overdraftı</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>502</td><td>İşçilər üçün qısamüddətli bank kreditləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '502')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>503</td><td>Qısamüddətli konvertasiya olunan istiqrazlar</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>504</td><td>Qısamüddətli borclar</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>505</td><td>Geri alınan məhdud tədavül müddətli imtiyazlı səhmlər(qısamüddətli)</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr> 
                        <tr class="account-row"><td>506</td><td>Törəmə(asılı) müəssisələrə qısamüddətli faiz xərcləri yaradan öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>507</td><td>Digər qısamüddətli faiz xərcləri yaradan öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">51. Qısamüddətli qiymətləndirilmiş öhdəliklər</td></tr>
                        <tr class="account-row"><td>511</td><td>İşdən azad olma ilə bağlı qısamüddətli müavinətlər və öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '511')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>512</td><td>Qısamüddətli zəmanət öhdəlikləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>513</td><td>Qısamüddətli hüquqi ühdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>514</td><td>Mənfəətdə iştirak planı və müavinət planları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '514')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>515</td><td>Digər qısamüddətli qiymətləndirilmiş öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '515')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-account-row"><td>515-1</td><td>Sığorta müqavilələri üzrə qısamüddətli öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">52. Vergi və sair məcburi ödənişlər üzrə öhdəliklər</td></tr>
                        <tr class="account-row"><td>521</td><td>Vergi öhdəlikləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '521')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>522</td><td>Sosial sığorta və təminat üzrə öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>523</td><td>Digər məcburi ödənişler üzrə öhdəliklər</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">53. Qısamüddətli kreditor borcları</td></tr>
                        <tr class="account-row"><td>531</td><td>Malsatan və podratçılara qısamüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '531')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>532</td><td>Törəmə(asılı) müəssisələrə qısamüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>533</td><td>Əməyin ödənişi üzrə işçi heyətinə olan borclar</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '533')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>534</td><td>Dividendlərin ödənilməsi üzrə təsisçilərə kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>535</td><td>İcarə üzrə qısamüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>536</td><td>Tikinti müqavilələri üzrə qısamüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>537</td><td>Faizlər üzrə qısamüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>538</td><td>Digər qısamüddətli kreditor borcları</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">54. Sair qısamüddətli öhdəliklər</td></tr>
                        <tr class="account-row"><td>541</td><td>Qısamüddətli pensiya öhdəlikləri</td><td>Passiv</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '541')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">6. GƏLİRLƏR</td></tr>
                        <tr class="sub-group-header"><td colspan="8">60. Əsas əməliyyat gəliri</td></tr>
                        <tr class="account-row"><td>601</td><td>Satış</td><td>Gəlir</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '601')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>602</td><td>Satılmış malların qaytarılması və ucuzlaşdırılması</td><td>Gəlir</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>603</td><td>Verilmiş güzəştlər</td><td>Gəlir</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">61. Sair əməliyyat gəlirləri</td></tr>
                        <tr class="account-row"><td>611</td><td>Sair əməliyyat gəlirləri</td><td>Gəlir</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '611')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">62. Fəaliyyətin dayandırılmasından yaranan gəlirlər</td></tr>
                        <tr class="account-row"><td>621</td><td>Fəaliyyətin dayandırılmasından yaranan gəlirlər</td><td>Gəlir</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '621')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">63. Maliyyə gəlirləri</td></tr>
                        <tr class="account-row"><td>631</td><td>Maliyyə gəlirləri</td><td>Gəlir</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '631')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">64. Fövqəladə gəlirlər</td></tr>
                        <tr class="account-row"><td>641</td><td>Fövqəladə gəlirlər</td><td>Gəlir</td><td>-</td><td>Kredit</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '641')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">7. XƏRCLƏR</td></tr>
                        <tr class="sub-group-header"><td colspan="8">70. Satışın maya dəyəri üzrə xərclər</td></tr>
                        <tr class="account-row"><td>701</td><td>Satışın maya dəyəri üzrə xərclər</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '701')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">71. Kommersiya xərcləri</td></tr>
                        <tr class="account-row"><td>711</td><td>Kommersiya xərcləri</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '711')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">72. İnzibati xərclər</td></tr>
                        <tr class="account-row"><td>721</td><td>İnzibati xərclər</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '721')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">73. Sair əməliyyat xərcləri</td></tr>
                        <tr class="account-row"><td>731</td><td>Sair əməliyyat xərcləri</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '731')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">74. Fəaliyyətin dayandırılmasından xərclər</td></tr>
                        <tr class="account-row"><td>741</td><td>Fəaliyyətin dayandırılmasından xərclər</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '741')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">75. Maliyyə xərcləri</td></tr>
                        <tr class="account-row"><td>741</td><td>Maliyyə xərcləri</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '751')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">76. Fövqəladə xərclər</td></tr>
                        <tr class="account-row"><td>761</td><td>Fövqəladə xərclər</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '761')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">8. MƏNFƏƏTLƏR (ZƏRƏRLƏR)</td></tr>
                        <tr class="sub-group-header"><td colspan="8">80. Ümumi mənfəət (zərər)</td></tr>
                        <tr class="account-row"><td>801</td><td>Ümumi mənfəət (zərər)</td><td>Mənfəət/Zərər</td><td>-</td><td>-</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '801')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">81. Asılı və birgə müəssisələrin mənfəətlərində(zərərlərində) pay</td></tr>
                        <tr class="account-row"><td>811</td><td>Asılı və birgə müəssisələrin mənfəətlərində(zərərlərində) pay</td><td>Mənfəət/Zərər</td><td>-</td><td>-</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '811')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">9. MƏNFƏƏT VERGİSİ</td></tr>
                        <tr class="sub-group-header"><td colspan="8">90. Mənfəət vergisi</td></tr>
                        <tr class="account-row"><td>901</td><td>Cari mənfəət vergisi üzrə xərclər</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.showSubAccountForm('chart-of-accounts', '901')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>902</td><td>Təxirə salınmış mənfəət vergisi üzrə xərclər</td><td>Xərc</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="module-actions">
                <div class="bulk-actions">
                    <h4>Toplu Əməliyyatlar</h4>
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('chart-of-accounts', 'bulk-balance')">
                            <i class="fas fa-sync"></i>
                            Balansları Yenilə
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('chart-of-accounts', 'bulk-export')">
                            <i class="fas fa-download"></i>
                            Excel Export
                        </button>
                        <button class="btn btn-secondary" onclick="app.handleEntityOp('chart-of-accounts', 'bulk-print')">
                            <i class="fas fa-print"></i>
                            Çap Et
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Hesab' : action === 'edit' ? 'Hesabı Redaktə Et' : 'Hesab Məlumatları';

    // New code should start empty for create, or show existing for edit/view
    const newCode = data.code || '';

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni hesab yaradın. Hesabın tipini (bölmə), maddəsini və sonra hesabı seçin.' : 'Hesab məlumatlarını görüntüləyin və ya redaktə edin.'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('chart-of-accounts')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="chartOfAccountsForm" onsubmit="app.submitModuleForm(event, 'chart-of-accounts', '${action}', '${data.id || newCode}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Hesab Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Bölmə (Hesabın tipi) *</label>
                                <select name="section" class="form-input" id="sectionSelect" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <!-- Options will be populated by script.js dynamically -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Maddə *</label>
                                <select name="article" class="form-input" id="articleSelect" required ${isView ? 'disabled' : ''}>
                                    <option value="">Bölmə seçin...</option>
                                    <!-- Options will be populated by script.js dynamically -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab *</label>
                                <select name="account" class="form-input" id="accountSelect" required ${isView ? 'disabled' : ''}>
                                    <option value="">Maddə seçin...</option>
                                    <!-- Options will be populated by script.js dynamically -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tam Hesab Kodu</label>
                                <input type="text" name="code" class="form-input" value="${newCode}" readonly id="accountCode">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hesab Adı *</label>
                                <input type="text" name="name" class="form-input" value="${data.name || ''}" required id="accountName" ${isView ? 'readonly' : ''}>
                            </div>
                             <div class="form-group">
                                <label class="form-label">Başlanğıc Balans</label>
                                <input type="number" name="balance" class="form-input" value="${data.balance || '0'}" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Yaranma Tarixi</label>
                                <input type="date" name="created_at" class="form-input" value="${data.created_at || new Date().toISOString().split('T')[0]}" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="app.navigateTo('chart-of-accounts')">
                            <i class="fas fa-times"></i> Ləğv et
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Yarat
                        </button>
                    </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}

export function getSubAccountFormHTML(action = 'create', parentData = {}, subData = {}) {
    const isView = action === 'view';
    const title = action === 'create' ? 'Yeni Sub-Hesab' : 'Sub-Hesabı Redaktə Et';

    // Simple increment for demo. In a real app, you'd check existing sub-accounts from backend.
    const baseCode = parentData.code || '';
    const subCode = subData.code || (baseCode ? `${baseCode}.1` : ''); 

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>Ana hesab: <strong>${parentData.code} - ${parentData.name}</strong></p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('chart-of-accounts')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="subAccountForm" onsubmit="app.submitModuleForm(event, 'chart-of-accounts', '${action}', '${parentData.id}', '${subCode}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Sub-Hesab Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Sub-Hesab Kodu</label>
                                <input type="text" name="code" class="form-input" value="${subCode}" readonly ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Sub-Hesab Adı *</label>
                                <input type="text" name="name" class="form-input" value="${subData.name || ''}" required ${isView ? 'readonly' : ''}>
                            </div>
                             <div class="form-group">
                                <label class="form-label">Başlanğıc Balans</label>
                                <input type="number" name="balance" class="form-input" value="${subData.balance || '0'}" step="0.01" ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Yaranma Tarixi</label>
                                <input type="date" name="created_at" class="form-input" value="${subData.created_at || new Date().toISOString().split('T')[0]}" ${isView ? 'readonly' : ''}>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="app.navigateTo('chart-of-accounts')">
                            <i class="fas fa-times"></i> Ləğv et
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Yarat
                        </button>
                    </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}