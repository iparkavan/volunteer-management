import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Skeleton, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import CustomTicketAccordian from '../../../shared/custom-accordian/CustomTicketAccordian';
import TicketUpdate from './ticket-update';
import ViewTicket from './ViewTicket';
import {
  useGetTicketQuery,
  useUpdateStatusMutation,
} from '../../../features/tickets/tickets-slice';
import TicketComments from './ticket-comments';
import { useSelector } from 'react-redux';
import { user } from '../../../utils/constant';
import { Button } from '../../../shared';
import SuccessGradientMessage from '../../success-gradient-message';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // NEW: Track action type

  const [searchParams] = useSearchParams();
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role;

  const [
    updateStatus,
    { isLoading: isStatusLoading, isSuccess: isStatusSuccess },
  ] = useUpdateStatusMutation();

  useEffect(() => {
    if (isStatusSuccess) {
      setIsBackdropOpen(true);
      setTimeout(() => {
        setIsBackdropOpen(false);
        navigate(`/ticket-history`);
      }, 2000);
    }
  }, [isStatusSuccess]);

  const type = searchParams.get('type');

  const {
    data: ticket,
    isLoading: isTicketLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetTicketQuery(id);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const breadcrumbs = [
    <Link
      variant='body2'
      underline='hover'
      key='1'
      color='inherit'
      to={`${
        role === user.admin || role === user.mentee || role === user.mentor
          ? '/ticket-history'
          : '/tickets'
      }`}
    >
      {`${
        role === user.admin || role === user.mentee || role === user.mentor
          ? 'History'
          : 'Tickets kiler'
      }`}
    </Link>,
    <Typography key='2' variant='body2' color={'primary'}>
      View New Ticket
    </Typography>,
  ];

  return (
    <div className='p-9'>
      <Breadcrumbs
        className='pb-4'
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        {breadcrumbs}
      </Breadcrumbs>

      <div className='bg-white p-9 rounded-xl space-y-12'>
        {/* View Ticket Section */}
        {isTicketLoading ? (
          <div className='flex justify-center items-center'>
            <Skeleton
              variant='rectangular'
              sx={{ width: '100%', height: '500px', borderRadius: '10px' }}
            />
          </div>
        ) : (
          <div>
            <CustomTicketAccordian
              title={`${ticket?.created_by_detail?.first_name} ${ticket?.created_by_detail?.last_name} (
            ${ticket?.created_by_detail?.role}) - ${ticket?.id}`}
              defaultValue={type === 'view' ? true : false}
            >
              <ViewTicket ticket={ticket} type={type} />
            </CustomTicketAccordian>
          </div>
        )}

        {/* Comments Section */}
        <div>
          {ticket &&
            ticket.comments &&
            ticket.comments.length > 0 &&
            ticket.comments.map((comment, index) => (
              <CustomTicketAccordian
                title={`${comment?.created_by?.first_name} ${comment?.created_by?.last_name} (
        ${comment?.created_by?.role})`}
              >
                <TicketComments comment={comment} />
              </CustomTicketAccordian>
            ))}
        </div>

        {/* Update Ticket Section */}
        <div className='bg-white rounded-xl space-y-12'>
          {isTicketLoading ? (
            <div className='flex justify-center items-center'>
              <Skeleton
                variant='rectangular'
                sx={{ width: '100%', height: '500px', borderRadius: '10px' }}
              />
            </div>
          ) : (
            <>
              {
                // role === user.super_admin &&
                ticket?.status !== 'new' &&
                  ticket?.status !== 'rejected' &&
                  ticket?.status !== 'reopened' && (
                    <div>
                      <CustomTicketAccordian
                        title={
                          role === user.super_admin
                            ? 'Enter your update'
                            : 'Additional Information'
                        }
                        defaultValue={true}
                      >
                        <TicketUpdate ticket={ticket} />
                      </CustomTicketAccordian>
                    </div>
                  )
              }
            </>
          )}
        </div>
        {type === 'view' &&
          (role === user.mentor ||
            role === user.mentee ||
            role === user.admin) &&
          ticket?.status === 'resolved' && (
            <div className='flex gap-6 my-12 justify-center align-middle'>
              <Button
                btnCls='w-[170px]'
                btnName={`${isStatusLoading ? 'Reopening...' : 'Reopen'}`}
                disabled={isStatusLoading}
                btnCategory='secondary'
                onClick={() => {
                  setActionType('reopen');
                  updateStatus({ id: ticket.id, status: 'in_progress' });
                }}
              />

              <Button
                btnType='submit'
                btnCls='w-[170px]'
                btnName={`${isStatusLoading ? 'Closing...' : 'Close'}`}
                disabled={isStatusLoading}
                onClick={() => {
                  setActionType('close');
                  updateStatus({ id: ticket.id, status: 'closed' });
                }}
                btnCategory='primary'
              />
            </div>
          )}
        <SuccessGradientMessage
          message={
            actionType === 'reopen'
              ? 'The ticket has been reopened successfully'
              : 'This ticket has been closed successfully'
          }
          isBackdropOpen={isBackdropOpen}
          setIsBackdropOpen={setIsBackdropOpen}
        />
      </div>
    </div>
  );
};

export default TicketDetails;
