import { Breadcrumbs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserImage from '../../../assets/icons/user-image.svg';
import ImageIcon from '../../../assets/icons/image-icon.svg';
import DocumentIcon from '../../../assets/icons/documents-icon.svg';
import DownloadIcon from '../../../assets/icons/download-icon.svg';
import { Button } from '../../../shared';
import TicketDeleteModal from './ticket-delete-modal';
import moment from 'moment';
import { TicketStatusColor, user } from '../../../utils/constant';
import CustomTicketAccordian from '../../../shared/custom-accordian/CustomTicketAccordian';
import { useSelector } from 'react-redux';
import { useUpdateStatusMutation } from '../../../features/tickets/tickets-slice';
import SuccessGradientMessage from '../../success-gradient-message';
import CancelRequestModal from './cancel-request';

const ViewTicket = ({ ticket, type }) => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role;
  const [isCancelRequestModal, setIsCancelRequestModal] = useState(false);

  const [updateStatus, { isLoading, isSuccess }] = useUpdateStatusMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsBackdropOpen(true);
      setTimeout(() => {
        setIsBackdropOpen(false);
        navigate(`/tickets/${ticket.id}?type=start`);
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <div>
      <div className='p-8 mt-6 grid grid-cols-4 gap-4'>
        <div className='col-span-1 flex items-center justify-center flex-col'>
          <img
            src={ticket?.created_by_detail?.profile_image || UserImage}
            className='ring-8 ring-[#1D5BBF] rounded-full'
            alt=''
          />
          <p className='mt-10 font-semibold'>
            {ticket?.created_by_detail?.first_name}{' '}
            {ticket?.created_by_detail?.last_name} (
            {ticket?.created_by_detail?.role})
          </p>
        </div>
        <div className='grid col-span-3 border rounded-lg'>
          <div className='flex-1'>
            <table className='w-full'>
              <tbody>
                <tr className='border-b'>
                  <td className='p-4 text-sm border-r'>Subject Name</td>
                  <td className='p-4 text-sm text-gray-600'>
                    {ticket?.subject}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='p-4 text-sm border-r'>Email</td>
                  <td className='p-4 text-sm text-gray-600'>
                    {ticket?.created_by_detail?.email}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='p-4 text-sm border-r'>Request Date</td>
                  <td className='p-4 text-sm text-gray-600'>
                    {moment(ticket?.created_at).format('DD/MM/YYYY')}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='p-4 text-sm border-r'>Status</td>
                  <td className='p-4 text-sm'>
                    <span
                      className={`capitalize underline`}
                      style={{
                        color: TicketStatusColor[ticket?.status]?.color || '',
                      }}
                    >
                      {ticket?.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='mx-9 my-9 space-y-12'>
        {/* Ticket Details */}
        <div className='border p-6 rounded-lg flex items-center justify-start gap-4'>
          <h2 className='text-[#1D5BBF] font-semibold'>Description:</h2>
          <p className='text-sm text-gray-600'>{ticket?.description}</p>
        </div>
        {/* Documents Upload */}

        {ticket?.attachments?.length > 0 && (
          <CustomTicketAccordian title={'Documents'} defaultValue={true}>
            <div className='flex items-center justify-start gap-4'>
              {ticket.attachments.map((file, index) => (
                <Link
                  to={file.file}
                  target='_blank'
                  className='flex border rounded-md p-2'
                  key={index}
                >
                  <img src={ImageIcon} alt='' />
                  <p className='truncate p-2'>{file.file_name}</p>
                  <img src={DownloadIcon} alt='' />
                </Link>
              ))}
            </div>
          </CustomTicketAccordian>
        )}
      </div>

      {type === 'view' &&
        ticket?.status === 'new' &&
        role === user.super_admin && (
          <div className='flex gap-6 my-12 justify-center align-middle'>
            <Button
              btnName={'Reject'}
              btnCls='w-[170px]'
              btnStyle={{
                border: '1px solid rgba(220, 53, 69, 1)', // Danger red border
                color: 'rgba(220, 53, 69, 1)', // Danger red text
              }}
              btnCategory='secondary'
              onClick={() => {
                setIsOpen(true);
                setTicketId(ticket?.id);
              }}
            />

            <Button
              btnType='submit'
              btnCls='w-[170px]'
              btnName={'Start'}
              // onClick={() => navigate(`/tickets/${ticket.id}?type=start`)}
              onClick={() =>
                updateStatus({ id: ticket?.id, status: 'in_progress' })
              }
              btnCategory='primary'
            />
          </div>
        )}

      {type === 'view' &&
        (role === user.mentee || role === user.mentor) &&
        (ticket.status === 'new' || ticket.status === 'pending') && (
          <div className='flex gap-6 my-12 justify-center align-middle'>
            <Button
              btnName={'Cancel request'}
              btnCls='w-[170px]'
              btnStyle={{
                border: '1px solid rgba(220, 53, 69, 1)', // Danger red border
                color: 'rgba(220, 53, 69, 1)', // Danger red text
              }}
              btnCategory='secondary'
              onClick={() => {
                setIsCancelRequestModal(true);
                setTicketId(ticket?.id);
              }}
            />

            <Button
              btnType='submit'
              btnCls='w-[170px]'
              btnName={`Edit request`}
              // onClick={() => navigate(`/tickets/${ticket.id}?type=start`)}
              onClick={() =>
                navigate(`/ticket-creation/${ticket.id}?type=edit`)
              }
              btnCategory='primary'
            />
          </div>
        )}

      <SuccessGradientMessage
        message={'This ticket is in-progress'}
        isBackdropOpen={isBackdropOpen}
        setIsBackdropOpen={setIsBackdropOpen}
      />
      {isOpen && (
        <TicketDeleteModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ticketId={ticketId}
        />
      )}
      {isCancelRequestModal && (
        <CancelRequestModal
          isOpen={isCancelRequestModal}
          setIsOpen={setIsCancelRequestModal}
          ticketId={ticketId}
        />
      )}
    </div>
  );
};

export default ViewTicket;
