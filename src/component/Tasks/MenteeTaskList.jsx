import React, { useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/SearchColor.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getMenteeAllTask } from '../../services/task';
import Cancel from '../../assets/images/cancel-colour1x.png';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

export default function MenteeTaskList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [searchKey, setSearchKey] = useState('');
  const { activity } = useSelector((state) => state.activity);
  const { menteeProgramTask, loading } = useSelector((state) => state.tasks);
  const state = useLocation()?.state

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    let query = {
      mentee_id: searchParams.get('mentee_id'),
      Program_id: searchParams.get('program_id'),
    };

    if (searchValue !== '') {
      query.search = searchValue;
    }
    dispatch(getMenteeAllTask(query));
    setSearchKey(searchValue);
  };

  useEffect(() => {
    if (searchParams.has('mentee_id') && searchParams.has('program_id')) {
      dispatch(
        getMenteeAllTask({
          mentee_id: searchParams.get('mentee_id'),
          Program_id: searchParams.get('program_id'),
        })
      );
    }
  }, [searchParams]);

  return (
    <div className='nofification px-9 py-9'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <div
        className='px-3 py-5'
        style={{
          boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        }}
      >
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex w-full gap-5 items-center justify-between'>
            <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 500 }}>
              View Volunteer Task List
            </p>
          </div>
          <div
            className='cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <img src={Cancel} alt='link' className='w-[20px] h[10px]' />
          </div>
        </div>

        <div className='notification-content'>
          {menteeProgramTask.length || searchKey !== '' ? (
            <div className='nofification-action'>
              <div className='relative'>
                <input
                  type='text'
                  className='block w-full p-2 text-sm text-gray-900 border-none'
                  placeholder='Search here'
                  style={{
                    background: 'rgba(238, 245, 255, 1)',
                    height: '55px',
                    width: '300px',
                    borderRadius: '6px',
                  }}
                  onChange={handleSearch}
                />
                <div className='absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none'>
                  <img src={SearchIcon} alt='SearchIcon' />
                </div>
              </div>
            </div>
          ) : null}

          <div className='notification-container'>
            {menteeProgramTask.length ? (
              <ul>
                {menteeProgramTask.map((list, index) => (
                  <li key={index}>
                    <div className='flex justify-between items-center w-full'>
                      <p className='notification-message'>
                        <p className='font-normal flex gap-2 items-center'>
                          <p>{list.task_name}</p>
                          <p
                            className={`px-7 py-1 task_action_${(list?.result ?? "fail")?.toLowerCase()}`}
                          >
                            {list.result ?? "No Pass"}
                          </p>
                        </p>
                        <p className='text-[13px] pt-4 leading-6'>
                          {list.task_description}
                        </p>
                      </p>
                      <button
                        className='py-3 px-2 w-[200px] text-white'
                        style={{
                          background: 'rgba(29, 91, 191, 1)',
                          borderRadius: '6px',
                        }}
                        onClick={() =>
                          navigate(
                            `/viewTask/${list.id}`,
                            {
                              state: {
                                from: "program",
                                type: "certificate"
                              }
                            }
                          )
                        }
                      >
                        View Task
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No Task found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
