import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { clientSchema } from '../../utils/validators'
import { toast } from 'react-toastify'

interface AddClientModalProps {
  show: boolean
  onHide: () => void
  onSuccess: (data: ClientFormData) => void
}

interface ClientFormData {
  name: string
  contactPerson: string
  phone: string
  address: string
}

const AddClientModal = ({ show, onHide, onSuccess }: AddClientModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormData>({
    resolver: yupResolver(clientSchema),
  })

  const onSubmit = async (data: ClientFormData) => {
    setLoading(true)
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      onSuccess(data)
      reset()
      onHide()
    } catch (error) {
      toast.error('Ошибка при добавлении клиента')
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
          Новый клиент
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Название компании *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('name')}
                  isInvalid={!!errors.name}
                  placeholder='ООО "СтройКомпания"'
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Контактное лицо *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('contactPerson')}
                  isInvalid={!!errors.contactPerson}
                  placeholder="Иван Иванов"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactPerson?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
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

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Адрес *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register('address')}
                  isInvalid={!!errors.address}
                  placeholder="г. Ташкент, ул. Примерная, д. 1"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address?.message}
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
                Добавить клиента
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddClientModal
