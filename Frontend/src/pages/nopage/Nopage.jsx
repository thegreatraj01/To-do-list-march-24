import React from 'react';

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-4">Sorry, we couldn't find the page you were looking for.</p>
      <p className="text-gray-600">But don't worry, you can find plenty of other things on our homepage.</p>
    </div>
    <a href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Back to homepage
    </a>
  </div>
);

export default NotFoundPage;