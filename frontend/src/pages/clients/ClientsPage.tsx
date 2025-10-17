import { useState } from 'react'
import { Container, Row, Col, Card, Badge, Table, Button, Form, InputGroup } from 'react-bootstrap'
import { mockClients, generateReconciliationAct } from '../../services/mockData'
import { Client, ReconciliationAct } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'
import AddClientModal from '../../components/clients/AddClientModal'
import ClientDetailsModal from '../../components/clients/ClientDetailsModal'
import { toast } from 'react-toastify'

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [reconciliationAct, setReconciliationAct] = useState<ReconciliationAct | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [clientForDetails, setClientForDetails] = useState<Client | null>(null)
  const [isTableExpanded, setIsTableExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client)
    // Generate reconciliation act for the selected client
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    const endDate = new Date().toISOString()
    const act = generateReconciliationAct(client.id, startDate, endDate)
    setReconciliationAct(act)
  }

  const handleAddClient = () => {
    setShowAddModal(true)
  }

  const handleAddSuccess = (newClientData: { name: string; contactPerson: string; phone: string; address: string }) => {
    const newClient: Client = {
      id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
      name: newClientData.name,
      inn: '', // Оставляем пустым, так как мы убрали это поле из формы
      contactPerson: newClientData.contactPerson,
      phone: newClientData.phone,
      email: '', // Оставляем пустым, так как мы убрали это поле из формы
      address: newClientData.address,
      isActive: true,
      totalRevenue: 0,
      totalDebt: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setClients([...clients, newClient])
    toast.success('Клиент успешно добавлен!')
  }

  const handleViewDetails = (client: Client, e: React.MouseEvent) => {
    e.stopPropagation()
    setClientForDetails(client)
    setShowDetailsModal(true)
  }

  const handlePrint = () => {
    if (!reconciliationAct) {
      toast.warning('Выберите клиента для печати акта сверки')
      return
    }
    toast.info('Функция печати будет реализована')
    window.print()
  }

  const handleExport = () => {
    if (!reconciliationAct) {
      toast.warning('Выберите клиента для экспорта')
      return
    }
    toast.info('Экспорт в Excel будет реализован')
  }

  // Фильтрация клиентов по поисковому запросу
  const filteredClients = clients.filter(client =>
    client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-people me-2"></i>
            Клиенты
          </h2>
          <p className="text-muted mb-0">Управление клиентами и акты сверки</p>
        </div>
        <Button variant="primary" onClick={handleAddClient}>
          <i className="bi bi-plus-circle me-2"></i>
          Добавить клиента
        </Button>
      </div>

      <Row>
        {/* Left Column - Client List */}
        <Col lg={4} xl={3} className="mb-4">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-2">
                <i className="bi bi-list-ul me-2"></i>
                Список клиентов
              </h5>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Поиск по имени контактного лица..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white"
                />
                {searchQuery && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSearchQuery('')}
                    title="Очистить"
                  >
                    <i className="bi bi-x"></i>
                  </Button>
                )}
              </InputGroup>
            </Card.Header>
            <Card.Body className="p-0" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
              {filteredClients.length === 0 ? (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-search" style={{ fontSize: '2rem' }}></i>
                  <p className="mb-0 mt-2">Клиенты не найдены</p>
                </div>
              ) : (
                filteredClients.map((client) => (
                <div
                  key={client.id}
                  className={`p-3 border-bottom cursor-pointer ${
                    selectedClient?.id === client.id ? 'bg-primary bg-opacity-10 border-start border-primary border-3' : ''
                  }`}
                  onClick={() => handleClientSelect(client)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => {
                    if (selectedClient?.id !== client.id) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedClient?.id !== client.id) {
                      e.currentTarget.style.backgroundColor = ''
                    }
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">{client.contactPerson}</h6>
                    <Badge bg={client.isActive ? 'success' : 'secondary'}>
                      {client.isActive ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                </div>
              ))
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Reconciliation Act */}
        <Col lg={8} xl={9}>
          {selectedClient && reconciliationAct ? (
            <Card>
              <Card.Header className="bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">
                      <i className="bi bi-file-earmark-text me-2"></i>
                      Акт сверки взаимных расчетов
                    </h5>
                    <p className="text-muted mb-0 small">
                      Период: {reconciliationAct.period}
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={handleExport}>
                      <i className="bi bi-file-earmark-excel me-1"></i>
                      Экспорт
                    </Button>
                    <Button variant="primary" onClick={handlePrint}>
                      <i className="bi bi-printer me-2"></i>
                      Печать
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                {/* Client Information */}
                <div className="mb-4 p-3 bg-light rounded">
                  <Row>
                    <Col md={6}>
                      <h6 className="text-muted mb-2">Клиент:</h6>
                      <p className="mb-1 fw-bold">{reconciliationAct.clientName}</p>
                      <p className="mb-1 small">
                        <i className="bi bi-building me-1"></i>
                        ИНН: {selectedClient.inn}
                      </p>
                      <p className="mb-1 small">
                        <i className="bi bi-geo-alt me-1"></i>
                        {selectedClient.address}
                      </p>
                      <p className="mb-0 small">
                        <i className="bi bi-person me-1"></i>
                        {selectedClient.contactPerson}
                      </p>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-muted mb-2">Период сверки:</h6>
                      <p className="mb-1">
                        <strong>С:</strong> {formatDate(reconciliationAct.startDate)}
                      </p>
                      <p className="mb-1">
                        <strong>По:</strong> {formatDate(reconciliationAct.endDate)}
                      </p>
                      <p className="mb-0 small text-muted">
                        Сформировано: {formatDate(reconciliationAct.generatedAt)}
                      </p>
                    </Col>
                  </Row>
                </div>

                {/* Transactions Table */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Операции:</h6>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setIsTableExpanded(!isTableExpanded)}
                    >
                      <i className={`bi bi-${isTableExpanded ? 'arrows-angle-contract' : 'arrows-angle-expand'} me-1`}></i>
                      {isTableExpanded ? 'Свернуть' : 'Показать все'}
                    </Button>
                  </div>
                  <div style={{ maxHeight: isTableExpanded ? 'none' : '400px', overflowY: isTableExpanded ? 'visible' : 'auto' }}>
                    <Table striped bordered hover responsive>
                      <thead className="table-light sticky-top">
                        <tr>
                          <th style={{ width: '5%' }}>№</th>
                          <th style={{ width: '12%' }}>Дата</th>
                          <th style={{ width: '15%' }}>Документ</th>
                          <th style={{ width: '38%' }}>Описание</th>
                          <th style={{ width: '15%' }} className="text-end">Приход</th>
                          <th style={{ width: '15%' }} className="text-end">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reconciliationAct.transactions.map((transaction, index) => (
                          <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>{formatDate(transaction.date)}</td>
                            <td className="small">{transaction.documentNumber}</td>
                            <td>{transaction.description}</td>
                            <td className="text-end text-success">
                              {transaction.type === 'INCOME' ? formatCurrency(transaction.amount) : '-'}
                            </td>
                            <td className="text-end text-danger">
                              {transaction.type === 'EXPENSE' ? formatCurrency(transaction.amount) : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-3 bg-light rounded">
                  <Row>
                    <Col md={4}>
                      <div className="text-center p-3 bg-white rounded">
                        <div className="small text-muted mb-1">Общий приход</div>
                        <div className="h5 mb-0 text-success">
                          {formatCurrency(reconciliationAct.totalIncome)}
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center p-3 bg-white rounded">
                        <div className="small text-muted mb-1">Общий расход</div>
                        <div className="h5 mb-0 text-danger">
                          {formatCurrency(reconciliationAct.totalExpense)}
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center p-3 bg-white rounded">
                        <div className="small text-muted mb-1">Сальдо</div>
                        <div className={`h5 mb-0 fw-bold ${
                          reconciliationAct.balance > 0 ? 'text-success' :
                          reconciliationAct.balance < 0 ? 'text-danger' :
                          'text-secondary'
                        }`}>
                          {formatCurrency(Math.abs(reconciliationAct.balance))}
                          {reconciliationAct.balance > 0 && ' (в нашу пользу)'}
                          {reconciliationAct.balance < 0 && ' (в пользу клиента)'}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className="text-center" style={{ minHeight: '500px' }}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <i className="bi bi-file-earmark-text text-muted" style={{ fontSize: '5rem' }}></i>
                <h4 className="text-muted mt-3">Выберите клиента</h4>
                <p className="text-muted">
                  Выберите клиента из списка слева для просмотра акта сверки
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Modals */}
      <AddClientModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />

      <ClientDetailsModal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        client={clientForDetails}
      />
    </Container>
  )
}

export default ClientsPage
