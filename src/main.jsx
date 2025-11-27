import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const theme = createTheme();

export const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>,
)
