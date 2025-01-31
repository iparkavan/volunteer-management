import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Backdrop, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MoreIcon from '../../assets/icons/moreIcon.svg';
import MaleIcon from '../../assets/images/male-profile1x.png';
import FemaleIcon from '../../assets/images/female-profile1x.png';
import SearchIcon from '../../assets/icons/search.svg';
import RejectIcon from '../../assets/icons/reject.svg';
import ConnectIcon from '../../assets/images/connect1x.png';
import TickCircle from '../../assets/icons/tickCircle.svg';
import ConnectPopupIcon from '../../assets/images/Connectpop1x.png';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import RejectPopupIcon from '../../assets/icons/rejectPopup.svg';
import CloseCircle from '../../assets/icons/closeCircle.svg';
import TickColorIcon from '../../assets/icons/tickColorLatest.svg';
import CancelIcon from '../../assets/images/cancel1x.png';
import ViewIcon from '../../assets/images/view1x.png';
import {
  getprogramRequest,
  updateProgramMenteeRequest,
} from '../../services/request';
import MuiModal from '../../shared/Modal';
import { Button } from '../../shared';
import DataTable from '../../shared/DataGrid';
import {
  getMyReqMentees,
  mentorAcceptReq,
  updateUserList,
} from '../../services/userList';

export default function RecentRequests({ data = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { programRequest, loading, status, error } = useSelector(
    (state) => state.requestList
  );
  const { menteeList, status: tabStatus } = useSelector(
    (state) => state.userList
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [seletedItem, setSelectedItem] = useState({});
  const [confirmPopup, setConfirmPopup] = useState({
    title: '',
    type: '',
    action: '',
  });
  const [confirmation, setConfirmation] = React.useState({
    bool: false,
    activity: false,
    type: '',
    id: '',
  });
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAcceptProgramRequest = () => {
    setConfirmPopup({ title: 'Program Request', type: 'approve' });
    handleClose();
  };

  const handleCancelProgramRequest = () => {
    setConfirmPopup({ title: '', type: 'reject' });
    handleClose();
  };

  const handleCancelConfirmPopup = () => {
    setConfirmPopup({ title: '', type: '' });
  };

  // Confirm Accept Popup
  const handleConfirmPopup = () => {
    dispatch(
      updateProgramMenteeRequest({
        id: seletedItem.id,
        action: 'accept',
      })
    ).then(() => {
      getRecentRequest();
      handleCancelConfirmPopup();
    });
  };

  // Reject Request
  const handleCancelReasonPopupSubmit = (data) => {
    dispatch(
      updateProgramMenteeRequest({
        id: seletedItem.id,
        action: 'cancel',
        cancelled_reason: data.cancel_reason,
      })
    ).then(() => {
      getRecentRequest();
      handleCancelConfirmPopup();
    });
  };

  const getRecentRequest = () => {
    const mentorRecentRequestPayload = {
      request_type: 'new',
      created_at: 'mentee',
      recent: 6,
    };
    dispatch(getprogramRequest(mentorRecentRequestPayload));
  };
  const handleOpenActivityPopup = (id, type) => {
    handleClose();
    setConfirmation({
      ...confirmation,
      activity: true,
      type: type,
      id: id,
    });
  };
  const getTableData = (search = '') => {
    dispatch(
      getMyReqMentees({
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        search: search,
        status: 'new',
      })
    );
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
  };
  useEffect(() => {
    getTableData();
  }, [paginationModel]);
  console.log("seletedItem===>", seletedItem)
  const recentRequestColumn = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      id: 1,
    },
    {
      field: 'profession',
      headerName: 'professional',
      flex: 1,
      id: 1,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      flex: 1,
      id: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      id: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      id: 0,
      renderCell: (params) => {
        return (
          <>
            <div
              className='pt-1 cursor-pointer'
              style={{ marginLeft: 'auto', marginTop: '20px' }}
              onClick={(e) => handleMoreClick(e, params.row)}
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
                onClick={(e) =>
                  navigate(`/profileView`, {
                    state: {
                      row_id: seletedItem?.id,
                      user_id: seletedItem?.requested_by,
                      is_approved: seletedItem?.is_approved,
                    },
                  })
                }
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
              {(seletedItem?.status === 'new' ||
                seletedItem?.status === 'pending') && (
                <MenuItem
                  onClick={() =>
                    handleOpenActivityPopup(seletedItem?.id, 'accept')
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
              {(seletedItem?.status === 'new' ||
                seletedItem?.status === 'pending') && (
                <MenuItem
                  onClick={() =>
                    handleOpenActivityPopup(seletedItem?.id, 'reject')
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
  const handleConnectionReq = (id, status) => {
    const payload = {
      follow_id: id,
      status: status,
    };

    dispatch(mentorAcceptReq(payload));
  };

  const handleConfirmBtn = () => {
    handleConnectionReq(confirmation?.id, confirmation?.type);
  };
  useEffect(() => {
    getRecentRequest();
  }, []);
  React.useEffect(() => {
    if (tabStatus === 'done') {
      setConfirmation({
        ...confirmation,
        activity: false,
        bool: true,
      });
      setTimeout(() => {
        closeConfirmation();
        getTableData();

        dispatch(updateUserList({ status: '' }));
      }, [2000]);
    }
  }, [tabStatus]);

  return (
    <div
      className='recent-request'
      style={{
        boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
      }}
    >
      <div className='title flex justify-between py-3 px-4 border-b-2 items-center'>
        <div className='flex gap-4'>
          <div
            className='card-dash'
            style={{
              background: '#FFF1E7',
              border: "1px solid #FFF1E7"
            }}
          ></div>
          <h4>Recent Requests</h4>
        </div>
        <div className='flex gap-4 items-center'>
          <img src={SearchIcon} alt='statistics' />
          <p
            className='text-[12px] py-2 px-2 cursor-pointer'
            onClick={() =>
              navigate('/mentees', {
                state: {
                  type: 'new_req_mentee',
                },
              })
            }
            style={{
              backgroundColor: '#FE634E',
              borderRadius: '5px',
              color: "#fff"
            }}
          >
            View All
          </p>
        </div>
      </div>

      <div className='content flex gap-4 py-5 px-5 overflow-x-auto'>
        <DataTable
          rows={menteeList?.results || []}
          columns={recentRequestColumn}
          height={'460px'}
          hideCheckbox
          rowCount={menteeList?.count}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
        {/* {
                    programRequest.map((recentRequest, index) =>
                        <div key={index} className="lg:w-5/12 md:w-1/3 py-3 px-3" style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px' }}>
                            <div className="flex gap-2 pb-3" style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
                                <div className="w-1/4"> <img src={index % 2 === 0 ? MaleIcon : FemaleIcon} alt="male-icon" /> </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[14px]" style={{ width: '100px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                        title={recentRequest.program_name}
                                    >{recentRequest.program_name}</p>
                                    <p className="text-[12px]">{recentRequest.position}</p>
                                </div>
                                <div className="pt-1 cursor-pointer" style={{ marginLeft: 'auto' }}
                                    onClick={(e) => handleMoreClick(e, recentRequest)}
                                ><img src={MoreIcon} alt="MoreIcon" /></div>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={(e) => navigate(`/program-details/${seletedItem.program}?request_id=${seletedItem.id}`)} className='!text-[12px]'>
                                        <img src={ViewIcon} alt="ViewIcon" field={recentRequest.id} className='pr-3 w-[30px]' />
                                        View
                                    </MenuItem>
                                    {
                                        (recentRequest.status === 'new' || recentRequest.status === 'pending') &&
                                        <>
                                            <MenuItem onClick={handleAcceptProgramRequest} className='!text-[12px]'>
                                                <img src={TickCircle} alt="AcceptIcon" className='pr-3 w-[27px]' />
                                                Approve
                                            </MenuItem>
                                            <MenuItem onClick={handleCancelProgramRequest} className='!text-[12px]'>
                                                <img src={CloseCircle} alt="CancelIcon" className='pr-3 w-[27px]' />
                                                Reject
                                            </MenuItem>
                                        </>
                                    }
                                </Menu>
                            </div>
                            <div className="flex gap-3 pt-3">
                                <div className="flex items-center gap-1">
                                    <span className="lg:w-2 lg:h-2  rounded-full" style={{ background: 'rgba(29, 91, 191, 1)' }}></span>
                                    <span className="lg:text-[10px]">Attended({recentRequest.attended || 0})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="lg:w-2 lg:h-2  rounded-full" style={{ background: 'rgba(0, 174, 189, 1)' }}></span>
                                    <span className="lg:text-[10px]">Completed({recentRequest.completed || 0})</span>
                                </div>
                            </div>
                        </div>

                    )
                } */}
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => 1 }}
        open={confirmPopup.type === 'approve'}
      >
        <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center'>
          <img src={TickColorIcon} alt='TickColorIcon' />
          <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
            {'Approve'}
          </span>
          <div className='py-5'>
            <p
              style={{
                color: 'rgba(24, 40, 61, 1)',
                fontWeight: 600,
                fontSize: '18px',
              }}
            >
              Are you sure want to approve Program Request?
            </p>
          </div>
          <div className='flex justify-center'>
            <div className='flex gap-6 justify-center align-middle'>
              <Button
                btnCls='w-[110px]'
                btnName={'Cancel'}
                btnCategory='secondary'
                onClick={handleCancelConfirmPopup}
              />
              <Button
                btnType='button'
                btnCls='w-[110px]'
                btnName={'Approve'}
                style={{ background: '#16B681' }}
                btnCategory='primary'
                onClick={handleConfirmPopup}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      {/* {'Cancel Popup'} */}
      <MuiModal
        modalSize='md'
        modalOpen={confirmPopup.type === 'reject'}
        modalClose={handleCancelConfirmPopup}
        noheader
      >
        <div className='px-5 py-5'>
          <div
            className='flex justify-center flex-col gap-5  mt-4 mb-4'
            style={{
              border: '1px solid rgba(29, 91, 191, 1)',
              borderRadius: '10px',
            }}
          >
            <div
              className='flex justify-between px-3 py-4 items-center'
              style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}
            >
              <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>
                Reject Request Reason{' '}
              </p>
              <img
                className='cursor-pointer'
                onClick={handleCancelConfirmPopup}
                src={CancelIcon}
                alt='CancelIcon'
              />
            </div>

            <div className='px-5'>
              {error !== '' ? (
                <p className='error' role='alert'>
                  {error}
                </p>
              ) : null}

              <form onSubmit={handleSubmit(handleCancelReasonPopupSubmit)}>
                <div className='relative pb-8'>
                  <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Reject Reason
                  </label>

                  <div className='relative'>
                    <textarea
                      {...register('cancel_reason', {
                        required: 'This field is required',
                      })}
                      id='message'
                      rows='4'
                      className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                               focus-visible:outline-none focus-visible:border-none`}
                      style={{ border: '2px solid rgba(229, 0, 39, 1)' }}
                      placeholder={''}
                    ></textarea>
                    {errors['cancel_reason'] && (
                      <p className='error' role='alert'>
                        {errors['cancel_reason'].message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex justify-center gap-5 items-center pt-5 pb-10'>
                  <Button
                    btnName='Cancel'
                    btnCls='w-[18%]'
                    btnCategory='secondary'
                    onClick={handleCancelConfirmPopup}
                  />
                  <button
                    type='submit'
                    className='text-white py-3 px-7 w-[18%]'
                    style={{
                      background:
                        'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)',
                      borderRadius: '3px',
                    }}
                  >
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
        open={confirmation?.activity}
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
          <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
            {confirmation?.type === 'reject' ? 'Reject' : 'Connect'}
          </span>

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
          <div className='flex justify-center'>
            <div className='flex gap-6 justify-center align-middle'>
              <Button
                btnName='Cancel'
                btnCategory='secondary'
                onClick={() => closeConfirmation()}
              />

              <Button
                btnType='button'
                btnCls='w-[110px] !bg-[#E0382D] border !border-[#E0382D] !text-[#fff]'
                btnName={confirmation?.type === 'reject' ? 'Reject' : 'Connect'}
                btnCategory={confirmation?.type === 'reject' ? '' : 'primary'}
                onClick={() => handleConfirmBtn()}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={confirmation?.bool}
        onClick={() => closeConfirmation()}
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
              {confirmation?.type === 'accept' &&
                'Volunteer has been successfully connected'}
              {confirmation?.type === 'reject' &&
                'Volunteer has been successfully deleted'}
            </p>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
