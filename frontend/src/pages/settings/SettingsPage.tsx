import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap'
import { mockSystemSettings, mockUserSettings } from '../../services/mockData'
import { toast } from 'react-toastify'

const SettingsPage = () => {
  const [systemSettings, setSystemSettings] = useState(mockSystemSettings)
  const [userSettings, setUserSettings] = useState(mockUserSettings)
  const [loading, setLoading] = useState(false)

  const handleSystemSave = async () => {
    setLoading(true)
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Системные настройки сохранены!')
    } catch (error) {
      toast.error('Ошибка при сохранении настроек')
    } finally {
      setLoading(false)
    }
  }

  const handleUserSave = async () => {
    setLoading(true)
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Пользовательские настройки сохранены!')
    } catch (error) {
      toast.error('Ошибка при сохранении настроек')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1">
          <i className="bi bi-gear me-2"></i>
          Настройки
        </h2>
        <p className="text-muted mb-0">Управление системными и пользовательскими настройками</p>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Tabs defaultActiveKey="system" className="border-bottom px-3 pt-3">
            <Tab
              eventKey="system"
              title={
                <span>
                  <i className="bi bi-building me-2"></i>
                  Системные настройки
                </span>
              }
            >
              <div className="p-4">
                <Row>
                  {/* Company Information */}
                  <Col md={12}>
                    <h5 className="mb-3">
                      <i className="bi bi-info-circle me-2"></i>
                      Информация о компании
                    </h5>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Название компании *</Form.Label>
                      <Form.Control
                        type="text"
                        value={systemSettings.companyName}
                        onChange={(e) => setSystemSettings({ ...systemSettings, companyName: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>ИНН *</Form.Label>
                      <Form.Control
                        type="text"
                        value={systemSettings.companyInn}
                        onChange={(e) => setSystemSettings({ ...systemSettings, companyInn: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Адрес</Form.Label>
                      <Form.Control
                        type="text"
                        value={systemSettings.companyAddress}
                        onChange={(e) => setSystemSettings({ ...systemSettings, companyAddress: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Телефон</Form.Label>
                      <Form.Control
                        type="text"
                        value={systemSettings.companyPhone}
                        onChange={(e) => setSystemSettings({ ...systemSettings, companyPhone: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={systemSettings.companyEmail}
                        onChange={(e) => setSystemSettings({ ...systemSettings, companyEmail: e.target.value })}
                      />
                    </Form.Group>
                  </Col>

                  {/* Regional Settings */}
                  <Col md={12} className="mt-4">
                    <h5 className="mb-3">
                      <i className="bi bi-globe me-2"></i>
                      Региональные настройки
                    </h5>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Валюта по умолчанию</Form.Label>
                      <Form.Select
                        value={systemSettings.defaultCurrency}
                        onChange={(e) => setSystemSettings({ ...systemSettings, defaultCurrency: e.target.value })}
                      >
                        <option value="UZS">UZS - Узбекский сум</option>
                        <option value="USD">USD - Доллар США</option>
                        <option value="EUR">EUR - Евро</option>
                        <option value="RUB">RUB - Российский рубль</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Язык системы</Form.Label>
                      <Form.Select
                        value={systemSettings.language}
                        onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                      >
                        <option value="ru">Русский</option>
                        <option value="uz">O'zbekcha</option>
                        <option value="en">English</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Часовой пояс</Form.Label>
                      <Form.Select
                        value={systemSettings.timezone}
                        onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                      >
                        <option value="Asia/Tashkent">Asia/Tashkent (UTC+5)</option>
                        <option value="Europe/Moscow">Europe/Moscow (UTC+3)</option>
                        <option value="Europe/London">Europe/London (UTC+0)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Начало финансового года</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ММ-ДД"
                        value={systemSettings.fiscalYearStart}
                        onChange={(e) => setSystemSettings({ ...systemSettings, fiscalYearStart: e.target.value })}
                      />
                      <Form.Text className="text-muted">
                        Формат: ММ-ДД (например, 01-01 для 1 января)
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mt-3">
                    <Button
                      variant="primary"
                      onClick={handleSystemSave}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Сохранение...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Сохранить изменения
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </div>
            </Tab>

            <Tab
              eventKey="user"
              title={
                <span>
                  <i className="bi bi-person me-2"></i>
                  Пользовательские настройки
                </span>
              }
            >
              <div className="p-4">
                <Row>
                  {/* Notification Settings */}
                  <Col md={12}>
                    <h5 className="mb-3">
                      <i className="bi bi-bell me-2"></i>
                      Уведомления
                    </h5>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="emailNotifications"
                        label="Email уведомления"
                        checked={userSettings.notifications.emailNotifications}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, emailNotifications: e.target.checked }
                        })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="paymentDueReminders"
                        label="Напоминания о платежах"
                        checked={userSettings.notifications.paymentDueReminders}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, paymentDueReminders: e.target.checked }
                        })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="contractExpiryReminders"
                        label="Напоминания об истечении договоров"
                        checked={userSettings.notifications.contractExpiryReminders}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, contractExpiryReminders: e.target.checked }
                        })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="lowStockAlerts"
                        label="Уведомления о низком запасе на складе"
                        checked={userSettings.notifications.lowStockAlerts}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, lowStockAlerts: e.target.checked }
                        })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="debtOverdueAlerts"
                        label="Уведомления о просроченных задолженностях"
                        checked={userSettings.notifications.debtOverdueAlerts}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          notifications: { ...userSettings.notifications, debtOverdueAlerts: e.target.checked }
                        })}
                      />
                    </Form.Group>
                  </Col>

                  {/* Security Settings */}
                  <Col md={12} className="mt-4">
                    <h5 className="mb-3">
                      <i className="bi bi-shield-lock me-2"></i>
                      Безопасность
                    </h5>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="twoFactorEnabled"
                        label="Двухфакторная аутентификация"
                        checked={userSettings.security.twoFactorEnabled}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          security: { ...userSettings.security, twoFactorEnabled: e.target.checked }
                        })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Тайм-аут сессии (минуты)</Form.Label>
                      <Form.Control
                        type="number"
                        value={userSettings.security.sessionTimeout}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          security: { ...userSettings.security, sessionTimeout: parseInt(e.target.value) }
                        })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Button variant="outline-danger" className="mb-3">
                      <i className="bi bi-key me-2"></i>
                      Изменить пароль
                    </Button>
                  </Col>

                  {/* Preference Settings */}
                  <Col md={12} className="mt-4">
                    <h5 className="mb-3">
                      <i className="bi bi-palette me-2"></i>
                      Предпочтения
                    </h5>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Тема</Form.Label>
                      <Form.Select
                        value={userSettings.preferences.theme}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          preferences: { ...userSettings.preferences, theme: e.target.value as 'light' | 'dark' }
                        })}
                      >
                        <option value="light">Светлая</option>
                        <option value="dark">Темная</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Формат даты</Form.Label>
                      <Form.Select
                        value={userSettings.preferences.dateFormat}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          preferences: { ...userSettings.preferences, dateFormat: e.target.value }
                        })}
                      >
                        <option value="DD.MM.YYYY">ДД.ММ.ГГГГ</option>
                        <option value="MM/DD/YYYY">ММ/ДД/ГГГГ</option>
                        <option value="YYYY-MM-DD">ГГГГ-ММ-ДД</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Формат чисел</Form.Label>
                      <Form.Select
                        value={userSettings.preferences.numberFormat}
                        onChange={(e) => setUserSettings({
                          ...userSettings,
                          preferences: { ...userSettings.preferences, numberFormat: e.target.value }
                        })}
                      >
                        <option value="space">1 000 000</option>
                        <option value="comma">1,000,000</option>
                        <option value="period">1.000.000</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mt-3">
                    <Button
                      variant="primary"
                      onClick={handleUserSave}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Сохранение...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Сохранить изменения
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SettingsPage
