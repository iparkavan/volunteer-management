import React, { useEffect, useState } from 'react';
import UserImage from '../../../assets/icons/user-image.svg';
import CalendarIcon from '../../../assets/images/calender_1x.png';
import { Button } from '../../../shared';
import DeleteIcon from '../../../assets/images/delete_1x.png';
import UploadIcon from '../../../assets/images/image_1x.png';

import TicketDeleteModal from './ticket-delete-modal';
import { UpdateTicketFields } from '../../../utils/super-admin-form-fields';
import { Controller, useForm } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import {
  usePostCommentMutation,
  useUpdateStatusMutation,
} from '../../../features/tickets/tickets-slice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import SuccessGradientMessage from '../../success-gradient-message';
import { useSelector } from 'react-redux';
import { user } from '../../../utils/constant';

const TicketUpdate = ({ ticket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filePreviews, setFilePreviews] = useState({});
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [
    updateStatus,
    { isLoading: isStatusLoading, isSuccess: isStatusSuccess },
  ] = useUpdateStatusMutation();

  const role = userInfo?.data?.role;

  const [
    updateTicket,
    { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError, error },
  ] = usePostCommentMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    if (isUpdateSuccess || isStatusSuccess) {
      setIsBackdropOpen(true);
      setTimeout(() => {
        setIsBackdropOpen(false);
        navigate('/tickets');
      }, 2000);
    }
  }, [isUpdateSuccess || isStatusSuccess]);

  const handleFileChange = (field, files) => {
    const validFiles = Array.from(files).filter((filer) =>
      [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'image/heic',
        'application/pdf',
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
    setValue(field, updatedFiles);
  };

  const handleFormSubmit = async (data, closeTicket = false) => {
    const formData = new FormData();
    formData.append('comment', data.comment);
    formData.append('due_date', moment(data.due_date).format('YYYY-MM-DD'));

    if (data.attachment) {
      if (Array.isArray(data.attachment)) {
        data.attachment.forEach((file) => {
          formData.append('attachment', file);
        });
      } else {
        formData.append('attachment', data.attachment);
      }
    }

    await updateTicket({ id: ticket.id, ticket: formData });

    if (closeTicket) {
      await updateStatus({ id: ticket.id, status: 'resolved' });
    }
  };

  return (
    <div>
      <form
        action=''
        className='p-9 grid grid-cols-1'
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      >
        {UpdateTicketFields.map((field) => {
          if (field.type === 'date' && role !== user.super_admin) {
            return null;
          }
          switch (field.type) {
            case 'date':
              return (
                <div className={`${field.width} relative`}>
                  <label
                    className='block disabled:bg-gray-100 tracking-wide text-xs mb-2'
                    style={{ color: 'rgba(116, 116, 116, 1)' }}
                  >
                    {field.label}
                  </label>
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

                        return (
                          <Calendar
                            className='calendar-control disabled:bg-gray-100 input-bg'
                            value={value}
                            disabled={field.disabled}
                            minDate={new Date()}
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

                  {errors[field.name] && (
                    <p style={{ color: 'red', fontSize: '12px' }}>
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              );

            case 'file':
              return (
                <>
                  <>
                    <label
                      className='block mt-6 tracking-wide  text-xs mb-2'
                      style={{ color: 'rgba(116, 116, 116, 1)' }}
                    >
                      {field.label}
                      {field?.inputRules?.required && '*'}
                    </label>
                    <div
                      className={`flex items-center justify-center w-${field.width}`}
                    >
                      <label
                        htmlFor={field.name}
                        className='flex flex-col items-center rounded-xl justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                      >
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <svg
                            className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 16'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                            />
                          </svg>
                          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                            <span className='font-semibold'>
                              Upload Your Documents (Png, Img, XLS)
                            </span>
                          </p>
                        </div>
                        <Controller
                          name={field.name}
                          control={control}
                          defaultValue={[]}
                          render={({ field: controllerField }) => (
                            <input
                              id={field.name}
                              type='file'
                              multiple
                              accept='image/png, image/jpeg, image/jpg, image/webp, image/heic, application/pdf'
                              onChange={(e) =>
                                handleFileChange(field.name, e.target.files)
                              }
                              className='hidden'
                            />
                          )}
                        />
                      </label>
                    </div>
                    <div className='flex flex-wrap gap-4 mt-4'>
                      {filePreviews[field.name]?.map((preview, index) => (
                        <div key={index} className='relative'>
                          <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className='w-24 h-24 object-cover'
                          />
                          <img
                            src={DeleteIcon}
                            alt='Delete'
                            className='absolute rounded-full top-0 right-0 w-6 h-6 cursor-pointer'
                            onClick={() => handleDeleteFile(field.name, index)}
                          />
                        </div>
                      ))}
                    </div>

                    {errors[field.name] && (
                      <p className='error' role='alert'>
                        {errors[field.name].message}
                      </p>
                    )}
                  </>
                </>
              );
          }
        })}

        <div className='mx-9 my-9 space-y-8'>{/* form fields */}</div>
        {role === user.super_admin && (
          <div className='flex gap-6 justify-center align-middle'>
            <Button
              btnName='Reject'
              btnCls='w-[170px]'
              btnStyle={{
                border: '1px solid rgba(220, 53, 69, 1)',
                color: 'rgba(220, 53, 69, 1)',
              }}
              btnCategory='secondary'
              onClick={() => setIsOpen(true)}
            />
            <Button
              btnType='submit'
              disabled={isUpdateLoading}
              btnCls='w-[130px]'
              btnName={`${isUpdateLoading ? 'Updateing...' : 'Update'}`}
              btnCategory='primary'
              btnStyle={{
                background: 'rgba(217, 228, 242, 1)',
                color: 'rgba(29, 91, 191, 1)',
                border: 'none',
              }}
            />

            <Button
              // btnType='submit'
              disabled={isUpdateLoading || isStatusLoading}
              onClick={handleSubmit((data) => handleFormSubmit(data, true))}
              btnCls='w-[170px]'
              btnName={`${
                isUpdateLoading || isStatusLoading ? 'Resolving...' : 'Resolve '
              }`}
              btnCategory='primary'
            />
          </div>
        )}
        {(role === user.admin ||
          role === user.mentee ||
          role === user.mentor) && (
          <div className='text-center'>
            <Button
              // btnType='submit'
              disabled={isUpdateLoading}
              onClick={handleSubmit((data) => handleFormSubmit(data))}
              btnCls='w-[170px]'
              btnName={`${isUpdateLoading ? 'Updateing...' : 'Update '}`}
              btnCategory='primary'
            />
          </div>
        )}
      </form>

      {isOpen && (
        <TicketDeleteModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ticketId={ticket?.id}
        />
      )}
      <SuccessGradientMessage
        message={'Your ticket has been Updated successfully'}
        isBackdropOpen={isBackdropOpen}
        setIsBackdropOpen={setIsBackdropOpen}
      />
    </div>
  );
};

export default TicketUpdate;
