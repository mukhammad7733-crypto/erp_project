import { Spinner } from 'react-bootstrap'

interface LoadingSpinnerProps {
  size?: 'sm' | undefined
  variant?: string
}

const LoadingSpinner = ({ size, variant = 'primary' }: LoadingSpinnerProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <Spinner animation="border" role="status" size={size} variant={variant}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadingSpinner
