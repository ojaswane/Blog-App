import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function AddBlog() {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [Thumbnail, setThumbnail] = useState('');
  const [value, setValue] = useState('');

  const CategoryOptions = {
    Tech: 'Tech',
    Lifestyle: 'Lifestyle',
    Travel: 'Travel',
    Food: 'Food',
    Health: 'Health',
    Education: 'Education',
    Entertainment: 'Entertainment',
    Sports: 'Sports',
    Business: 'Business',
    Finance: 'Finance',
    Politics: 'Politics',
    Science: 'Science',
    Environment: 'Environment',
    Fashion: 'Fashion',
    Art: 'Art',
    Music: 'Music',
    others: 'Others'
  }


  return (

    <>
      <section className='text-white max-w-8xl mx-auto w-full  rounded-lg min-h-screen'>

        <div className='px-28 py-8'>
          <form action="">
            <div className='w-full text-left'>
              <label htmlFor="" className='font-semibold font-mono text-xl block mb-2'>
                Title
              </label>
              {/* INPUT FIELD*/}
              <input
                type="text"
                className='w-full p-4 rounded bg-slate-700 text-white border border-slate-600 h-12 font-semibold text-lg'
                placeholder='Enter your blog title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div>
              <label htmlFor="" className='font-semibold font-mono text-xl block mb-2 mt-20'>
                Category
              </label>
              <select
                className='w-full p-1 font-semibold rounded bg-slate-700 text-white border border-slate-600 h-12'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {Object.entries(CategoryOptions).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* text area */}

            <div>
              <label htmlFor="" className='font-semibold font-mono text-xl block mb-2 mt-20'>
                Blog
              </label>
              {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default AddBlog