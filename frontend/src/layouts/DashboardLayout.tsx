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
    { path: '/cash', label: 'Касса', icon: 'bi-cash-stack' },
    { path: '/contracts', label: 'Договоры', icon: 'bi-file-earmark-text' },
    { path: '/debts', label: 'Задолженность', icon: 'bi-credit-card' },
    { path: '/profit', label: 'Прибыль', icon: 'bi-graph-up' },
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
        <div className="flex-grow-1 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
