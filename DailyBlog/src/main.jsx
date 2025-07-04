import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Blog from './pages/Blog.jsx'
import AddBlog from './pages/AddBlog.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import SignUp from './pages/SignUp.jsx'

import { createRoutesFromElements , Route , RouterProvider , createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>}> 
        <Route path='/' element={<Home/>}/>
        <Route path='Login' element={<Login/>}/>
        <Route path='Blog' element={<Blog/>}/>
        <Route path='create-Blog' element={<AddBlog/>} />
        <Route path='SignUp' element={<SignUp/>}/>
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
