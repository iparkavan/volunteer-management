import {
  Backdrop,
  Box,
  Button as Btn,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import ThreeDotIcon from '../../assets/icons/threeDots.svg';
import ProfileImageIcon from '../../assets/icons/profile-image-icon.svg';
import { Button } from '../../shared';
import {
  followBtnText,
  MentorMenteeProfileViewList,
} from '../../utils/constant';
import ConnectIcon from '../../assets/images/Connectpop1x.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfileInfo,
  getRequestView,
  menteeCancelReq,
  mentorAcceptReq,
  updateUserList,
} from '../../services/userList';
import {
  cancelMemberRequest,
  getCategoryList,
  getprogramRequest,
  updateLocalRequest,
  updateMemberRequest,
  updateProgramMenteeRequest,
  updateProgramRequest,
} from '../../services/request';
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import CloseReqPopup from '../../assets/icons/closeReqPopup.svg';
import CancelReq from '../../assets/icons/cancelRequest.svg';
import CancelIcon from '../../assets/images/cancel-colour1x.png'
import ArrowRight from "../../assets/icons/breadCrumbsArrow.svg"
import { CancelPopup } from '../Mentor/Task/cancelPopup';

const MentorMenteeProfile = () => {
  const [activity, setActivity] = React.useState({
    bool: false,
    type: '',
  });

  const dispatch = useDispatch();
  const state = useLocation()?.state;
  const navigate = useNavigate();
console.log("state from mentormenteprofile ==>", state)
  const { profile } = useSelector((state) => state.profileInfo);
  const { status, userDetails, loading } = useSelector(
    (state) => state.userList
  );
  console.log(userDetails,"userDetails")
  const [createMeetingLoading, setCreateMeetingLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [cancelPopup, setCancelPopup] = React.useState({
    bool: false,
    activity: false,
  });
  const userInfo = useSelector(state => state.userInfo)
  const role = userInfo.data.role
  const { requestData } = useSelector(
    (state) => state.userList
  );
  const statusStyle = {
    rejected:
      'text-[16px] w-[auto] px-3 h-[40px] flex items-center justify-center !text-[#E0382D] border border-[#E0382D] rounded-[3px] whitespace-nowrap',
    connected:
      'text-[16px] w-[140px] h-[40px] flex items-center justify-center !text-[#1D5BBF] border border-[#1D5BBF] rounded-[3px]',
  };
  const [adminPopup, setAdminPopup] = React.useState({
    bool: false,
    activity: false,
    type: ""
  })


  const handleOpenAdminApprove = (type = "") => {
    setAdminPopup({
      ...adminPopup,
      bool: true,
      type: type
    })
  }

  const handleCloseAdminApprove = (type = "") => {
    setAdminPopup({
      ...adminPopup,
      bool: false,
      activity: false,
      close: false,
      type: ""
    })
  }

  const handleAdminProgram = (type, reason) => {
  try {
      let payload = {
        follow_id: requestData?.id,
        status: type,
  
      }
      if (type === "reject") {
        payload = {
          ...payload,
          cancelled_reason: reason,
        }
      }
      dispatch(mentorAcceptReq(payload)).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          setAdminPopup({
            ...adminPopup,
            bool: false,
          })
          setMessage(true)

        }
      });
    } catch (error) {
      setAdminPopup({
        ...adminPopup,
        bool: false,
      })
      setMessage(false)
  }
  }

  React.useEffect(() => {
    if (state?.user_id !== '') {
      console.log(state, "state")
      dispatch(
        getProfileInfo({ id: state?.user_id })
      );
       if (role === 'mentor'&&state?.row_id) {
            dispatch(getRequestView(parseInt(state?.row_id)));
          }
    }
  }, [state?.user_id]);
  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(false)
        navigate(-1)
      }, [2000]);
    }
  }, [message]);

  const handleFollowMentee = () => {
    const payload = {
      // follow_id: state?.row_id,
      status: activity?.type,
    };

    dispatch(mentorAcceptReq(payload));
  };

  React.useEffect(() => {
    dispatch(updateUserList({ status: '' }));
    if (status === 'done') {
      setActivity(false);
      setCreateMeetingLoading(true);
      setTimeout(() => {
        setCreateMeetingLoading(false);
        dispatch(updateUserList({ status: '' }));
        dispatch(
          getProfileInfo({ id: state?.user_id })
        );
      }, [2000]);
    }
  }, [status]);

  const handleOpenCancelPopup = () => {
    setCancelPopup({
      bool: true,
      activity: false,
    });
  };

  const handleCloseCancelPopup = () => {
    setCancelPopup({
      bool: false,
      activity: false,
    });
  };

  const handleCancelRequest = () => {
    const payload = {
      follow_id: state?.row_id,
    };

    dispatch(menteeCancelReq(payload)).then((res) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        setCancelPopup({
          ...cancelPopup,
          bool: false,
          activity: true,
        });
        setTimeout(() => {
          handleCloseCancelPopup();
        }, [2000]);
      }
    });
  };

  const profileType = {
    mentee: "Volunteer Profile",
    mentor: "Program Manager Profile"
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        ml={'32px'}
        mt={'16px'}
      >
        <Typography
          className='!text-[12px] !text-[#5975A2] cursor-pointer'
          onClick={() =>
            navigate(
              state?.from === "category" ? -1 : state?.page !== 'requested_mentor' ? '/mentees' : '/mentors',
              {
                state: {
                  type:
                    state?.page !== 'requested_mentor'
                      ? 'new_req_mentee'
                      : 'requestmentor',
                },
              }
            )
          }
        >
          {state?.from === "category" ? "Category View" : state?.page !== 'requested_mentor'
            ? 'New Request Volunteer'
            : 'Request Program Managers'}
        </Typography>
        <img src={ArrowRight} />
        <Typography className='!text-[12px] !text-[#18283D]'>
          {state?.from === "category" ?
            profileType[userDetails?.role] :
            state?.page !== 'requested_mentor'
              ? 'Volunteer Profile'
              : 'View New Request Program Manager Profile'}
        </Typography>
      </Stack>
      <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={message}
            onClick={() => setMessage(false)}
          >

            <div className='px-5 py-1 flex justify-center items-center'>
              <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                style={{ background: '#fff', borderRadius: '10px' }}>
                <img src={SuccessTik} alt="SuccessTik" />
                <p className='text-[16px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1D5BBF] to-[#00AEBD]'
                  style={{
                    fontWeight: 600
                  }}
                >{adminPopup?.type === "accept" &&
                  'Mentee has been successfully connected'}
                {adminPopup?.type === 'reject' &&
                  'Mentee has been successfully deleted'}</p>
              </div>

            </div>
          </Backdrop>
      <div className='border border-[#DBE0E5] rounded-[6px] bg-[#fff] m-[32px] p-[32px]'>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <div className='text-[#353F4F] text-[20px] font-medium'>
            Profile
          </div>
          {
            ((role === "mentor")) &&state?.status !=="accept"&&state?.status !=="cancel"&&
            <div className='flex gap-4 pt-10'>
              <button
                className='py-3 px-16 text-white text-[14px] flex items-center'
                style={{
                  border: '1px solid #E0382D',
                  borderRadius: '5px',
                  color: '#E0382D',
                }}
                onClick={() => handleOpenAdminApprove("reject")}
              >
                Reject
              </button>
              <button
                className='py-3 px-16 text-white text-[14px] flex items-center'
                style={{
                  background: '#16B681',
                  borderRadius: '5px',
                }}
                onClick={() => handleOpenAdminApprove("accept")}
              >
                Connect
              </button>
            </div>
          }
          {state?.page !== 'requested_mentor' ? (
            // <Box
            //   className={
            //     'h-[40px] w-[40px] rounded-[6px] bg-[#DFEDFF] flex items-center justify-center'
            //   }
            // >
            //   <img src={ThreeDotIcon} />
            // </Box>
            <>
              {
                state?.from === "category" &&
                <div onClick={() => {
                  navigate(-1)
                }} className='cursor-pointer'>
                  <img src={CancelIcon} alt='CancelIcon' />
                </div>
              }
            </>
          ) : (
            <div
              className='cursor-pointer'
              onClick={() => {
                navigate('/mentors', {
                  state: { type: 'requestmentor' },
                });
              }}
            >
              <img src={CloseReqPopup} />
            </div>
          )}
        </Stack>
        <Divider className='pt-4 pb-4'></Divider>

        <Box className={'mt-[40px]'}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <div className='py-4 relative w-[12%]'>
              <div className='upload-profile'>
                <label
                  className='w-[40%] pb-3 rounded-lg text-white text-[14px] cursor-pointer'
                  style={{
                    border: 'none',
                  }}
                >
                  <img
                    src={userDetails?.profile_image ?? ProfileImageIcon}
                    style={{ borderRadius: '50%', height: '143px' }}
                    alt='ProfileImageIcon'
                  />
                  <div
                    src={''}
                    className='absolute top-[50%] left-2 cursor-pointer'
                    alt='ProfileImagePencilIcon'
                  />
                </label>
              </div>
            </div>

            {userDetails?.request_status === 'new' &&
              state?.page !== 'requested_mentor' && (
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                  <Btn
                    variant='outlined'
                    disableElevation
                    className='text-[16px] !text-[#E0382D] w-[140px] h-[43px] hover:bg-[transparent]'
                    style={{
                      border: '1px solid #E0382D',
                      textTransform: 'capitalize',
                    }}
                    onClick={() =>
                      setActivity({
                        bool: true,
                        type: 'reject',
                      })
                    }
                  >
                    {'Reject'}
                  </Btn>
                  <Button
                    onClick={() =>
                      setActivity({
                        bool: true,
                        type: 'accept',
                      })
                    }
                    btnType='button'
                    btnName='Connect'
                    btnCls={'w-[140px]'}
                  />
                </Stack>
              )}

            {state?.page === 'requested_mentor' &&
              (userDetails?.request_status === 'new' ||
                userDetails?.request_status === 'pending') && (
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                  <Btn
                    variant='outlined'
                    disableElevation
                    className='text-[16px] !text-[#E0382D] w-[100%] h-[43px] hover:bg-[transparent]'
                    style={{
                      border: '1px solid #E0382D',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => handleOpenCancelPopup()}
                  >
                    {'Cancel Request'}
                  </Btn>
                  <Button
                    onClick={() =>
                      setActivity({
                        bool: true,
                        type: 'accept',
                      })
                    }
                    btnType='button'
                    btnName='Chat'
                    btnCls={'w-[140px]'}
                  />
                </Stack>
              )}

            {(state?.page !== 'requested_mentor' &&
              userDetails?.request_status === 'cancel') && (
                <Typography className={statusStyle['rejected']}>
                  Rejected
                </Typography>
              )}
            {userDetails?.request_status === 'accept' && (
              <Typography className={statusStyle['connected']}>
                Connected
              </Typography>
            )}
            {(state?.page === 'requested_mentor' &&
              userDetails?.request_status === 'cancel') && (
                <Typography className={statusStyle['rejected']}>
                  Request Canceled
                </Typography>
              )}
          </Stack>

          <Grid container spacing={4}>
            {MentorMenteeProfileViewList(
              state?.page === 'requested_mentor'
            )?.map((e) => {
              return (
                !e?.hide && (
                  <Grid item xs={e?.grid}>
                    <Stack>
                      <label
                        className='block tracking-wide  text-xs mb-2'
                        style={{ color: 'rgba(116, 116, 116, 1)' }}
                      >
                        {e.label}
                      </label>
                      {e?.value === 'documents' ? (
                        <Stack
                          direction={'row'}
                          alignItems={'center'}
                          spacing={2}
                        >
                          {userDetails?.documents?.map((doc) => {
                            return (
                              <Link
                                target="_blank"
                                href={doc?.file}
                                variant='body2'
                                className={'text-[18px]'}
                              >
                                {doc?.file_display_name}
                              </Link>
                            );
                          })}
                        </Stack>
                      ) : (
                        <p className='text-[14px]'>
                          {userDetails?.[e?.value] ?? '-'}
                        </p>
                      )}
                    </Stack>
                  </Grid>
                )
              );
            })}
          </Grid>
        </Box>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={activity?.bool}
      >
        <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center'>
          <img src={ConnectIcon} alt='ConnectIcon' />
          <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
            {activity?.type === 'reject' ? 'Reject' : 'Connect'}
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
                {activity?.type === 'reject' ? 'reject' : 'connect'}{' '}
              </span>
              Volunteer?
            </p>
          </div>
          <div className='flex justify-center'>
            <div className='flex gap-6 justify-center align-middle'>
              <Button
                btnName='Cancel'
                btnCategory='secondary'
                onClick={() => setActivity(false)}
              />
              <Button
                btnType='button'
                btnCls='w-[110px] !bg-[#E0382D]'
                btnName={activity?.type === 'reject' ? 'Reject' : 'Connect'}
                btnCategory={
                  activity?.type === 'reject' ? 'secondary' : 'primary'
                }
                onClick={() => handleFollowMentee()}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={createMeetingLoading}
        onClick={() => setCreateMeetingLoading(false)}
      >
        <div className='px-5 py-1 flex justify-center items-center'>
          <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
            style={{ background: '#fff', borderRadius: '10px' }}>
            <img src={SuccessTik} alt="SuccessTik" />
            <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
              style={{
                fontWeight: 600
              }}
            >{followBtnText[userDetails?.is_follow]} is Successfully</p>
          </div>

        </div>
      </Backdrop>

      {/* cancel request popup */}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={cancelPopup?.bool}
      >
        <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] p-[12px] justify-center items-center'>
          <div className='border border-[#E50027] rounded-[15px] h-[100%] w-[100%] justify-center items-center flex flex-col relative'>
            <div
              className='absolute top-[12px] right-[12px]'
              onClick={() => handleCloseCancelPopup()}
            >
              <img src={CloseReqPopup} />
            </div>
            <img src={CancelReq} alt='ConnectIcon' />

            <div className='py-5'>
              <p
                style={{
                  color: 'rgba(24, 40, 61, 1)',
                  fontWeight: 600,
                  fontSize: '18px',
                }}
              >
                Are you sure want to cancel this Request?
              </p>
            </div>
            <div className='flex justify-center'>
              <div className='flex gap-6 justify-center align-middle'>
                <Button
                  btnName='No'
                  btnCategory='secondary'
                  btnCls='border !border-[#E50027] !text-[#E50027] w-[110px]'
                  onClick={() => handleCloseCancelPopup()}
                />
                <Button
                  btnType='button'
                  btnCls='w-[110px] !bg-[#E50027] !text-[#fff] border !border-[#E50027]'
                  btnName={'Yes'}
                  btnCategory='secondary'
                  onClick={() => handleCancelRequest()}
                />
              </div>
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={cancelPopup?.activity}
        onClick={() => setCreateMeetingLoading(false)}
      >
        <div className='px-5 py-1 flex justify-center items-center'>
          <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
            style={{ background: '#fff', borderRadius: '10px' }}>
            <img src={SuccessTik} alt="SuccessTik" />
            <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
              style={{
                fontWeight: 600
              }}
            >Program Manager request has been successfully cancelled</p>
          </div>

        </div>
      </Backdrop>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={adminPopup?.bool && adminPopup?.type === "accept"}
      >
        <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center'>
          <img src={ConnectIcon} alt='ConnectIcon' />
          {/* <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
            {followInfo.is_following ? 'Unfollow' : 'Follow'}
          </span> */}

          <div className='py-5'>
            <p
              style={{
                color: 'rgba(24, 40, 61, 1)',
                fontWeight: 600,
                fontSize: '18px',
              }}
            >
              Are you sure you want to approve request?
            </p>
          </div>
          <div className='flex justify-center'>
            <div className='flex gap-6 justify-center align-middle'>
              <Button
                btnName='Cancel'
                btnCategory='secondary'
                onClick={() => handleCloseAdminApprove()}
              />
              <Button
                btnType='button'
                btnCls='w-[110px]'
                btnName={'Yes'}
                btnCategory='primary'
                onClick={() => handleAdminProgram("accept")}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      <CancelPopup open={(adminPopup?.bool && adminPopup?.type === "reject")} header="Rejection Reason"
        handleClosePopup={() => handleCloseAdminApprove()}
        handleSubmit={(reason) => handleAdminProgram("reject", reason)} />
    </>
  );
};

export default MentorMenteeProfile;
