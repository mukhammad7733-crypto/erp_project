import { Modal, Button, Badge, Table, Row, Col, Card } from 'react-bootstrap'
import { Debt } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface DebtDetailsModalProps {
  show: boolean
  onHide: () => void
  debt: Debt | null
  onPayDebt?: (debt: Debt) => void
}

const DebtDetailsModal = ({ show, onHide, debt, onPayDebt }: DebtDetailsModalProps) => {
  if (!debt) return null

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'success'
      case 'PARTIAL':
        return 'info'
      case 'PENDING':
        return 'warning'
      case 'OVERDUE':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getTypeColor = (type: string) => {
    return type === 'SUPPLIER' ? 'danger' : 'success'
  }

  const paymentProgress = (debt.paidAmount / debt.amount) * 100

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Детали задолженности</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Main Info Card */}
        <Card className="mb-3 border-0 bg-light">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Контрагент</small>
                  <h5 className="mb-0">{debt.counterparty}</h5>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Тип</small>
                  <Badge bg={getTypeColor(debt.type)}>
                    {debt.type === 'SUPPLIER' ? 'Задолженность поставщику' : 'Задолженность клиента'}
                  </Badge>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Статус</small>
                  <Badge bg={getStatusVariant(debt.status)} className="fs-6">
                    {debt.status}
                  </Badge>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Общая сумма</small>
                  <h4 className="mb-0">{formatCurrency(debt.amount)}</h4>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Оплачено</small>
                  <h5 className="mb-0 text-success">{formatCurrency(debt.paidAmount)}</h5>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Остаток к оплате</small>
                  <h4 className={`mb-0 ${debt.remainingAmount > 0 ? 'text-danger' : 'text-success'}`}>
                    {formatCurrency(debt.remainingAmount)}
                  </h4>
                </div>
              </Col>
            </Row>

            {/* Payment Progress */}
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-1">
                <small className="text-muted">Прогресс оплаты</small>
                <small className="text-muted">{paymentProgress.toFixed(1)}%</small>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className={`progress-bar ${
                    paymentProgress === 100 ? 'bg-success' : paymentProgress > 50 ? 'bg-info' : 'bg-warning'
                  }`}
                  role="progressbar"
                  style={{ width: `${paymentProgress}%` }}
                  aria-valuenow={paymentProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Additional Details */}
        <Row className="mb-3">
          <Col md={6}>
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Срок оплаты</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-event me-2 text-primary"></i>
                <strong>{formatDate(debt.dueDate)}</strong>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Создано</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                <strong>{formatDate(debt.createdAt)}</strong>
              </div>
            </div>
          </Col>
        </Row>

        {/* Description */}
        {debt.description && (
          <div className="mb-3">
            <Card className="border">
              <Card.Body>
                <h6 className="mb-2">
                  <i className="bi bi-file-text me-2"></i>
                  Описание
                </h6>
                <p className="mb-0 text-muted">{debt.description}</p>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Contract Link */}
        {debt.contractId && (
          <div className="mb-3">
            <Card className="border">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">
                      <i className="bi bi-file-earmark-text me-2"></i>
                      Связанный договор
                    </h6>
                    <small className="text-muted">ID договора: #{debt.contractId}</small>
                  </div>
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-eye me-1"></i>
                    Просмотреть
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Payment History */}
        {debt.payments && debt.payments.length > 0 && (
          <div className="mb-3">
            <h6 className="mb-3">
              <i className="bi bi-clock-history me-2"></i>
              История платежей ({debt.payments.length})
            </h6>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Table striped bordered hover size="sm" className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Способ оплаты</th>
                    <th>Примечания</th>
                    <th>Создал</th>
                  </tr>
                </thead>
                <tbody>
                  {debt.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{formatDate(payment.paymentDate)}</td>
                      <td>
                        <strong className="text-success">{formatCurrency(payment.amount)}</strong>
                      </td>
                      <td>
                        <Badge bg="secondary">{payment.paymentMethod}</Badge>
                      </td>
                      <td>{payment.notes || '-'}</td>
                      <td>
                        <small className="text-muted">{payment.createdBy}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {/* No payments message */}
        {(!debt.payments || debt.payments.length === 0) && (
          <div className="text-center p-4 bg-light rounded">
            <i className="bi bi-inbox text-muted" style={{ fontSize: '2rem' }}></i>
            <p className="text-muted mb-0 mt-2">История платежей пуста</p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        {debt.remainingAmount > 0 && onPayDebt && (
          <Button
            variant={debt.type === 'SUPPLIER' ? 'danger' : 'success'}
            onClick={() => {
              onPayDebt(debt)
              onHide()
            }}
          >
            <i className="bi bi-cash me-1"></i>
            {debt.type === 'SUPPLIER' ? 'Оплатить' : 'Получить платеж'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default DebtDetailsModal
