import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  MenteePersonalInformationFields,
  PersonalInfoFields,
} from '../../../utils/formFields';
import CalendarIcon from '../../../assets/images/calender_1x.png';
import { user, view } from '../../../utils/constant';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
// import { CalendarIcon } from '@mui/x-date-pickers';
// import CalendarIcon from '../../../assets/images/calender_1x.png';

const PersonalInfoSection = ({ type }) => {
  const userInfo = useSelector((state) => state.userInfo);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
  } = useFormContext();

  const PersonalInfoRoleFields =
    userInfo.data.role === user.mentor
      ? PersonalInfoFields
      : userInfo.data.role === user.mentee
      ? MenteePersonalInformationFields
      : PersonalInfoFields;
  return (
    <div className='grid grid-cols-6 gap-6'>
      {PersonalInfoRoleFields.map((field) => {
        // console.log(getValues(field.name));
        switch (field.type) {
          case 'input':
            return (
              <div
                key={field.name}
                className={`${field.width}`}
                style={{ marginBottom: '16px' }}
              >
                <label
                  className='block disabled:text-gray-100 tracking-wide  text-xs mb-2'
                  style={{ color: 'rgba(116, 116, 116, 1)' }}
                >
                  {field.label}
                  {field?.inputRules?.required && '*'}
                </label>
                {type === view.viewOnly ? (
                  <p className='text-[14px] pt-3'>
                    {getValues(field.name) ? getValues(field.name) : '-'}
                  </p>
                ) : (
                  <Controller
                    name={field.name}
                    control={control}
                    defaultValue=''
                    rules={field.inputRules}
                    render={({ field: controllerField }) => (
                      <input
                        {...register(field.name, field.inputRules)}
                        type={field.fieldtype}
                        className='w-full border-none px-3 py-[0.32rem] disabled:bg-gray-100 leading-[2.15] input-bg focus:border-none focus-visible:border-none
                                                          focus-visible:outline-none text-[14px] h-[60px]'
                        placeholder={field.placeholder}
                        style={{
                          color: '#232323',
                          borderRadius: '3px',

                          paddingLeft: '10px',
                        }}
                        disabled={field.disabled}
                        aria-invalid={!!errors[field.name]}
                      />
                    )}
                  />
                )}
                {errors[field.name] && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            );

          case 'radio':
            return (
              <div
                key={field.name}
                className={`${field.width}`}
                style={{ marginBottom: '16px' }}
              >
                <label
                  className='block tracking-wide text-xs mb-2'
                  style={{ color: 'rgba(116, 116, 116, 1)' }}
                >
                  {field.label}
                </label>
                {type === view.viewOnly ? (
                  <p className='text-[14px] pt-3'>
                    {getValues(field.name) ? getValues(field.name) : '-'}
                  </p>
                ) : (
                  <div>
                    <Controller
                      name={field.name}
                      control={control}
                      defaultValue=''
                      rules={field.inputRules}
                      render={({ field: controllerField }) => (
                        <div className='flex items-center justify-start gap-6 mt-6'>
                          {field.options.map((option) => (
                            <label
                              className='flex items-center justify-center gap-1'
                              key={option.key}
                              style={{ marginRight: '8px' }}
                            >
                              <input
                                type='radio'
                                value={option.value}
                                checked={controllerField.value === option.value}
                                onChange={(e) =>
                                  controllerField.onChange(e.target.value)
                                }
                              />
                              {option.value}
                            </label>
                          ))}
                        </div>
                      )}
                    />
                    {errors[field.name] && (
                      <p style={{ color: 'red', fontSize: '12px' }}>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          case 'checkbox':
            return (
              <div
                key={field.name}
                className={`${field.width}`}
                style={{ marginBottom: '16px' }}
              >
                <label
                  className='block tracking-wide text-xs mb-2'
                  style={{ color: 'rgba(116, 116, 116, 1)' }}
                >
                  {field.label}
                </label>
                {type === view.viewOnly ? (
                  <p className='text-[14px] pt-3'>
                    {getValues(field.name) ? getValues(field.name) : '-'}
                  </p>
                ) : (
                  <div>
                    <Controller
                      name={field.name}
                      control={control}
                      defaultValue=''
                      rules={field.inputRules}
                      render={({ field: controllerField }) => (
                        <div className='flex items-center justify-start gap-6 mt-6'>
                          {field.options.map((option) => (
                            <label
                              className='flex items-center justify-center gap-1'
                              key={option.key}
                              style={{ marginRight: '8px' }}
                            >
                              <input
                                type='radio'
                                value={option.value}
                                checked={controllerField.value === option.value}
                                onChange={(e) =>
                                  controllerField.onChange(e.target.value)
                                }
                              />
                              {option.value}
                            </label>
                          ))}
                        </div>
                      )}
                    />
                    {errors[field.name] && (
                      <p style={{ color: 'red', fontSize: '12px' }}>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );

          case 'date':
            return (
              <div className={`${field.width} relative`}>
                <label
                  className='block disabled:bg-gray-100 tracking-wide text-xs mb-2'
                  style={{ color: 'rgba(116, 116, 116, 1)' }}
                >
                  {field.label}
                </label>
                {type === view.viewOnly ? (
                  <p className='text-[14px] pt-3'>
                    {getValues(field.name) ? getValues(field.name) : '-'}
                  </p>
                ) : (
                  <div className='relative'>
                    <Controller
                      name={field.name}
                      control={control}
                      defaultValue={null}
                      // rules={{ required: 'Date is required' }}
                      render={({ field: dateField }) => {
                        const value = getValues(field.name)
                          ? new Date(getValues(field.name))
                          : null;

                        console.log(value);
                        return (
                          <Calendar
                            className='calendar-control disabled:bg-gray-100 input-bg'
                            value={value}
                            disabled={field.disabled}
                            onChange={(e) => dateField.onChange(e.value)}
                            dateFormat='dd/mm/yy'
                          />
                        );
                      }}
                    />
                    <img
                      className='absolute top-5 right-2'
                      src={CalendarIcon}
                      alt='CalendarIcon'
                    />
                    {errors.date && (
                      <p className='error' role='alert'>
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );

          case 'dropdown':
            return (
              <div className={`${field.width}`}>
                <label
                  className='block tracking-wide text-xs mb-2'
                  style={{ color: 'rgba(116, 116, 116, 1)' }}
                >
                  {field.label}
                </label>
                {type === view.viewOnly ? (
                  <p className='text-[14px] pt-3'>
                    {getValues(field.name) ? getValues(field.name) : '-'}
                  </p>
                ) : (
                  <div>
                    <select
                      {...register(field.name, field.inputRules)}
                      className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg
                     focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]'
                      placeholder={field.placeholder}
                      style={{
                        color: '#232323',
                        borderRight: '16px solid transparent',
                      }}
                    >
                      <option value=''>Select</option>
                      {field.options.map((option, index) => (
                        <option value={option.key} key={index}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    {errors[field.name] && (
                      <p className='error' role='alert'>
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default PersonalInfoSection;
