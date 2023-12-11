import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Provider } from "react-redux"
import router from "./app/router"
import { store } from "./app/store"
import { RouterProvider } from "react-router-dom"
import { Box } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
  </Box>
  ,
)
