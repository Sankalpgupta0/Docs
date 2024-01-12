import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './store+slice/store.js'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import Layout from './components/Layout.jsx'
import Bin from './components/Bin.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: '/docs',
        element: <Layout />
      },
      {
        path: '/bin',
        element: <Bin />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
