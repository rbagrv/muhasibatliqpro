# MühasibatlıqPro - Multi-Tenant SaaS Accounting System

## Overview
Professional accounting and consulting web application built with modern web technologies. Features multi-tenant architecture, real-time POS system, Telegram bot integration, and comprehensive financial reporting.

## 🏗️ System Architecture

### Frontend
- **Framework**: Vanilla JavaScript (React-like structure)
- **Styling**: Custom CSS with modern design patterns
- **Real-time**: WebSocket integration
- **Mobile**: Responsive design

### Backend
- **Runtime**: Node.js + Express
- **Language**: JavaScript (TypeScript-ready)
- **Database**: PostgreSQL or MariaDB (configurable) with multi-tenant schema
- **Authentication**: JWT with refresh tokens
- **Real-time**: WebSocket (Socket.io compatible)
- **Bot Integration**: Telegram Bot API

### Database Setup
This application supports both PostgreSQL and MariaDB.

1.  **Install your chosen database**: PostgreSQL (version 12+) or MariaDB (version 10.6+).
2.  **Configure `.env` file**:
    -   Set `DB_CLIENT` to `pg` for PostgreSQL or `mariadb` for MariaDB.
    -   Fill in the corresponding database connection details (`DB_HOST`, `DB_PORT`, etc.).
3.  **Create the database**:
    ```bash
    # For PostgreSQL
    createdb muhasibatliq_pro
    
    # For MariaDB/MySQL
    mysql -u root -p -e "CREATE DATABASE muhasibatliq_pro;"
    ```

### Database Structure (Example for PostgreSQL)
```sql
-- Main tenant management
tenants (id, name, domain, plan, status, created_at)
users (id, tenant_id, email, password_hash, role, created_at)

-- Accounting modules (per tenant)
chart_of_accounts (id, tenant_id, code, name, account_type, balance)
journal_entries (id, tenant_id, debit_account, credit_account, amount)
products (id, tenant_id, name, barcode, price, quantity)
sales (id, tenant_id, user_id, total_amount, payment_method)
```

## 🖥️ Desktop Version with Electron.js

You can run MühasibatlıqPro as a desktop app using Electron.js.

### Development Setup
1. Install dependencies including Electron:
    ```bash
    npm install
    ```
2. Start the backend server:
    ```bash
    npm run dev
    ```
3. Start Electron:
    ```bash
    npm run electron
    ```
By default, Electron loads `index.html` in a secure window.

### Notes
- Electron runs locally, no Node.js APIs are exposed to the frontend.
- App loads in its own window, providing offline PWA and desktop features.