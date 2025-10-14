import { useState } from 'react'
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Tabs, Tab } from 'react-bootstrap'
import { mockWarehouseItems, mockStockMovements, mockWarehouseStats } from '../../services/mockData'
import { WarehouseItem } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'
import AddWarehouseItemModal from '../../components/warehouse/AddWarehouseItemModal'

const WarehousePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // Get unique categories
  const categories = Array.from(new Set(mockWarehouseItems.map(item => item.category)))

  // Filter items
  const filteredItems = mockWarehouseItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory

    let matchesStatus = true
    if (selectedStatus === 'in_stock') {
      matchesStatus = item.quantity > item.minStock
    } else if (selectedStatus === 'low_stock') {
      matchesStatus = item.quantity > 0 && item.quantity <= item.minStock
    } else if (selectedStatus === 'out_of_stock') {
      matchesStatus = item.quantity === 0
    }

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStockBadge = (item: WarehouseItem) => {
    if (item.quantity === 0) {
      return <Badge bg="danger">Нет в наличии</Badge>
    } else if (item.quantity <= item.minStock) {
      return <Badge bg="warning">Мало</Badge>
    } else {
      return <Badge bg="success">В наличии</Badge>
    }
  }

  const getMovementTypeBadge = (type: string) => {
    const types: Record<string, { label: string; color: string }> = {
      IN: { label: 'Приход', color: 'success' },
      OUT: { label: 'Расход', color: 'danger' },
      ADJUSTMENT: { label: 'Корректировка', color: 'warning' }
    }
    const typeInfo = types[type] || { label: type, color: 'secondary' }
    return <Badge bg={typeInfo.color}>{typeInfo.label}</Badge>
  }

  const handleAddItem = () => {
    setShowAddModal(true)
  }

  const handleAddSuccess = () => {
    // В реальном приложении здесь будет перезагрузка списка товаров
    console.log('Товар добавлен, список обновлен')
  }

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-box-seam me-2"></i>
            Склад
          </h2>
          <p className="text-muted mb-0">Управление товарами и запасами</p>
        </div>
        <Button variant="primary" onClick={handleAddItem}>
          <i className="bi bi-plus-circle me-2"></i>
          Добавить товар
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary bg-opacity-10 rounded p-3">
                    <i className="bi bi-boxes text-primary fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Всего товаров</div>
                  <div className="h4 mb-0">{mockWarehouseStats.totalItems}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <i className="bi bi-cash-stack text-success fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Общая стоимость</div>
                  <div className="h5 mb-0">{formatCurrency(mockWarehouseStats.totalValue)}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-warning bg-opacity-10 rounded p-3">
                    <i className="bi bi-exclamation-triangle text-warning fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Мало товаров</div>
                  <div className="h4 mb-0">{mockWarehouseStats.lowStockItems}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-danger bg-opacity-10 rounded p-3">
                    <i className="bi bi-x-circle text-danger fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Нет в наличии</div>
                  <div className="h4 mb-0">{mockWarehouseStats.outOfStockItems}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Categories Overview */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">
                <i className="bi bi-grid me-2"></i>
                Категории товаров
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {mockWarehouseStats.categories.map((cat, index) => (
                  <Col md={4} key={index} className="mb-3">
                    <Card className="border h-100">
                      <Card.Body>
                        <h6 className="fw-bold mb-2">{cat.category}</h6>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="small text-muted">Товаров:</span>
                          <span className="fw-semibold">{cat.itemCount}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="small text-muted">Стоимость:</span>
                          <span className="fw-semibold text-success">
                            {formatCurrency(cat.totalValue)}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content with Tabs */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <Tabs defaultActiveKey="items" className="border-0">
            <Tab eventKey="items" title={
              <span>
                <i className="bi bi-box me-2"></i>
                Товары
              </span>
            }>
            </Tab>
            <Tab eventKey="movements" title={
              <span>
                <i className="bi bi-arrow-left-right me-2"></i>
                Движение товаров
              </span>
            }>
            </Tab>
          </Tabs>
        </Card.Header>
        <Card.Body className="p-0">
          <Tabs defaultActiveKey="items" className="d-none">
            <Tab eventKey="items">
              {/* Items Table */}
              <div className="p-3 bg-light border-bottom">
                <Row className="g-2">
                  <Col md={5}>
                    <InputGroup size="sm">
                      <InputGroup.Text>
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Поиск по названию, артикулу, поставщику..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      size="sm"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">Все категории</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      size="sm"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="all">Все статусы</option>
                      <option value="in_stock">В наличии</option>
                      <option value="low_stock">Мало на складе</option>
                      <option value="out_of_stock">Нет в наличии</option>
                    </Form.Select>
                  </Col>
                </Row>
              </div>
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Table striped hover responsive className="mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th style={{ width: '5%' }}>ID</th>
                      <th style={{ width: '20%' }}>Товар</th>
                      <th style={{ width: '10%' }}>Артикул</th>
                      <th style={{ width: '10%' }}>Категория</th>
                      <th style={{ width: '8%' }} className="text-center">Остаток</th>
                      <th style={{ width: '12%' }} className="text-end">Закупка</th>
                      <th style={{ width: '12%' }} className="text-end">Продажа</th>
                      <th style={{ width: '15%' }}>Поставщик</th>
                      <th style={{ width: '8%' }}>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <div className="fw-semibold">{item.name}</div>
                          <small className="text-muted">{item.location}</small>
                        </td>
                        <td className="small">{item.sku}</td>
                        <td>
                          <Badge bg="light" text="dark" className="fw-normal">
                            {item.category}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <span className={item.quantity <= item.minStock ? 'text-danger fw-bold' : ''}>
                            {item.quantity} {item.unit}
                          </span>
                          <div className="small text-muted">
                            мин: {item.minStock}
                          </div>
                        </td>
                        <td className="text-end">{formatCurrency(item.purchasePrice)}</td>
                        <td className="text-end">{formatCurrency(item.salePrice)}</td>
                        <td className="small">{item.supplier}</td>
                        <td>{getStockBadge(item)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="movements">
              {/* Movements Table */}
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <Table striped hover responsive className="mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th style={{ width: '5%' }}>ID</th>
                      <th style={{ width: '12%' }}>Дата</th>
                      <th style={{ width: '25%' }}>Товар</th>
                      <th style={{ width: '10%' }}>Тип</th>
                      <th style={{ width: '8%' }} className="text-center">Количество</th>
                      <th style={{ width: '15%' }}>Причина</th>
                      <th style={{ width: '15%' }}>Исполнитель</th>
                      <th style={{ width: '10%' }}>Примечание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStockMovements.map(movement => (
                      <tr key={movement.id}>
                        <td>{movement.id}</td>
                        <td>{formatDate(movement.date)}</td>
                        <td>{movement.itemName}</td>
                        <td>{getMovementTypeBadge(movement.type)}</td>
                        <td className="text-center">
                          <span className={movement.type === 'IN' ? 'text-success' : 'text-danger'}>
                            {movement.type === 'IN' ? '+' : '-'}{Math.abs(movement.quantity)}
                          </span>
                        </td>
                        <td>{movement.reason}</td>
                        <td>{movement.performedBy}</td>
                        <td className="small text-muted">{movement.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
        <Card.Footer className="bg-white border-top">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted small">
              Показано {filteredItems.length} из {mockWarehouseItems.length} товаров
            </span>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" size="sm">
                <i className="bi bi-download me-1"></i>
                Экспорт
              </Button>
              <Button variant="outline-primary" size="sm">
                <i className="bi bi-printer me-1"></i>
                Печать
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>

      {/* Add Warehouse Item Modal */}
      <AddWarehouseItemModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
    </Container>
  )
}

export default WarehousePage
