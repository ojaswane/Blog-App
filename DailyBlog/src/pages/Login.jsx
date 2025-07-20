import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authentification from '../appwrite/auth';

function Login() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-900 p-4'>
      <div className='w-full max-w-md  bg-slate-800 rounded-lg shadow-md p-8'>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Log In</h2>
      </div>
    </div>
  )
}

export default Login