import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react"
import ReactDOM from "react-dom"
import { HONEY_BADGER_API_KEY } from '@/constants'
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"
import { store } from "@/state/store"
import { Provider } from 'react-redux'
import App from '@/App'
import { SocketProvider } from '@/io/socket'

const config = {
  apiKey: HONEY_BADGER_API_KEY,
  environment: "production"
}

const honeybadger = Honeybadger.configure(config)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HoneybadgerErrorBoundary honeybadger={honeybadger}>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </HoneybadgerErrorBoundary>
  </StrictMode>,
)
