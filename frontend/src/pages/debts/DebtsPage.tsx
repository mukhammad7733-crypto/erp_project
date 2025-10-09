import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup, Tabs, Tab } from 'react-bootstrap'
import { debtService } from '../../services/debtService'
import { Debt } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import PageHeader from '../../components/common/PageHeader'
import AddDebtModal from '../../components/debts/AddDebtModal'
import RecordPaymentModal from '../../components/debts/RecordPaymentModal'

const DebtsPage = () => {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'supplier' | 'client'>('all')
  const [showDebtModal, setShowDebtModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)

  useEffect(() => {
    loadDebts()
  }, [])

  const loadDebts = async () => {
    try {
      setLoading(true)
      const response = await debtService.getDebts({ page: 0, size: 50 })
      setDebts(response.content)
    } catch (error) {
      console.error('Failed to load debts:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const handlePayDebt = (debt: Debt) => {
    setSelectedDebt(debt)
    setShowPaymentModal(true)
  }

  const filterDebts = () => {
    let filtered = debts

    if (activeTab === 'supplier') {
      filtered = filtered.filter(d => d.type === 'SUPPLIER')
    } else if (activeTab === 'client') {
      filtered = filtered.filter(d => d.type === 'CLIENT')
    }

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const filteredDebts = filterDebts()
  const supplierDebts = debts.filter(d => d.type === 'SUPPLIER')
  const clientDebts = debts.filter(d => d.type === 'CLIENT')
  const totalSupplierDebt = supplierDebts.reduce((sum, d) => sum + d.remainingAmount, 0)
  const totalClientDebt = clientDebts.reduce((sum, d) => sum + d.remainingAmount, 0)
  const overdueDebts = debts.filter(d => d.status === 'OVERDUE')

  return (
    <>
      <PageHeader
        title="Задолженность"
        subtitle="Управление долгами поставщиков и клиентов"
        actions={
          <Button variant="primary" onClick={() => setShowDebtModal(true)}>
            <i className="bi bi-plus-circle me-1"></i>
            Новая запись о задолженности
          </Button>
        }
      />

      <Container fluid className="py-4">
        {/* Statistics */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-danger border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Долги поставщикам</p>
                    <h4 className="mb-0 text-danger">{formatCurrency(totalSupplierDebt)}</h4>
                    <small className="text-muted">{supplierDebts.length} записей</small>
                  </div>
                  <i className="bi bi-arrow-down-circle text-danger fs-3"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-success border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Долги клиентов</p>
                    <h4 className="mb-0 text-success">{formatCurrency(totalClientDebt)}</h4>
                    <small className="text-muted">{clientDebts.length} записей</small>
                  </div>
                  <i className="bi bi-arrow-up-circle text-success fs-3"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-warning border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Просроченные долги</p>
                    <h4 className="mb-0 text-warning">{overdueDebts.length}</h4>
                    <small className="text-muted">Требуют внимания</small>
                  </div>
                  <i className="bi bi-exclamation-triangle text-warning fs-3"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-primary border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Чистая позиция</p>
                    <h4 className={`mb-0 ${totalClientDebt - totalSupplierDebt >= 0 ? 'text-success' : 'text-danger'}`}>
                      {formatCurrency(totalClientDebt - totalSupplierDebt)}
                    </h4>
                    <small className="text-muted">Клиенты - Поставщики</small>
                  </div>
                  <i className="bi bi-bar-chart text-primary fs-3"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Debts Table */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white">
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0">Все задолженности</h5>
              </Col>
              <Col xs="auto">
                <InputGroup size="sm">
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Поиск задолженностей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k as any)}
              className="px-3 pt-2"
            >
              <Tab eventKey="all" title="Все задолженности">
                <Table hover responsive className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Тип</th>
                      <th>Контрагент</th>
                      <th>Описание</th>
                      <th>Общая сумма</th>
                      <th>Оплачено</th>
                      <th>Остаток</th>
                      <th>Срок оплаты</th>
                      <th>Статус</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDebts.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-4 text-muted">
                          Задолженности не найдены
                        </td>
                      </tr>
                    ) : (
                      filteredDebts.map((debt) => (
                        <tr key={debt.id}>
                          <td>
                            <Badge bg={debt.type === 'SUPPLIER' ? 'danger' : 'success'}>
                              {debt.type === 'SUPPLIER' ? 'Поставщик' : 'Клиент'}
                            </Badge>
                          </td>
                          <td>
                            <strong>{debt.counterparty}</strong>
                          </td>
                          <td>{debt.description}</td>
                          <td>{formatCurrency(debt.amount)}</td>
                          <td>{formatCurrency(debt.paidAmount)}</td>
                          <td>
                            <strong>{formatCurrency(debt.remainingAmount)}</strong>
                          </td>
                          <td>{formatDate(debt.dueDate)}</td>
                          <td>
                            <Badge bg={getStatusVariant(debt.status)}>
                              {debt.status}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handlePayDebt(debt)}
                            >
                              <i className="bi bi-cash"></i> Оплатить
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="supplier" title={`Поставщики (${supplierDebts.length})`}>
                <Table hover responsive className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Контрагент</th>
                      <th>Описание</th>
                      <th>Общая сумма</th>
                      <th>Остаток</th>
                      <th>Срок оплаты</th>
                      <th>Статус</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDebts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          Долги поставщикам не найдены
                        </td>
                      </tr>
                    ) : (
                      filteredDebts.map((debt) => (
                        <tr key={debt.id}>
                          <td><strong>{debt.counterparty}</strong></td>
                          <td>{debt.description}</td>
                          <td>{formatCurrency(debt.amount)}</td>
                          <td><strong>{formatCurrency(debt.remainingAmount)}</strong></td>
                          <td>{formatDate(debt.dueDate)}</td>
                          <td>
                            <Badge bg={getStatusVariant(debt.status)}>
                              {debt.status}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handlePayDebt(debt)}
                            >
                              <i className="bi bi-cash"></i> Оплатить
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="client" title={`Клиенты (${clientDebts.length})`}>
                <Table hover responsive className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Контрагент</th>
                      <th>Описание</th>
                      <th>Общая сумма</th>
                      <th>Остаток</th>
                      <th>Срок оплаты</th>
                      <th>Статус</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDebts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          Долги клиентов не найдены
                        </td>
                      </tr>
                    ) : (
                      filteredDebts.map((debt) => (
                        <tr key={debt.id}>
                          <td><strong>{debt.counterparty}</strong></td>
                          <td>{debt.description}</td>
                          <td>{formatCurrency(debt.amount)}</td>
                          <td><strong>{formatCurrency(debt.remainingAmount)}</strong></td>
                          <td>{formatDate(debt.dueDate)}</td>
                          <td>
                            <Badge bg={getStatusVariant(debt.status)}>
                              {debt.status}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handlePayDebt(debt)}
                            >
                              <i className="bi bi-check-circle"></i> Получить
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>

      {/* Modals */}
      <AddDebtModal
        show={showDebtModal}
        onHide={() => setShowDebtModal(false)}
        onSuccess={loadDebts}
      />

      <RecordPaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        onSuccess={loadDebts}
        debt={selectedDebt}
      />
    </>
  )
}

export default DebtsPage
