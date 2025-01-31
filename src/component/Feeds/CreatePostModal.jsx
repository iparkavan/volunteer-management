import React, { useEffect, useRef, useState } from 'react';
import MuiModal from '../../shared/Modal';
import Tooltip from '../../shared/Tooltip';
import UserIcon from '../../assets/images/user.jpg';
import CancelIcon from '../../assets/images/cancel-colour1x.png';
import AddImageIcon from '../../assets/icons/add-image.svg';
import AddFilesIcon from '../../assets/icons/add-files.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import ArrowDown from '../../assets/icons/arrowDownDark.svg';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import NoImage from "../../assets/images/noimage.jpg"
import { Stack } from '@mui/material';

export default function CreatePostModal({
  formData,
  open,
  errors,
  reset,
  handleClose,
  handleVisibilty,
  register,
  handlePostData,
  setValue,
  getValues,
  handleSubmit,
  isReport = false,
  reportData = []
}) {
  const { data } = useSelector((state) => state.userInfo);
  const imageInputRef = useRef();
  const [imageView, setImageView] = useState([]);

  useEffect(() => {
    reset();
  }, []);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (field, files) => {
    const validFiles = Array.from(files).filter((filer) =>
      [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'image/heic',
      ].includes(filer.type)
    );
    const showNames = validFiles.map((file) => file);
    setImageView(showNames);

    setValue(field, validFiles);
  };

  const handleImagesDelete = (field, index) => {
    const updatedPreviews = imageView.filter((_, i) => i !== index);
    setImageView(updatedPreviews);

    setValue(
      field,
      updatedPreviews.map((img) => img)
    );
  };

  const onSubmit = (data) => {
    handlePostData(data);
  };

  return (
    <MuiModal modalOpen={open} modalClose={handleClose} modalSize='md' noheader>
      <div className='title flex justify-between py-3 px-4 border-b-2 items-center'>
        <div
          className='flex gap-4 create-post cursor-pointer'
          onClick={handleVisibilty}
        >
          <img className='user-image' src={UserIcon} alt='UserIcon' />
          <div>
            <div className='flex gap-3 items-center'>
              <p>
                {data?.first_name} {data?.last_name}
              </p>
              <img className='pt-1' src={ArrowDown} alt='ArrowDown' />
            </div>
            <p className='text-[12px]'>
              {formData.visibility === 'anyone'
                ? 'Anyone'
                : formData.visibility === 'connections'
                ? 'Connection'
                : ''}{' '}
            </p>
          </div>
        </div>
        <div className='flex gap-20 items-center'>
          <Tooltip title='Cancel'>
            <img
              className='cursor-pointer'
              onClick={handleClose}
              src={CancelIcon}
              alt='CancelIcon'
            />
          </Tooltip>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-6 mt-6'>
          <div className='space-y-1'>
            <label htmlFor='' className='text-sm'>
              Title Name
            </label>
            <input
              {...register('title', { required: 'This field is required' })}
              id='message'
              rows='4'
              type='text'
              className={`block p-2.5 input-bg w-full text-sm text-gray-900  border focus-visible:outline-none `}
              placeholder={'What do you want to talk  about?'}
            />
            {errors['content'] && (
              <p className='error' role='alert'>
                {errors['content'].message}
              </p>
            )}
          </div>
          {
            (isReport && reportData?.[0]?.html_content_link) && 
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <img src={reportData?.[0]?.thumbnail ?? NoImage} alt="" className='h-[100px] w-[100px] rounded-[3px]' />
              <p className='text-font-primary-main'>{reportData?.[0]?.html_content_link}</p>
            </Stack>
          }
          <div className='space-y-1'>
            <label htmlFor='' className='text-sm'>
              Description
            </label>
            <textarea
              {...register('content', { required: 'This field is required' })}
              id='message'
              rows='4'
              className={`block p-2.5 input-bg w-full text-sm text-gray-900  border focus-visible:outline-none `}
              placeholder={'What do you want to talk  about?'}
            />
            {errors['content'] && (
              <p className='error' role='alert'>
                {errors['content'].message}
              </p>
            )}
          </div>
        </div>
        <div className='mt-4 flex items-center justify-start gap-3'>
          {imageView &&
            imageView.map((image, index) => (
              <div className='py-1 px-3 inline-flex items-center justify-center gap-3 bg-[#F1F6FF] border rounded-full border-[#1D5BBF]'>
                <p className='text-sm mb-1'>{image.name}</p>
                <img
                  src={DeleteIcon}
                  className='w-6 h-6 cursor-pointer'
                  onClick={() => handleImagesDelete('image', index)}
                />
              </div>
            ))}
        </div>

        <div className='flex gap-5 items-center justify-between mx-3 mt-12 mb-4'>
          <div className='flex items-center justify-start gap-4'>
            <div className=''>
              <img
                src={AddImageIcon}
                className='cursor-pointer'
                alt=''
                onClick={handleImageClick}
              />
              <input
                {...register('image')}
                ref={imageInputRef}
                multiple
                onChange={(e) => handleImageChange('image', e.target.files)}
                type='file'
                className='hidden'
              />
            </div>
            {/* <img className='cursor-pointer' src={AddFilesIcon} alt='' /> */}
          </div>
          <button
            type='submit'
            className='text-white py-2 px-7 w-[20%]'
            style={{
              background:
                '#FE634E',
              borderRadius: '3px',
            }}
          >
            Post
          </button>
        </div>
      </form>
    </MuiModal>
  );
}
