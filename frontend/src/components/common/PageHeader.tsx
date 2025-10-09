import { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <div className="bg-white border-bottom mb-3 mb-md-4 py-2 py-md-3 page-header">
      <Container fluid>
        <Row className="align-items-center g-2">
          <Col xs={12} md={actions ? undefined : 12}>
            <h2 className="mb-0 mb-md-0">{title}</h2>
            {subtitle && (
              <p className="text-muted mb-0 mt-1 small d-none d-md-block">{subtitle}</p>
            )}
          </Col>
          {actions && (
            <Col xs={12} md="auto" className="d-flex justify-content-start justify-content-md-end gap-2 flex-wrap">
              {actions}
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default PageHeader
