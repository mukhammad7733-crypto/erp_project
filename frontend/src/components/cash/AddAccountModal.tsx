import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cashAccountSchema } from '../../utils/validators'
import { toast } from 'react-toastify'

interface AddAccountModalProps {
  show: boolean
  onHide: () => void
  onSuccess: () => void
}

interface AccountFormData {
  name: string
  accountType: 'CASH' | 'BANK'
  currency: string
  balance: number
  branch?: string
}

const AddAccountModal = ({ show, onHide, onSuccess }: AddAccountModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AccountFormData>({
    resolver: yupResolver(cashAccountSchema),
    defaultValues: {
      currency: 'UZS',
      balance: 0,
    },
  })

  const onSubmit = async (data: AccountFormData) => {
    setLoading(true)
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Счет успешно создан!')
      reset()
      onSuccess()
      onHide()
    } catch (error) {
      toast.error('Ошибка при создании счета')
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
        <Modal.Title>Новый денежный счет</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Название счета *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('name')}
                  isInvalid={!!errors.name}
                  placeholder="Основной банковский счет"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Тип счета *</Form.Label>
                <Form.Select {...register('accountType')} isInvalid={!!errors.accountType}>
                  <option value="">Выберите тип</option>
                  <option value="CASH">Наличные</option>
                  <option value="BANK">Банковский счет</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.accountType?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Валюта *</Form.Label>
                <Form.Select {...register('currency')} isInvalid={!!errors.currency}>
                  <option value="UZS">UZS - Узбекский сум</option>
                  <option value="USD">USD - Доллар США</option>
                  <option value="EUR">EUR - Евро</option>
                  <option value="RUB">RUB - Российский рубль</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.currency?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Начальный остаток *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register('balance')}
                  isInvalid={!!errors.balance}
                  placeholder="0.00"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.balance?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Филиал</Form.Label>
                <Form.Control
                  type="text"
                  {...register('branch')}
                  placeholder="Центральный офис"
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
              'Создать счет'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddAccountModal
