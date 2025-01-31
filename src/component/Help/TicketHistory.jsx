import React, { useState } from 'react';
import SearchIcon from '../../assets/images/search1x.png';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../shared/DataGrid';
import { useGetAllTicketsQuery } from '../../features/tickets/tickets-slice';
import { TicketsColumns } from '../../utils/super-admin-columns';
import {
  taskStatusColor,
  taskStatusText,
  TicketStatusColor,
  ticketStatusText,
} from '../../utils/constant';
import { Menu, MenuItem, Skeleton } from '@mui/material';
import MoreIcon from '../../assets/icons/moreIcon.svg';
import StartIcon from '../../assets/icons/start-icon.svg';
import RejectIcon from '../../assets/icons/reject-icon.svg';
// import CloseIcon from '../assets/icons/closeIcon.svg';
import ViewIcon from '../../assets/icons/eye-icon.svg';

const TicketHistory = () => {
  const navigate = useNavigate();
  const [requestTab, setRequestTab] = useState('all');
  const [seletedItem, setSelectedItem] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    limit: 10,
  });

  const { data, isLoading, error, isError, isSuccess } =
    useGetAllTicketsQuery();

  const filteredData =
    requestTab === 'all'
      ? data
      : data?.filter((ticket, index) => ticket.status === requestTab);

  // const { data, isLoading, error, isError, isSuccess } = useGetAllTicketsQuery({
  //   status: requestTab,
  //   page: paginationModel.page,
  //   limit: paginationModel.limit,
  // });
  console.log(data);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  // const tableData = data?.results.map((item, index) => {
  //   return { ...item, id: index + 1 };
  // });

  const statusColumn = TicketsColumns.map((column) => {
    if (column.field === 'status') {
      return {
        ...column,
        renderCell: (params) => {
          return (
            <>
              <div className='cursor-pointer flex items-center h-full relative'>
                <span
                  className='w-[80px] flex justify-center h-[30px] px-3'
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
                  {ticketStatusText[params.row.status]}
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
            <div
              className='cursor-pointer flex items-center h-full'
              onClick={(e) => handleClick(e, params.row)}
            >
              <img src={MoreIcon} alt='MoreIcon' />
            </div>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => navigate(`/tickets/${seletedItem.id}?type=view`)}
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
              <MenuItem
                className='!text-[12px]'
                onClick={() =>
                  navigate(`/tickets/${seletedItem.id}?type=start`)
                }
              >
                <img src={StartIcon} alt='ViewIcon' className='pr-3 w-[30px]' />{' '}
                Start
              </MenuItem>
              <MenuItem className='!text-[12px]'>
                <img
                  src={RejectIcon}
                  alt='ViewIcon'
                  className='pr-3 w-[30px]'
                />
                Reject
              </MenuItem>
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
      name: 'Reject Tickets',
      key: 'reject',
    },
  ];

  const handleTab = (key) => {
    setRequestTab(key);
  };
  return (
    <div className='p-9'>
      <div
        className='px-3 py-5'
        style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}
      >
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex gap-5 items-center text-[20px]'>
            <p>Help Desk</p>
          </div>

          <div className='flex gap-8 items-center'>
            <div className='relative'>
              <input
                type='text'
                id='search-navbar'
                className='block w-full p-2 text-sm text-gray-900 border-none'
                placeholder='Search here...'
                style={{
                  border: '1px solid #FE634E',
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
                      ? '#FE634E'
                      : 'rgba(249, 249, 249, 1)',
                  color: requestTab === actionBtn.key ? '#FE634E' : '#000',
                  borderRadius: '3px',
                }}
                onClick={() => handleTab(actionBtn.key)}
              >
                {actionBtn.name}
              </button>
            ))}
          </div>

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
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketHistory;
