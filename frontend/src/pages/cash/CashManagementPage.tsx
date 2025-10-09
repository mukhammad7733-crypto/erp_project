import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap'
import { cashService } from '../../services/cashService'
import { CashAccount, Transaction } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import PageHeader from '../../components/common/PageHeader'
import AddAccountModal from '../../components/cash/AddAccountModal'
import AddTransactionModal from '../../components/cash/AddTransactionModal'

const CashManagementPage = () => {
  const [accounts, setAccounts] = useState<CashAccount[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [accountsData, transactionsData] = await Promise.all([
        cashService.getAccounts(),
        cashService.getTransactions({ page: 0, size: 20 }),
      ])
      setAccounts(accountsData)
      setTransactions(transactionsData.content)
    } catch (error) {
      console.error('Failed to load cash data:', error)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return <LoadingSpinner />
  }

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <>
      <PageHeader
        title="Касса"
        subtitle="Управление денежными счетами и транзакциями"
        actions={
          <>
            <Button variant="outline-primary" className="me-2" onClick={() => setShowAccountModal(true)}>
              <i className="bi bi-plus-circle me-1"></i>
              Новый счет
            </Button>
            <Button variant="primary" onClick={() => setShowTransactionModal(true)}>
              <i className="bi bi-plus-circle me-1"></i>
              Новая транзакция
            </Button>
          </>
        }
      />

      <Container fluid className="py-4">
        {/* Account Summary */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="text-center">
                  <i className="bi bi-cash-stack text-primary" style={{ fontSize: '3rem' }}></i>
                  <h3 className="mt-3">{formatCurrency(totalBalance)}</h3>
                  <p className="text-muted mb-0">Общий остаток</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Денежные счета</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {accounts.map((account) => (
                    <Col md={6} key={account.id} className="mb-3">
                      <div className="p-3 border rounded">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <strong>{account.name}</strong>
                            <br />
                            <Badge bg="secondary" className="mt-1">
                              {account.accountType}
                            </Badge>
                          </div>
                          <h5 className="mb-0">{formatCurrency(account.balance)}</h5>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Transactions Table */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white">
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0">Последние транзакции</h5>
              </Col>
              <Col xs="auto">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Поиск транзакций..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Дата</th>
                  <th>Счет</th>
                  <th>Тип</th>
                  <th>Категория</th>
                  <th>Описание</th>
                  <th>Клиент</th>
                  <th className="text-end">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted">
                      Транзакции не найдены
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{formatDate(transaction.date)}</td>
                      <td>{transaction.accountName}</td>
                      <td>
                        <Badge bg={getTypeVariant(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </td>
                      <td>{transaction.category}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.client || '-'}</td>
                      <td className="text-end">
                        <strong
                          className={
                            transaction.type === 'INCOME' ? 'text-success' : 'text-danger'
                          }
                        >
                          {transaction.type === 'INCOME' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </strong>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Modals */}
      <AddAccountModal
        show={showAccountModal}
        onHide={() => setShowAccountModal(false)}
        onSuccess={loadData}
      />

      <AddTransactionModal
        show={showTransactionModal}
        onHide={() => setShowTransactionModal(false)}
        onSuccess={loadData}
        accounts={accounts}
      />
    </>
  )
}

export default CashManagementPage
