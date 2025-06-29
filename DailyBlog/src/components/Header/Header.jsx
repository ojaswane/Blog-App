import React from 'react'
import Container from '../Container/Container'

function Header() {
  return (
    
      <header className=' m-8  '>
        <div className='flex flex-wrap justify-between sticky '>
          <h1 className=' text-white font-mono font-semibold'>BLOG.io</h1>

          <ul className=' text-white flex gap-12 cursor-pointer'>
            <li>Home</li>
            <li>Blog</li>
            <li>Create Blog</li>
          </ul>

          <button className='bg-white px-5 rounded-lg '>Login</button>
        </div>
      </header>
    

    
  )
}

export default Header