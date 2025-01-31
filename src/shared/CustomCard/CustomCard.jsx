import React from 'react';

const CustomCard = ({ title, children }) => {
  return (
    <div className='bg-white p-3 border rounded-xl'>
      {title && (
        <div className='border-b p-2'>
          <p className='font-semibold text-lg'>{title}</p>
        </div>
      )}

      <div className='p-2'>{children}</div>
    </div>
  );
};

export default CustomCard;
