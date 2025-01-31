import React, { useEffect, useState } from 'react';
import MuiModal from '../../shared/Modal';
import Tooltip from '../../shared/Tooltip';
import CancelIcon from '../../assets/images/cancel-colour1x.png';
import GlobeIcon from '../../assets/icons/globeBg.svg';
import ConnectionIcon from '../../assets/icons/connections.svg';
import RightSmallIcon from '../../assets/icons/RightSmallArrow.svg';
import ControlNoOneIcon from '../../assets/icons/ControlNoOne.svg';
import { Button } from '../../shared';
import { useForm } from 'react-hook-form';

export default function SettingsModal({
  formData,
  open,
  handleSettingsBack,
  handlePostData,
}) {
  const [modalMode, setModalMode] = useState('settings');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      visibility: 'anyone',
      comment_control: 'anyone',
      brand_partnership: false,
    },
  });

  const handleBackClick = () => {
    if (modalMode === 'control') {
      handleControlBack();
    } else {
      handleSettingsBack();
    }
  };

  const handleControlBack = () => {
    setModalMode('settings');
  };

  const onSubmit = (data) => {
    if (modalMode === 'control') {
      setModalMode('settings');
    }

    if (modalMode === 'settings') {
      handlePostData({
        ...data,
        brand_partnership: data.brand_partnership === 'true' ? true : false,
      });
    }
  };

  useEffect(() => {
    reset({
      visibility: formData.visibility,
      brand_partnership: formData.brand_partnership,
      comment_control: formData.comment_control,
    });
  }, []);

  return (
    <MuiModal
      modalSize='lg'
      modalOpen={open}
      modalClose={handleBackClick}
      noheader
    >
      {modalMode === 'settings' && (
        <>
          <div className='title flex justify-between py-3 px-4 border-b-2 items-center'>
            <div className='flex gap-4 create-post'>Post Settings</div>
            <div className='flex gap-20 items-center'>
              <Tooltip title='Cancel'>
                <img
                  className='cursor-pointer'
                  onClick={handleSettingsBack}
                  src={CancelIcon}
                  alt='CancelIcon'
                />
              </Tooltip>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='px-4 border-b-2 pb-7'>
              <p className='pt-4'>Who can see your post?</p>
              <div className='flex flex-col gap-6 pt-8'>
                <div className='flex gap-5 items-center'>
                  <img src={GlobeIcon} alt='GlobeIcon' />
                  <div>
                    <p className='text-[14px]'>Anyone</p>
                    <p className='text-[12px]'>
                      Any one on or off Program Manager Application
                    </p>
                  </div>
                  <input
                    {...register('visibility')}
                    id='default-radio-1'
                    type='radio'
                    value='anyone'
                    className='w-8 h-8 ml-auto'
                  />
                </div>

                <div className='flex gap-5 items-center'>
                  <img src={ConnectionIcon} alt='ConnectionIcon' />
                  <div>
                    <p className='text-[14px]'>Connections Only</p>
                  </div>
                  <input
                    {...register('visibility')}
                    id='default-radio-1'
                    type='radio'
                    value='connections'
                    className='w-8 h-8 ml-auto'
                  />
                </div>
              </div>
              <div className='flex justify-between pt-8'>
                <div>
                  <p className='text-[14px]'>Comment Control</p>
                  <p className='text-[12px]'>
                    {getValues('comment_control') === 'anyone'
                      ? 'Anyone'
                      : getValues('comment_control') === 'connection'
                      ? 'Connection'
                      : getValues('comment_control') === 'no-one'
                      ? 'No One'
                      : ''}
                  </p>
                </div>
                <div
                  className='cursor-pointer w-[20px]'
                  onClick={() => setModalMode('control')}
                >
                  <img
                    className='h-[18px]'
                    src={RightSmallIcon}
                    alt='RightSmallIcon'
                  />
                </div>
              </div>

              <div className='flex justify-between pt-8'>
                <div>
                  <p className='text-[14px]'>Brand Partnership</p>
                  <p className='text-[12px]'>
                    {getValues('brand_partnership') === 'true' ||
                    getValues('brand_partnership') === true
                      ? 'On'
                      : 'Off'}
                  </p>
                </div>
                <div>
                  <label className='inline-flex items-center mb-5 cursor-pointer'>
                    <input
                      type='checkbox'
                      {...register('brand_partnership')}
                      value={true}
                      className='sr-only peer'
                    />
                    <div
                      className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                         dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                         rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
                         after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                         after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </div>
              </div>
            </div>
            <div className='flex gap-6 justify-end align-middle pt-8 pb-3'>
              <Button
                btnName='Back'
                btnCls='w-[13%]'
                btnCategory='secondary'
                onClick={handleSettingsBack}
              />
              <Button
                btnType='submit'
                btnCls='w-[13%]'
                btnName='Save'
                btnCategory='primary'
              />
            </div>
          </form>
        </>
      )}

      {modalMode === 'control' && (
        <>
          <div className='title flex justify-between py-3 px-4 border-b-2 items-center'>
            <div className='flex gap-4 create-post'>Comment Control</div>
            <div className='flex gap-20 items-center'>
              <Tooltip title='Cancel'>
                <img
                  className='cursor-pointer'
                  onClick={handleBackClick}
                  src={CancelIcon}
                  alt='CancelIcon'
                />
              </Tooltip>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='px-4 border-b-2 pb-7'>
              <div className='flex flex-col gap-6 pt-8'>
                <div className='flex gap-5 items-center'>
                  <img src={GlobeIcon} alt='GlobeIcon' />
                  <div>
                    <p className='text-[14px]'>Anyone</p>
                  </div>
                  <input
                    {...register('comment_control')}
                    type='radio'
                    value='anyone'
                    className='w-8 h-8 ml-auto'
                  />
                </div>

                <div className='flex gap-5 items-center'>
                  <img src={ConnectionIcon} alt='ConnectionIcon' />
                  <div>
                    <p className='text-[14px]'>Connections Only</p>
                  </div>
                  <input
                    {...register('comment_control')}
                    type='radio'
                    value='connections'
                    className='w-8 h-8 ml-auto'
                  />
                </div>

                <div className='flex gap-5 items-center'>
                  <img src={ControlNoOneIcon} alt='ControlNoOneIcon' />
                  <div>
                    <p className='text-[14px]'>No One</p>
                  </div>
                  <input
                    {...register('comment_control')}
                    type='radio'
                    value='no-one'
                    className='w-8 h-8 ml-auto'
                  />
                </div>
              </div>
            </div>
            <div className='flex gap-6 justify-end align-middle pt-8 pb-3'>
              <Button
                btnName='Back'
                btnCls='w-[13%]'
                btnCategory='secondary'
                onClick={handleControlBack}
              />
              <Button
                btnType='submit'
                btnCls='w-[13%]'
                btnName='Save'
                btnCategory='primary'
              />
            </div>
          </form>
        </>
      )}
    </MuiModal>
  );
}
