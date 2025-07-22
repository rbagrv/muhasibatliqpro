-- Example tenant data isolation
SELECT * FROM sales WHERE tenant_id = $1;
SELECT * FROM users WHERE tenant_id = $1;


