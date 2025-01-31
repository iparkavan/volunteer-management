import React from 'react';

const WrapperCard = ({ children, className }) => {
  return (
    <div className={`bg-white drop-shadow-lg  rounded-md ${className}`}>
      {children}
    </div>
  );
};

export default WrapperCard;
