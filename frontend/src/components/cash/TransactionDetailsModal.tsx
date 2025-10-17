import { Modal, Button, Badge, Row, Col, Card } from 'react-bootstrap'
import { Transaction } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface TransactionDetailsModalProps {
  show: boolean
  onHide: () => void
  transaction: Transaction | null
}

const TransactionDetailsModal = ({ show, onHide, transaction }: TransactionDetailsModalProps) => {
  if (!transaction) return null

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'INCOME':
        return 'success'
      case 'EXPENSE':
        return 'danger'
      case 'TRANSFER':
        return 'info'
      default:
        return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'INCOME':
        return 'arrow-down-circle'
      case 'EXPENSE':
        return 'arrow-up-circle'
      case 'TRANSFER':
        return 'arrow-left-right'
      default:
        return 'circle'
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-receipt me-2"></i>
          Детали транзакции
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Main Info Card */}
        <Card className="mb-3 border-0 bg-light">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Сумма</small>
                  <h3 className={`mb-0 ${
                    transaction.type === 'INCOME' ? 'text-success' :
                    transaction.type === 'EXPENSE' ? 'text-danger' :
                    'text-info'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : transaction.type === 'EXPENSE' ? '-' : ''}
                    {formatCurrency(transaction.amount)}
                  </h3>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Тип операции</small>
                  <Badge bg={getTypeVariant(transaction.type)} className="fs-6">
                    <i className={`bi bi-${getTypeIcon(transaction.type)} me-1`}></i>
                    {transaction.type === 'INCOME' ? 'Приход' :
                     transaction.type === 'EXPENSE' ? 'Расход' :
                     'Перевод'}
                  </Badge>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Счет</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-wallet2 me-2 text-primary"></i>
                    <strong>{transaction.accountName}</strong>
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Категория</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-tag me-2 text-primary"></i>
                    <strong>{transaction.category}</strong>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Transaction Details */}
        <h6 className="mb-3">
          <i className="bi bi-info-circle me-2"></i>
          Информация о транзакции
        </h6>
        <Row className="mb-3">
          <Col md={6}>
            <div className="p-3 border rounded mb-3">
              <small className="text-muted d-block mb-1">Дата операции</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-event me-2 text-primary"></i>
                <strong>{formatDate(transaction.date)}</strong>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded mb-3">
              <small className="text-muted d-block mb-1">Создана</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                <strong>{formatDate(transaction.createdAt)}</strong>
              </div>
            </div>
          </Col>
        </Row>

        {/* Description */}
        <div className="mb-3">
          <Card className="border">
            <Card.Body>
              <h6 className="mb-2">
                <i className="bi bi-file-text me-2"></i>
                Описание
              </h6>
              <p className="mb-0 text-muted">{transaction.description}</p>
            </Card.Body>
          </Card>
        </div>

        {/* Client */}
        {transaction.client && (
          <div className="mb-3">
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Клиент</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle me-2 text-primary"></i>
                <strong>{transaction.client}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Branch */}
        {transaction.branch && (
          <div className="mb-3">
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Филиал</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-building me-2 text-primary"></i>
                <strong>{transaction.branch}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Created By */}
        <div className="p-3 border rounded bg-light">
          <small className="text-muted d-block mb-1">Создал</small>
          <div className="d-flex align-items-center">
            <i className="bi bi-person-badge me-2 text-primary"></i>
            <small><strong>{transaction.createdBy}</strong></small>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-primary">
          <i className="bi bi-printer me-1"></i>
          Печать
        </Button>
        <Button variant="primary">
          <i className="bi bi-pencil me-1"></i>
          Редактировать
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TransactionDetailsModal
