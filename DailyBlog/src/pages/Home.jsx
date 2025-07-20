import React, {useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, Links } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
// Constants
const COLORS = {
  white: 'text-white',
  slate100: 'text-slate-100',
  slate400: 'text-slate-400',
  slate500: 'bg-slate-500',
  slate800: 'bg-slate-800',
};

const SPACING = {
  small: 'mt-8',
  medium: 'mt-10',
  large: 'mt-20',
  xlarge: 'mt-16',
};

const TITLE = "Discover Nice Articles Here.";

// Memoized AnimatedWord component
const AnimatedWord = React.memo(({ word }) => (
  <motion.span
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          bounce: 0,
          duration: 0.8
        }
      }
    }}
    style={{ display: 'inline-block', marginRight: '5px' }}
    className="text-4xl font-bold"
  >
    {word}
  </motion.span>
));

AnimatedWord.displayName = 'AnimatedWord';

// Reusable Button component
const CategoryButton = React.memo(({ label }) => (
  <button
    className="px-4 py-2 rounded-full hover:bg-slate-700 transition-colors"
    aria-label={`Filter by ${label}`}
  >
    {label}
  </button>
));

CategoryButton.displayName = 'CategoryButton';

export default function Home() {
  const containerRef = useRef(null);
  const words = useMemo(() => TITLE.split(' '), []);
  const [splineError, setSplineError] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const categories = useMemo(() =>
    ['All', 'Tech', 'Manufacturing', 'Sports', 'Designs', 'Programming'],
    []
  );

  return (

    //  <div className="w-full">
    //   {/* Responsive Spline Container with Error Handling */}
    //   <div className="w-full aspect-video min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative bg-slate-800 rounded-xl overflow-hidden">
    //     {splineError ? (
    //       <div className="w-full h-full flex items-center justify-center">
    //         <p className="text-slate-400">Couldn't load 3D scene</p>
    //       </div>
    //     ) : (
    //       <Spline
    //         scene="https://prod.spline.design/YOUR-SPLINE-SCENE-ID"
    //         className="w-full h-full"
    //         onError={() => setSplineError(true)}
    //       />
    //     )}
    //   </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className={`w-full ${COLORS.white} ${SPACING.large} mb-10`}>
            <motion.div
              ref={containerRef}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="ml-5 md:ml-20"
            >
              <motion.h1 className="text-4xl font-bold leading-tight">
                {words.map((word, i) => (
                  <AnimatedWord key={`${word}-${i}`} word={word} />
                ))}
              </motion.h1>

              

              <div className={`${COLORS.slate400} ${SPACING.small}`}>
                <p>All Articles and the content of this site has been <b className={COLORS.slate100}>Updated Today</b> you can find your</p>
                <p className="mt-1">find your <b className={COLORS.slate100}>Articles and Contents</b> Quickly and without any problem.</p>
              </div>
            </motion.div>



            <div className={`flex flex-wrap gap-4 ${SPACING.xlarge} ml-5 md:ml-20`}>
              <input
                type="search"
                className="flex-1 max-w-md p-3 border-none rounded-full bg-slate-800 text-xl px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                aria-label="Search articles"
              />

              {categories.map(category => (
                <CategoryButton key={category} label={category} />
              ))}
            </div>

            {/* Articles Section */}
            <section aria-labelledby="latest-articles">
              <div className="flex w-full justify-center">
                <h2 id="latest-articles" className={`text-2xl font-bold ${SPACING.medium} ${COLORS.white}`}>
                  Latest Articles
                </h2>
              </div>

              <div className={`w-full h-80 ${COLORS.slate800} rounded-lg ${SPACING.medium} flex items-center justify-center`}>
                <p className={`${COLORS.slate400} text-xl`}>No Articles Found</p>
              </div>
            </section>

            {/* Trending Blogs */}
            <br />

            <section aria-labelledby="trending-blogs" className={`${SPACING.large} w-full`}>
              <h2 className='font-bold text-2xl text-center mb-20'>Trending blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-full aspect-square ${COLORS.slate800} rounded-lg`} />
                ))}
              </div>
              <br />
              <div className='flex flex-row '>
                <hr />
                <Link to="/Blog" className={`text-lg font-bold ${COLORS.slate100} hover:${COLORS.slate400} transition-colors duration-300 ml-auto`}>
                  See More
                </Link>
              </div>
            </section>
          </div>
        </div>
      // </div>
    
      );
}