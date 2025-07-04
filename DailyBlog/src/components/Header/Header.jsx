import React from 'react'
import Container from '../Container/Container'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Blog',
      slug: '/blog.jsx',
      active: !authStatus
    },
    {
      name: 'Create Blog',
      slug: '/create-blog',
      active: !authStatus
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    }
  ]

  return (

    <header className='py-3 shadow text-white'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 justify-center items-center flex'>
            <Link to='/'>
              Blog.io
              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:text-slate-400 '
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header