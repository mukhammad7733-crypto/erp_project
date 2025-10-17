import { Modal, Button, Badge, Row, Col, Card } from 'react-bootstrap'
import { Client } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface ClientDetailsModalProps {
  show: boolean
  onHide: () => void
  client: Client | null
}

const ClientDetailsModal = ({ show, onHide, client }: ClientDetailsModalProps) => {
  if (!client) return null

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-circle me-2"></i>
          Детали клиента
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Main Info Card */}
        <Card className="mb-3 border-0 bg-light">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Название компании</small>
                  <h5 className="mb-0">{client.name}</h5>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">ИНН</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-credit-card me-2 text-primary"></i>
                    <strong>{client.inn}</strong>
                  </div>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Статус</small>
                  <Badge bg={client.isActive ? 'success' : 'danger'} className="fs-6">
                    {client.isActive ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Общий доход</small>
                  <h4 className="mb-0 text-success">{formatCurrency(client.totalRevenue)}</h4>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Задолженность</small>
                  <h4 className={`mb-0 ${client.totalDebt > 0 ? 'text-danger' : 'text-success'}`}>
                    {formatCurrency(client.totalDebt)}
                  </h4>
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
              <small className="text-muted d-block mb-1">Контактное лицо</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-person me-2 text-primary"></i>
                <strong>{client.contactPerson}</strong>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded mb-3">
              <small className="text-muted d-block mb-1">Телефон</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-telephone me-2 text-primary"></i>
                <a href={`tel:${client.phone}`} className="text-decoration-none">
                  <strong>{client.phone}</strong>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Email</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-envelope me-2 text-primary"></i>
                <a href={`mailto:${client.email}`} className="text-decoration-none">
                  <strong>{client.email}</strong>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Адрес</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-geo-alt me-2 text-primary"></i>
                <strong>{client.address}</strong>
              </div>
            </div>
          </Col>
        </Row>

        {/* Financial Summary */}
        <h6 className="mb-3">
          <i className="bi bi-graph-up me-2"></i>
          Финансовая сводка
        </h6>
        <Card className="border mb-3">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Общий доход:</span>
                    <strong className="text-success">{formatCurrency(client.totalRevenue)}</strong>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Текущая задолженность:</span>
                    <strong className={client.totalDebt > 0 ? 'text-danger' : 'text-success'}>
                      {formatCurrency(client.totalDebt)}
                    </strong>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                {client.totalDebt > 0 && (
                  <div className="p-3 bg-danger bg-opacity-10 rounded">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                      <small className="text-danger">
                        Клиент имеет непогашенную задолженность
                      </small>
                    </div>
                  </div>
                )}
                {client.totalDebt === 0 && client.totalRevenue > 0 && (
                  <div className="p-3 bg-success bg-opacity-10 rounded">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      <small className="text-success">
                        Все платежи выполнены
                      </small>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Timestamps */}
        <Row>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Добавлен</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                <small>{formatDate(client.createdAt)}</small>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Последнее обновление</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-arrow-repeat me-2 text-primary"></i>
                <small>{formatDate(client.updatedAt)}</small>
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
          <i className="bi bi-file-earmark-text me-1"></i>
          Акт сверки
        </Button>
        <Button variant="primary">
          <i className="bi bi-pencil me-1"></i>
          Редактировать
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ClientDetailsModal
