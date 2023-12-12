import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Provider } from "react-redux"
import router from "./app/router"
import { store } from "./app/store"
import { RouterProvider } from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
  ,
)
