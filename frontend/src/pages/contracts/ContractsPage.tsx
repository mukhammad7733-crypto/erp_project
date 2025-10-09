import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap'
import { contractService } from '../../services/contractService'
import { Contract } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import PageHeader from '../../components/common/PageHeader'
import AddContractModal from '../../components/contracts/AddContractModal'

const ContractsPage = () => {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showContractModal, setShowContractModal] = useState(false)

  useEffect(() => {
    loadContracts()
  }, [])

  const loadContracts = async () => {
    try {
      setLoading(true)
      const response = await contractService.getContracts({ page: 0, size: 20 })
      setContracts(response.content)
    } catch (error) {
      console.error('Failed to load contracts:', error)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <PageHeader
        title="Договоры"
        subtitle="Управление деловыми договорами и соглашениями"
        actions={
          <Button variant="primary" onClick={() => setShowContractModal(true)}>
            <i className="bi bi-plus-circle me-1"></i>
            Новый договор
          </Button>
        }
      />

      <Container fluid className="py-4">
        {/* Statistics */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="text-success">{contracts.filter(c => c.status === 'ACTIVE').length}</h3>
                <p className="text-muted mb-0">Активные</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="text-warning">{contracts.filter(c => c.status === 'DRAFT').length}</h3>
                <p className="text-muted mb-0">Черновики</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="text-info">{contracts.filter(c => c.status === 'COMPLETED').length}</h3>
                <p className="text-muted mb-0">Завершенные</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="text-primary">
                  {formatCurrency(contracts.reduce((sum, c) => sum + c.amount, 0))}
                </h3>
                <p className="text-muted mb-0">Общая сумма</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contracts Table */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white">
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0">Все договоры</h5>
              </Col>
              <Col xs="auto">
                <Row className="g-2">
                  <Col>
                    <Form.Select
                      size="sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">Все статусы</option>
                      <option value="DRAFT">Черновик</option>
                      <option value="ACTIVE">Активный</option>
                      <option value="COMPLETED">Завершен</option>
                      <option value="CANCELLED">Отменен</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <InputGroup size="sm">
                      <InputGroup.Text>
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Поиск..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Номер договора</th>
                  <th>Название</th>
                  <th>Клиент</th>
                  <th>Тип</th>
                  <th>Статус</th>
                  <th>Сумма</th>
                  <th>Дата начала</th>
                  <th>Дата окончания</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {contracts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-muted">
                      Договоры не найдены
                    </td>
                  </tr>
                ) : (
                  contracts.map((contract) => (
                    <tr key={contract.id}>
                      <td>
                        <strong>{contract.contractNumber}</strong>
                      </td>
                      <td>{contract.title}</td>
                      <td>{contract.client}</td>
                      <td>
                        <Badge bg="secondary">{contract.type}</Badge>
                      </td>
                      <td>
                        <Badge bg={getStatusVariant(contract.status)}>
                          {contract.status}
                        </Badge>
                      </td>
                      <td>{formatCurrency(contract.amount)}</td>
                      <td>{formatDate(contract.startDate)}</td>
                      <td>{formatDate(contract.endDate)}</td>
                      <td>
                        <Button variant="link" size="sm" className="p-0">
                          <i className="bi bi-eye"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal */}
      <AddContractModal
        show={showContractModal}
        onHide={() => setShowContractModal(false)}
        onSuccess={loadContracts}
      />
    </>
  )
}

export default ContractsPage
