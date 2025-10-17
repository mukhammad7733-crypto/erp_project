import { Modal, Button, Badge, Row, Col, Card } from 'react-bootstrap'
import { TeamMember } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface TeamMemberDetailsModalProps {
  show: boolean
  onHide: () => void
  member: TeamMember | null
}

const TeamMemberDetailsModal = ({ show, onHide, member }: TeamMemberDetailsModalProps) => {
  if (!member) return null

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'danger'
      case 'MANAGER':
        return 'primary'
      case 'ACCOUNTANT':
        return 'success'
      case 'VIEWER':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-circle me-2"></i>
          Детали сотрудника
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Main Info Card */}
        <Card className="mb-3 border-0 bg-light">
          <Card.Body>
            <div className="text-center mb-3">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="rounded-circle"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}
                >
                  {member.firstName[0]}{member.lastName[0]}
                </div>
              )}
              <h4 className="mt-3 mb-1">{member.firstName} {member.lastName}</h4>
              <p className="text-muted mb-2">{member.position}</p>
              <div className="d-flex justify-content-center gap-2">
                <Badge bg={getRoleBadgeVariant(member.role)} className="fs-6">
                  {member.role}
                </Badge>
                <Badge bg={member.isActive ? 'success' : 'danger'} className="fs-6">
                  {member.isActive ? 'Активен' : 'Неактивен'}
                </Badge>
              </div>
            </div>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Отдел</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-diagram-3 me-2 text-primary"></i>
                    <strong>{member.department}</strong>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Зарплата</small>
                  <h5 className="mb-0 text-success">{formatCurrency(member.salary)}</h5>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Contact Information */}
        <h6 className="mb-3">
          <i className="bi bi-telephone me-2"></i>
          Контактная информация
        </h6>
        <Row className="mb-3">
          <Col md={6}>
            <div className="p-3 border rounded mb-3">
              <small className="text-muted d-block mb-1">Email</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-envelope me-2 text-primary"></i>
                <a href={`mailto:${member.email}`} className="text-decoration-none">
                  <strong>{member.email}</strong>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded mb-3">
              <small className="text-muted d-block mb-1">Телефон</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-telephone me-2 text-primary"></i>
                <a href={`tel:${member.phone}`} className="text-decoration-none">
                  <strong>{member.phone}</strong>
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Employment Information */}
        <h6 className="mb-3">
          <i className="bi bi-briefcase me-2"></i>
          Информация о работе
        </h6>
        <Card className="border mb-3">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Должность</small>
                  <strong>{member.position}</strong>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Отдел</small>
                  <strong>{member.department}</strong>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Дата найма</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                    <strong>{formatDate(member.hireDate)}</strong>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Роль в системе</small>
                  <Badge bg={getRoleBadgeVariant(member.role)} className="fs-6">
                    {member.role}
                  </Badge>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Месячная зарплата</small>
                  <h5 className="mb-0 text-success">{formatCurrency(member.salary)}</h5>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Статус</small>
                  <Badge bg={member.isActive ? 'success' : 'danger'} className="fs-6">
                    <i className={`bi bi-${member.isActive ? 'check-circle' : 'x-circle'} me-1`}></i>
                    {member.isActive ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Permissions based on role */}
        <h6 className="mb-3">
          <i className="bi bi-shield-check me-2"></i>
          Права доступа
        </h6>
        <Card className="border mb-3">
          <Card.Body>
            {member.role === 'ADMIN' && (
              <div className="p-3 bg-danger bg-opacity-10 rounded">
                <div className="d-flex align-items-start">
                  <i className="bi bi-shield-fill-exclamation text-danger me-2 mt-1"></i>
                  <div>
                    <strong className="text-danger d-block mb-1">Администратор</strong>
                    <small className="text-muted">
                      Полный доступ ко всем функциям системы, включая управление пользователями и настройки
                    </small>
                  </div>
                </div>
              </div>
            )}
            {member.role === 'MANAGER' && (
              <div className="p-3 bg-primary bg-opacity-10 rounded">
                <div className="d-flex align-items-start">
                  <i className="bi bi-person-badge text-primary me-2 mt-1"></i>
                  <div>
                    <strong className="text-primary d-block mb-1">Менеджер</strong>
                    <small className="text-muted">
                      Доступ к управлению клиентами, договорами и задолженностями
                    </small>
                  </div>
                </div>
              </div>
            )}
            {member.role === 'ACCOUNTANT' && (
              <div className="p-3 bg-success bg-opacity-10 rounded">
                <div className="d-flex align-items-start">
                  <i className="bi bi-calculator text-success me-2 mt-1"></i>
                  <div>
                    <strong className="text-success d-block mb-1">Бухгалтер</strong>
                    <small className="text-muted">
                      Доступ к финансовым операциям, кассе и отчетам
                    </small>
                  </div>
                </div>
              </div>
            )}
            {member.role === 'VIEWER' && (
              <div className="p-3 bg-secondary bg-opacity-10 rounded">
                <div className="d-flex align-items-start">
                  <i className="bi bi-eye text-secondary me-2 mt-1"></i>
                  <div>
                    <strong className="text-secondary d-block mb-1">Наблюдатель</strong>
                    <small className="text-muted">
                      Только просмотр данных без права редактирования
                    </small>
                  </div>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Timestamps */}
        <Row>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Добавлен в систему</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                <small>{formatDate(member.createdAt)}</small>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Последнее обновление</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-arrow-repeat me-2 text-primary"></i>
                <small>{formatDate(member.updatedAt)}</small>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-primary">
          <i className="bi bi-envelope me-1"></i>
          Отправить сообщение
        </Button>
        <Button variant="primary">
          <i className="bi bi-pencil me-1"></i>
          Редактировать
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TeamMemberDetailsModal
