import React, { useState } from 'react';
import AddText from '../components/TextEditor/AddText';
import { Link } from 'react-router-dom';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [thumbnail, setThumbnail] = useState('');

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
  };




  return (
    <section className='text-white max-w-8xl mx-auto w-full h-full rounded-lg min-h-screen'>
      <div className='px-4 md:px-28 py-8'>
        <form>
          {/* Title Input */}
          <div className='w-full text-left mb-8'>
            <label className='font-semibold font-mono text-xl block mb-2'>
              Title
            </label>
            <input
              type="text"
              className='w-full p-4 rounded bg-slate-700 text-white border border-slate-600 h-12 font-semibold text-lg'
              placeholder='Enter your blog title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Category Select */}
          <div className='w-full text-left mb-8'>
            <label className='font-semibold font-mono text-xl block mb-2'>
              Category
            </label>
            <select
              className='w-full p-3 font-semibold rounded bg-slate-700 text-white border border-slate-600 h-12'
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



          {/* Text Editor - Made Larger */}
          <div className='w-full text-left'>
            <label className='font-semibold font-mono text-xl block mb-2'>
              Blog Content
            </label>
            <div className='min-h-[600px] bg-slate-700 rounded-lg overflow-hidden border border-slate-600'>
              <AddText
                className="h-full min-h-[600px]"
                style={{ minHeight: '600px' }}
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className='w-full text-left mb-8'>
            <label className='font-semibold font-mono text-xl block mb-2'>
              Thumbnail
            </label>
            <input
              type="file"
              className='w-full p-2 rounded bg-slate-700 text-white border border-slate-600'
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="image/*"
            />
          </div>

          {/* Submit Button */}
          <Link to="/preview-blogs" className='bg-blue-600 w-full flex p-3 px-5 text-lg rounded hover:bg-blue-700 '>Next</Link>

        </form>
      </div>
    </section>
  );
}

export default AddBlog;