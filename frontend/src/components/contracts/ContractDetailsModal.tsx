import { Modal, Button, Badge, Row, Col, Card, Table } from 'react-bootstrap'
import { Contract } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface ContractDetailsModalProps {
  show: boolean
  onHide: () => void
  contract: Contract | null
}

const ContractDetailsModal = ({ show, onHide, contract }: ContractDetailsModalProps) => {
  if (!contract) return null

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success'
      case 'COMPLETED':
        return 'info'
      case 'DRAFT':
        return 'warning'
      case 'CANCELLED':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'SERVICE':
        return 'primary'
      case 'PRODUCT':
        return 'success'
      case 'MIXED':
        return 'info'
      default:
        return 'secondary'
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-file-earmark-text me-2"></i>
          Детали договора
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Main Info Card */}
        <Card className="mb-3 border-0 bg-light">
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Номер договора</small>
                  <h5 className="mb-0">{contract.contractNumber}</h5>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Название</small>
                  <h6 className="mb-0">{contract.title}</h6>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Клиент</small>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    <strong>{contract.client}</strong>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Сумма договора</small>
                  <h4 className="mb-0 text-success">{formatCurrency(contract.amount)}</h4>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">Тип</small>
                  <Badge bg={getTypeVariant(contract.type)} className="fs-6">
                    {contract.type}
                  </Badge>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Статус</small>
                  <Badge bg={getStatusVariant(contract.status)} className="fs-6">
                    {contract.status}
                  </Badge>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Dates */}
        <Row className="mb-3">
          <Col md={6}>
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Дата начала</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-check me-2 text-success"></i>
                <strong>{formatDate(contract.startDate)}</strong>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded">
              <small className="text-muted d-block mb-1">Дата окончания</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-x me-2 text-danger"></i>
                <strong>{formatDate(contract.endDate)}</strong>
              </div>
            </div>
          </Col>
        </Row>

        {/* Payment Terms */}
        <div className="mb-3">
          <Card className="border">
            <Card.Body>
              <h6 className="mb-2">
                <i className="bi bi-credit-card me-2"></i>
                Условия оплаты
              </h6>
              <p className="mb-0 text-muted">{contract.paymentTerms}</p>
            </Card.Body>
          </Card>
        </div>

        {/* Description */}
        {contract.description && (
          <div className="mb-3">
            <Card className="border">
              <Card.Body>
                <h6 className="mb-2">
                  <i className="bi bi-file-text me-2"></i>
                  Описание
                </h6>
                <p className="mb-0 text-muted">{contract.description}</p>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Documents */}
        {contract.documents && contract.documents.length > 0 && (
          <div className="mb-3">
            <h6 className="mb-3">
              <i className="bi bi-paperclip me-2"></i>
              Документы ({contract.documents.length})
            </h6>
            <Table striped bordered hover size="sm" className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Название файла</th>
                  <th>Загружено</th>
                  <th>Загрузил</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {contract.documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <i className="bi bi-file-earmark-pdf me-2 text-danger"></i>
                      {doc.fileName}
                    </td>
                    <td>{formatDate(doc.uploadedAt)}</td>
                    <td>
                      <small className="text-muted">{doc.uploadedBy}</small>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm">
                        <i className="bi bi-download"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Timestamps */}
        <Row className="mb-3">
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Создан</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                <small>{formatDate(contract.createdAt)}</small>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 border rounded bg-light">
              <small className="text-muted d-block mb-1">Последнее обновление</small>
              <div className="d-flex align-items-center">
                <i className="bi bi-arrow-repeat me-2 text-primary"></i>
                <small>{formatDate(contract.updatedAt)}</small>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary">
          <i className="bi bi-pencil me-1"></i>
          Редактировать
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ContractDetailsModal
