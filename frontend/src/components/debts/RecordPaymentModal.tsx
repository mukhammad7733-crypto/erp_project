import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { paymentSchema } from '../../utils/validators'
import { toast } from 'react-toastify'
import { Debt } from '../../types'
import { formatCurrency } from '../../utils/formatters'

interface RecordPaymentModalProps {
  show: boolean
  onHide: () => void
  onSuccess: () => void
  debt: Debt | null
}

interface PaymentFormData {
  amount: number
  paymentDate: string
  paymentMethod: string
  notes?: string
}

const RecordPaymentModal = ({ show, onHide, onSuccess, debt }: RecordPaymentModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'CASH',
    },
  })

  const onSubmit = async (data: PaymentFormData) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Платеж успешно зарегистрирован!')
      reset()
      onSuccess()
      onHide()
    } catch (error) {
      toast.error('Ошибка при регистрации платежа')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    reset()
    onHide()
  }

  const handlePayFull = () => {
    if (debt) {
      setValue('amount', debt.remainingAmount)
    }
  }

  if (!debt) return null

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Регистрация платежа</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {/* Debt Info */}
          <div className="mb-3 p-3 bg-light rounded">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Контрагент:</span>
              <strong>{debt.counterparty}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Общая сумма:</span>
              <strong>{formatCurrency(debt.amount)}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Оплачено:</span>
              <span>{formatCurrency(debt.paidAmount)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Остаток:</span>
              <strong className="text-danger">{formatCurrency(debt.remainingAmount)}</strong>
            </div>
          </div>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Сумма платежа *</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="number"
                    step="0.01"
                    {...register('amount')}
                    isInvalid={!!errors.amount}
                    placeholder="0.00"
                  />
                  <Button variant="outline-secondary" onClick={handlePayFull}>
                    Полная оплата
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.amount?.message}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Дата платежа *</Form.Label>
                <Form.Control
                  type="date"
                  {...register('paymentDate')}
                  isInvalid={!!errors.paymentDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.paymentDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Способ оплаты *</Form.Label>
                <Form.Select {...register('paymentMethod')} isInvalid={!!errors.paymentMethod}>
                  <option value="CASH">Наличные</option>
                  <option value="BANK_TRANSFER">Банковский перевод</option>
                  <option value="CARD">Карта</option>
                  <option value="CHECK">Чек</option>
                  <option value="OTHER">Другое</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.paymentMethod?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Примечания</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register('notes')}
                  placeholder="Дополнительная информация о платеже"
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
                Регистрация...
              </>
            ) : (
              'Зарегистрировать платеж'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RecordPaymentModal
