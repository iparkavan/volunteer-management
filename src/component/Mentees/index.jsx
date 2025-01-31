import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button as Btn } from '@mui/material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';

import DataTable from '../../shared/DataGrid';
import FilterIcon from '../../assets/icons/Filter.svg';
import MoreIcon from '../../assets/icons/moreIcon.svg';
import CancelIcon from '../../assets/images/cancel1x.png'
import ViewIcon from '../../assets/images/view1x.png';
import ConnectIcon from '../../assets/images/connect1x.png';
import ConnectPopupIcon from '../../assets/images/Connectpop1x.png';
import SearchIcon from '../../assets/images/search1x.png';
import RejectIcon from '../../assets/icons/reject.svg';
import RejectPopupIcon from '../../assets/icons/rejectPopup.svg';
import Dropdown from '../../shared/Dropdown';
import {
  getMyMentees,
  getMyReqMentees,
  mentorAcceptReq,
  updateUserList,
} from '../../services/userList';
import { myMenteeColumns, myReqMenteeColumns } from '../../utils/tableFields';
import {
  followBtnText,
  requestStatusColor,
  requestStatusText,
  resultColor,
  resultText,
} from '../../utils/constant';
import { Button } from '../../shared';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import MuiModal from '../../shared/Modal';

export const Mentees = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const state = useLocation()?.state;
  const [reason,setReason] = useState('')
  const [reasonError, setReasonError] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { menteeList, loading, status } = useSelector(
    (state) => state.userList
  );

  const [mentorType, setMentorType] = useState(
    state?.type === 'new_req_mentee' ? 'new-request-mentees' :searchParams.get('req')==="new-request-mentees"?"new-request-mentees": 'my-mentee'
  );
  const [requestTab, setRequestTab] = useState('all');
  const [selectedMentee, setSelectedMentee] = useState({});
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [confirmation, setConfirmation] = React.useState({
    bool: false,
    activity: false,
    type: '',
    id: '',
  });
  const [search, setSearch] = React.useState('');

  const menteeOption = [
    {
      name: 'My Volunteer',
      value: 'my-mentee',
    },
    {
      name: 'New Follow Requests',
      value: 'new-request-mentees',
    },
  ];

  const requestBtns = [
    {
      name: 'All',
      key: 'all',
    },
    {
      name: 'New',
      key: 'new',
    },
    {
      name: 'Pending',
      key: 'pending',
    },
    {
      name: 'Connect',
      key: 'accept',
    },
    {
      name: 'Reject',
      key: 'cancel',
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setSelectedMentee(data);
  };

  const handleConnectionReq = (id, status) => {
    const payload = {
      follow_id: id,
      status: status,
    };
if(reason){
  payload.cancelled_reason=reason
}
    dispatch(mentorAcceptReq(payload));
  };

  React.useEffect(() => {
    if (status === 'done') {
      setConfirmation({
        ...confirmation,
        activity: false,
        bool: true,
      });
      setReason('')
      setTimeout(() => {
        closeConfirmation();
        getTableData();

        dispatch(updateUserList({ status: '' }));
      }, [2000]);
    }
  }, [status]);

  const myMenteeColumn = [
    ...myMenteeColumns,
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
                onClick={() => navigate(`/mentee-details/${selectedMentee.id}`)}
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const myReqMenteeColumn = [
    ...myReqMenteeColumns,
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className='cursor-pointer flex items-center h-full relative'>
              <span
                className='w-[80px] flex justify-center h-[30px] px-3'
                style={{
                  background:
                    requestStatusColor[params.row.status]?.bgColor || '',
                  lineHeight: '30px',
                  borderRadius: '3px',
                  width: '110px',
                  height: '34px',
                  color: requestStatusColor[params.row.status]?.color || '',
                  fontSize: '12px',
                }}
              >
                {' '}
                {requestStatusText[params.row.status]}
              </span>
            </div>
          </>
        );
      },
    },
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
                onClick={() =>
                  navigate(`/profileView`, {
                    state: {
                      row_id: selectedMentee?.id,
                      user_id: selectedMentee?.follower,
                      is_approved: selectedMentee?.is_approved,
                      status:selectedMentee?.status
                    },
                  })
                }
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
              {(selectedMentee?.status === 'new' ||
                selectedMentee?.status === 'pending') && (
                  <MenuItem
                    onClick={() =>
                      handleOpenActivityPopup(selectedMentee?.id, 'accept')
                    }
                    className='!text-[12px]'
                  >
                    <img
                      src={ConnectIcon}
                      alt='ViewIcon'
                      className='pr-3 w-[30px]'
                    />
                    Connect
                  </MenuItem>
                )}
              {(selectedMentee?.status === 'new' ||
                selectedMentee?.status === 'pending') && (
                  <MenuItem
                    onClick={() =>
                      handleOpenActivityPopup(selectedMentee?.id, 'reject')
                    }
                    className='!text-[12px]'
                  >
                    <img
                      src={RejectIcon}
                      alt='ViewIcon'
                      className='pr-3 w-[30px]'
                    />
                    Reject
                  </MenuItem>
                )}
            </Menu>
          </>
        );
      },
    },
  ];

  const title =
    menteeOption.find((option) => option.value === mentorType)?.name || '';

  const handleTab = (key) => setRequestTab(key);

  const getTableData = (search = '') => {
    if (mentorType === 'my-mentee') {
      dispatch(
        getMyMentees({
          page: paginationModel?.page + 1,
          limit: paginationModel?.pageSize,
          search: search,
        })
      );
    } else {
      dispatch(
        getMyReqMentees({
          page: paginationModel?.page + 1,
          limit: paginationModel?.pageSize,
          search: search,
          status: requestTab,
        })
      );
    }
  };

  useEffect(() => {
    getTableData();
  }, [paginationModel, mentorType, requestTab]);
  useEffect(() => {
   if(searchParams.get('req')){
    setMentorType(searchParams.get('req'))
   }
  }, [searchParams]);

  const handleOpenActivityPopup = (id, type) => {
    handleClose();
    setConfirmation({
      ...confirmation,
      activity: true,
      type: type,
      id: id,
    });
  };

  const handleConfirmBtn = (e) => {
    if(e) e.preventDefault();
    if (confirmation?.type === 'reject' && !reason.trim()) {
      setReasonError(true); // Set error if reason is empty
      return; // Prevent further action
    }
      setReasonError(false);
      handleConnectionReq(confirmation?.id, confirmation?.type);
   
  };

  const closeConfirmation = () => {
    handleClose();
    setConfirmation({
      ...confirmation,
      bool: false,
      activity: false,
      type: '',
      id: '',
    });
    setReason('')
  };

  const handleSearch = (searchText) => {
    setSearch(searchText);
    getTableData(searchText);
  };

  return (
    <div className='px-9 py-9'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <div
        className='px-3 py-5'
        style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}
      >
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex gap-5 items-center '>
            <p>{title}</p>
            <p>
              {/* <img src={FilterIcon} alt='FilterIcon' /> */}
            </p>
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
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className='absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none'>
                <img src={SearchIcon} alt='SearchIcon' />
              </div>
            </div>
            <Dropdown
              label={'My Volunteer'}
              options={menteeOption}
              value={mentorType}
              handleDropdown={(event) =>{ 
                setMentorType(event.target.value)
                navigate(`/mentees?req=${event.target.value}`)
              }}
            />
          </div>
        </div>
        <div className='mx-5'>
          {mentorType === 'new-request-mentees' && (
            <div className='flex gap-3 mb-6'>
              {requestBtns.map((actionBtn, index) => (
                <button
                  key={index}
                  className='text-[14px]'
                  style={{
                    background:
                      requestTab === actionBtn.key
                        ? '#FE634E'
                        : 'rgba(249, 249, 249, 1)',
                    color: requestTab === actionBtn.key ? '#fff' : '#000',
                    borderRadius: '3px',
                    height: '40px',
                    width: '150px',
                    border: requestTab !== actionBtn.key && '1px solid rgba(0, 0, 0, 1)',
                  }}
                  onClick={() => handleTab(actionBtn.key)}
                >
                  {actionBtn.name}
                </button>
              ))}
            </div>
          )}

          <DataTable
            rows={menteeList?.results}
            columns={
              mentorType === 'my-mentee' ? myMenteeColumn : myReqMenteeColumn
            }
            hideCheckbox
            rowCount={menteeList?.count}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />

          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={confirmation?.activity&&confirmation?.type !== 'reject' }
          >
            <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center'>
              <img
                src={
                  confirmation?.type === 'reject'
                    ? RejectPopupIcon
                    : ConnectPopupIcon
                }
                alt='ConnectIcon'
              />
              <span
                style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}
              >
                {confirmation?.type === 'reject' ? 'Reject' : 'Connect'}
              </span>
<div>
</div>
              <div className='py-5'>
                <p
                  style={{
                    color: 'rgba(24, 40, 61, 1)',
                    fontWeight: 600,
                    fontSize: '18px',
                  }}
                >
                  Are you sure you want to
                  <span>
                    {' '}
                    {confirmation?.type === 'reject' ? 'reject' : 'follow'}{' '}
                  </span>
                  Volunteer?
                </p>
              </div>
              <div className='flex justify-center p-4'>
                <div className='flex gap-6 justify-center align-middle'>
                  <Button
                    btnName='Cancel'
                    btnCategory='secondary'
                    onClick={() => closeConfirmation()}
                  />

                  <Button
                    btnType='button'
                    btnCls='w-[110px] !bg-[#E0382D] border !border-[#E0382D] !text-[#fff]'
                    btnName={
                      confirmation?.type === 'reject' ? 'Reject' : 'Connect'
                    }
                    btnCategory={
                      confirmation?.type === 'reject' ? '' : 'primary'
                    }
                    onClick={() => handleConfirmBtn()}
                  />
                </div>
              </div>
            </div>
          </Backdrop>
          <MuiModal modalSize='md' modalOpen={confirmation?.activity&&confirmation?.type === 'reject'} modalClose={closeConfirmation} noheader>
<div className='px-5 py-5'>
    <div className='flex justify-center flex-col gap-5  mt-4 mb-4'
        style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px', }}>
        <div className='flex justify-between px-3 py-4 items-center' style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
            <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>Reject Request Reason </p>
            <img className='cursor-pointer' onClick={closeConfirmation} src={CancelIcon} alt="CancelIcon" />
        </div>

        <div className='px-5'>

            <form onSubmit={handleConfirmBtn}>
                <div className='relative pb-8'>
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Reject Reason <span style={{color: 'red'}}>{'*'}</span>
                    </label>

                    <div className='relative'>
                        <textarea
                             value={reason}
                             onChange={(e)=>{
                               setReason(e.target.value)
                               setReasonError(false)
                             }}
                            id="message" rows="4" className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                               focus-visible:outline-none focus-visible:border-none !border !border-[#E50027] w-[100%] !text-[#18283D] h-[130px]`}
                            placeholder={''}
                        ></textarea>
                       {reasonError && (
              <p className="text-red-500 text-xs mt-1">
                Please provide a reason for rejection.
              </p>
            )}
                    </div>
                </div>

                <div className='flex justify-center gap-5 items-center pt-5 pb-10'>
                    <Button btnName='Cancel' btnCls="w-[18%]" btnCategory="secondary" onClick={closeConfirmation} />
                    <button
                        type='submit'
                        className='text-white py-3 px-7 w-[18%]'
                        style={{ background: 'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)', borderRadius: '3px' }}>
                        Submit
                    </button>
                </div>
            </form>

        </div>


    </div>

</div>
</MuiModal>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={confirmation?.bool}
            onClick={() => closeConfirmation()}
          >

            <div className='px-5 py-1 flex justify-center items-center'>
              <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                style={{ background: '#fff', borderRadius: '10px' }}>
                <img src={SuccessTik} alt="SuccessTik" />
                <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                  style={{
                    fontWeight: 600
                  }}
                >{confirmation?.type === 'accept' &&
                  'Volunteer has been successfully connected'}
                {confirmation?.type === 'reject' &&
                  'Volunteer has been successfully deleted'}</p>
              </div>

            </div>
          </Backdrop>
        </div>
      </div>
    </div>
  );
};
