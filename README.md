# ERP System for Small and Medium Businesses - Frontend Demo

A modern, frontend-only ERP system designed for small and medium businesses with comprehensive financial management features. This version uses mock data for demonstration purposes.

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

- React 18
- TypeScript
- Bootstrap 5 & React Bootstrap
- Redux Toolkit
- React Router v6
- Recharts (Analytics & Charts)
- Axios
- Vite
- Mock Data (In-memory data simulation)

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

### Quick Start (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd erp
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application:
   - Frontend: http://localhost:3000
   - Login with any credentials (mock authentication)

### Using Docker (Optional)

1. Start the application:
```bash
docker-compose up --build
```

2. Access at http://localhost:3000

## Project Structure

```
erp/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── store/           # Redux store & slices
│   │   ├── services/        # API services with mock data
│   │   │   ├── mockData.ts  # Mock data definitions
│   │   │   ├── authService.ts
│   │   │   ├── cashService.ts
│   │   │   ├── contractService.ts
│   │   │   ├── debtService.ts
│   │   │   └── profitService.ts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
├── docs/                    # Documentation
├── docker-compose.yml       # Docker configuration (optional)
├── ARCHITECTURE.md          # System architecture documentation
└── README.md               # This file
```

## Mock Data

This application uses in-memory mock data for demonstration purposes. All data is stored in `frontend/src/services/mockData.ts` and includes:

- **Dashboard metrics** - Revenue, expenses, cash flow
- **Cash accounts** - Bank accounts, petty cash, credit cards
- **Transactions** - Income and expense records
- **Contracts** - Active, draft, and completed contracts
- **Debts** - Supplier and client debts with payment tracking
- **Profit analytics** - Monthly trends and category breakdowns

## Authentication

The application uses mock authentication. You can log in with any username and password for demonstration purposes.

Default demo roles available:
- **ADMIN**: Full system access
- **MANAGER**: Access to all modules except system settings
- **ACCOUNTANT**: Access to financial modules (cash, debts, profit)
- **VIEWER**: Read-only access

## Environment Variables

- `VITE_API_URL`: Backend API URL (not used in mock mode, but kept for future backend integration)

## Development

### Running Tests

```bash
cd frontend
npm test
```

### Linting

```bash
cd frontend
npm run lint
```

### Building for Production

```bash
cd frontend
npm run build
# Build output will be in the dist/ directory
```

The production build can be served with any static file server:
```bash
npm run preview
```

## Features & Pages

### Available Pages
- **Login/Register** - Mock authentication (accepts any credentials)
- **Dashboard** - Overview with key metrics and charts
- **Cash Management** - Manage accounts and transactions
- **Contracts** - Create, view, and manage contracts
- **Debts** - Track supplier and client debts
- **Profit Analytics** - View revenue, expenses, and profit trends
- **Reports** - Generate financial reports

### Mock API Operations

All CRUD operations work with in-memory data:
- **Create**: Add new items (persists during session)
- **Read**: View lists and details
- **Update**: Modify existing items
- **Delete**: Remove items

**Note**: Data resets when the application is refreshed as it's stored in memory.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
- The Vite dev server will automatically try the next available port
- Or specify a different port in `vite.config.ts`

### Build Issues
Clear node_modules and reinstall:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
Run the type checker:
```bash
npm run build
```

### Mock Data Not Updating
Changes to mock data in `mockData.ts` require a page refresh. The data is stored in memory and resets on page reload.

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

### Current Features (Mock Mode)
- [x] Dashboard with analytics
- [x] Cash management
- [x] Contract management
- [x] Debt tracking
- [x] Profit analytics
- [x] Mock authentication
- [x] Responsive design

### Future Enhancements
- [ ] Backend API integration
- [ ] Real database persistence
- [ ] Advanced filtering and search
- [ ] Export to Excel, PDF, CSV
- [ ] Advanced data visualization
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Offline mode with IndexedDB
- [ ] Enhanced mobile experience
- [ ] Printable reports
- [ ] Data import functionality

## Authors

- ERP Development Team

## Acknowledgments

- React team for the powerful UI library
- Bootstrap team for the excellent component framework
- Vite team for the fast build tool
- Recharts for beautiful data visualization
