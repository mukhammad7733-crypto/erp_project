import { Modal, Button, Badge, Row, Col, Card } from 'react-bootstrap'
import { StockMovement } from '../../types'
import { formatDate } from '../../utils/formatters'

interface StockMovementDetailsModalProps {
  show: boolean
  onHide: () => void
  movement: StockMovement | null
}

const StockMovementDetailsModal = ({ show, onHide, movement }: StockMovementDetailsModalProps) => {
  if (!movement) return null

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'IN':
        return 'success'
      case 'OUT':
        return 'danger'
      case 'ADJUSTMENT':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IN':
        return 'box-arrow-in-down'
      case 'OUT':
        return 'box-arrow-up'
      case 'ADJUSTMENT':
        return 'tools'
      default:
        return 'arrow-left-right'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'IN':
        return 'Приход'
      case 'OUT':
        return 'Расход'
      case 'ADJUSTMENT':
        return 'Корректировка'
      default:
        return type
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-arrow-left-right me-2"></i>
          Детали движения товара
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Main Info Card */}
        <Card className="mb-3 border-0 bg-light">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Товар</small>
                  <h5 className="mb-0">{movement.itemName}</h5>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Тип операции</small>
                  <Badge bg={getTypeVariant(movement.type)} className="fs-6">
                    <i className={`bi bi-${getTypeIcon(movement.type)} me-1`}></i>
                    {getTypeLabel(movement.type)}
                  </Badge>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Количество</small>
                  <h3 className={`mb-0 ${
                    movement.type === 'IN' ? 'text-success' :
                    movement.type === 'OUT' ? 'text-danger' :
                    'text-warning'
                  }`}>
                    {movement.type === 'IN' ? '+' : movement.type === 'OUT' ? '-' : '±'}
                    {movement.quantity}
                  </h3>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Дата операции</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar-event me-2 text-primary"></i>
                    <strong>{formatDate(movement.date)}</strong>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Reason */}
        <div className="mb-3">
          <Card className="border">
            <Card.Body>
              <h6 className="mb-2">
                <i className="bi bi-info-circle me-2"></i>
                Причина
              </h6>
              <p className="mb-0 text-muted">{movement.reason}</p>
            </Card.Body>
          </Card>
        </div>

        {/* Additional Notes */}
        {movement.notes && (
          <div className="mb-3">
            <Card className="border">
              <Card.Body>
                <h6 className="mb-2">
                  <i className="bi bi-file-text me-2"></i>
                  Примечания
                </h6>
                <p className="mb-0 text-muted">{movement.notes}</p>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Operation Details */}
        <h6 className="mb-3">
          <i className="bi bi-clipboard-data me-2"></i>
          Детали операции
        </h6>
        <Row className="mb-3">
          <Col md={12}>
            <div className="p-3 border rounded">
              <Row>
                <Col md={4} className="mb-3 mb-md-0">
                  <small className="text-muted d-block mb-1">ID Товара</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-hash me-2 text-primary"></i>
                    <strong>{movement.itemId}</strong>
                  </div>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <small className="text-muted d-block mb-1">ID Операции</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-hash me-2 text-primary"></i>
                    <strong>{movement.id}</strong>
                  </div>
                </Col>
                <Col md={4}>
                  <small className="text-muted d-block mb-1">Дата и время</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock me-2 text-primary"></i>
                    <strong>{formatDate(movement.date)}</strong>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Movement Type Info */}
        <Card className={`border mb-3 bg-${getTypeVariant(movement.type)} bg-opacity-10`}>
          <Card.Body>
            <div className="d-flex align-items-start">
              <i className={`bi bi-${getTypeIcon(movement.type)} text-${getTypeVariant(movement.type)} me-3 fs-3`}></i>
              <div>
                <strong className={`text-${getTypeVariant(movement.type)} d-block mb-1`}>
                  {getTypeLabel(movement.type)}
                </strong>
                <small className="text-muted">
                  {movement.type === 'IN' && 'Товар был добавлен на склад'}
                  {movement.type === 'OUT' && 'Товар был списан со склада'}
                  {movement.type === 'ADJUSTMENT' && 'Была произведена корректировка количества товара'}
                </small>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Performed By */}
        <div className="p-3 border rounded bg-light">
          <Row>
            <Col md={12}>
              <small className="text-muted d-block mb-1">Выполнил операцию</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-badge me-2 text-primary"></i>
                <strong>{movement.performedBy}</strong>
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-primary">
          <i className="bi bi-printer me-1"></i>
          Печать документа
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default StockMovementDetailsModal
