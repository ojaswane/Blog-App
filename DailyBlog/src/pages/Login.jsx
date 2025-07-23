import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authentification from '../appwrite/auth';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await authentification.login({
        email: formData.email,
        password: formData.password,
      });

      console.log('User logged in:', user);
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-900 p-4'>
      <div className='w-full max-w-md  bg-slate-800 rounded-lg shadow-md p-8'>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Log In</h2>
        {error && <div className="mb-4 p-2 bg-red-500 text-white text-sm rounded-md">{error}</div>}
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className='w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={formData.email}
              onChange={handlechange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handlechange}
              required
              className="w-full px-4 py-2 mt-1 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium disabled:opacity-50"
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/Signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;