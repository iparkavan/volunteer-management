import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import DataTable from '../../shared/DataGrid';
import FilterIcon from '../../assets/icons/Filter.svg';
import StarIcon from '../../assets/icons/filledStar.svg';
import MoreIcon from '../../assets/icons/moreIcon.svg';
import ViewIcon from '../../assets/images/view1x.png';
import SearchIcon from '../../assets/images/search1x.png';
import ReportIcon from '../../assets/icons/report.svg';
import FollowIcon from '../../assets/images/connect1x.png';

import Dropdown from '../../shared/Dropdown';
import { mentorColumns, mentorRows } from '../../mock';
import {
  getMyMentors,
  getMyReqMentors,
  getMyTopMentors,
  menteeCancelReq,
  menteeFollowReq,
  menteeUnFollowReq,
  updateUserList,
} from '../../services/userList';
import { myMentorColumns } from '../../utils/formFields';
import { Backdrop, CircularProgress } from '@mui/material';
import { Button } from '../../shared';
import ConnectIcon from '../../assets/images/Connectpop1x.png';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import {
  followBtnText,
  requestStatusColor,
  requestStatusText,
} from '../../utils/constant';
import CloseRequest from '../../assets/icons/closeCircle.svg';
import CloseReqPopup from '../../assets/icons/closeReqPopup.svg';
import CancelReq from '../../assets/icons/cancelRequest.svg';
import dayjs from 'dayjs';

export const Mentors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams] = useSearchParams();
  const mentortype = searchParams.get('type');
  const mentortypereq = searchParams.get('req');
  const state = useLocation()?.state;

  const { mentorList, loading, status } = useSelector(
    (state) => state.userList
  );

  const [mentorType, setMentorType] = useState(
    mentortypereq?mentortypereq: mentortype ?? state?.type === 'requestmentor' ?  'requestmentor' : 'mymentor'
  );
  const [requestTab, setRequestTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState({});
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = React.useState('');
  const [followPopup, setFollowPopup] = React.useState({
    bool: false,
    data: {},
    type: '',
  });
  const [createMeetingLoading, setCreateMeetingLoading] = React.useState({
    bool: false,
    type: '',
  });
  const [cancelPopup, setCancelPopup] = React.useState({
    bool: false,
    activity: false,
  });

  const mentorOption = [
    {
      name: 'My Program Manager',
      value: 'mymentor',
    },
    {
      name: 'Top Program Managers',
      value: 'topmentor',
    },
    {
      name: 'New Follow Requests',
      value: 'requestmentor',
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
      name: 'Accept',
      key: 'accept',
    },
    {
      name: 'Cancel',
      key: 'cancel',
    },
  ];

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, row) => {
    setSelectedItem(row);
    setAnchorEl(event.currentTarget);
  };

  const mentorColumn = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      id: 0,
      renderCell: (params) => {
        return (
          <div className='flex gap-2 items-center'>
            {params.row.first_name} {params.row.last_name}
          </div>
        );
      },
    },
    ...myMentorColumns,
    {
      field: 'ratings',
      headerName: 'Ratings',
      flex: 1,
      id: 5,
      renderCell: (params) => {
        return (
          <div className='flex gap-2 items-center'>
            {' '}
            <img src={StarIcon} alt='StarIcon' />
            {params?.row?.average_rating === 0
              ? 3
              : params?.row?.average_rating}
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      id: 6,
      renderCell: (params) => {
        return (
          <>
            <div
              className='cursor-pointer flex items-center h-full'
              onClick={(event) => {
                handleClick(event, params.row);
              }}
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
                onClick={() => navigate(`/mentor-details/${selectedItem.id}`)}
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  selectedItem?.is_follow !== 'waiting' &&
                    handleOpenFollowPopup(
                      selectedItem.id,
                      selectedItem?.is_follow
                    );
                }}
                className='!text-[12px]'
              >
                <img
                  src={FollowIcon}
                  alt='FollowIcon'
                  className='pr-3 w-[27px]'
                />
                {followBtnText[selectedItem?.is_follow]}
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const reqMentorColumn = [
    {
      field: 'mentor_name',
      headerName: 'Name',
      flex: 1,
      id: 0,
    },
    ...myMentorColumns,
    {
      field: 'ratings',
      headerName: 'Ratings',
      flex: 1,
      id: 5,
      renderCell: (params) => {
        return (
          <div className='flex gap-2 items-center'>
            {' '}
            <img src={StarIcon} alt='StarIcon' />
            {params?.row?.average_rating === 0
              ? 3
              : params?.row?.average_rating}
          </div>
        );
      },
    },
    {
      field: 'request_date',
      headerName: 'Request Date',
      flex: 1,
      id: 5,
      renderCell: (params) => {
        return (
          <div className='flex gap-2 items-center'>
            {' '}
            {params?.row?.requested_date
              ? dayjs(params?.row?.requested_date).format('DD/MM/YYYY')
              : '...'}
          </div>
        );
      },
    },
    {
      field: 'last_request_date',
      headerName: 'Last Request Date',
      flex: 1,
      id: 5,
      renderCell: (params) => {
        return (
          <div className='flex gap-2 items-center'>
            {' '}
            {params?.row?.cancelled_date
              ? dayjs(params?.row?.cancelled_date).format('DD/MM/YYYY')
              : '...'}
          </div>
        );
      },
    },
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
      id: 6,
      renderCell: (params) => {
        return (
          <>
            <div
              className='cursor-pointer flex items-center h-full'
              onClick={(event) => {
                handleClick(event, params.row);
              }}
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
                      row_id: selectedItem?.id,
                      user_id: selectedItem?.following,
                      page: 'requested_mentor',
                    },
                  })
                }
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
              {(selectedItem.status === "new" ||
                                        selectedItem.status === "pending") &&
                                    <>
              <MenuItem
                onClick={() => {
                  handleOpenCancelPopup(selectedItem);
                }}
                className='!text-[12px]'
              >
                <img
                  src={CloseRequest}
                  alt='FollowIcon'
                  className='pr-3 w-[27px]'
                />
                Cancel Request
              </MenuItem>
              </>}
            </Menu>
          </>
        );
      },
    },
  ];

  const title =
    mentorOption.find((option) => option.value === mentorType)?.name || '';

  const handleTab = (key) => setRequestTab(key);

  const getMentorDatas = (type = mentorType) => {
    if (type === 'topmentor') {
      dispatch(getMyTopMentors(paginationModel));
    } else if (type === 'requestmentor') {
      dispatch(
        getMyReqMentors({
          page: paginationModel?.page + 1,
          limit: paginationModel?.pageSize,
          status: requestTab,
        })
      );
    } else {
      dispatch(getMyMentors(paginationModel));
    }
  };
  useEffect(() => {
    if(searchParams.get('req')){
     setMentorType(searchParams.get('req'))
     getMentorDatas(searchParams.get('req'))
    }
   }, [searchParams]);
  useEffect(() => {
    getMentorDatas();
  }, [paginationModel]);

  useEffect(() => {
    if (status === 'done') {
      setCreateMeetingLoading({
        ...createMeetingLoading,
        bool: true,
      });
      setTimeout(() => {
        setCreateMeetingLoading({
          bool: false,
          type: '',
        });
        dispatch(updateUserList({ status: '' }));
        getMentorDatas(mentorType);
        setMentorType(mentorType);
        setFollowPopup({
          bool: false,
          id: '',
          type: '',
        });
      }, [2000]);
    }
  }, [status]);

  const handleMentorTypeChange = (value) => {
    setMentorType(value);
    getMentorDatas(value);
    setPaginationModel({
      page: 0,
      pageSize: 10,
    });
    navigate(`/mentors?req=${value}`)
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (mentorType === 'topmentor') {
      dispatch(getMyTopMentors({ ...paginationModel, search: value }));
    } else if (mentorType === 'requestmentor') {
      dispatch(
        getMyReqMentors({
          page: paginationModel?.page + 1,
          limit: paginationModel?.pageSize,
          search: value,
          status: requestTab,
        })
      );
    } else {
      dispatch(getMyMentors({ ...paginationModel, search: value }));
    }
  };

  const handleOpenFollowPopup = (id, type) => {
    handleClose();
    setFollowPopup({
      bool: true,
      id: id,
      type: type,
    });
    setCreateMeetingLoading({
      ...createMeetingLoading,
      type: type,
    });
  };
  const handleCloseFollowPopup = () => {
    setFollowPopup({
      bool: false,
      data: '',
    });
  };

  const handleSubmitBtn = (id) => {
    if (followPopup?.type === 'accepted') {
      handleUnFollowMentor(id);
    } else {
      handleFollowMentor(id);
    }
  };

  const handleFollowMentor = async (id) => {
    const payload = {
      user_id: id,
    };
    await dispatch(menteeFollowReq(payload)).then(() => {
      setFollowPopup({
        bool: false,
        id: '',
      });
    });
  };

  const handleUnFollowMentor = (id) => {
    const payload = {
      user_id: id,
    };

    dispatch(menteeUnFollowReq(payload)).then(() => {
      setFollowPopup({
        bool: false,
        id: '',
      });
    });
  };

  const handleOpenCancelPopup = (data) => {
    handleClose();
    setCancelPopup({
      bool: true,
      activity: false,
      data: data,
    });
  };

  const handleCloseCancelPopup = () => {
    setCancelPopup({
      bool: false,
      activity: false,
    });
  };

  const handleTabSwitch = (value) => {
    handleTab(value);
    dispatch(
      getMyReqMentors({
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        search: search,
        status: value,
      })
    );
  };

  const handleCancelRequest = async () => {
    const payload = {
      follow_id: cancelPopup?.data?.id,
    };
    await dispatch(menteeCancelReq(payload)).then((res) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        setCancelPopup({
          bool: false,
          activity: true,
        });
        setMentorType('requestmentor');
        setTimeout(() => {
          setCancelPopup({
            bool: false,
            activity: false,
          });
        }, 2000);
      }
    });
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
              label={'My Program Managers'}
              options={mentorOption}
              value={mentorType}
              handleDropdown={(event) =>
                handleMentorTypeChange(event.target.value)
              }
            />
          </div>
        </div>
        <div className='mx-5'>
          {mentorType === 'requestmentor' && (
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
                  onClick={() => handleTabSwitch(actionBtn.key)}
                >
                  {actionBtn.name}
                </button>
              ))}
            </div>
          )}

          <DataTable
            rows={mentorList?.results}
            columns={
              mentorType === 'requestmentor' ? reqMentorColumn : mentorColumn
            }
            hideCheckbox
            rowCount={mentorList?.count}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </div>
      </div>

      {/* Follow Request Popup */}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={followPopup?.bool}
      >
        <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center'>
          <img src={ConnectIcon} alt='ConnectIcon' />
          <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
            {/* {followInfo.is_following ? 'UnFollow' : 'Follow'} */}
            {followPopup?.type === 'accepted' ? 'Unfollow' : 'Follow'}
            {/* Follow */}
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
                {followPopup?.type === 'accepted' ? 'unfollow' : 'follow'}{' '}
              </span>
              Program Manager?
            </p>
          </div>
          <div className='flex justify-center'>
            <div className='flex gap-6 justify-center align-middle'>
              <Button
                btnName='Cancel'
                btnCategory='secondary'
                onClick={() => handleCloseFollowPopup()}
              />
              <Button
                btnType='button'
                btnCls='w-[110px]'
                btnName={
                  followPopup?.type === 'accepted' ? 'Unfollow' : 'Follow'
                }
                btnCategory='primary'
                onClick={() => handleSubmitBtn(followPopup?.id)}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={createMeetingLoading?.bool}
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
            >{createMeetingLoading?.type === 'accepted'
              ? 'Unfollow is Successfully'
              : 'Connect is Successfully'}</p>
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
              className='absolute top-[12px] right-[12px] cursor-pointer'
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
    </div>
  );
};
