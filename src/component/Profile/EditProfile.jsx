import React, { useEffect } from 'react';
import UserIcon from '../../assets/icons/MyProfileUser.svg';
import UserImage from '../../assets/icons/user-icon.svg';
import LocationIcon from '../../assets/images/Location1x.png';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import { Button } from '../../shared';
import { useForm } from 'react-hook-form';
import { EditProfileFields } from '../../utils/formFields';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  updateProfile,
  updateProfileImage,
} from '../../services/profile';
import { Backdrop, CircularProgress } from '@mui/material';
import { profileStatus } from '../../utils/constant';

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, loading, status } = useSelector(
    (state) => state.profileInfo
  );
  const { data } = useSelector((state) => state.userInfo);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    if (Object.keys(profile).length) {
      reset({
        name: `${profile.name}` || '',
        position: profile.position,
        professional_bio: profile.professional_bio,
        link: profile.link,
        email: profile.email || '',
        phone_number: profile.phone_no,
        location: profile.location,
        address: profile.address,
        social_media: profile.social_media,
      });
    }
  }, [profile]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const onSubmit = (data) => {
    const apiPayload = {
      phone_number: data.phone_number,
      location: data.location,
      link: data.link,
      professional_bio: data.professional_bio,
      address: data.address,
      social_media: data.social_media,
    };
    dispatch(updateProfile(apiPayload));
  };

  const uploadUserImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let bodyFormData = new FormData();
      bodyFormData.append('profile_image', e.target.files[0]);
      dispatch(updateProfileImage(bodyFormData));
    }
  };

  useEffect(() => {
    if (status === profileStatus.update || status === profileStatus.image) {
      setTimeout(() => {
        navigate('/my-profile');
      }, 2000);
    }
  }, [status]);

  return (
    <div className='edit-profile-container px-9 py-9'>
      <div>Edit Profile</div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === profileStatus.update || status === profileStatus.image}
      >
        <div className='px-5 py-1 flex justify-center items-center'>
          <div
            className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
            style={{ background: '#fff', borderRadius: '10px' }}
          >
            <img src={SuccessTik} alt='SuccessTik' />
            <p
              className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
              style={{
                fontWeight: 600,
              }}
            >
              Profile updated Successfully
            </p>
          </div>
        </div>
      </Backdrop>

      <div className='edit-profile-content'>
        <div className='grid grid-cols-8 gap-3'>
          <div className='col-span-2'>
            <div className='upload-profile'>
              <img
                style={{ borderRadius: '50%', height: '150px' }}
                src={profile?.image || UserImage}
                alt='UserIcon'
              />
              <label
                className='w-[40%] flex items-center justify-center pb-3 
                             rounded-lg text-white text-[14px] cursor-pointer'
                style={{
                  background:
                    'linear-gradient(to right, rgb(0, 174, 189), rgb(29, 91, 191))',
                  border: 'none',
                }}
              >
                <span class='mt-2  leading-normal'>Upload Profile</span>
                <input type='file' class='hidden' onChange={uploadUserImage} />
              </label>
            </div>
          </div>

          <div className='col-span-6'>
            <div className='edit-profile-form'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-wrap gap-4'>
                  {EditProfileFields.map((field, index) => {
                    return (
                      <div
                        className={`relative mb-6 ${field.width}`}
                        key={index}
                      >
                        <label
                          className='block tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor={field.label}
                        >
                          {field.label}
                        </label>
                        {field.type === 'input' ? (
                          <>
                            {field.name === 'phone_number' && (
                              <select className='absolute input-bg h-[60px] py-2 px-1'>
                                <option>+91</option>
                                <option>+91</option>
                                <option>+91</option>
                              </select>
                            )}

                            <input
                              {...register(field.name, field.inputRules)}
                              type={field.fieldtype}
                              className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                                    focus-visible:outline-none text-[14px] h-[60px]'
                              placeholder={field.placeholder}
                              style={{
                                color: '#232323',
                                borderRadius: '3px',

                                paddingLeft:
                                  field.name === 'phone_number'
                                    ? '76px'
                                    : '10px',
                              }}
                              disabled={field.disabled}
                              aria-invalid={!!errors[field.name]}
                            />

                            {field.icon && field.icon === 'location' && (
                              <img
                                className='absolute top-10 right-4'
                                src={LocationIcon}
                                alt='LocationIcon'
                              />
                            )}

                            {errors[field.name] && (
                              <p className='error' role='alert'>
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : field.type === 'textbox' ? (
                          <>
                            <textarea
                              id='message'
                              rows='4'
                              className={`block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                                                                focus:visible:outline-none focus:visible:border-none ${
                                                                                  field.width ===
                                                                                  'width-82'
                                                                                    ? 'h-[282px]'
                                                                                    : ''
                                                                                }`}
                              placeholder={field.placeholder}
                              {...register(field.name, field.inputRules)}
                            ></textarea>
                            {errors[field.name] && (
                              <p className='error' role='alert'>
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : field.type === 'logo' ? (
                          <>
                            <div className='flex items-center space-x-2 relative'>
                              <label
                                for='file-upload'
                                className='cursor-pointer input-bg h-[60px] w-full'
                              >
                                <div
                                  className='absolute cursor-pointer right-0 h-[60px] w-[150px] flex justify-center items-center'
                                  style={{
                                    background: '#18283D',
                                    color: '#fff',
                                  }}
                                >
                                  Upload logo
                                </div>
                                <input
                                  id='file-upload'
                                  type='file'
                                  className='sr-only'
                                />
                              </label>
                              {errors[field.name] && (
                                <p className='error' role='alert'>
                                  {errors[field.name].message}
                                </p>
                              )}
                            </div>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <div className='flex gap-6 justify-center align-middle py-6'>
                  <Button
                    btnName='Cancel'
                    btnCls='w-[16%]'
                    btnCategory='secondary'
                    onClick={() => navigate('/my-profile')}
                  />
                  <Button
                    btnType='submit'
                    btnCls='w-[16%]'
                    btnName='Update Profile'
                    btnCategory='primary'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
