-- Sample data for development and testing

-- Insert a default company
INSERT INTO companies (name, legal_name, tax_id, address, phone, email, created_at)
VALUES ('Demo Company', 'Demo Company LLC', '1234567890', '123 Main Street, City', '+1-555-0100', 'info@democompany.com', CURRENT_TIMESTAMP);

-- Insert default admin user (password: admin123 - encrypted with BCrypt)
-- You should change this password in production
INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, company_id, created_at)
VALUES (
    'admin',
    'admin@democompany.com',
    '$2a$10$YTqZZ5X8kD5qG7qZZ5X8kO8O8O8O8O8O8O8O8O8O8O8O8O8O8',  -- This is a placeholder, replace with real BCrypt hash
    'ADMIN',
    'Admin',
    'User',
    TRUE,
    1,
    CURRENT_TIMESTAMP
);

-- Insert a sample branch
INSERT INTO branches (company_id, name, address, phone, manager_id, created_at)
VALUES (1, 'Main Office', '123 Main Street, City', '+1-555-0100', 1, CURRENT_TIMESTAMP);

-- Insert sample counterparties
INSERT INTO counterparties (company_id, name, type, contact_person, phone, email, created_at)
VALUES
(1, 'ABC Suppliers Ltd', 'SUPPLIER', 'John Smith', '+1-555-0200', 'john@abcsuppliers.com', CURRENT_TIMESTAMP),
(1, 'XYZ Client Corp', 'CLIENT', 'Jane Doe', '+1-555-0300', 'jane@xyzclient.com', CURRENT_TIMESTAMP),
(1, 'Global Materials Inc', 'SUPPLIER', 'Bob Johnson', '+1-555-0400', 'bob@globalmaterials.com', CURRENT_TIMESTAMP);

-- Insert a sample cash account
INSERT INTO cash_accounts (company_id, branch_id, account_name, account_type, currency, balance, created_at)
VALUES
(1, 1, 'Main Cash Account', 'CASH', 'USD', 50000.00, CURRENT_TIMESTAMP),
(1, 1, 'Primary Bank Account', 'BANK', 'USD', 150000.00, CURRENT_TIMESTAMP);

-- Insert a sample contract
INSERT INTO contracts (company_id, contract_number, counterparty_id, type, status, start_date, end_date, total_amount, currency, description, created_by, created_at)
VALUES (
    1,
    'CONT-2025-001',
    1,
    'PURCHASE',
    'ACTIVE',
    '2025-01-01',
    '2025-12-31',
    100000.00,
    'USD',
    'Annual supply contract for raw materials',
    1,
    CURRENT_TIMESTAMP
);

-- Insert sample transactions
INSERT INTO transactions (company_id, cash_account_id, transaction_type, category, amount, currency, counterparty_id, description, transaction_date, created_by, created_at)
VALUES
(1, 2, 'INCOME', 'SALES', 25000.00, 'USD', 2, 'Product sales - January', '2025-01-15', 1, CURRENT_TIMESTAMP),
(1, 2, 'EXPENSE', 'PURCHASE', 15000.00, 'USD', 1, 'Raw materials purchase', '2025-01-10', 1, CURRENT_TIMESTAMP),
(1, 1, 'EXPENSE', 'SALARY', 8000.00, 'USD', NULL, 'Employee salaries - January', '2025-01-31', 1, CURRENT_TIMESTAMP);

-- Insert a sample debt
INSERT INTO debts (company_id, counterparty_id, debt_type, contract_id, total_amount, paid_amount, remaining_amount, currency, due_date, status, created_at)
VALUES (
    1,
    1,
    'PAYABLE',
    1,
    50000.00,
    20000.00,
    30000.00,
    'USD',
    '2025-03-31',
    'PARTIALLY_PAID',
    CURRENT_TIMESTAMP
);

-- Insert a sample debt payment
INSERT INTO debt_payments (debt_id, payment_amount, payment_date, payment_method, notes, created_by, created_at)
VALUES (
    1,
    20000.00,
    '2025-01-20',
    'Bank Transfer',
    'First installment payment',
    1,
    CURRENT_TIMESTAMP
);

-- Insert sample profit record
INSERT INTO profit_records (company_id, period_year, period_month, revenue, expenses, net_profit, profit_margin, created_at)
VALUES (
    1,
    2025,
    1,
    25000.00,
    23000.00,
    2000.00,
    8.00,
    CURRENT_TIMESTAMP
);

-- Insert a sample notification
INSERT INTO notifications (user_id, type, title, message, related_entity_type, related_entity_id, is_read, created_at)
VALUES (
    1,
    'PAYMENT_REMINDER',
    'Upcoming Payment Due',
    'Payment for ABC Suppliers Ltd is due on 2025-03-31. Remaining amount: $30,000.00',
    'DEBT',
    1,
    FALSE,
    CURRENT_TIMESTAMP
);
