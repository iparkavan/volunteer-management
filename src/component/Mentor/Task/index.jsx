import React, { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardCard from '../../../shared/Card/DashboardCard';
import { pipeUrls, programActionStatus } from '../../../utils/constant';
import { Button } from '../../../shared';
import DataTable from '../../../shared/DataGrid';
import { mentorTaskColumns, mentorTaskListColumns } from '../../../mock';
import ViewIcon from '../../../assets/images/view1x.png';
import CloseIcon from '../../../assets/icons/closeIcon.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import MoreIcon from '../../../assets/icons/moreIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getMenteeTaskfromMentor } from '../../../services/task';
import {
  Backdrop,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import { fileNameFromUrl, fileNameString } from '../../../utils';
import dayjs from 'dayjs';
import EditIcon from '../../../assets/icons/editIcon.svg';
import moment from 'moment';

const MentorTask = () => {
  const [activeTaskMenu, setActiveTaskMenu] = useState('my-task');
  const [activeCategoryMenu, setActiveCategoryMenu] = useState('');
  const [activeTab, setActiveTab] = useState('all_programs');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [seletedItem, setSelectedItem] = useState({});
  const [taskFilesPopup, setTaskFilesPopup] = useState({
    modal: false,
    files: [],
  });
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    menteeTask,
    loading: menteeTaskLoading,
    status,
  } = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const taskList = [
    {
      name: 'My Task',
      key: 'my-task',
    },
    {
      name: 'Voluteer Task',
      key: 'mentee-task',
    },
  ];

  const Category = [
    {
      name: 'Teaching',
      key: 'teaching',
      count: '02',
    },
    {
      name: 'Social',
      key: 'social',
      count: '10',
    },
    {
      name: 'Category 1',
      key: 'category1',
      count: '04',
    },
    {
      name: 'Category 2',
      key: 'category2',
      count: '20',
    },
  ];

  const tabs = [
    {
      name: 'All Programs',
      key: 'all_programs',
    },
    {
      name: 'Ongoing  Programs',
      key: 'ongoing_programs',
    },
    {
      name: 'Completed Programs',
      key: 'completed_programs',
    },
    {
      name: 'Abort Programs',
      key: 'abort_programs',
    },
  ];

  const handleTab = (key) => {
    setActiveTab(key);
    setPaginationModel({
      page: 0,
      pageSize: 10,
    });
  };

  const handleNavigateDetails = (program) => {
    let baseUrl = pipeUrls.programdetails;
    if (Object.keys(program).length) {
      if (program.status === programActionStatus.yettostart)
        baseUrl = pipeUrls.assigntask;
      if (program.status === programActionStatus.assigned)
        baseUrl = pipeUrls.startprogram;
      if (program.status === programActionStatus.inprogress)
        baseUrl = pipeUrls.startprogram;
      navigate(`${baseUrl}/${program.id}`);
    }
  };

  const handleBookmark = (program) => {
    console.log('program', program);
  };

  const handleClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = (search) => {
    searchParams.set('search', search);
    setSearchParams(searchParams);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const programs = [
    {
      id: 2,
      program_name: 'React Bootcamp Demo',
      session_count: '10',
      description: 'Description about program',
      course_level: 'beginner',
      start_date: '2024-07-07T09:33:03Z',
      end_date: '2024-07-12T09:33:03Z',
      max_mentee_count: 10,
      group_chat_requirement: false,
      individual_chat_requirement: false,
      venue: 'USA',
      about_program: 'About program',
      image:
        'http://mentor-backend.dataterrain-dev.net/media/sponsor_logo/lap_J6Ea08I.jpg',
      image_url:
        'http://mentor-backend.dataterrain-dev.net/media/sponsor_logo/lap_J6Ea08I.jpg',
      benefits: 'Benefits',
      testimonial_types: 'blog',
      mentor_id: null,
      duration: 6,
      mentor_manager_id: null,
      status: 'completed',
      created_at: '2024-07-06T09:34:32.419883Z',
      created_by: 4,
      approved_by: null,
      is_approve: false,
      is_bookmark: false,
      skills: [
        {
          id: 1,
          name: 'Western',
          desc: 'Music sample text',
          category: 5,
        },
      ],
      categories: [
        {
          id: 1,
          name: 'Music',
        },
      ],
      certifications: [
        {
          id: 1,
          name: 'Carnatic',
          certificate_link: 'http://www.sample.com',
          certificate_description: 'THis is sample certificate for music',
          issue_date: '2024-07-05',
          category: 3,
        },
      ],
      members: [
        {
          id: 4,
          first_name: 'Subramaniyan',
          last_name: 'T',
          email: 'subramaniyan@dataterrain.com',
        },
      ],
      learning_materials: [
        {
          id: 1,
          category: 5,
          name: 'Music Learning Material',
          material_type: 'video',
          material_size: 742478,
          material_details:
            'This is sample learning video for development purpose',
          file: 'http://mentor-backend.dataterrain-dev.net/media/learning_materials/avi_video.avi',
          file_url: '/media/learning_materials/avi_video.avi',
        },
      ],
      mentor_name: null,
    },
    {
      id: 11,
      program_name: 'ss',
      session_count: '10',
      description: 'sss',
      course_level: 'beginner',
      start_date: '2024-07-31T13:16:44.809000Z',
      end_date: '2024-06-05T13:16:44.809000Z',
      max_mentee_count: 5,
      group_chat_requirement: true,
      individual_chat_requirement: true,
      venue: '11111',
      about_program: 'ss',
      image:
        'http://mentor-backend.dataterrain-dev.net/media/sponsor_logo/Screenshot_15.png',
      image_url:
        'http://mentor-backend.dataterrain-dev.net/media/sponsor_logo/Screenshot_15.png',
      benefits: 'ssss',
      testimonial_types: 'blog',
      mentor_id: null,
      duration: -55,
      mentor_manager_id: null,
      status: 'inprogress',
      created_at: '2024-07-08T13:18:26.736326Z',
      created_by: 8,
      approved_by: null,
      is_approve: false,
      is_bookmark: false,
      skills: [
        {
          id: 3,
          name: 'Boxing',
          desc: 'This is sample boxing description',
          category: 3,
        },
      ],
      categories: [
        {
          id: 1,
          name: 'Music',
        },
      ],
      certifications: [
        {
          id: 1,
          name: 'Carnatic',
          certificate_link: 'http://www.sample.com',
          certificate_description: 'THis is sample certificate for music',
          issue_date: '2024-07-05',
          category: 3,
        },
      ],
      members: [
        {
          id: 3,
          first_name: 'Murugesh',
          last_name: 'Sekar',
          email: 'murugesh@dataterrain.com',
        },
        {
          id: 8,
          first_name: 'Subash',
          last_name: 'A',
          email: 'subash@dataterrain.com',
        },
        {
          id: 10,
          first_name: 'Stephen',
          last_name: 'Johnson',
          email: 'stephen@email.com',
        },
        {
          id: 12,
          first_name: 'Karthikeyan',
          last_name: 'D',
          email: 'marketing@dataterrain.com',
        },
        {
          id: 13,
          first_name: 'Dillli',
          last_name: 'Rathnam',
          email: 'dilli@dataterrain.com',
        },
        {
          id: 9,
          first_name: 'Subramaniyan',
          last_name: 'T',
          email: 'tsubramaniyan2@gmail.com',
        },
        {
          id: 5,
          first_name: 'Krishna',
          last_name: 'M',
          email: 'menteeuser@gmail.com',
        },
        {
          id: 6,
          first_name: 'Karthik',
          last_name: 'Subbaraj',
          email: 'menteeuser1@gmail.com',
        },
        {
          id: 11,
          first_name: 'Test',
          last_name: 'User',
          email: 'testuser@gmail.com',
        },
        {
          id: 14,
          first_name: 'Sanjeev',
          last_name: 'Kumar',
          email: 'sanjeevkumar@email.com',
        },
        {
          id: 2,
          first_name: 'Madhan',
          last_name: 'K',
          email: 'krishshajahan7@gmail.com',
        },
        {
          id: 4,
          first_name: 'Subramaniyan',
          last_name: 'T',
          email: 'subramaniyan@dataterrain.com',
        },
        {
          id: 7,
          first_name: 'karthick',
          last_name: 'A',
          email: 'karthick@gmail.com',
        },
        {
          id: 1,
          first_name: '',
          last_name: '',
          email: 'admin@gmail.com',
        },
      ],
      learning_materials: [
        {
          id: 3,
          category: 2,
          name: 'Action Learning Material',
          material_type: 'document',
          material_size: 1139524,
          material_details: 'This is sample text for Action material',
          file: 'http://mentor-backend.dataterrain-dev.net/media/learning_materials/AWS_Certified_SysOps_Administrator_-_Associate_certificate.pdf',
          file_url:
            '/media/learning_materials/AWS_Certified_SysOps_Administrator_-_Associate_certificate.pdf',
        },
        {
          id: 6,
          category: 5,
          name: 'ER Diagram Screenshot1',
          material_type: 'document',
          material_size: 39246,
          material_details: 'Details about the Program Manager Voluteer project',
          file: 'http://mentor-backend.dataterrain-dev.net/media/learning_materials/Pngtreeinstagram_icon_instagram_logo_3584852.png',
          file_url:
            '/media/learning_materials/Pngtreeinstagram_icon_instagram_logo_3584852.png',
        },
        {
          id: 5,
          category: 5,
          name: 'Spiritual Learning MAterial',
          material_type: 'document',
          material_size: 558428,
          material_details: 'Sample text for Spiritual Learning Material',
          file: 'http://mentor-backend.dataterrain-dev.net/media/learning_materials/lap.jpg',
          file_url: '/media/learning_materials/lap.jpg',
        },
        {
          id: 4,
          category: 2,
          name: 'Adventure Learning Material',
          material_type: 'document',
          material_size: 269,
          material_details: 'This is sample text for adventure',
          file: 'http://mentor-backend.dataterrain-dev.net/media/learning_materials/lap_QIA9XEi.jpg',
          file_url: '/media/learning_materials/lap_QIA9XEi.jpg',
        },
        {
          id: 2,
          category: 2,
          name: 'Sports Learning Material',
          material_type: 'document',
          material_size: 558428,
          material_details: 'This is sample text for sports learning material',
          file: 'http://mentor-backend.dataterrain-dev.net/media/learning_materials/lap_6ajYWax.jpg',
          file_url: '/media/learning_materials/lap_6ajYWax.jpg',
        },
        {
          id: 1,
          category: 5,
          name: 'Music Learning Material',
          material_type: 'video',
          material_size: 742478,
          material_details:
            'This is sample learning video for development purpose',
          file: 'http://mentor-backend.dataterrain-dev.net/media/learning_materials/avi_video.avi',
          file_url: '/media/learning_materials/avi_video.avi',
        },
      ],
      mentor_name: null,
    },
  ];

  const handleFileLink = (files) => {
    setTaskFilesPopup({ modal: true, files: files });
  };

  const mentorTaskColumn = [
    ...mentorTaskListColumns,
    {
      field: 'created_date',
      headerName: 'Created Date',
      flex: 1,
      id: 0,
      renderCell: (params) => {
        return (
          <div>
            {params?.row?.assign_task_created_at
              ? moment(params?.row?.assign_task_created_at).format('MM-DD-YYYY')
              : '...'}
          </div>
        );
      },
    },
    {
      field: 'due_date',
      headerName: 'Due Date',
      flex: 1,
      id: 0,
      renderCell: (params) => {
        return (
          <div>
            {params?.row?.due_date
              ? moment(params.row.due_date).format('MM-DD-YYYY')
              : '...'}
          </div>
        );
      },
    },
    // {
    //   field: 'file_by',
    //   headerName: 'Link',
    //   flex: 1,
    //   id: 2,
    //   renderCell: (params) => {
    //     if (params.row.files && params.row.files.length) {
    //       const files = fileNameString(params.row.files);
    //       return (
    //         <>
    //           {
    //             <div className='flex  items-center'>
    //               <a
    //                 className='underline pr-3'
    //                 href={params.row.files[0].files}
    //                 target='_blank'
    //                 style={{ color: 'rgba(24, 40, 61, 1)' }}
    //                 title={files.fullName}
    //               >
    //                 {files.filename}
    //               </a>
    //               {files.remainingCount > 0 && (
    //                 <span
    //                   style={{
    //                     background: 'rgb(217, 228, 242)',
    //                     color: 'rgb(29, 91, 191)',
    //                     borderRadius: '50%',
    //                     fontWeight: 'bold',
    //                     width: '35px',
    //                     height: '35px',
    //                     marginTop: '4px',
    //                     display: 'flex',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                   }}
    //                   className='cursor-pointer'
    //                   onClick={() => handleFileLink(params.row.files)}
    //                 >
    //                   + {files.remainingCount}
    //                 </span>
    //               )}
    //             </div>
    //           }
    //         </>
    //       );
    //     }
    //     return <></>;
    //   },
    // },
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
              <img src={MoreIcon} alt='ViewIcon' />
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
                  navigate(`/mentor-tasks-details/${seletedItem.id}`)
                }
                className='!text-[12px]'
              >
                <img
                  src={ViewIcon}
                  alt='ViewIcon'
                  field={params.id}
                  className='pr-3 w-[30px]'
                />
                View
              </MenuItem>
              {
                seletedItem?.editable &&
                <>
                
                <MenuItem
                  onClick={() => handleEditTask()}
                  className='!text-[12px]'
                >
                  <img
                    src={EditIcon}
                    alt='EditIcon'
                    field={params.id}
                    className='pr-3 w-[30px]'
                  />
                  Edit Task
                </MenuItem>
                </>
              }
            </Menu>
          </>
        );
      },
    },
  ];

  const alltaskList = [
    {
      name: 'All Task',
      key: 'all',
    },
    {
      name: 'New Task',
      key: 'newtask',
    },
    {
      name: 'Pending Task',
      key: 'pending',
    },
    {
      name: 'Ongoing Task',
      key: 'ongoing',
    },
    {
      name: 'Waiting Task',
      key: 'waiting_for_approval',
    },
    {
      name: 'Rejected Task',
      key: 'rejected',
    },
    {
      name: 'Completed Task',
      key: 'completed',
    },
  ];

  const handleTaskMenu = (key) => {
    setActiveTaskMenu(key);
    if (key === 'mentee-task') {
      navigate(`${pipeUrls.mentortask}?type=menteetask`);
    }
  };

  const handleMenteeTaskFilterTab = (value) => {
    let queryString = `?status=${value}`;
    if (searchParams.get('type') === 'menteetask') {
      queryString += `&type=${searchParams.get('type')}`;
    }
    navigate(`${pipeUrls.mentortask}${queryString}`);
  };

  useEffect(() => {
    navigate(`${pipeUrls.mentortask}?type=menteetask`);
  }, []);

  useEffect(() => {
    let query = {
      page: paginationModel?.page + 1,
      limit: paginationModel?.pageSize,
    };

    const statusQuery = searchParams.has('status')
      ? searchParams.get('status')
      : '';
    if (statusQuery !== '') {
      query.status = statusQuery;
    }

    const searchQuery = searchParams.has('search')
      ? searchParams.get('search')
      : '';
    if (searchQuery !== '') {
      query.search = searchQuery;
    }

    if (Object.keys(query).length) {
      dispatch(getMenteeTaskfromMentor(query));
    }
  }, [searchParams, paginationModel]);

  const handleEditTask = () => {
    const keysToExclude = [
      'results',
      'count',
      'next',
      'total_pages',
      'previous',
      'next',
      'page_size',
      'current_page',
    ];

    const data = Object.fromEntries(
      Object.entries(seletedItem).filter(
        ([key]) => !keysToExclude.includes(key)
      )
    );

    const constructedData = {
      ...data,

      program_category_name: seletedItem?.category_name,
      program_name: seletedItem?.prgrame_name,
      program_startdate: seletedItem?.start_date,
      program_enddate: seletedItem?.end_date,
      task_name: seletedItem?.task_name,
      reference_link: seletedItem?.reference_links,
      task_details: seletedItem?.task_details,
      due_date: seletedItem?.due_date,
      assign_task_id: seletedItem?.id,
      list_mentees: seletedItem?.mentees_added_to_program,
      program_id: seletedItem?.program_id,
      program_duration: seletedItem?.duration,
      category_id: seletedItem?.category_id,
      mentor_id: seletedItem?.mentor_id,
      mentor_name: seletedItem?.mentor_name,
      task_id: seletedItem?.id,
      state_date: seletedItem?.start_date,
    };

    navigate(`/assign-mentees/?type=edit`, {
      state: {
        data: constructedData,
      },
    });
  };

  return (
    <div className='mentor-task px-9 py-9'>
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



            <div className='px-3 py-5 !border !border-[#DBE0E5] rounded-[10px]'>
                <div className='flex justify-between px-5 pb-4 mb-8 items-center'>
                    <div className='flex gap-5 items-center text-[20px]'>
                        <p className='text-[20px] text-[#18283D]' style={{ fontWeight: 500 }}>Volunteer Tasks</p>
                    </div>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <div className="relative">
                            <input type="text" id="search-navbar" className="block w-full p-2 text-sm text-gray-900 !border !border-background-primary-main"
                                placeholder="Search here..." style={{
                                    borderRadius: '1px',
                                    height: '45px',
                                    width: '280px',
                                    border: '1px solid #FE634E'
                                }}

                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <img src={SearchIcon} alt='SearchIcon' />
                            </div>
                        </div>
                        <Button btnType="button" style={{ backgroundColor : "#FE634E"}} btnCls="w-[150px]" btnName={'Create Task'} btnCategory="primary" onClick={() => navigate("/assign-mentees?type=new")} />

          </Stack>
        </div>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={menteeTaskLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <div className='mx-5'>
          <div className='main-grid grid grid-cols-5 gap-3'>
            {/* <div className="left-bar row-span-3 flex flex-col gap-8">
                            <div className="pb-3 w-full max-w-sm bg-white rounded-lg" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', background: 'rgba(255, 255, 255, 1)' }}>
                                <div className="title flex justify-between py-3 px-4 border-b-2">
                                    <h4 className="text-base" style={{ color: 'rgba(29, 91, 191, 1)' }}>Task</h4>
                                </div>
                                <ul className="flex flex-col gap-2 p-4 md:p-0 mt-4 font-medium">
                                    {
                                        taskList.map((menu, index) => {
                                            return (
                                                <li className="" key={index}>
                                                    <div className={`flex justify-between py-2 px-6 rounded cursor-pointer menu-content ${activeTaskMenu === menu.key ? 'active' : ''}
                                                        `} aria-current="page"
                                                        onClick={() => handleTaskMenu(menu.key)}>
                                                        <span className="text-sm">{menu.name}</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>

                            <div className="pb-3 w-full max-w-sm bg-white rounded-lg" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', background: 'rgba(255, 255, 255, 1)' }}>
                                <div className="title flex justify-between py-3 px-4 border-b-2">
                                    <h4 className="text-base" style={{ color: 'rgba(29, 91, 191, 1)' }}>Category</h4>
                                </div>
                                <ul className="flex flex-col gap-2 p-4 md:p-0 mt-4 font-medium">
                                    {
                                        Category.map((menu, index) => {
                                            return (
                                                <li className="" key={index}>
                                                    <div className={`flex justify-between py-2 px-6 rounded cursor-pointer menu-content ${activeCategoryMenu === menu.key ? 'active' : ''}
                                                        `} aria-current="page"
                                                        onClick={() => setActiveCategoryMenu(menu.key)}>
                                                        <span className="text-sm">{menu.name}</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        </div> */}

            <div className='flex relative flex-col col-span-5'>
              {activeTaskMenu === 'my-task1' ? (
                <>
                  <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-10'>
                    <ul className='flex flex-wrap -mb-px'>
                      {tabs.map((participatedTab) => (
                        <li className='me-2' key={participatedTab.key}>
                          <p
                            className={`inline-block p-4 border-b-2 cursor-pointer rounded-t-lg ${activeTab === participatedTab.key
                                ? 'active  text-blue-600 border-blue-500'
                                : ''
                              } `}
                            onClick={() => handleTab(participatedTab.key)}
                          >
                            {participatedTab.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <DashboardCard
                    title='All Programs'
                    viewpage='/programs?type=yettostart'
                    handleNavigateDetails={handleNavigateDetails}
                    handleBookmark={handleBookmark}
                    programs={programs}
                  />
                </>
              ) : (
                <>
                  {/* <div className='flex justify-between'>
                                            <div>
                                                <select style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '3px' }}
                                                    className='px-4 py-4 w-[250px] text-[14px]'
                                                    onChange={(e) => handleMenteeTaskFilterTab(e.target.value)}
                                                >
                                                    {
                                                        alltaskList.map(task => <option value={task.key} selected={searchParams.get('status') === task.key}>{task.name}</option>)
                                                    }
                                                </select>
                                            </div>

                                        </div> */}

                  <div className='task-list py-0'>
                    <DataTable
                      rows={menteeTask?.results ?? []}
                      columns={mentorTaskColumn}
                      hideCheckbox
                      rowCount={menteeTask?.count}
                      paginationModel={paginationModel}
                      setPaginationModel={setPaginationModel}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorTask;
