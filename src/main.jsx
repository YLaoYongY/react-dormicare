import { createRoot } from 'react-dom/client'
import './index.css'

import '@ant-design/v5-patch-for-react-19'
import router from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
