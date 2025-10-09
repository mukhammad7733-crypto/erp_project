# ERP System Architecture

## System Overview
Modern web-based ERP system for small and medium businesses focusing on financial management, contracts, debt tracking, and profit analytics.

## Architecture Layers

### 1. Frontend Layer (React + TypeScript)
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit / Zustand
- **UI Library**: Material-UI or Ant Design
- **Charts**: Recharts or Chart.js
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Form Management**: React Hook Form
- **Date Handling**: date-fns or Day.js

### 2. Backend Layer (Java Spring Boot)
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security with JWT
- **Data Access**: Spring Data JPA
- **API**: RESTful APIs
- **Validation**: Bean Validation
- **Documentation**: SpringDoc OpenAPI (Swagger)
- **Scheduling**: Spring Scheduler (for notifications)
- **File Storage**: Local/Cloud storage for documents

### 3. Database Layer (PostgreSQL)
- **Database**: PostgreSQL 15+
- **Migration**: Flyway or Liquibase
- **Connection Pool**: HikariCP

### 4. Integration Layer
- **1C Integration**: REST API / SOAP endpoints
- **Notification Service**: Email/SMS integration
- **Backup Service**: Automated backup system

## Core Modules

### 1. Authentication & Authorization Module
- User registration and login
- JWT-based authentication
- Role-based access control (RBAC)
- Roles: Admin, Manager, Accountant, Viewer
- Password encryption with BCrypt

### 2. Dashboard Module
- Real-time metrics display
- Cash balance overview
- Contract summary
- Debt overview
- Upcoming payments calendar
- Interactive charts and graphs
- Quick actions panel

### 3. Cash Management Module
- Cash flow tracking
- Categories:
  - Cash/Non-cash transactions
  - By branches
  - By clients
- Transaction history
- Balance reports
- Chart visualization (pie, bar, line charts)
- Export to Excel/PDF

### 4. Contracts Management Module
- Contract CRUD operations
- Fields:
  - Contract number
  - Counterparty information
  - Status (Draft, Active, Completed, Cancelled)
  - Start/End dates
  - Amount
  - Documents/Attachments
- Search functionality
- Filtering:
  - By counterparty
  - By date range
  - By status
- Document upload and management

### 5. Debt Management Module
- Supplier debt tracking
- Client debt tracking
- Display modes:
  - List view
  - Table view
  - Chart view (pie, bar)
- Payment deadline notifications
- Overdue alerts
- Payment history
- Debt aging reports

### 6. Profit Analytics Module
- Total profit calculation
- Monthly profit breakdown
- Revenue vs. expenses
- Profit margins
- Dynamic charts:
  - Line charts for trends
  - Bar charts for comparisons
  - Pie charts for distribution
- Export reports
- Future: Predictive analytics

### 7. Notification System
- Payment reminders
- Deadline alerts
- Overdue notifications
- In-app notifications
- Email notifications (optional)
- Notification preferences

### 8. Reports Module
- Pre-built report templates
- Custom report builder
- Export formats: PDF, Excel, CSV
- Report types:
  - Financial statements
  - Cash flow reports
  - Contract reports
  - Debt reports
  - Profit/Loss statements

### 9. Settings Module
- User profile management
- Company settings
- System preferences
- Role and permission management
- Integration settings (1C)
- Backup management

## Database Schema

### Core Tables

#### users
- id (PK)
- username
- email
- password_hash
- role
- first_name
- last_name
- phone
- is_active
- created_at
- updated_at

#### companies
- id (PK)
- name
- legal_name
- tax_id
- address
- phone
- email
- created_at
- updated_at

#### branches
- id (PK)
- company_id (FK)
- name
- address
- phone
- manager_id (FK -> users)
- created_at
- updated_at

#### counterparties
- id (PK)
- company_id (FK)
- name
- type (SUPPLIER, CLIENT)
- contact_person
- phone
- email
- address
- tax_id
- bank_details
- created_at
- updated_at

#### contracts
- id (PK)
- company_id (FK)
- contract_number
- counterparty_id (FK)
- type (PURCHASE, SALE)
- status (DRAFT, ACTIVE, COMPLETED, CANCELLED)
- start_date
- end_date
- total_amount
- currency
- description
- created_by (FK -> users)
- created_at
- updated_at

#### contract_documents
- id (PK)
- contract_id (FK)
- document_name
- file_path
- file_size
- uploaded_by (FK -> users)
- uploaded_at

#### cash_accounts
- id (PK)
- company_id (FK)
- branch_id (FK, nullable)
- account_name
- account_type (CASH, BANK)
- currency
- balance
- created_at
- updated_at

#### transactions
- id (PK)
- company_id (FK)
- cash_account_id (FK)
- transaction_type (INCOME, EXPENSE)
- category (SALES, PURCHASE, SALARY, UTILITIES, OTHER)
- amount
- currency
- counterparty_id (FK, nullable)
- contract_id (FK, nullable)
- description
- transaction_date
- created_by (FK -> users)
- created_at
- updated_at

#### debts
- id (PK)
- company_id (FK)
- counterparty_id (FK)
- debt_type (PAYABLE, RECEIVABLE)
- contract_id (FK, nullable)
- total_amount
- paid_amount
- remaining_amount
- currency
- due_date
- status (PENDING, PARTIALLY_PAID, PAID, OVERDUE)
- created_at
- updated_at

#### debt_payments
- id (PK)
- debt_id (FK)
- payment_amount
- payment_date
- payment_method
- transaction_id (FK)
- notes
- created_by (FK -> users)
- created_at

#### notifications
- id (PK)
- user_id (FK)
- type (PAYMENT_REMINDER, DEBT_OVERDUE, CONTRACT_EXPIRING)
- title
- message
- related_entity_type
- related_entity_id
- is_read
- created_at

#### profit_records
- id (PK)
- company_id (FK)
- period_year
- period_month
- revenue
- expenses
- net_profit
- profit_margin
- created_at
- updated_at

## Security Features

1. **Authentication**
   - JWT token-based authentication
   - Token expiration and refresh
   - Secure password storage (BCrypt)

2. **Authorization**
   - Role-based access control
   - Permission-based endpoint protection
   - Data isolation by company

3. **Data Protection**
   - SQL injection prevention (JPA/Hibernate)
   - XSS protection
   - CSRF protection
   - CORS configuration
   - Input validation
   - Encrypted sensitive data

4. **Backup & Recovery**
   - Automated database backups
   - Transaction logging
   - Audit trails

## API Structure

### Authentication Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout

### Dashboard Endpoints
- GET /api/dashboard/summary
- GET /api/dashboard/metrics

### Cash Management Endpoints
- GET /api/cash/accounts
- POST /api/cash/accounts
- GET /api/cash/transactions
- POST /api/cash/transactions
- GET /api/cash/balance
- GET /api/cash/reports

### Contracts Endpoints
- GET /api/contracts
- POST /api/contracts
- GET /api/contracts/{id}
- PUT /api/contracts/{id}
- DELETE /api/contracts/{id}
- POST /api/contracts/{id}/documents
- GET /api/contracts/{id}/documents

### Debts Endpoints
- GET /api/debts
- POST /api/debts
- GET /api/debts/{id}
- PUT /api/debts/{id}
- POST /api/debts/{id}/payments
- GET /api/debts/overdue

### Profit Analytics Endpoints
- GET /api/profit/summary
- GET /api/profit/monthly
- GET /api/profit/trends

### Notifications Endpoints
- GET /api/notifications
- PUT /api/notifications/{id}/read
- DELETE /api/notifications/{id}

## Deployment Architecture

### Development Environment
- Local PostgreSQL instance
- Spring Boot application (port 8080)
- React dev server (port 3000)

### Production Environment
- Database: PostgreSQL on dedicated server/cloud
- Backend: Spring Boot application (containerized)
- Frontend: Static build served by Nginx
- Reverse Proxy: Nginx
- SSL/TLS: Let's Encrypt certificates

## Technology Stack Summary

### Frontend
- React 18+
- TypeScript
- Redux Toolkit / Zustand
- Material-UI / Ant Design
- Recharts / Chart.js
- Axios
- React Router v6
- React Hook Form

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- Flyway/Liquibase
- JWT
- Lombok
- MapStruct

### DevOps
- Git
- Maven / Gradle
- Docker
- Docker Compose
- CI/CD (GitHub Actions / Jenkins)

## Development Phases

### Phase 1: Foundation (Weeks 1-2)
- Project setup
- Database design and creation
- Authentication system
- Basic CRUD APIs

### Phase 2: Core Modules (Weeks 3-6)
- Cash Management module
- Contracts module
- Debt Management module
- Dashboard

### Phase 3: Analytics & Reports (Weeks 7-8)
- Profit Analytics module
- Notification system
- Reports module

### Phase 4: Integration & Polish (Weeks 9-10)
- 1C integration foundation
- Mobile responsiveness
- UI/UX refinements
- Performance optimization

### Phase 5: Testing & Deployment (Weeks 11-12)
- Comprehensive testing
- Bug fixes
- Documentation
- Deployment

## Future Enhancements
- Mobile applications (iOS/Android)
- Advanced analytics with ML
- Multi-currency support
- Advanced reporting
- Third-party integrations
- Real-time collaboration features
