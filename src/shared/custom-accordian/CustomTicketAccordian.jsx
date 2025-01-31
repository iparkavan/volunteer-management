import React, { useState } from 'react';

const CustomTicketAccordian = ({ title, children, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  return (
    <div className='border rounded-lg shadow-sm bg-white mb-4'>
      {/* Accordion Header */}
      <div
        className={`flex justify-between bg-[#D9E4F2]  items-center p-4 cursor-pointer transition-all duration-500 ease-in-out ${
          isOpen ? 'rounded-t' : 'rounded-lg'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className='text-lg font-semibold text-gray-800 capitalize'>
          {title}
        </h2>
        <svg
          className={`w-6 h-6 transform transition-transform duration-500 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </div>

      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};

export default CustomTicketAccordian;
