import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './themes/ThemeProvider'
import Index from './routes/Index'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Index />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
