import { useRouteError } from 'react-router-dom'
import { Container, Typography } from '@mui/material'

const ErrorBoundary = () => {
  const error = useRouteError()

  // Uncaught ReferenceError: path is not defined
  return (
    <Container size="lg" sx={{ textAlign: 'center', py: 2 }}>
      <Typography color="error" sx={{ fontSize: 20 }}>
        There was a problem loading this section. Please try reloading the page.
      </Typography>
    </Container>
  )
}

export default ErrorBoundary
