import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { transactionSchema } from '../../utils/validators'
import { toast } from 'react-toastify'
import { CashAccount } from '../../types'

interface AddTransactionModalProps {
  show: boolean
  onHide: () => void
  onSuccess: () => void
  accounts: CashAccount[]
}

interface TransactionFormData {
  accountId: number
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER'
  amount: number
  category: string
  description: string
  date: string
  client?: string
  branch?: string
}

const AddTransactionModal = ({ show, onHide, onSuccess, accounts }: AddTransactionModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  })

  const transactionType = watch('type')

  const onSubmit = async (data: TransactionFormData) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Транзакция успешно создана!')
      reset()
      onSuccess()
      onHide()
    } catch (error) {
      toast.error('Ошибка при создании транзакции')
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
        <Modal.Title>Новая транзакция</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Счет *</Form.Label>
                <Form.Select {...register('accountId')} isInvalid={!!errors.accountId}>
                  <option value="">Выберите счет</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.currency})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.accountId?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Тип транзакции *</Form.Label>
                <Form.Select {...register('type')} isInvalid={!!errors.type}>
                  <option value="">Выберите тип</option>
                  <option value="INCOME">Приход</option>
                  <option value="EXPENSE">Расход</option>
                  <option value="TRANSFER">Перевод</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
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
                <Form.Label>Дата *</Form.Label>
                <Form.Control
                  type="date"
                  {...register('date')}
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Категория *</Form.Label>
                <Form.Select {...register('category')} isInvalid={!!errors.category}>
                  <option value="">Выберите категорию</option>
                  {transactionType === 'INCOME' && (
                    <>
                      <option value="Продажи">Продажи</option>
                      <option value="Услуги">Услуги</option>
                      <option value="Инвестиции">Инвестиции</option>
                      <option value="Прочие доходы">Прочие доходы</option>
                    </>
                  )}
                  {transactionType === 'EXPENSE' && (
                    <>
                      <option value="Зарплата">Зарплата</option>
                      <option value="Аренда">Аренда</option>
                      <option value="Канцелярия">Канцелярия</option>
                      <option value="Коммунальные">Коммунальные услуги</option>
                      <option value="Закупка товаров">Закупка товаров</option>
                      <option value="Прочие расходы">Прочие расходы</option>
                    </>
                  )}
                  {transactionType === 'TRANSFER' && (
                    <option value="Перевод между счетами">Перевод между счетами</option>
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Клиент/Поставщик</Form.Label>
                <Form.Control
                  type="text"
                  {...register('client')}
                  placeholder="ООО Компания"
                />
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
                  placeholder="Детальное описание транзакции"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
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
              'Создать транзакцию'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddTransactionModal
