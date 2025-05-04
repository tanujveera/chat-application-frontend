import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./redux/root-store.js"
import { RouterProvider } from 'react-router-dom'
import { browserRouter } from './util/BrowserRouter.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={browserRouter}/>
    </Provider>
)
