import { Backdrop } from '@mui/material';
import React, { useState } from 'react';
import SuccessTik from '../assets/images/blue_tik1x.png';

const SuccessGradientMessage = ({
  message,
  isBackdropOpen,
  setIsBackdropOpen,
}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isBackdropOpen}
      onClick={() => setIsBackdropOpen(false)}
    >
      <div className='px-5 py-1 flex justify-center items-center'>
        <div
          className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
          style={{ background: '#fff', borderRadius: '10px' }}
        >
          <img src={SuccessTik} alt='SuccessTik' />
          <p
            className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
            style={{
              fontWeight: 600,
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </Backdrop>
  );
};

export default SuccessGradientMessage;
