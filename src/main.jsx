import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'  
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'  

const theme = createTheme({})
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        
        <Notifications position="top-right" />

        <App />

      </MantineProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
