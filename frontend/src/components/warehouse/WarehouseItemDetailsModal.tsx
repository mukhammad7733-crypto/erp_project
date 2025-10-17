import { Modal, Button, Badge, Row, Col, Card, ProgressBar } from 'react-bootstrap'
import { WarehouseItem } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface WarehouseItemDetailsModalProps {
  show: boolean
  onHide: () => void
  item: WarehouseItem | null
}

const WarehouseItemDetailsModal = ({ show, onHide, item }: WarehouseItemDetailsModalProps) => {
  if (!item) return null

  const getStockStatus = () => {
    if (item.quantity === 0) return { label: 'Нет в наличии', variant: 'danger' }
    if (item.quantity < item.minStock) return { label: 'Низкий запас', variant: 'warning' }
    return { label: 'В наличии', variant: 'success' }
  }

  const stockStatus = getStockStatus()
  const stockPercentage = (item.quantity / (item.minStock * 2)) * 100
  const totalValue = item.quantity * item.purchasePrice
  const potentialRevenue = item.quantity * item.salePrice
  const potentialProfit = potentialRevenue - totalValue

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-box-seam me-2"></i>
          Детали товара
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Main Info Card */}
        <Card className="mb-3 border-0 bg-light">
          <Card.Body>
            <Row>
              <Col md={8}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Название товара</small>
                  <h5 className="mb-0">{item.name}</h5>
                </div>
                <div className="mb-3">
                  <Row>
                    <Col md={6}>
                      <small className="text-muted d-block mb-1">Артикул (SKU)</small>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-upc-scan me-2 text-primary"></i>
                        <strong>{item.sku}</strong>
                      </div>
                    </Col>
                    <Col md={6}>
                      <small className="text-muted d-block mb-1">Категория</small>
                      <Badge bg="secondary" className="fs-6">
                        {item.category}
                      </Badge>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Количество</small>
                  <h3 className={`mb-0 ${
                    item.quantity === 0 ? 'text-danger' :
                    item.quantity < item.minStock ? 'text-warning' :
                    'text-success'
                  }`}>
                    {item.quantity} {item.unit}
                  </h3>
                </div>
                <Badge bg={stockStatus.variant} className="fs-6">
                  {stockStatus.label}
                </Badge>
              </Col>
            </Row>

            {/* Stock Progress */}
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-1">
                <small className="text-muted">Уровень запаса</small>
                <small className="text-muted">
                  Мин: {item.minStock} {item.unit}
                </small>
              </div>
              <ProgressBar
                now={stockPercentage}
                variant={
                  item.quantity === 0 ? 'danger' :
                  item.quantity < item.minStock ? 'warning' :
                  'success'
                }
                style={{ height: '8px' }}
              />
            </div>
          </Card.Body>
        </Card>

        {/* Pricing Information */}
        <h6 className="mb-3">
          <i className="bi bi-cash-coin me-2"></i>
          Ценовая информация
        </h6>
        <Row className="mb-3">
          <Col md={4}>
            <div className="p-3 border rounded text-center">
              <small className="text-muted d-block mb-1">Закупочная цена</small>
              <h5 className="mb-0 text-danger">{formatCurrency(item.purchasePrice)}</h5>
              <small className="text-muted">за {item.unit}</small>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3 border rounded text-center">
              <small className="text-muted d-block mb-1">Цена продажи</small>
              <h5 className="mb-0 text-success">{formatCurrency(item.salePrice)}</h5>
              <small className="text-muted">за {item.unit}</small>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3 border rounded text-center">
              <small className="text-muted d-block mb-1">Наценка</small>
              <h5 className="mb-0 text-primary">
                {(((item.salePrice - item.purchasePrice) / item.purchasePrice) * 100).toFixed(1)}%
              </h5>
              <small className="text-muted">{formatCurrency(item.salePrice - item.purchasePrice)}</small>
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
              <Col md={4}>
                <div className="mb-2">
                  <small className="text-muted d-block">Стоимость запаса</small>
                  <h5 className="mb-0">{formatCurrency(totalValue)}</h5>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-2">
                  <small className="text-muted d-block">Потенциальная выручка</small>
                  <h5 className="mb-0 text-success">{formatCurrency(potentialRevenue)}</h5>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-2">
                  <small className="text-muted d-block">Потенциальная прибыль</small>
                  <h5 className="mb-0 text-primary">{formatCurrency(potentialProfit)}</h5>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Storage Information */}
        <h6 className="mb-3">
          <i className="bi bi-geo-alt me-2"></i>
          Информация о складе
        </h6>
        <Row className="mb-3">
          <Col md={6}>
            <div className="p-3 border rounded mb-3">
              <small className="text-muted d-block mb-1">Расположение</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-map me-2 text-primary"></i>
                <strong>{item.location}</strong>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded mb-3">
              <small className="text-muted d-block mb-1">Поставщик</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-building me-2 text-primary"></i>
                <strong>{item.supplier}</strong>
              </div>
            </div>
          </Col>
        </Row>

        {/* Last Restocked */}
        <Row className="mb-3">
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Последнее пополнение</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                <small>{formatDate(item.lastRestocked)}</small>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Минимальный запас</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-exclamation-triangle me-2 text-warning"></i>
                <strong>{item.minStock} {item.unit}</strong>
              </div>
            </div>
          </Col>
        </Row>

        {/* Timestamps */}
        <Row>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Добавлен в систему</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-plus me-2 text-primary"></i>
                <small>{formatDate(item.createdAt)}</small>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Последнее обновление</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-arrow-repeat me-2 text-primary"></i>
                <small>{formatDate(item.updatedAt)}</small>
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
          <i className="bi bi-plus-circle me-1"></i>
          Пополнить запас
        </Button>
        <Button variant="primary">
          <i className="bi bi-pencil me-1"></i>
          Редактировать
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WarehouseItemDetailsModal
