import React from 'react'

function Footer() {
  return (
    <div className='w-full h-screen '>
    <footer className='text-white items-end  '>
      <div className='flex justify-between m-10'>
        <ul className=' text-white flex gap-12 cursor-pointer'>
            <li>Home</li>
            <li>Blog</li>
            <li>Create Blog</li>
          </ul>

          <h1 className='font-mono font-semibold text-2xl'>Blog.io</h1>

           © {new Date().getFullYear()} All Rights Reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer