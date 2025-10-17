import { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { dashboardService } from '../../services/dashboardService'
import { DashboardSummary, DashboardMetrics } from '../../types'
import { formatCurrency, formatNumber } from '../../utils/formatters'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import PageHeader from '../../components/common/PageHeader'

const DashboardPage = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [summaryData, metricsData] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getMetrics(),
      ])
      setSummary(summaryData)
      setMetrics(metricsData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <PageHeader title="Общая часть" subtitle="Обзор показателей вашего бизнеса в реальном времени" />

      <Container fluid className="py-4">
        {/* Summary Cards */}
        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100 metric-card metric-card-primary">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small mb-2">
                      <i className="bi bi-cash-stack me-1"></i>
                      Остаток денежных средств
                    </div>
                    <h3 className="mb-0 fw-bold">{formatCurrency(summary?.totalCashBalance || 0)}</h3>
                    <small className="text-success">
                      <i className="bi bi-arrow-up"></i> +12.5%
                    </small>
                  </div>
                  <div className="metric-icon bg-primary">
                    <i className="bi bi-wallet2 text-white"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="border-0 shadow-sm h-100 metric-card metric-card-danger">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small mb-2">
                      <i className="bi bi-arrow-down-circle me-1"></i>
                      Задолженность перед поставщиком
                    </div>
                    <h3 className="mb-0 fw-bold">{formatCurrency(summary?.totalSupplierDebts || 0)}</h3>
                    <small className="text-danger">
                      <i className="bi bi-exclamation-triangle"></i> Требует внимания
                    </small>
                  </div>
                  <div className="metric-icon bg-danger">
                    <i className="bi bi-cash-coin text-white"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row className="g-4 mb-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1 fw-bold">Движение денежных средств</h5>
                    <small className="text-muted">Доходы, расходы и остаток по месяцам</small>
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary active">6М</button>
                    <button className="btn btn-outline-primary">1Г</button>
                    <button className="btn btn-outline-primary">Все</button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={metrics?.cashFlow || []}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#198754" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#198754" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc3545" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#dc3545" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" stroke="#6c757d" fontSize={12} />
                    <YAxis stroke="#6c757d" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#198754"
                      strokeWidth={3}
                      fill="url(#colorIncome)"
                      name="Income"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#dc3545"
                      strokeWidth={3}
                      fill="url(#colorExpense)"
                      name="Expense"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#0d6efd"
                      strokeWidth={3}
                      name="Balance"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0 py-3">
                <h5 className="mb-1 fw-bold">Обзор задолженности</h5>
                <small className="text-muted">Статус дебиторской и кредиторской задолженности</small>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <i className="bi bi-arrow-down-circle text-danger me-2"></i>
                      <span className="text-muted small">Долги поставщикам</span>
                    </div>
                    <strong className="text-danger">{formatCurrency(metrics?.debtOverview.totalSupplierDebt || 0)}</strong>
                  </div>
                  <div className="progress" style={{ height: '12px', borderRadius: '6px' }}>
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: '100%' }}
                      role="progressbar"
                    ></div>
                  </div>
                  <small className="text-muted mt-1 d-block">
                    Просрочено: {formatCurrency(metrics?.debtOverview.overdueSupplierDebt || 0)}
                  </small>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <i className="bi bi-arrow-up-circle text-success me-2"></i>
                      <span className="text-muted small">Долги клиентов</span>
                    </div>
                    <strong className="text-success">{formatCurrency(metrics?.debtOverview.totalClientDebt || 0)}</strong>
                  </div>
                  <div className="progress" style={{ height: '12px', borderRadius: '6px' }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: '100%' }}
                      role="progressbar"
                    ></div>
                  </div>
                  <small className="text-muted mt-1 d-block">
                    Просрочено: {formatCurrency(metrics?.debtOverview.overdueClientDebt || 0)}
                  </small>
                </div>

                <div className="p-3 bg-light rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Чистая позиция</span>
                    <strong className={
                      (metrics?.debtOverview.totalClientDebt || 0) - (metrics?.debtOverview.totalSupplierDebt || 0) >= 0
                        ? 'text-success'
                        : 'text-danger'
                    }>
                      {formatCurrency((metrics?.debtOverview.totalClientDebt || 0) - (metrics?.debtOverview.totalSupplierDebt || 0))}
                    </strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1 fw-bold">Динамика прибыли</h5>
                    <small className="text-muted">Сравнение доходов, расходов и прибыли</small>
                  </div>
                  <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                    <option>За 6 месяцев</option>
                    <option>За год</option>
                    <option>За все время</option>
                  </select>
                </div>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={metrics?.profitTrend || []}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#198754" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#198754" stopOpacity={0.6}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc3545" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#dc3545" stopOpacity={0.6}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6c757d" fontSize={12} />
                    <YAxis stroke="#6c757d" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="url(#colorRevenue)" name="Revenue" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="expenses" fill="url(#colorExpenses)" name="Expenses" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="profit" fill="url(#colorProfit)" name="Profit" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DashboardPage
