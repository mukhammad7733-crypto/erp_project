import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { contractSchema } from '../../utils/validators'
import { toast } from 'react-toastify'

interface AddContractModalProps {
  show: boolean
  onHide: () => void
  onSuccess: () => void
}

interface ContractFormData {
  contractNumber: string
  title: string
  client: string
  type: 'SERVICE' | 'PRODUCT' | 'MIXED'
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  amount: number
  startDate: string
  endDate: string
  paymentTerms: string
  description?: string
}

const AddContractModal = ({ show, onHide, onSuccess }: AddContractModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContractFormData>({
    resolver: yupResolver(contractSchema),
    defaultValues: {
      startDate: new Date().toISOString().split('T')[0],
      status: 'DRAFT',
    },
  })

  const onSubmit = async (data: ContractFormData) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Договор успешно создан!')
      reset()
      onSuccess()
      onHide()
    } catch (error) {
      toast.error('Ошибка при создании договора')
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
        <Modal.Title>Новый договор</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Номер договора *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('contractNumber')}
                  isInvalid={!!errors.contractNumber}
                  placeholder="КОН-2025-001"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contractNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Статус *</Form.Label>
                <Form.Select {...register('status')} isInvalid={!!errors.status}>
                  <option value="DRAFT">Черновик</option>
                  <option value="ACTIVE">Активный</option>
                  <option value="COMPLETED">Завершен</option>
                  <option value="CANCELLED">Отменен</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Название договора *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('title')}
                  isInvalid={!!errors.title}
                  placeholder="Договор на поставку товаров"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Клиент *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('client')}
                  isInvalid={!!errors.client}
                  placeholder="ООО Компания"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.client?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Тип договора *</Form.Label>
                <Form.Select {...register('type')} isInvalid={!!errors.type}>
                  <option value="">Выберите тип</option>
                  <option value="SERVICE">Услуги</option>
                  <option value="PRODUCT">Товары</option>
                  <option value="MIXED">Смешанный</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Сумма договора *</Form.Label>
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
                <Form.Label>Условия оплаты *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('paymentTerms')}
                  isInvalid={!!errors.paymentTerms}
                  placeholder="100% предоплата"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.paymentTerms?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Дата начала *</Form.Label>
                <Form.Control
                  type="date"
                  {...register('startDate')}
                  isInvalid={!!errors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Дата окончания *</Form.Label>
                <Form.Control
                  type="date"
                  {...register('endDate')}
                  isInvalid={!!errors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('description')}
                  placeholder="Дополнительная информация о договоре"
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
              'Создать договор'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddContractModal
