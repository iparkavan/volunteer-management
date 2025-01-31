import React from 'react';
import MuiModal from '../../shared/Modal';
import BlueCloseIcon from '../../assets/icons/blue-close-icon.svg';
import GMeetIcon from '../../assets/icons/g-meet-icon.svg';
import { Button } from '../../shared';
import { Link } from 'react-router-dom';

const GMeetModal = ({ open, closeModal, event }) => {
  return (
    <MuiModal modalOpen={open} modalSize='md' modalClose={closeModal} noheader>
      {' '}
      <div className='border border-blue-500 rounded-md h-[500px]'>
        <div
          className='flex p-3 justify-end cursor-pointer'
          onClick={closeModal}
        >
          <img src={BlueCloseIcon} alt='' />
        </div>

        <div className='flex flex-col gap-8 mt-8 items-center justify-center'>
          <p className='font-semibold'>Google Meet</p>
          <img src={GMeetIcon} alt='' />
          <Link target='_blank' to={event.meet} className='mt-8 cursor-pointer'>
            <Button
              btnType='submit'
              btnCls='w-[170px]'
              btnName={'Go to G-Meet'}
              btnCategory='primary'
            />
          </Link>
        </div>
      </div>
    </MuiModal>
  );
};

export default GMeetModal;
