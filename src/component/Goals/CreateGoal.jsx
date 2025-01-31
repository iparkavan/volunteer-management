import React, { useEffect, useRef, useState } from 'react';
import CancelIcon from '../../assets/images/cancel1x.png';
import CalendarIcon from '../../assets/images/calender_1x.png';
import MuiModal from '../../shared/Modal';
import { useForm } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { Button } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal, reCreateGoal, updateGoal } from '../../services/goalsInfo';
import { Backdrop, CircularProgress } from '@mui/material';
import { goalPeriods } from '../../utils/constant';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function CreateGoal({
  open,
  handleCloseModal,
  seletedItem,
  editMode,
  recreate = false,
}) {
  const [dateFormat, setDateFormat] = useState({});
  const calendarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.goals);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    let apiData = {
      goal_name: data?.goal_name,
      designation: data?.goal_designation,
      description: data?.goal_description,
      period: parseInt(data.period),
      start_date: dayjs(data?.start_date).format('YYYY-MM-DD'),
    };

    if (editMode) {
      apiData = {
        ...apiData,
        id: seletedItem.id,
      };
      if (recreate) {
        dispatch(reCreateGoal(apiData)).then((res) => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            if (recreate) {
              handleCloseModal();
            }
          }
        });
      } else {
        dispatch(updateGoal(apiData)).then((res) => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            if (!recreate) {
              handleCloseModal();
            }
          }
        });
      }
    } else {
      dispatch(createGoal(apiData)).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          if (!recreate) {
            handleCloseModal();
          }
        }
      });
    }
    reset();
    setDateFormat({});
  };

  const handleClose = () => {
    handleCloseModal();
    reset();
  };

  useEffect(() => {
    reset({});
    setDateFormat({});
  }, []);

  useEffect(() => {
    if (editMode) {
      const constructed = {
        ...seletedItem,
        goal_name: seletedItem?.goal_name,
        goal_designation: seletedItem?.designation,
        goal_description: seletedItem?.description,
        period: seletedItem?.period,
        start_date: recreate ? new Date() : seletedItem?.start_date,
      };
      reset(constructed);
      setDateFormat({ ...dateFormat, start_date: '' });
    } else if (!recreate) {
      const constructed = {
        goal_name: seletedItem?.goal_name,
        goal_designation: seletedItem?.designation,
        goal_description: seletedItem?.description,
        period: seletedItem?.period,
        start_date: seletedItem?.start_date,
        ...seletedItem,
      };
      reset(constructed);
    } else {
      reset({});
    }
  }, [seletedItem, editMode]);

  const handleDateClick = () => {
    setTimeout(() => {
      document.querySelector('.p-datepicker')?.classList.add('goals-date');
    }, 300);
  };

  useEffect(() => {
    return document
      .querySelector('.p-datepicker')
      ?.classList.remove('goals-date');
  }, []);

  const dateField = register('start_date', {
    required: 'This field is required',
  });
  return (
    <div>
      <MuiModal
        modalSize='lg'
        modalOpen={open}
        modalClose={handleClose}
        noheader
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <div className='px-5 py-5'>
          <div
            className='flex justify-center flex-col gap-5  mt-4 mb-4'
            style={{
              border: '1px solid rgba(0, 0, 0, 1)',
              borderRadius: '10px',
            }}
          >
            <div
              className='flex justify-between px-3 py-4 items-center'
              style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)' }}
            >
              <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>
                {recreate ? 'Re-Create' : editMode ? 'Edit ' : 'Create New'}{' '}
                Goal{' '}
              </p>
              <img
                className='cursor-pointer'
                onClick={handleClose}
                src={CancelIcon}
                alt='CancelIcon'
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='px-5'>
                {/* {
                                    error !== '' ? <p className="error" role="alert">{error}</p> : null
                                } */}
                <div className='relative pb-8'>
                  <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    {recreate
                      ? 'Goal Name'
                      : editMode
                      ? 'Edit Goal'
                      : 'Goal Name'}
                  </label>

                  <div className='relative'>
                    <input
                      {...register('goal_name', {
                        required: 'This field is required',
                      })}
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
                  {errors['goal_name'] && (
                    <p className='error' role='alert'>
                      {errors['goal_name'].message}
                    </p>
                  )}
                </div>

                <div className='relative pb-8'>
                  <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Goal Designation
                  </label>

                  <div className='relative'>
                    <input
                      {...register('goal_designation', {
                        required: 'This field is required',
                      })}
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
                  {errors['goal_designation'] && (
                    <p className='error' role='alert'>
                      {errors['goal_designation'].message}
                    </p>
                  )}
                </div>

                <div className='relative pb-8'>
                  <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Start Date
                  </label>
                  <div className='relative'>
                    <Calendar
                      className='calendar-control input-bg demo-cc'
                      {...dateField}
                      value={
                        recreate
                          ? new Date()
                          : dateFormat['start_date'] ||
                            new Date(seletedItem.start_date)
                      }
                      onChange={(e) => {
                        dateField.onChange(e);
                        setDateFormat({ ...dateFormat, start_date: e.value });
                        calendarRef?.current?.hide();
                      }}
                      onClick={handleDateClick}
                      minDate={new Date()}
                      hourFormat='12'
                      dateFormat='dd/mm/yy'
                      ref={(el) => (calendarRef.current = el)}
                    />
                    <img
                      className='absolute top-5 right-2 cursor-pointer'
                      src={CalendarIcon}
                      alt='CalendarIcon'
                      onClick={(e) => {
                        handleDateClick();
                        calendarRef?.current?.show();
                      }}
                    />
                  </div>
                  {errors['start_date'] && (
                    <p className='error' role='alert'>
                      {errors['start_date'].message}
                    </p>
                  )}
                </div>

                <div className='relative pb-8'>
                  <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Duration
                  </label>

                  <div className='relative'>
                    <>
                      <select
                        {...register('period', {
                          required: 'This field is required',
                        })}
                        className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg  
                                                            focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]'
                        placeholder={'Select Period'}
                        style={{
                          color: '#232323',
                          borderRight: '16px solid transparent',
                        }}
                      >
                        <option value=''>Select</option>
                        {goalPeriods.map((goalPeriod) => (
                          <option value={goalPeriod.value}>
                            {goalPeriod.name}
                          </option>
                        ))}
                      </select>
                      {errors['period'] && (
                        <p className='error' role='alert'>
                          {errors['period'].message}
                        </p>
                      )}
                    </>
                  </div>
                </div>

                <div className='relative pb-8'>
                  <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Goal Description
                  </label>

                  <div className='relative'>
                    <textarea
                      {...register('goal_description', {
                        required: 'This field is required',
                      })}
                      id='message'
                      rows='4'
                      className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                                                   focus-visible:outline-none focus-visible:border-none`}
                      placeholder={''}
                    ></textarea>
                    {errors['goal_description'] && (
                      <p className='error' role='alert'>
                        {errors['goal_description'].message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex justify-center gap-5 items-center pt-5 pb-10'>
                  <Button
                    btnName='Cancel'
                    btnCls='w-[18%]'
                    btnCategory='secondary'
                    onClick={handleClose}
                  />
                  <button
                    type='submit'
                    className='text-white py-3 px-7 w-[18%] whitespace-nowrap'
                    style={{
                      background:"#FE634E",
                      borderRadius: '3px',
                    }}
                  >
                    {recreate
                      ? 'Submit to Supervisor'
                      : editMode
                      ? 'Update '
                      : 'Create'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MuiModal>
    </div>
  );
}
