import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Authentification } from '../../appwrite/auth'

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [userName, setUserName] = useState('');

  const auth = new Authentification();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await auth.getCurrentUser();
        if (user && user.name) {
          setUserName(user.name);
        }
      } catch (error) {
        console.log(error)
        setUserName('');
      }
    };

    if (authStatus) {
      fetchUser();
    }
  }, [authStatus]);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Blog',
      slug: '/blog',
      active: true
    },
    {
      name: 'Create Blog',
      slug: '/create-blog',
      active: authStatus // Only show when authenticated
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
  ];

  const handleLogout = async () => {
    try {
      await auth.logout();
      setUserName(''); // Clear user name
      navigate('/login'); // Redirect to login page
      window.location.reload(); // Refresh to clear state
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className='py-3 shadow text-white sticky top-0 border-b-2 border-b-slate-800 z-10'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 justify-center items-center flex text-2xl font-bold font-mono'>
            <Link to='/'>
              Blog.io
            </Link>
          </div>
          <ul className='flex ml-auto items-center'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:text-slate-400'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='flex items-center gap-4 ml-4'>
                <Link to={"/Profile"}>
                <span className='text-sm'>Welcome, {userName || 'User'}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className='px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors'
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header