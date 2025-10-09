# ERP System for Small and Medium Businesses

A modern, full-stack ERP system designed for small and medium businesses with comprehensive financial management features.

## Features

- **Dashboard**: Real-time overview of cash balance, contracts, debts, and upcoming payments
- **Cash Management**: Track cash flow with categorization (cash/non-cash, by branches, by clients)
- **Contract Management**: Manage contracts with search, filtering, and document storage
- **Debt Management**: Monitor supplier and client debts with payment reminders
- **Profit Analytics**: Analyze profit trends with interactive charts and reports
- **Notifications**: Automated reminders for payments and deadlines
- **Reports**: Generate comprehensive financial reports
- **Role-Based Access**: Secure access control with different user roles
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- **1C Integration**: Foundation for integration with 1C accounting systems

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL 15
- Flyway (Database Migrations)
- Maven

### Frontend
- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Router v6
- Recharts
- Axios
- Vite

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 15 or higher
- Maven 3.9 or higher
- Docker and Docker Compose (optional, for containerized setup)

## Installation

### Option 1: Docker Setup (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd erp
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - Swagger UI: http://localhost:8080/api/swagger-ui.html

### Option 2: Manual Setup

#### Database Setup

1. Install PostgreSQL 15
2. Create database and user:
```bash
psql -U postgres
```

```sql
CREATE DATABASE erp_db;
CREATE USER erp_user WITH PASSWORD 'erp_password';
GRANT ALL PRIVILEGES ON DATABASE erp_db TO erp_user;
```

Or use the provided script:
```bash
psql -U postgres -f database/init.sql
```

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Update database credentials in `src/main/resources/application.yml` if needed

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

Or run with a specific profile:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

The backend will start on http://localhost:8080

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on http://localhost:3000

## Project Structure

```
erp/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/erp/
│   │   │   │   ├── config/           # Configuration classes
│   │   │   │   ├── controller/       # REST controllers
│   │   │   │   ├── service/          # Business logic
│   │   │   │   ├── repository/       # Data access layer
│   │   │   │   ├── model/            # Entity models
│   │   │   │   ├── dto/              # Data transfer objects
│   │   │   │   ├── security/         # Security & JWT
│   │   │   │   ├── exception/        # Exception handling
│   │   │   │   └── util/             # Utility classes
│   │   │   └── resources/
│   │   │       ├── application.yml   # Main configuration
│   │   │       └── db/migration/     # Flyway migrations
│   │   └── test/                     # Unit & integration tests
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── store/           # Redux store & slices
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
├── database/               # Database scripts
│   └── init.sql           # Database initialization
├── docs/                  # Documentation
├── docker-compose.yml     # Docker Compose configuration
├── ARCHITECTURE.md        # System architecture documentation
└── README.md             # This file
```

## API Documentation

Once the backend is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8080/api/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api/api-docs

## Default User Roles

The system includes the following roles:
- **ADMIN**: Full system access
- **MANAGER**: Access to all modules except system settings
- **ACCOUNTANT**: Access to financial modules (cash, debts, profit)
- **VIEWER**: Read-only access

## Environment Variables

### Backend
- `SPRING_DATASOURCE_URL`: Database connection URL
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `JWT_SECRET`: Secret key for JWT token generation
- `MAIL_USERNAME`: Email account for notifications
- `MAIL_PASSWORD`: Email password

### Frontend
- `VITE_API_URL`: Backend API URL

## Development

### Running Tests

Backend:
```bash
cd backend
mvn test
```

Frontend:
```bash
cd frontend
npm test
```

### Building for Production

Backend:
```bash
cd backend
mvn clean package
java -jar target/erp-backend-1.0.0.jar
```

Frontend:
```bash
cd frontend
npm run build
# Build output will be in the dist/ directory
```

## Database Migrations

The project uses Flyway for database migrations. Migration scripts are located in `backend/src/main/resources/db/migration/`.

To create a new migration:
1. Create a new SQL file in the migrations folder with naming convention: `V{version}__{description}.sql`
   Example: `V2__add_payment_table.sql`
2. Flyway will automatically apply the migration on application startup

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/metrics` - Get key metrics

### Cash Management
- `GET /api/cash/accounts` - List all cash accounts
- `POST /api/cash/accounts` - Create cash account
- `GET /api/cash/transactions` - List transactions
- `POST /api/cash/transactions` - Create transaction
- `GET /api/cash/balance` - Get balance summary

### Contracts
- `GET /api/contracts` - List contracts (with filtering)
- `POST /api/contracts` - Create contract
- `GET /api/contracts/{id}` - Get contract details
- `PUT /api/contracts/{id}` - Update contract
- `DELETE /api/contracts/{id}` - Delete contract
- `POST /api/contracts/{id}/documents` - Upload document

### Debts
- `GET /api/debts` - List debts
- `POST /api/debts` - Create debt record
- `GET /api/debts/{id}` - Get debt details
- `PUT /api/debts/{id}` - Update debt
- `POST /api/debts/{id}/payments` - Record payment

### Profit Analytics
- `GET /api/profit/summary` - Get profit summary
- `GET /api/profit/monthly` - Get monthly profit data
- `GET /api/profit/trends` - Get profit trends

### Notifications
- `GET /api/notifications` - List user notifications
- `PUT /api/notifications/{id}/read` - Mark as read
- `DELETE /api/notifications/{id}` - Delete notification

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `application.yml`
- Check if port 5432 is available

### Backend Port Already in Use
- Change the port in `application.yml`:
```yaml
server:
  port: 8081  # Change to available port
```

### Frontend Build Issues
- Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support, email support@erp.com or open an issue in the repository.

## Roadmap

- [ ] Mobile applications (iOS/Android)
- [ ] Advanced analytics with ML
- [ ] Multi-currency support
- [ ] Advanced reporting with custom templates
- [ ] Real-time collaboration features
- [ ] Complete 1C integration
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Two-factor authentication
- [ ] Export to various formats (Excel, PDF, CSV)
- [ ] Inventory management module
- [ ] HR management module
- [ ] Project management integration

## Authors

- ERP Development Team

## Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Material-UI for beautiful components
