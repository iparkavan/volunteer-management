import { Breadcrumbs, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NewTicketFields } from '../../../utils/super-admin-form-fields';
import { Controller, useForm } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import AddPlusIcon from '../../../assets/icons/add-plus-icon.svg';
import UploadIcon from '../../../assets/images/image_1x.png';
import { view } from '../../../utils/constant';
import DeleteIcon from '../../../assets/images/delete_1x.png';
import { Button } from '../../../shared';
import { useCreateTicketMutation } from '../../../features/tickets/tickets-slice';

const AddNewTicket = ({ type }) => {
  const navigate = useNavigate();

  // const [createTicket, { isLoading, isError, isSuccess, error }] =
  //   useCreateTicketMutation();

  const [filePreviews, setFilePreviews] = useState({});
  const imageUploadRef = useRef(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
  } = useForm();

  const breadcrumbs = [
    <Link
      variant='body2'
      underline='hover'
      key='1'
      color='inherit'
      to='/dashboard'
    >
      Dashboard
    </Link>,
    <Typography key='2' variant='body2' color={'primary'}>
      New Ticket
    </Typography>,
  ];

  const imageClickHandler = () => {
    imageUploadRef.current.click();
  };

  const handleFileChange = (field, files) => {
    const validFiles = Array.from(files).filter((filer) =>
      [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'image/heic',
      ].includes(filer.type)
    );

    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ...previews],
    }));

    const existingFiles = getValues(field) || [];
    setValue(field, [...existingFiles, ...validFiles]);
  };

  const handleDeleteFile = (field, index, itemId) => {
    const currentFiles = getValues(field);
    const updatedFiles = [...currentFiles];
    updatedFiles.splice(index, 1);

    const updatedPreviews = filePreviews[field]?.filter((_, i) => i !== index);
    setFilePreviews((prev) => ({ ...prev, [field]: updatedPreviews }));
    // setRemoveFiles((prev) => [...prev, itemId]);
    setValue(field, updatedFiles);
  };

  const onSubmit = (data) => {
    console.log(data);
    // createTicket(data);
  };

  return (
    <div className='p-9'>
      <div>
        <Breadcrumbs
          className='pb-4'
          separator={<NavigateNextIcon fontSize='small' />}
          aria-label='breadcrumb'
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <form
        className='border rounded-lg pb-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='border-b py-4 px-2 mx-4'>
          <p className='text-lg font-semibold'>New ticket</p>
        </div>

        <div className='grid grid-cols-2 gap-4 p-6'>
          {NewTicketFields.map((field) => {
            switch (field.type) {
              case 'input':
                return (
                  <div
                    key={field.name}
                    className={`${field.width}`}
                    style={{ marginBottom: '16px' }}
                  >
                    <label
                      className='block tracking-wide  text-xs mb-2'
                      style={{ color: 'rgba(116, 116, 116, 1)' }}
                    >
                      {field.label}
                      {field?.inputRules?.required && '*'}
                    </label>
                    {/* {type === view.viewOnly ? (
                      <p className='text-[14px] pt-3'>
                        {getValues(field.name)}
                      </p>
                    ) : ( */}
                    <Controller
                      name={field.name}
                      control={control}
                      defaultValue=''
                      rules={field.inputRules}
                      render={({ field: controllerField }) => (
                        <input
                          {...register(field.name, field.inputRules)}
                          type={field.fieldtype}
                          className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none
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
                    {/* )} */}
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
                              {option.key}
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
                );

              case 'date':
                return (
                  <div className={`${field.width} relative`}>
                    <label
                      className='block tracking-wide text-xs mb-2'
                      style={{ color: 'rgba(116, 116, 116, 1)' }}
                    >
                      {field.label}
                    </label>
                    <Controller
                      name='date'
                      control={control}
                      defaultValue={null}
                      rules={{ required: 'Date is required' }}
                      render={({ field }) => (
                        <Calendar
                          className='calendar-control input-bg'
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          hourFormat='12'
                          dateFormat='dd/mm/yy'
                          showIcon
                        />
                      )}
                    />
                    {errors.date && (
                      <p className='error' role='alert'>
                        {errors.date.message}
                      </p>
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
                    <select
                      {...register(field.name, field.inputRules)}
                      className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg h-11
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
                );

              case 'file':
                return (
                  <div className={`${field.width}`}>
                    <div className={`space-y-2`}>
                      <label
                        htmlFor={field.name}
                        className='tracking-wide text-xs mb-2'
                        style={{ color: 'rgba(116, 116, 116, 1)' }}
                        // className='flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                      >
                        {field.label}
                        <Controller
                          name={field.name}
                          control={control}
                          defaultValue={[]}
                          render={({ field: controllerField }) => (
                            <input
                              id={field.name}
                              ref={imageUploadRef}
                              type='file'
                              multiple
                              accept='image/png, image/jpeg, image/jpg, image/webp, image/heic'
                              onChange={(e) =>
                                handleFileChange(field.name, e.target.files)
                              }
                              className='hidden'
                            />
                          )}
                        />
                      </label>
                      <div
                        className={`relative w-full rounded-lg border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none
                                                                  focus-visible:outline-none text-[14px] h-[60px]`}
                      >
                        <div
                          className='absolute border border-dashed rounded-lg border-blue-500  h-full w-48 right-0 top-0'
                          onClick={imageClickHandler}
                        >
                          {' '}
                          <div className='flex cursor-pointer items-center justify-center gap-2 h-full'>
                            <img src={AddPlusIcon} alt='' />{' '}
                            <span className='text-[#1D5BBF] font-semibold'>
                              Upload Image
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {errors[field.name] && (
                      <p className='error' role='alert'>
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                );

              case 'textbox':
                return (
                  <div
                    key={field.name}
                    className={`${field.width}`}
                    style={{ marginBottom: '16px' }}
                  >
                    <label
                      className='block tracking-wide  text-xs mb-2'
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
                          <textarea
                            id='message'
                            rows='4'
                            className={`block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                      focus:visible:outline-none focus:visible:border-none ${
                                        field.width === 'width-82'
                                          ? 'h-[282px]'
                                          : ''
                                      }`}
                            placeholder={field.placeholder}
                            {...register(field.name, field.inputRules)}
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

              default:
                return null;
            }
          })}
        </div>
        <div className='flex gap-6 justify-center align-middle'>
          <Button
            btnName='Cancel'
            btnCategory='secondary'
            onClick={() => navigate('/dashboard')}
          />
          <Button
            btnType='submit'
            btnCls='w-[110px]'
            btnName={'Save'}
            btnCategory='primary'
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewTicket;
