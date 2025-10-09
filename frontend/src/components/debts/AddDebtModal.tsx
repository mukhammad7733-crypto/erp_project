import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { debtSchema } from '../../utils/validators'
import { toast } from 'react-toastify'

interface AddDebtModalProps {
  show: boolean
  onHide: () => void
  onSuccess: () => void
}

interface DebtFormData {
  type: 'SUPPLIER' | 'CLIENT'
  counterparty: string
  amount: number
  dueDate: string
  description: string
  contractId?: number
}

const AddDebtModal = ({ show, onHide, onSuccess }: AddDebtModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<DebtFormData>({
    resolver: yupResolver(debtSchema),
    defaultValues: {
      type: 'SUPPLIER',
    },
  })

  const debtType = watch('type')

  const onSubmit = async (data: DebtFormData) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Запись о задолженности успешно создана!')
      reset()
      onSuccess()
      onHide()
    } catch (error) {
      toast.error('Ошибка при создании записи о задолженности')
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
        <Modal.Title>Новая запись о задолженности</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Тип задолженности *</Form.Label>
                <Form.Select {...register('type')} isInvalid={!!errors.type}>
                  <option value="SUPPLIER">Долг поставщику</option>
                  <option value="CLIENT">Долг клиента</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {debtType === 'SUPPLIER' ? 'Поставщик' : 'Клиент'} *
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register('counterparty')}
                  isInvalid={!!errors.counterparty}
                  placeholder={debtType === 'SUPPLIER' ? 'ООО Поставщик' : 'ООО Клиент'}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.counterparty?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Сумма *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register('amount')}
                  isInvalid={!!errors.amount}
                  placeholder="0.00"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Срок оплаты *</Form.Label>
                <Form.Control
                  type="date"
                  {...register('dueDate')}
                  isInvalid={!!errors.dueDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dueDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Описание *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('description')}
                  isInvalid={!!errors.description}
                  placeholder="Детальное описание задолженности"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ID договора (необязательно)</Form.Label>
                <Form.Control
                  type="number"
                  {...register('contractId')}
                  placeholder="Связанный договор"
                />
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
                Создание...
              </>
            ) : (
              'Создать запись'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddDebtModal
