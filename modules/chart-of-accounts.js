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
                        <tr class="account-row" data-account-id="101"><td><button class="toggle-sub-accounts" onclick="app.toggleSubAccounts('101')"><i class="fas fa-chevron-right"></i></button> 101</td><td>Qeyri-maddi aktivlərin dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button title="Sub-hesab əlavə et" class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '101')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>102</td><td>Qeyri-maddi aktivlər üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>103</td><td>Qeyri-maddi aktivlərlə bağlı məsrəflərin kapitallaşdırılması</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">11. Torpaq, tikili və avadanlıqlar</td></tr>
                        <tr class="account-row"><td>111</td><td>Torpaq, tikili və avadanlıqların dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '111')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>112</td><td>Torpaq, tikili və avadanlıqlar üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>113</td><td>Torpaq, tikili və avadanlıqlarla bağlı məsrəflərin kapitallaşdırılması</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">12. İnvestisiya mülkiyyəti</td></tr>
                        <tr class="account-row"><td>121</td><td>İnvestisiya mülkiyyətinin dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '121')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>122</td><td>İnvestisiya mülkiyyəti üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>123</td><td>İnvestisiya mülkiyyəti ilə bağlı məsrəflərin kapitallaşdırılması</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">13. Bioloji aktivlər</td></tr>
                        <tr class="account-row"><td>131</td><td>Bioloji aktivlərin dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '131')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>132</td><td>Bioloji aktivlər üzrə yığılmış amortizasiya və qiymətdəndüşmə zərərləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">14. Təbii sərvətlər</td></tr>
                        <tr class="account-row"><td>141</td><td>Təbii sərvətlərin (ehtiyatların) dəyəri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '141')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>142</td><td>Təbii sərvətlərin (ehtiyatların) tükənməsi</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">15. İştirak payı metodu ilə uçota alınmış investisiyalar</td></tr>
                        <tr class="account-row"><td>151</td><td>Asılı müəssisələrə investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '151')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>152</td><td>Birgə müəssisələrə investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>153</td><td>Asılı və birgə müəssisələrə investisiyaların dəyərinin azalmasına görə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">16. Təxirə salınmış vergi aktivləri</td></tr>
                        <tr class="account-row"><td>161</td><td>Mənfəət vergisi üzrə təxirə salınmış vergi aktivləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '161')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>162</td><td>Digər təxirə salınmış vergi aktivləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">17. Uzunmüddətli debitor borcları</td></tr>
                        <tr class="account-row"><td>171</td><td>Alıcıların və sifarişçilərin uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '171')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>172</td><td>Törəmə (asılı) müəssisələrin uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>173</td><td>Əsas idarəetmə heyətinin uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>174</td><td>İcarə üzrə uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>175</td><td>Tikinti müqavilələri üzrə uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>176</td><td>Faizlər üzrə uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>177</td><td>Digər uzunmüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">18. Sair uzunmüddətli maliyyə aktivləri</td></tr>
                        <tr class="account-row"><td>181</td><td>Ödənişə qədər saxlanılan uzunmüddətli investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '181')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>182</td><td>Verilmiş uzunmüddətli borclar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>183</td><td>Digər uzunmüddətli investisiyalar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>184</td><td>Sair uzunmüddətli maliyyə aktivlərinin dəyərinin azalmasına görə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">19. Sair uzunmüddətli aktivlər</td></tr>
                        <tr class="account-row"><td>191</td><td>Gələcək hesabat dövrlərinin xərcləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '191')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>192</td><td>Verilmiş uzunmüddətli avanslar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>193</td><td>Digər uzunmüddətli aktivlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="group-header"><td colspan="8">2. QISAMÜDDƏTLİ AKTİVLƏR</td></tr>
                        <tr class="sub-group-header"><td colspan="8">20. Ehtiyatlar</td></tr>
                        <tr class="account-row"><td>201</td><td>Material ehtiyatları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '201')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>202</td><td>İstehsalat (iş və xidmət) məsrəfləri</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>203</td><td>Tikinti müqavilələri üzrə məsrəflər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>204</td><td>Hazır məhsul</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>205</td><td>Mallar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>206</td><td>Satış məqsədi ilə saxlanılan digər aktivlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>207</td><td>Digər ehtiyatlar</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>208</td><td>Ehtiyatların dəyərinin azalmasına görə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">21. Qısamüddətli debitor borcları</td></tr>
                        <tr class="account-row" data-account-id="211"><td><button class="toggle-sub-accounts" onclick="app.toggleSubAccounts('211')"><i class="fas fa-chevron-right"></i></button> 211</td><td>Alıcıların və sifarişçilərin qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button title="Sub-hesab əlavə et" class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '211')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-account-row" data-parent-id="211" style="display: none;"><td>211.1</td><td>Müştəri A - Debitor Borcu</td><td>Aktiv</td><td>₼1,500.00</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'view-sub-account', '211.1')"><i class="fas fa-eye"></i></button></div></td></tr>
                        <tr class="account-row"><td>212</td><td>Törəmə (asılı) müəssisələrin qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '212')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>213</td><td>Əsas idarəetmə heyətinin qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '213')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>214</td><td>İcarə üzrə qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '214')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>215</td><td>Tikinti müqavilələri üzrə qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '215')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>216</td><td>Faizlər üzrə qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '216')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>217</td><td>Digər qısamüddətli debitor borcları</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '217')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="account-row"><td>218</td><td>Şübhəli borclar üzrə düzəlişlər</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '218')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-group-header"><td colspan="8">22. Pul vəsaitləri və onların ekvivalentləri</td></tr>
                        <tr class="account-row" data-account-id="221"><td><button class="toggle-sub-accounts" onclick="app.toggleSubAccounts('221')"><i class="fas fa-chevron-right"></i></button> 221</td><td>Kassa</td><td>Aktiv</td><td>-</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button title="Sub-hesab əlavə et" class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'add-sub-account', '221')"><i class="fas fa-plus-circle"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-eye"></i></button><button class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></button></div></td></tr>
                        <tr class="sub-account-row" data-parent-id="221" style="display: none;"><td>221.1</td><td>Əsas Kassa - AZN</td><td>Aktiv</td><td>₼5,600.00</td><td>Debet</td><td>AZN</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'view-sub-account', '221.1')"><i class="fas fa-eye"></i></button></div></td></tr>
                        <tr class="sub-account-row" data-parent-id="221" style="display: none;"><td>221.2</td><td>Xarici Valyuta Kassası - USD</td><td>Aktiv</td><td>$1,200.00</td><td>Debet</td><td>USD</td><td><span class="status-badge active">Aktiv</span></td><td><div class="action-buttons"><button class="btn btn-ghost btn-sm" onclick="app.handleEntityOp('chart-of-accounts', 'view-sub-account', '221.2')"><i class="fas fa-eye"></i></button></div></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// FORM
export function getFormHTML(action = 'create', data = {}) {
    const isView = action === 'view';
    const isEdit = action === 'edit';
    const title = action === 'create' ? 'Yeni Hesablararası Köçürmə' : action === 'edit' ? 'Köçürməni Redaktə Et' : 'Köçürmə Məlumatları';
    
    const newId = action === 'create' ? 'TRF-' + String(Date.now()).slice(-4) : data.id;

    return `
        <div class="page-content">
            <div class="page-header">
                <div>
                    <h1>${title}</h1>
                    <p>${action === 'create' ? 'Yeni hesablararası köçürmə qeyd edin' : 'Köçürmə məlumatlarını görüntüləyin və ya redaktə edin'}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-secondary" onclick="app.navigateTo('transfers')">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </div>
            </div>
            <form id="transfersForm" onsubmit="app.submitForm(event, 'transfers', '${action}', '${newId}')">
                <div class="form-container">
                    <div class="form-section">
                        <h3>Köçürmə Məlumatları</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Köçürmə №</label>
                                <input type="text" name="transferNumber" class="form-input" value="${newId}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tarix *</label>
                                <input type="date" name="date" class="form-input" value="${data.date || new Date().toISOString().split('T')[0]}" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Çıxış Hesabı *</label>
                                <select name="fromAccount" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="main-cash" ${data.fromAccount === 'main-cash' ? 'selected' : ''}>Əsas Kassa</option>
                                    <option value="kapital-azn" ${data.fromAccount === 'kapital-azn' ? 'selected' : ''}>KapitalBank AZN</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Daxil Hesabı *</label>
                                <select name="toAccount" class="form-input" required ${isView ? 'disabled' : ''}>
                                    <option value="">Seçin...</option>
                                    <option value="kapital-azn" ${data.toAccount === 'kapital-azn' ? 'selected' : ''}>KapitalBank AZN</option>
                                    <option value="main-cash" ${data.toAccount === 'main-cash' ? 'selected' : ''}>Əsas Kassa</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Məbləğ *</label>
                                <input type="number" name="amount" class="form-input" value="${data.amount || '0'}" min="0.01" step="0.01" required ${isView ? 'readonly' : ''}>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Valyuta</label>
                                <select name="currency" class="form-input" ${isView ? 'disabled' : ''}>
                                    <option value="AZN" ${data.currency === 'AZN' ? 'selected' : ''}>AZN</option>
                                    <option value="USD" ${data.currency === 'USD' ? 'selected' : ''}>USD</option>
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">Qeydlər</label>
                                <textarea name="notes" class="form-textarea" ${isView ? 'readonly' : ''}>${data.notes || ''}</textarea>
                            </div>
                        </div>
                    </div>
                    ${!isView ? `
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="app.navigateTo('transfers')">
                                <i class="fas fa-times"></i> Ləğv et
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> ${action === 'create' ? 'Yarat' : 'Yadda Saxla'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            </form>
        </div>
    `;
}