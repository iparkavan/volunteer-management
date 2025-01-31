import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import DataTable from '../../shared/DataGrid';

import MoreIcon from '../../assets/icons/moreIcon.svg';
import CloseIcon from '../../assets/icons/closeIcon.svg';
import ViewIcon from '../../assets/images/view1x.png';
import SearchIcon from '../../assets/images/search1x.png';
import RequestIcon from '../../assets/images/Requesttask1x.png';
import CancelIcon from '../../assets/images/cancel-colour1x.png';

import { taskColumns } from '../../mock';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MuiModal from '../../shared/Modal';
import { Button } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../services/task';
import { Backdrop, CircularProgress } from '@mui/material';
import {
  pipeUrls,
  taskStatusColor,
  taskStatusText,
} from '../../utils/constant';
import { fileNameFromUrl, fileNameString } from '../../utils';

export const Tasks = () => {
  const [requestTab, setRequestTab] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTask, setSearchTask] = useState('');
  const open = Boolean(anchorEl);
  const [searchParams] = useSearchParams();
  const [requestTask, setRequestTask] = useState(false);
  const [taskFilesPopup, setTaskFilesPopup] = useState({
    modal: false,
    files: [],
  });
  const [seletedItem, setSelectedItem] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskList, loading } = useSelector((state) => state.tasks);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const handleFileLink = (files) => {
    setTaskFilesPopup({ modal: true, files: files });
  };

  const taskMenuList = [
    {
      name: 'All Tasks',
      key: 'all',
    },
    {
      name: 'New Tasks',
      key: 'newtask',
    },
    {
      name: 'Pending Tasks',
      key: 'pending',
    },
    {
      name: 'Waiting Tasks',
      key: 'waiting_for_approval',
    },
    {
      name: 'Re Assign Tasks',
      key: 'reassigned',
    },
    {
      name: 'Completed Tasks',
      key: 'completed',
    },
    {
      name: 'Rejected Tasks',
      key: 'rejected',
    },
    {
        name: 'Draft',
        key: 'draft'
    },
  ];

  const list = [...taskColumns].map((column) => {
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
                    background: taskStatusColor[params.row.status]?.bg || '',
                    lineHeight: '30px',
                    borderRadius: '3px',
                    width: '110px',
                    height: '34px',
                    color: taskStatusColor[params.row.status]?.color || '',
                    fontSize: '12px',
                  }}
                >
                  {' '}
                  {taskStatusText[params.row.status]}
                </span>
              </div>
            </>
          );
        },
      };
    }
    return column;
  });

  const mentorColumn = [
    ...list,
    {
      field: 'file_by',
      headerName: 'Link',
      flex: 1,
      id: 2,
      renderCell: (params) => {
        if (params.row.files && params.row.files.length) {
          const files = fileNameString(params.row.files);
          return (
            <>
              {
                <div className='flex  items-center'>
                  <a
                    className='underline pr-3'
                    href={params.row.files[0].files}
                    target='_blank'
                    style={{ color: 'rgba(24, 40, 61, 1)' }}
                    title={files.fullName}
                  >
                    {files.filename}
                  </a>
                  {files.remainingCount > 0 && (
                    <span
                      style={{
                        background: 'rgb(217, 228, 242)',
                        color: 'rgb(29, 91, 191)',
                        borderRadius: '50%',
                        fontWeight: 'bold',
                        width: '35px',
                        height: '35px',
                        marginTop: '4px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      className='cursor-pointer'
                      onClick={() => handleFileLink(params.row.files)}
                    >
                      + {files.remainingCount}
                    </span>
                  )}
                </div>
              }
            </>
          );
        }
        return <></>;
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
                  navigate(`/mentee-tasks-details/${seletedItem.id}`)
                }
                className='!text-[12px]'
              >
                <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                View
              </MenuItem>
              {/* <MenuItem onClick={() => { setAnchorEl(null); setRequestTask(true) }} className='!text-[12px]'>
                            <img src={RequestIcon} alt="RequestIcon" className='pr-3 w-[27px]' />
                            Request Task
                        </MenuItem> */}
            </Menu>
          </>
        );
      },
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  const handleTab = (key) => {
    let typeString = `?type=${key}`;
    if (key === 'all') {
      typeString = '';
    }
    navigate(`${pipeUrls.menteetask}${typeString}`);
    setRequestTab(key);
    setPaginationModel({
      page: 0,
      pageSize: 10,
    });
    handleTaskSearch('');
  };

  const handleTaskSearch = (value) => {
    setSearchTask(value);
  };

  useEffect(() => {
    dispatch(
      getAllTasks({
        search: searchTask,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
      })
    );
  }, [searchTask]);

  useEffect(() => {
    const filterType = searchParams.get('type');

    let query = {};
    if (filterType && filterType !== '') {
      query = { status: filterType };
    }
    dispatch(
      getAllTasks({
        ...query,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
      })
    );
  }, [searchParams, paginationModel]);

  return (
    <div className='p-9'>
      <MuiModal
        modalSize='lg'
        modalOpen={requestTask}
        modalClose={() => {
          setRequestTask(false);
        }}
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
                Request Task{' '}
              </p>
              <img
                className='cursor-pointer'
                onClick={() => setRequestTask(false)}
                src={CancelIcon}
                alt='CancelIcon'
              />
            </div>

            <div className='px-5'>
              <div className='relative pb-8'>
                <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Request Title
                </label>

                <div className='relative'>
                  <input
                    type='text'
                    className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                            focus-visible:outline-none text-[14px] h-[60px]'
                    placeholder={''}
                    style={{
                      color: '#232323',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>

              <div className='relative pb-8'>
                <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Comments
                </label>

                <div className='relative'>
                  <textarea
                    id='message'
                    rows='4'
                    className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                                                   focus-visible:outline-none focus-visible:border-none`}
                    placeholder={''}
                  ></textarea>
                </div>
              </div>

              <div className='flex justify-center gap-5 items-center pt-5 pb-10'>
                <Button
                  btnName='Cancel'
                  btnCls='w-[18%]'
                  btnCategory='secondary'
                  onClick={() => setRequestTask(false)}
                />
                <button
                  onClick={() => setRequestTask(false)}
                  className='text-white py-3 px-7 w-[18%]'
                  style={{
                    background:
                      'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)',
                    borderRadius: '3px',
                  }}
                >
                  Submit to Program Manager
                </button>
              </div>
            </div>
          </div>
        </div>
      </MuiModal>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={taskFilesPopup.modal}
      >
        <div className='py-3 px-4 bg-white' style={{ borderRadius: '3px' }}>
          <div
            style={{
              border: '1px solid rgba(29, 91, 191, 1)',
              borderRadius: '3px',
            }}
            className='py-2'
          >
            <div
              className='flex justify-between px-3 py-1'
              style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}
            >
              <p style={{ color: 'rgba(29, 91, 191, 1)' }}>
                Reference Link View
              </p>
              <img
                src={CloseIcon}
                alt='CloseIcon'
                className='cursor-pointer'
                onClick={() => setTaskFilesPopup({ modal: false, files: [] })}
              />
            </div>
            <ul className='text-black py-2 px-5 leading-10'>
              {taskFilesPopup.files.map((file, index) => {
                return (
                  <li key={index}>
                    <a
                      href={file.files}
                      style={{
                        color: 'rgba(24, 40, 61, 1)',
                        textDecoration: 'underline',
                      }}
                      target='_blank'
                    >
                      {fileNameFromUrl(file.files)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Backdrop>

      <div
        className='px-3 py-5'
        style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}
      >
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex gap-5 items-center text-[20px]'>
            <p>Tasks</p>
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
                value={searchTask}
                onChange={(e) => handleTaskSearch(e.target.value)}
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
                className={`px-5 py-4 text-[14px] !border ${requestTab === actionBtn.key && '!border-background-primary-light'}`}
                style={{
                  background: requestTab === actionBtn.key ? '#FE634E' : 'rgba(249, 249, 249, 1)',
                  color: requestTab === actionBtn.key ? '#FFF' : '#000', 
                  borderRadius: '3px',
                  border: '1px solid rgba(0, 0, 0, 1)',
                  borderColor: requestTab === actionBtn.key ? '#FE634E' : 'transparent', 
                }}
                onClick={() => handleTab(actionBtn.key)}
              >
                {actionBtn.name}
              </button>
            ))}
          </div>

          {!loading && (
            <DataTable
              rows={taskList?.results ?? []}
              columns={mentorColumn}
              hideCheckbox
              rowCount={taskList?.count}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          )}
        </div>
      </div>
    </div>
  );
};
