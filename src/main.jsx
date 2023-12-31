import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Products } from './components/products/Products.jsx';
import { Categories } from './components/Categories/Categories.jsx';
import { Invoices } from './components/Invoices/Invoices.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "Home",
    element: <App/>,
  },
  {
    path: "products",
    element: <Products/>,
  },
  {
    path: "Categories",
    element: <Categories/>,
  },
  {
    path: "Invoices",
    element: <Invoices/>,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
