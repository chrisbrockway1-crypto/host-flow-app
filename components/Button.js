// /components/Button.js

import React from 'react';

const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyle = 'px-6 py-3 rounded-lg font-semibold transition-colors duration-200';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-indigo-500 text-indigo-500 hover:bg-indigo-50'
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;