import React, { useState } from 'react';
import MuiModal from '../../shared/Modal';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import { Button } from '../../shared';
import { useDispatch } from 'react-redux';
import { deleteCalendarEvent } from '../../services/scheduler';

const DeleteModal = ({ open, closeModal, itemId }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setError('Please select an option');
      return;
    }

    dispatch(deleteCalendarEvent({ selectedOption, itemId }));
  };

  return (
    <MuiModal modalOpen={open} modalClose={closeModal} noheader>
      <div className='border border-red-500 rounded-md p-4'>
        <form
          onSubmit={handleSubmit}
          className='flex items-center flex-col gap-6'
        >
          <div className=''>
            <img src={DeleteIcon} alt='' />
          </div>
          <p>Are you sure want to Reschedule Meeting Delete?</p>

          <div className='flex flex-col gap-3'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                value='this_event'
                checked={selectedOption === 'this_event'}
                onChange={handleChange}
                className='accent-black w-4 h-4'
              />
              <span className='text-gray-700'>This Event</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                value='all_event'
                checked={selectedOption === 'all_event'}
                onChange={handleChange}
                className='accent-black w-4 h-4'
              />
              <span className='text-gray-700'>All events</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                value='this_event_and_following_events'
                checked={selectedOption === 'this_event_and_following_events'}
                onChange={handleChange}
                className='accent-black w-4 h-4'
              />
              <span className='text-gray-700'>
                This event and following events
              </span>
            </label>
          </div>
          <div>{error && <span className='text-red-500'>{error}</span>}</div>
          <div className='space-x-4'>
            <Button
              btnName='Cancel'
              btnCls='w-[120px]'
              btnStyle={{
                border: '1px solid rgba(220, 53, 69, 1)', // Danger red border
                color: 'rgba(220, 53, 69, 1)', // Danger red text
              }}
              btnCategory='secondary'
              onClick={closeModal}
            />
            <Button
              type='submit'
              btnName='Delete'
              btnCls='w-[120px]'
              btnStyle={{
                border: '1px solid rgba(220, 53, 69, 1)',
                color: 'white',
                backgroundColor: 'rgba(220, 53, 69, 1)',
              }}
              btnCategory='secondary'
            />
          </div>
        </form>
      </div>
    </MuiModal>
  );
};

export default DeleteModal;
