import React, { useEffect, useState } from 'react';
import MuiModal from '../../../shared/Modal';
import { useUpdateStatusMutation } from '../../../features/tickets/tickets-slice';
import SuccessGradientMessage from '../../success-gradient-message';
import { useNavigate } from 'react-router-dom';

const CancelRequestModal = ({ setIsOpen, isOpen, ticketId }) => {
  const navigate = useNavigate();
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  const [updateStatus, { isLoading, isSuccess }] = useUpdateStatusMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsBackdropOpen(true);
      setTimeout(() => {
        setIsBackdropOpen(false);
        navigate(`/ticket-history`);
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <MuiModal
      modalOpen={isOpen}
      modalClose={setIsOpen}
      title='Ticket Reject Reason'
    >
      {/* Modal Body */}
      <div className='p-4'>
        <p>Are you sure you want to Cancel this Request ?</p>
      </div>

      {/* Modal Footer */}
      <div className='p-4 flex justify-end gap-4'>
        <button
          className='px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition duration-200'
          onClick={() => setIsOpen(false)}
        >
          No
        </button>
        <button
          className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition transform duration-200 hover:scale-105'
          onClick={() => {
            // console.log('Reason:', reason);
            updateStatus({ id: ticketId, status: 'closed' });
          }}
        >
          Yes
        </button>
      </div>
      <SuccessGradientMessage
        message={'The ticket has been closed successfully.'}
        isBackdropOpen={isBackdropOpen}
        setIsBackdropOpen={setIsBackdropOpen}
      />
    </MuiModal>
  );
};

export default CancelRequestModal;
