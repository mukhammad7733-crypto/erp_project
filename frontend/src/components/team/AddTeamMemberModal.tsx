import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { teamMemberSchema } from '../../utils/validators'
import { mockDepartments } from '../../services/mockData'
import { toast } from 'react-toastify'

interface AddTeamMemberModalProps {
  show: boolean
  onHide: () => void
  onSuccess: () => void
}

interface TeamMemberFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  department: string
  role: string
  salary: number
  hireDate: string
}

const AddTeamMemberModal = ({ show, onHide, onSuccess }: AddTeamMemberModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeamMemberFormData>({
    resolver: yupResolver(teamMemberSchema),
  })

  const onSubmit = async (data: TeamMemberFormData) => {
    setLoading(true)
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Новый сотрудник:', data)
      toast.success('Сотрудник успешно добавлен!')
      reset()
      onSuccess()
      onHide()
    } catch (error) {
      toast.error('Ошибка при добавлении сотрудника')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    reset()
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-plus me-2"></i>
          Новый сотрудник
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Имя *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('firstName')}
                  isInvalid={!!errors.firstName}
                  placeholder="Иван"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Фамилия *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('lastName')}
                  isInvalid={!!errors.lastName}
                  placeholder="Иванов"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  {...register('email')}
                  isInvalid={!!errors.email}
                  placeholder="ivanov@company.uz"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Телефон *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('phone')}
                  isInvalid={!!errors.phone}
                  placeholder="+998 90 123 45 67"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Должность *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('position')}
                  isInvalid={!!errors.position}
                  placeholder="Менеджер по продажам"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.position?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Отдел *</Form.Label>
                <Form.Select
                  {...register('department')}
                  isInvalid={!!errors.department}
                >
                  <option value="">Выберите отдел</option>
                  {mockDepartments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.department?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Роль *</Form.Label>
                <Form.Select
                  {...register('role')}
                  isInvalid={!!errors.role}
                >
                  <option value="">Выберите роль</option>
                  <option value="ADMIN">Администратор</option>
                  <option value="MANAGER">Менеджер</option>
                  <option value="ACCOUNTANT">Бухгалтер</option>
                  <option value="VIEWER">Наблюдатель</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.role?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Зарплата *</Form.Label>
                <Form.Control
                  type="number"
                  {...register('salary')}
                  isInvalid={!!errors.salary}
                  placeholder="5000000"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.salary?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Дата приема *</Form.Label>
                <Form.Control
                  type="date"
                  {...register('hireDate')}
                  isInvalid={!!errors.hireDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.hireDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Отмена
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Добавление...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Добавить сотрудника
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddTeamMemberModal
