import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { profitService } from '../../services/profitService'
import { ProfitSummary, ProfitTrendData, ProfitByCategory } from '../../types'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import PageHeader from '../../components/common/PageHeader'

const ProfitAnalyticsPage = () => {
  const [summary, setSummary] = useState<ProfitSummary | null>(null)
  const [trendData, setTrendData] = useState<ProfitTrendData[]>([])
  const [categoryData, setCategoryData] = useState<ProfitByCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    loadData()
  }, [selectedYear])

  const loadData = async () => {
    try {
      setLoading(true)
      const [summaryData, trendsData, categoryData] = await Promise.all([
        profitService.getSummary(),
        profitService.getMonthlyData(selectedYear),
        profitService.getByCategory(),
      ])
      setSummary(summaryData)
      setTrendData(trendsData)
      setCategoryData(categoryData)
    } catch (error) {
      console.error('Failed to load profit data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  return (
    <>
      <PageHeader
        title="Прибыль"
        subtitle="Анализ прибыльности вашего бизнеса"
        actions={
          <Form.Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            style={{ width: '150px' }}
          >
            {[2025, 2024, 2023, 2022, 2021].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        }
      />

      <Container fluid className="py-4">
        {/* Summary Cards */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-success border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Общий доход</p>
                    <h4 className="mb-0 text-success">{formatCurrency(summary?.totalRevenue || 0)}</h4>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="bi bi-arrow-up-circle text-success fs-4"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-danger border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Общие расходы</p>
                    <h4 className="mb-0 text-danger">{formatCurrency(summary?.totalExpenses || 0)}</h4>
                  </div>
                  <div className="bg-danger bg-opacity-10 p-3 rounded">
                    <i className="bi bi-arrow-down-circle text-danger fs-4"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-primary border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Чистая прибыль</p>
                    <h4 className="mb-0 text-primary">{formatCurrency(summary?.netProfit || 0)}</h4>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <i className="bi bi-graph-up text-primary fs-4"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm border-start border-info border-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Рентабельность</p>
                    <h4 className="mb-0 text-info">{formatPercentage(summary?.profitMargin || 0)}</h4>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <i className="bi bi-percent text-info fs-4"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row className="g-4">
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Динамика прибыли по месяцам</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#198754"
                      strokeWidth={2}
                      name="Доход"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#dc3545"
                      strokeWidth={2}
                      name="Расходы"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#0d6efd"
                      strokeWidth={3}
                      name="Прибыль"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Сравнение доходов и расходов</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#198754" name="Доход" />
                    <Bar dataKey="expenses" fill="#dc3545" name="Расходы" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Прибыль по категориям</h5>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.category}: ${formatPercentage(entry.percentage)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {categoryData.map((category, index) => (
                    <div key={category.category} className="d-flex justify-content-between mb-2">
                      <div>
                        <span
                          className="d-inline-block me-2"
                          style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></span>
                        <span>{category.category}</span>
                      </div>
                      <strong>{formatCurrency(category.amount)}</strong>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProfitAnalyticsPage
