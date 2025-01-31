import React, { useEffect, useRef, useState } from 'react';
import CustomCard from '../../shared/CustomCard/CustomCard';
import { menteeTicketCreationField } from '../../utils/formFields';
import DeleteIcon from '../../assets/images/delete_1x.png';
import UploadIcon from '../../assets/images/image_1x.png';
import { Controller, useForm } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import AddPlusIcon from '../../assets/icons/add-plus-icon.svg';
import { Button } from '../../shared';
import {
  useCreateTicketMutation,
  useGetTicketQuery,
  useMenteeTicketCreationMutation,
  useTicketCreationMutation,
  useUpdateTicketMutation,
} from '../../features/tickets/tickets-slice';
import { convertToFormData } from '../../utils/convert-to-form-data';
import { useSelector } from 'react-redux';
import SuccessGradientMessage from '../success-gradient-message';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Skeleton } from '@mui/material';

const TicketCreation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const [filePreviews, setFilePreviews] = useState({});
  const imageUploadRef = useRef(null);
  const userInfo = useSelector((state) => state.userInfo);

  const [createTicket, { isLoading, isSuccess, isError, error }] =
    useCreateTicketMutation();

  const [
    updateTicket,
    { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
  ] = useUpdateTicketMutation();

  const {
    data: ticket,
    isLoading: isFetchLoading,
    refetch,
  } = useGetTicketQuery(id);

  useEffect(() => {
    if (id && ticket) {
      reset({
        ...ticket,
        // attachment: setFilePreviews(),
      });
    }
  }, [id, ticket, reset]);
  console.log('ticket', ticket);

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
    URL.revokeObjectURL(filePreviews[field][index]); // Clean up URL

    setFilePreviews((prev) => ({ ...prev, [field]: updatedPreviews }));
    // setRemoveFiles((prev) => [...prev, itemId]);
    setValue(field, updatedFiles);
  };

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();

    formData.append('subject', data.subject);
    formData.append('description', data.description);
    // formData.append('created_by', userInfo?.data?.user_id);
    if (data.attachments) {
      if (Array.isArray(data.attachments)) {
        data.attachments.forEach((doc, index) => {
          formData.append(`attachments`, doc);
        });
      } else {
        formData.append('attachments', data.attachments);
      }
    }

    if (searchParams.get('type') === 'edit') {
      updateTicket({ id: ticket.id, ticket: formData });
    } else {
      createTicket(formData);
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      setIsBackdropOpen(true);

      const redirectPath =
        searchParams.get('type') === 'edit' ? '/ticket-history' : '/help';

      setTimeout(() => {
        setIsBackdropOpen(false);
        navigate(redirectPath);
      }, 2000);
    }
  }, [isSuccess, isUpdateSuccess, searchParams, navigate]);

  return (
    <div className='p-9'>
      {isFetchLoading ? (
        <div className='flex justify-center items-center'>
          <Skeleton
            variant='rectangular'
            sx={{ width: '100%', height: '500px', borderRadius: '10px' }}
          />
        </div>
      ) : (
        <CustomCard title={'New ticket'}>
          <form action='' className='mt-6' onSubmit={handleSubmit(onSubmit)}>
            {menteeTicketCreationField.map((field, index) => {
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
                                  checked={
                                    controllerField.value === option.value
                                  }
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
                                  checked={
                                    controllerField.value === option.value
                                  }
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
                        <div className='flex flex-wrap gap-4 mt-4'>
                          {filePreviews[field.name]?.map((preview, index) => (
                            <div key={index} className='relative'>
                              <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className='w-24 h-24 object-cover rounded-lg'
                              />
                              <img
                                src={DeleteIcon}
                                alt='Delete'
                                className='absolute rounded-full top-1 right-1 w-6 h-6 cursor-pointer'
                                onClick={() =>
                                  handleDeleteFile(field.name, index)
                                }
                              />
                            </div>
                          ))}
                        </div>

                        {/* {getValues(field.name)?.length > 0 && (
                          <>
                            <div
                              className='text-[14px] pt-5'
                              style={{ color: 'rgba(0, 0, 0, 1)' }}
                            >
                              Uploaded Image{' '}
                            </div>

                            <div className='flex flex-wrap items-center justify-start gap-2'>
                              {
                                <Link
                                  className='text-violet-500 underline'
                                  to={getValues(field.name)}
                                  target='_blank'
                                >
                                  {getValues(field.name)}
                                </Link>
                              }
                              {getValues(field.name) &&
                                getValues(field.name).map((item, index) => {
                                  return (
                                    <div
                                      className='flex justify-between items-center w-[25%] mt-5 px-4 py-4'
                                      style={{
                                        border:
                                          '1px solid rgba(29, 91, 191, 0.5)',
                                        borderRadius: '3px',
                                      }}
                                    >
                                      <div className='flex gap-3 items-center'>
                                        <img src={UploadIcon} alt='altlogo' />
                                        <span className='text-[12px] w-40 truncate'>
                                          {item?.name || item}
                                        </span>
                                      </div>
                                      <img
                                        className='w-[30px] cursor-pointer'
                                        onClick={() =>
                                          handleDeleteFile(
                                            field.name,
                                            index,
                                            item?.props?.id
                                          )
                                        }
                                        src={DeleteIcon}
                                        alt='DeleteIcon'
                                      />
                                    </div>
                                  );
                                })}
                            </div>
                          </>
                        )} */}
                      </div>

                      {errors[field.name] && (
                        <p className='error' role='alert'>
                          {errors[field.name].message}
                        </p>
                      )}
                    </div>
                  );

                case 'textarea':
                  return (
                    <div
                      key={field.name}
                      className={`${field.width} mt-3`}
                      style={{ marginBottom: '16px' }}
                    >
                      <label
                        className='block tracking-wide  text-xs mb-2'
                        style={{ color: 'rgba(116, 116, 116, 1)' }}
                      >
                        {field.label}
                        {field?.inputRules?.required && '*'}
                      </label>
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
                    </div>
                  );

                default:
                  return null;
              }
            })}
            {searchParams.get('type') === 'edit' ? (
              <div className='flex gap-6 justify-center align-middle mt-6'>
                <Button
                  btnName='Cancel'
                  btnCategory='secondary'
                  onClick={() => navigate(-1)}
                />
                <Button
                  btnType='submit'
                  disabled={isUpdateLoading}
                  btnCls='w-[130px]'
                  btnName={`${isUpdateLoading ? 'Updateing...' : 'Update'}`}
                  btnCategory='primary'
                />
              </div>
            ) : (
              <div className='flex gap-6 justify-center align-middle mt-6'>
                <Button
                  btnName='Cancel'
                  btnCategory='secondary'
                  onClick={() => navigate('/help')}
                />
                <Button
                  btnType='submit'
                  disabled={isLoading}
                  btnCls='w-[130px]'
                  btnName={`${isLoading ? 'Creating...' : 'Create'}`}
                  btnCategory='primary'
                />
              </div>
            )}
          </form>
        </CustomCard>
      )}
      <SuccessGradientMessage
        message={
          searchParams.get('type') === 'edit'
            ? 'Your ticket has been updated successfully'
            : 'Your ticket has been created successfully'
        }
        isBackdropOpen={isBackdropOpen}
        setIsBackdropOpen={setIsBackdropOpen}
      />
    </div>
  );
};

export default TicketCreation;
