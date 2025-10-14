import { useState } from 'react'
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap'
import { mockTeamMembers, mockDepartments } from '../../services/mockData'
import { TeamMember, Department } from '../../types'
import { formatCurrency, formatDate } from '../../utils/formatters'
import AddTeamMemberModal from '../../components/team/AddTeamMemberModal'

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // Filter team members
  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' ||
      (selectedStatus === 'active' && member.isActive) ||
      (selectedStatus === 'inactive' && !member.isActive)

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Calculate statistics
  const activeMembers = mockTeamMembers.filter(m => m.isActive).length
  const totalSalary = mockTeamMembers
    .filter(m => m.isActive)
    .reduce((sum, m) => sum + m.salary, 0)
  const avgSalary = totalSalary / activeMembers

  const getRoleBadge = (role: string) => {
    const roleColors: Record<string, string> = {
      ADMIN: 'danger',
      MANAGER: 'primary',
      ACCOUNTANT: 'success',
      VIEWER: 'secondary'
    }
    return roleColors[role] || 'secondary'
  }

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      ADMIN: 'Администратор',
      MANAGER: 'Менеджер',
      ACCOUNTANT: 'Бухгалтер',
      VIEWER: 'Наблюдатель'
    }
    return roleLabels[role] || role
  }

  const handleAddMember = () => {
    setShowAddModal(true)
  }

  const handleAddSuccess = () => {
    // В реальном приложении здесь будет перезагрузка списка сотрудников
    console.log('Сотрудник добавлен, список обновлен')
  }

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-people-fill me-2"></i>
            Команда
          </h2>
          <p className="text-muted mb-0">Управление сотрудниками и отделами</p>
        </div>
        <Button variant="primary" onClick={handleAddMember}>
          <i className="bi bi-plus-circle me-2"></i>
          Добавить сотрудника
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
                    <i className="bi bi-people text-primary fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Активные сотрудники</div>
                  <div className="h4 mb-0">{activeMembers}</div>
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
                    <i className="bi bi-building text-success fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Отделов</div>
                  <div className="h4 mb-0">{mockDepartments.length}</div>
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
                    <i className="bi bi-cash-stack text-warning fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Общий ФОТ</div>
                  <div className="h5 mb-0">{formatCurrency(totalSalary)}</div>
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
                  <div className="bg-info bg-opacity-10 rounded p-3">
                    <i className="bi bi-graph-up text-info fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted small">Средняя ЗП</div>
                  <div className="h5 mb-0">{formatCurrency(avgSalary)}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Departments Overview */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">
                <i className="bi bi-building me-2"></i>
                Отделы
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {mockDepartments.map(dept => (
                  <Col md={4} key={dept.id} className="mb-3">
                    <Card className="border h-100">
                      <Card.Body>
                        <h6 className="fw-bold mb-2">{dept.name}</h6>
                        <p className="text-muted small mb-2">{dept.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="small">
                            <i className="bi bi-people me-1"></i>
                            {dept.memberCount} сотрудников
                          </span>
                          {dept.headId && (
                            <Badge bg="primary" className="small">
                              Руководитель назначен
                            </Badge>
                          )}
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

      {/* Team Members Table */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <Row className="align-items-center">
            <Col md={4}>
              <h5 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Список сотрудников
              </h5>
            </Col>
            <Col md={8}>
              <Row className="g-2">
                <Col md={5}>
                  <InputGroup size="sm">
                    <InputGroup.Text>
                      <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Поиск по имени, должности, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Form.Select
                    size="sm"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">Все отделы</option>
                    {mockDepartments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Select
                    size="sm"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Все статусы</option>
                    <option value="active">Активные</option>
                    <option value="inactive">Неактивные</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <Table striped hover responsive className="mb-0">
              <thead className="table-light sticky-top">
                <tr>
                  <th style={{ width: '5%' }}>ID</th>
                  <th style={{ width: '20%' }}>ФИО</th>
                  <th style={{ width: '15%' }}>Должность</th>
                  <th style={{ width: '12%' }}>Отдел</th>
                  <th style={{ width: '15%' }}>Email</th>
                  <th style={{ width: '10%' }}>Роль</th>
                  <th style={{ width: '10%' }} className="text-end">Зарплата</th>
                  <th style={{ width: '8%' }}>Статус</th>
                  <th style={{ width: '5%' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                             style={{ width: '32px', height: '32px' }}>
                          <i className="bi bi-person text-primary"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">{member.firstName} {member.lastName}</div>
                          <small className="text-muted">{member.phone}</small>
                        </div>
                      </div>
                    </td>
                    <td>{member.position}</td>
                    <td>
                      <Badge bg="light" text="dark" className="fw-normal">
                        {member.department}
                      </Badge>
                    </td>
                    <td className="small">{member.email}</td>
                    <td>
                      <Badge bg={getRoleBadge(member.role)}>
                        {getRoleLabel(member.role)}
                      </Badge>
                    </td>
                    <td className="text-end">{formatCurrency(member.salary)}</td>
                    <td>
                      <Badge bg={member.isActive ? 'success' : 'secondary'}>
                        {member.isActive ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="link" size="sm" className="text-muted p-0">
                        <i className="bi bi-three-dots-vertical"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="bg-white border-top">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted small">
              Показано {filteredMembers.length} из {mockTeamMembers.length} сотрудников
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

      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
    </Container>
  )
}

export default TeamPage
