import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authentification from './appwrite/auth'
import { login, logout } from './store/authSlice'

function App() {

  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authentification.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout());
        }
      })
      .finally(setLoading(false))
  }, [dispatch])

  return !Loading ?
    <div>
      
    </div>
    : null
}

export default App 
