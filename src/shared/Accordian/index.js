import React, { useState } from 'react';
import CircleArrowDown from '../../assets/icons/vmAccordianIcon.svg';

const Accordian = ({ title, children, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className='w-full border-gray-300'>
      <div
        className='flex justify-between items-center border-b w-full p-2 text-left ease-in-out transition-all duration-500'
        onClick={toggleAccordion}
      >
        <span className='text-lg text-font-primary-main font-semibold'>{title}</span>
        <img
          src={CircleArrowDown}
          alt=''
          className={`transform cursor-pointer transition-all duration-500 ease-in-out ${
            !isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className='p-4 w-full'>{children}</div>
      </div>
    </div>
  );
};

export default Accordian;
