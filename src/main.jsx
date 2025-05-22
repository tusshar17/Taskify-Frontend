import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/home/Home.jsx'
import Task from './pages/project/Task.jsx'
import Users from './pages/user/Users.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "project/:project_id",
        element: <Task/>
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
