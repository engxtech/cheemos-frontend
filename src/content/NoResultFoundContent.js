import React from 'react';
import { Link } from 'react-router-dom';

const NoResultFoundContent = () => {
  return (
    <>
    <section className="h-screen bg-slate-100">
    <div className='flex items-center justify-center mt-28'>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-center">
        <div className="mx-auto max-w-screen-sm">
          <h1 className="mb-4 text-7xl tracking-tight font-bold lg:text-9xl text-primary-600 text-violet-600">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-violet-500">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-800">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
          <Link to="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300  hover:scale-105 ease-in-out duration-300  rounded-lg text-sm px-5 py-2.5 text-center my-4 bg-blue-600 font-bold font-mono">
            Back to Homepage
          </Link>
        </div>
      </div>
      </div>
    </section>
    </>
  );
};

export default NoResultFoundContent;
