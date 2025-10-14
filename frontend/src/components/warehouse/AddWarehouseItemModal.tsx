import { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { warehouseItemSchema } from '../../utils/validators'
import { toast } from 'react-toastify'

interface AddWarehouseItemModalProps {
  show: boolean
  onHide: () => void
  onSuccess: () => void
}

interface WarehouseItemFormData {
  name: string
  sku: string
  category: string
  quantity: number
  unit: string
  purchasePrice: number
  salePrice: number
  minStock: number
  location: string
  supplier: string
}

const AddWarehouseItemModal = ({ show, onHide, onSuccess }: AddWarehouseItemModalProps) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WarehouseItemFormData>({
    resolver: yupResolver(warehouseItemSchema),
  })

  const onSubmit = async (data: WarehouseItemFormData) => {
    setLoading(true)
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Новый товар:', data)
      toast.success('Товар успешно добавлен!')
      reset()
      onSuccess()
      onHide()
    } catch (error) {
      toast.error('Ошибка при добавлении товара')
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
          <i className="bi bi-box-seam me-2"></i>
          Новый товар
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Название товара *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('name')}
                  isInvalid={!!errors.name}
                  placeholder="Цемент ПЦ 400-Д20 (мешки 50кг)"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Артикул *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('sku')}
                  isInvalid={!!errors.sku}
                  placeholder="CEM-PC400-001"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.sku?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Категория *</Form.Label>
                <Form.Select
                  {...register('category')}
                  isInvalid={!!errors.category}
                >
                  <option value="">Выберите категорию</option>
                  <option value="Цемент в мешках">Цемент в мешках</option>
                  <option value="Цемент навалом">Цемент навалом</option>
                  <option value="Специальный цемент">Специальный цемент</option>
                  <option value="Упаковочные материалы">Упаковочные материалы</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Место хранения *</Form.Label>
                <Form.Control
                  type="text"
                  {...register('location')}
                  isInvalid={!!errors.location}
                  placeholder="Склад №1, Секция А"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.location?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Количество *</Form.Label>
                <Form.Control
                  type="number"
                  {...register('quantity')}
                  isInvalid={!!errors.quantity}
                  placeholder="1000"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Единица измерения *</Form.Label>
                <Form.Select
                  {...register('unit')}
                  isInvalid={!!errors.unit}
                >
                  <option value="">Выберите</option>
                  <option value="тонн">тонн</option>
                  <option value="мешков">мешков</option>
                  <option value="штук">штук</option>
                  <option value="кг">кг</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.unit?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Минимальный запас *</Form.Label>
                <Form.Control
                  type="number"
                  {...register('minStock')}
                  isInvalid={!!errors.minStock}
                  placeholder="500"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.minStock?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Цена закупки (UZS) *</Form.Label>
                <Form.Control
                  type="number"
                  {...register('purchasePrice')}
                  isInvalid={!!errors.purchasePrice}
                  placeholder="1200000"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.purchasePrice?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Цена продажи (UZS) *</Form.Label>
                <Form.Control
                  type="number"
                  {...register('salePrice')}
                  isInvalid={!!errors.salePrice}
                  placeholder="1450000"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.salePrice?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Поставщик *</Form.Label>
                <Form.Select
                  {...register('supplier')}
                  isInvalid={!!errors.supplier}
                >
                  <option value="">Выберите поставщика</option>
                  <option value='АО "Кызылкумцемент"'>АО "Кызылкумцемент"</option>
                  <option value='ОАО "Ахангаранцемент"'>ОАО "Ахангаранцемент"</option>
                  <option value='ООО "БекабадЦемент"'>ООО "БекабадЦемент"</option>
                  <option value='АО "Навоицемент"'>АО "Навоицемент"</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.supplier?.message}
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
                Добавить товар
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddWarehouseItemModal
