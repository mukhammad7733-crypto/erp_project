import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { Container, Navbar, Nav, Offcanvas, Button } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { logout } from '../store/slices/authSlice'

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const navItems = [
    { path: '/', label: 'Общая часть', icon: 'bi-speedometer2' },
    { path: '/clients', label: 'Клиенты', icon: 'bi-people' },
    { path: '/contracts', label: 'Договоры', icon: 'bi-file-earmark-text' },
    { path: '/debts', label: 'Задолженность', icon: 'bi-credit-card' },
    { path: '/team', label: 'Команда', icon: 'bi-people-fill' },
    { path: '/warehouse', label: 'Склад', icon: 'bi-box-seam' },
    { path: '/settings', label: 'Настройки', icon: 'bi-gear' },
  ]

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm" style={{ minHeight: '56px' }}>
        <Container fluid>
          <Button
            variant="outline-light"
            className="me-2 d-lg-none border-0"
            onClick={() => setShowSidebar(true)}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <i className="bi bi-list fs-5"></i>
          </Button>

          <Navbar.Brand as={Link} to="/" className="fw-bold mb-0">
            <i className="bi bi-building me-2 d-none d-sm-inline"></i>
            <span className="d-none d-sm-inline">ERP Система</span>
            <span className="d-inline d-sm-none">ERP</span>
          </Navbar.Brand>

          <Nav className="me-auto ms-3 d-flex flex-row gap-1">
            <Nav.Link
              as={Link}
              to="/cash"
              className={`text-white fw-semibold d-flex align-items-center ${
                location.pathname === '/cash' ? 'border-bottom border-2 border-white' : ''
              }`}
              style={{ minHeight: '44px' }}
            >
              <i className="bi bi-cash-stack me-2"></i>
              Касса
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profit"
              className={`text-white fw-semibold d-flex align-items-center ${
                location.pathname === '/profit' ? 'border-bottom border-2 border-white' : ''
              }`}
              style={{ minHeight: '44px' }}
            >
              <i className="bi bi-graph-up me-2"></i>
              Прибыль
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Item className="text-white me-2 d-none d-md-flex align-items-center">
              <small>
                <i className="bi bi-person-circle me-1"></i>
                {user?.firstName} {user?.lastName}
              </small>
            </Nav.Item>
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleLogout}
              className="border-0 d-flex align-items-center"
              style={{ minHeight: '38px' }}
            >
              <i className="bi bi-box-arrow-right me-1 d-none d-sm-inline"></i>
              <i className="bi bi-box-arrow-right d-inline d-sm-none"></i>
              <span className="d-none d-sm-inline">Выход</span>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex flex-grow-1">
        {/* Desktop Sidebar */}
        <div className="d-none d-lg-block bg-light border-end" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
          <Nav className="flex-column p-3">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`mb-2 rounded py-2 px-3 d-flex align-items-center ${
                  location.pathname === item.path ? 'bg-primary text-white' : 'text-dark'
                }`}
                style={{ minHeight: '44px' }}
              >
                <i className={`${item.icon} me-2 fs-5`}></i>
                <span>{item.label}</span>
              </Nav.Link>
            ))}
          </Nav>
        </div>

        {/* Mobile Sidebar (Offcanvas) */}
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="d-flex align-items-center">
              <i className="bi bi-building me-2"></i>
              <span>ERP Система</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            {/* User info on mobile */}
            <div className="p-3 bg-light border-bottom d-md-none">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-3 me-2 text-primary"></i>
                <div>
                  <div className="fw-semibold">{user?.firstName} {user?.lastName}</div>
                  <small className="text-muted">{user?.email}</small>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <Nav className="flex-column p-3">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  as={Link}
                  to={item.path}
                  className={`mb-2 rounded py-3 px-3 d-flex align-items-center ${
                    location.pathname === item.path ? 'bg-primary text-white' : 'text-dark'
                  }`}
                  style={{ minHeight: '54px', fontSize: '1.05rem' }}
                  onClick={() => setShowSidebar(false)}
                >
                  <i className={`${item.icon} me-3 fs-4`}></i>
                  <span>{item.label}</span>
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <div className="flex-grow-1 bg-light" style={{ paddingBottom: 'max(70px, env(safe-area-inset-bottom))' }}>
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="d-lg-none fixed-bottom bg-white border-top shadow-sm" style={{ paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 1030 }}>
        <div className="d-flex justify-content-around align-items-center" style={{ height: '60px' }}>
          <Link
            to="/"
            className={`d-flex flex-column align-items-center justify-content-center text-decoration-none flex-fill ${
              location.pathname === '/' ? 'text-primary' : 'text-muted'
            }`}
            style={{ minHeight: '44px', padding: '4px 0' }}
          >
            <i className={`bi bi-speedometer2 fs-5 ${location.pathname === '/' ? 'fw-bold' : ''}`}></i>
            <small style={{ fontSize: '0.7rem', marginTop: '2px' }}>Главная</small>
          </Link>

          <Link
            to="/clients"
            className={`d-flex flex-column align-items-center justify-content-center text-decoration-none flex-fill ${
              location.pathname === '/clients' ? 'text-primary' : 'text-muted'
            }`}
            style={{ minHeight: '44px', padding: '4px 0' }}
          >
            <i className={`bi bi-people fs-5 ${location.pathname === '/clients' ? 'fw-bold' : ''}`}></i>
            <small style={{ fontSize: '0.7rem', marginTop: '2px' }}>Клиенты</small>
          </Link>

          <Link
            to="/cash"
            className={`d-flex flex-column align-items-center justify-content-center text-decoration-none flex-fill ${
              location.pathname === '/cash' ? 'text-primary' : 'text-muted'
            }`}
            style={{ minHeight: '44px', padding: '4px 0' }}
          >
            <i className={`bi bi-cash-stack fs-5 ${location.pathname === '/cash' ? 'fw-bold' : ''}`}></i>
            <small style={{ fontSize: '0.7rem', marginTop: '2px' }}>Касса</small>
          </Link>

          <Link
            to="/warehouse"
            className={`d-flex flex-column align-items-center justify-content-center text-decoration-none flex-fill ${
              location.pathname === '/warehouse' ? 'text-primary' : 'text-muted'
            }`}
            style={{ minHeight: '44px', padding: '4px 0' }}
          >
            <i className={`bi bi-box-seam fs-5 ${location.pathname === '/warehouse' ? 'fw-bold' : ''}`}></i>
            <small style={{ fontSize: '0.7rem', marginTop: '2px' }}>Склад</small>
          </Link>

          <Button
            variant="link"
            className="d-flex flex-column align-items-center justify-content-center text-decoration-none text-muted flex-fill border-0"
            onClick={() => setShowSidebar(true)}
            style={{ minHeight: '44px', padding: '4px 0' }}
          >
            <i className="bi bi-list fs-5"></i>
            <small style={{ fontSize: '0.7rem', marginTop: '2px' }}>Ещё</small>
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default DashboardLayout
