import React, { useEffect, useState } from 'react';
import SearchIcon from '../../../assets/images/search1x.png';
import EditTicketIcon from '../../../assets/icons/edit-ticket-icon.svg';
import CancelRequestIcon from '../../../assets/icons/cancel-request-icon.svg';
import ShareIcon from '../../../assets/icons/share-ticket-icon.svg';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../shared/DataGrid';
import TicketDeleteModal from './ticket-delete-modal';
import {
  useGetAllTicketsQuery,
  useUpdateStatusMutation,
} from '../../../features/tickets/tickets-slice';
import { TicketsColumns } from '../../../utils/super-admin-columns';
import {
  taskStatusColor,
  taskStatusText,
  TicketStatusColor,
  ticketStatusText,
  user,
} from '../../../utils/constant';
import { Menu, MenuItem, Skeleton } from '@mui/material';
import MoreIcon from '../../../assets/icons/moreIcon.svg';
import StartIcon from '../../../assets/icons/start-icon.svg';
import RejectIcon from '../../../assets/icons/reject-icon.svg';
import ViewIcon from '../../../assets/icons/eye-icon.svg';
import SuccessGradientMessage from '../../success-gradient-message';
import { useSelector } from 'react-redux';
import CancelRequestModal from './cancel-request';
import { Button } from '../../../shared';

const Tickets = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo);

  const role = userInfo?.data?.role;

  const [requestTab, setRequestTab] = useState('all');
  const [seletedItem, setSelectedItem] = useState();
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ anchorEl: null, rowId: null });
  const [ticketId, setTicketId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelRequestModal, setIsCancelRequestModal] = useState(false);

  const [
    updateStatus,
    { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
  ] = useUpdateStatusMutation();

  // const [paginationModel, setPaginationModel] = React.useState({
  //   page: 0,
  //   limit: 10,
  // });

  const { data, isLoading, error, isError, isSuccess } =
    useGetAllTicketsQuery();

  const handleClose = () => {
    setMenuAnchor({ anchorEl: null, rowId: null });
  };

  const filteredData =
    requestTab === 'all'
      ? data
      : data?.filter((ticket, index) => ticket.status === requestTab);

  // const { data, isLoading, error, isError, isSuccess } = useGetAllTicketsQuery({
  //   status: requestTab,
  //   page: paginationModel.page,
  //   limit: paginationModel.limit,
  // });

  const handleClick = (event, data) => {
    setMenuAnchor({ anchorEl: event.currentTarget, rowId: data?.id });
  };

  const handleStartTicket = (row) => {
    setSelectedItem(row);
    updateStatus({ id: row.id, status: 'in_progress' });
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsBackdropOpen(true);
      setIsOpen(false);
      setTimeout(() => {
        setIsBackdropOpen(false);
        if (seletedItem?.id) {
          navigate(`/tickets/${seletedItem.id}?type=start`);
        }
      }, 2000);
    }
  }, [isUpdateSuccess, seletedItem, navigate]);

  const statusColumn = TicketsColumns.map((column) => {
    if (column.field === 'status') {
      return {
        ...column,
        renderCell: (params) => {
          return (
            <>
              <div className='cursor-pointer flex items-center h-full relative'>
                <span
                  className='w-[80px] capitalize flex justify-center h-[30px] px-3'
                  style={{
                    background: TicketStatusColor[params.row.status]?.bg || '',
                    lineHeight: '30px',
                    borderRadius: '3px',
                    width: '110px',
                    height: '34px',
                    color: TicketStatusColor[params.row.status]?.color || '',
                    fontSize: '12px',
                  }}
                >
                  {params.row.status}
                </span>
              </div>
            </>
          );
        },
      };
    }

    return column;
  });

  const TicketsListColumns = [
    ...statusColumn,
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      id: 4,
      renderCell: (params) => {
        return (
          <>
            <div className='flex items-center h-full'>
              <img
                src={MoreIcon}
                alt='MoreIcon'
                onClick={(e) => handleClick(e, params.row)}
                className='w-8 cursor-pointer  h-8 p-2 rounded-full bg-gray-100'
              />
            </div>
            <Menu
              id={`menu-${params.row.id}`}
              anchorEl={menuAnchor.anchorEl}
              open={menuAnchor.rowId === params.row.id}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => navigate(`/tickets/${params.row.id}?type=view`)}
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
              {role === user.super_admin && (
                <div>
                  {params.row.status === 'new' && (
                    <MenuItem
                      className='!text-[12px]'
                      onClick={() => handleStartTicket(params.row)}
                    >
                      <img
                        src={StartIcon}
                        alt='ViewIcon'
                        className='pr-3 w-[30px]'
                      />{' '}
                      Start
                    </MenuItem>
                  )}
                  {params.row.status !== 'rejected' &&
                    params.row.status !== 'closed' && (
                      <MenuItem
                        className='!text-[12px]'
                        onClick={() => {
                          setIsOpen(true);
                          setTicketId(params.row.id);
                        }}
                      >
                        <img
                          src={RejectIcon}
                          alt='ViewIcon'
                          className='pr-3 w-[30px]'
                        />
                        Reject
                      </MenuItem>
                    )}
                </div>
              )}
              {(role === user.mentee ||
                role === user.mentor ||
                role === user.admin) && (
                <div>
                  {(params.row.status === 'new' ||
                    params.row.status === 'pending') && (
                    <div>
                      <MenuItem
                        onClick={() => {
                          setTicketId(params.row.id);
                          setIsCancelRequestModal(true);
                        }}
                        className='!text-[12px]'
                      >
                        <img
                          src={CancelRequestIcon}
                          alt='ViewIcon'
                          className='pr-3 w-[30px]'
                        />
                        Cancel Request
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          navigate(
                            `/ticket-creation/${params.row.id}?type=edit`
                          )
                        }
                        className='!text-[12px]'
                      >
                        <img
                          src={EditTicketIcon}
                          alt='ViewIcon'
                          className='pr-3 w-[30px]'
                        />
                        Edit
                      </MenuItem>
                    </div>
                  )}

                  <MenuItem onClick={() => {}} className='!text-[12px]'>
                    <img
                      src={ShareIcon}
                      alt='ViewIcon'
                      className='pr-3 w-[30px]'
                    />
                    Share
                  </MenuItem>
                </div>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  const taskMenuList = [
    {
      name: 'All Tickets',
      key: 'all',
    },
    {
      name: 'New Tickets',
      key: 'new',
    },
    {
      name: 'Pending Tickets',
      key: 'pending',
    },
    {
      name: 'In-progress Tickets',
      key: 'in_progress',
    },
    {
      name: 'Closed Tickets',
      key: 'closed',
    },
    {
      name: 'Resolved Tickets',
      key: 'resolved',
    },
    {
      name: 'Reject Tickets',
      key: 'rejected',
    },
  ];

  const handleTab = (key) => {
    setRequestTab(key);
  };

  return (
    <div className='p-9'>
      {(role === user.admin ||
        role === user.mentee ||
        role === user.mentor) && (
        <div className='flex items-center justify-start gap-4 my-4'>
          <Button
            btnType='button'
            btnCls='w-[110px]'
            btnName={'Help'}
            btnCategory='primary'
            onClick={() => navigate('/help')}
          />
          <Button
            btnType='button'
            btnCls='w-[110px]'
            btnName={'History'}
            btnCategory='primary'
            onClick={() => navigate('/ticket-history')}
          />
        </div>
      )}
      <div
        className='px-3 py-5'
        style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}
      >
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex gap-5 items-center text-[20px]'>
            <p>Tickets</p>
          </div>

          <div className='flex gap-8 items-center'>
            <div className='relative'>
              <input
                type='text'
                id='search-navbar'
                className='block w-full p-2 text-sm text-gray-900 border-none'
                placeholder='Search here...'
                style={{
                  border: '1px solid rgba(29, 91, 191, 1)',
                  height: '41px',
                  width: '345px',
                }}
                // value={searchTask}
                // onChange={(e) => handleTaskSearch(e.target.value)}
              />
              <div className='absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none'>
                <img src={SearchIcon} alt='SearchIcon' />
              </div>
            </div>
          </div>
        </div>
        <div className='mx-5'>
          <div className='flex gap-3 mb-6'>
            {taskMenuList.map((actionBtn, index) => (
              <button
                key={index}
                className='px-5 py-4 text-[14px]'
                style={{
                  background:
                    requestTab === actionBtn.key
                      ? 'linear-gradient(97.86deg, #005DC6 -15.07%, #00B1C0 112.47%)'
                      : 'rgba(249, 249, 249, 1)',
                  color: requestTab === actionBtn.key ? '#fff' : '#000',
                  borderRadius: '3px',
                }}
                onClick={() => handleTab(actionBtn.key)}
              >
                {actionBtn.name}
              </button>
            ))}
          </div>

          <div></div>
          {isLoading ? (
            <div className='flex justify-center items-center'>
              <Skeleton
                variant='rectangular'
                sx={{ width: '100%', height: '500px', borderRadius: '10px' }}
              />
            </div>
          ) : (
            <DataTable
              rows={filteredData}
              columns={TicketsListColumns}
              hideCheckbox
              // rowCount={taskList?.count}
              // paginationModel={paginationModel}
              // setPaginationModel={setPaginationModel}
            />
          )}
        </div>
      </div>
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

export default Tickets;

// -------------------------------------------------------------------------------------------------------------------------------

// Ticket Columns
