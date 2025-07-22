# MühasibatlıqPro - Multi-Tenant SaaS Accounting System

## Overview
Professional accounting and consulting web application built with modern web technologies. Features multi-tenant architecture, real-time POS system, Telegram bot integration, and comprehensive financial reporting.

## 🏗️ System Architecture

### Frontend
- **Framework**: Vanilla JavaScript (React-like structure)
- **Styling**: Custom CSS with modern design patterns
- **Real-time**: WebSocket integration
- **Mobile**: Responsive design
- **Error Tracking**: Global error handlers for catching JavaScript errors and unhandled promise rejections, sending them to the backend for logging.
- **Performance Monitoring**: Measures page load times and sends metrics to the backend.

### Backend
- **Runtime**: Node.js + Express
- **Language**: JavaScript (TypeScript-ready)
- **Database**: PostgreSQL or MariaDB (configurable) with multi-tenant schema
- **Authentication**: JWT with refresh tokens
- **Real-time**: WebSocket (Socket.io compatible)
- **Bot Integration**: Telegram Bot API, WhatsApp (via `whatsapp-web.js`)
- **Error Logging**: Catches backend errors via middleware, logs to database, and sends alerts (e.g., Telegram).
- **Frontend Log Ingestion**: Dedicated endpoints for receiving and logging frontend errors and performance metrics.

### Database Setup
This application supports both PostgreSQL and MariaDB.

1.  **Install your chosen database**: PostgreSQL (version 12+) or MariaDB (version 10.6+).
2.  **Configure `.env` file**:
    -   Set `DB_CLIENT` to `pg` for PostgreSQL or `mariadb` for MariaDB.
    -   Fill in the corresponding database connection details (`DB_HOST`, `DB_PORT`, etc.).
    -   Ensure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set for alerts.
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

-- System Logs
error_logs (id, type, message, stack, source, lineno, colno, url, method, level, created_at)

