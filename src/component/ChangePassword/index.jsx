import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as EyeCloseIcon } from '../../assets/icons/eyeClose.svg';
import { ReactComponent as EyeOpenIcon } from '../../assets/icons/eyeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserInfo, updatePassword } from '../../services/loginInfo';
import { PasswordRulesSet, userStatus } from '../../utils/constant';
import { PasswordRules } from '../../utils/loginFields';
import SuccessIcon from '../../assets/images/Success_tic1x.png';
import FailedIcon from '../../assets/images/cancel3x.png';

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('email');
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const [passwordVisibility, setPasswordVisibility] = useState({
    new_password: false,
    confirm_password: false,
  });
  const [verifyPasswordRule, setVerifyPasswordRule] = useState({
    [PasswordRulesSet.character]: false,
    [PasswordRulesSet.upperlowercase]: false,
    [PasswordRulesSet.number]: false,
    [PasswordRulesSet.email]: false,
    [PasswordRulesSet.common]: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm();

  const eightCharacter = (str) => /^.{8,}$/.test(str);
  const upperLowerCase = (str) => /^(?=.*[a-z])(?=.*[A-Z])\S+$/.test(str);
  const letterSymbol = (str) =>
    /[\d!@#$%^&*()_+={}\[\]:;<>,.?\\\/\-]/.test(str);

  const passwordFailRule = () => {
    return (
      !verifyPasswordRule[PasswordRulesSet.character] ||
      !verifyPasswordRule[PasswordRulesSet.upperlowercase] ||
      !verifyPasswordRule[PasswordRulesSet.number] ||
      !verifyPasswordRule[PasswordRulesSet.email] ||
      !verifyPasswordRule[PasswordRulesSet.common]
    );
  };

  const onSubmit = (data) => {
    const { new_password, confirm_password } = data;
    if (
      new_password !== '' &&
      confirm_password !== '' &&
      new_password !== confirm_password
    ) {
      setError('confirm_password', {
        type: 'custom',
        message: 'New password and Confirm password should be same',
      });
    } else if (userEmail !== '' && new_password === confirm_password) {
      if (passwordFailRule()) {
        setError('common', {
          type: 'manual',
          message: 'All Conditions must be satisfied',
        });
      } else {
        dispatch(
          updatePassword({ email: userEmail, new_password: new_password })
        );
      }
    }
  };

  const handleField = (field, value) => {
    const email = userEmail;
    let emailExist = email !== '' && value !== '';
    if (email !== '') {
      const emailValidation = new RegExp(email);
      emailExist = !emailValidation.test(value);
    }
    const eightCharacterExist = eightCharacter(value);
    const upperLowerCaseExist = upperLowerCase(value);
    const letterSymbolExist = letterSymbol(value);

    const passRule = {
      [PasswordRulesSet.character]: eightCharacterExist,
      [PasswordRulesSet.upperlowercase]: upperLowerCaseExist,
      [PasswordRulesSet.number]: letterSymbolExist,
      [PasswordRulesSet.email]: emailExist,
      [PasswordRulesSet.common]:
        eightCharacterExist &&
        upperLowerCaseExist &&
        letterSymbolExist &&
        emailExist,
    };
    setVerifyPasswordRule(passRule);
  };

  useEffect(() => {
    if (!passwordFailRule()) {
      clearErrors('common');
    }
  }, [verifyPasswordRule]);

  useEffect(() => {
    dispatch(resetUserInfo());
  }, []);

  useEffect(() => {
    if (!userInfo.loading && userInfo.status === userStatus.changePassword) {
      navigate('/');
    }
  }, [userInfo]);

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={userInfo.loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          userInfo.loading ||
          userInfo.status === userStatus.login ||
          userInfo.status === userStatus.pending
        }
      >
        {userInfo.status === userStatus.login ||
        userInfo.status === userStatus.pending ? (
          <div className='popup-content w-2/6 bg-white flex flex-col gap-4 h-[330px] justify-center items-center'>
            <img
              src={
                userInfo.status === userStatus.pending
                  ? FailedIcon
                  : SuccessIcon
              }
              alt='VerifyIcon'
            />
            {userInfo.status !== userStatus.pending && (
              <h2 className='text-black font-semibold text-lg'>
                Congratulations!
              </h2>
            )}
            <span style={{ color: '#232323' }}>
              {userInfo.status === userStatus.pending
                ? 'Please wait while you password being change'
                : 'Your have successfully reset and created a new password'}
            </span>
          </div>
        ) : (
          <CircularProgress color='inherit' />
        )}
      </Backdrop>
      <div className='w-full flex items-center justify-center'>
        <div className='w-4/5 max-w-md mt-20'>
          <h4 className='mt-1 pl-3 pb-1 text-xl font-semibold logoColor'>
            MyLogo
          </h4>

          <h4 className='mb-6 mt-6 pb-1 text-xl font-semibold defaultTextColor'>
            Change Password
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            {userInfo.error !== '' ? (
              <div className='pb-7'>
                <p className='error' role='alert'>
                  {userInfo.error}
                </p>
              </div>
            ) : null}
            <div className='relative mb-6'>
              <label className='block tracking-wide text-gray-700 text-xs mb-2'>
                New Password
              </label>
              <input
                type={`${
                  passwordVisibility.new_password ? 'text' : 'password'
                }`}
                className='w-full rounded px-3 py-[0.32rem] leading-[2.15] text-[14px] h-[60px]'
                placeholder='Enter new password'
                style={{
                  color: '#232323',
                  border: '1px solid #3E3E3E',
                }}
                {...register('new_password', {
                  required: true,
                })}
                onKeyUp={(e) => handleField('text', e.target.value)}
                aria-invalid={errors.new_password ? 'true' : 'false'}
              />

              <button
                type='button'
                className='absolute top-7 end-0 p-3.5 rounded-e-md'
                onClick={() =>
                  setPasswordVisibility({
                    ...passwordVisibility,
                    new_password: !passwordVisibility.new_password,
                  })
                }
              >
                {passwordVisibility.new_password ? (
                  <EyeOpenIcon />
                ) : (
                  <EyeCloseIcon />
                )}
              </button>
              {errors.new_password?.type === 'required' && (
                <p className='error' role='alert'>
                  New Password is required
                </p>
              )}
            </div>

            <div className='relative mb-6'>
              <label className='block tracking-wide text-gray-700 text-xs mb-2'>
                Confirm Password
              </label>
              <input
                type={`${
                  passwordVisibility.confirm_password ? 'text' : 'password'
                }`}
                className='w-full rounded px-3 py-[0.32rem] leading-[2.15] text-[14px] h-[60px]'
                placeholder='Enter confirm password'
                style={{
                  color: '#232323',
                  border: '1px solid #3E3E3E',
                }}
                {...register('confirm_password', {
                  required: true,
                })}
                aria-invalid={errors.confirm_password ? 'true' : 'false'}
              />
              {errors.confirm_password?.type === 'required' && (
                <p className='error' role='alert'>
                  Confirm Password is required
                </p>
              )}

              <button
                type='button'
                className='absolute top-7 end-0 p-3.5 rounded-e-md'
                onClick={() =>
                  setPasswordVisibility({
                    ...passwordVisibility,
                    confirm_password: !passwordVisibility.confirm_password,
                  })
                }
              >
                {passwordVisibility.confirm_password ? (
                  <EyeOpenIcon />
                ) : (
                  <EyeCloseIcon />
                )}
              </button>
              {errors.confirm_password?.type === 'required' ||
                (errors.confirm_password?.type === 'custom' && (
                  <p className='error' role='alert'>
                    {errors.confirm_password?.type === 'custom'
                      ? errors.confirm_password?.message
                      : 'Confirm Password is required'}
                  </p>
                ))}
            </div>

            {errors.common?.type === 'manual' && (
              <p className='error' role='alert'>
                {errors.common?.message}
              </p>
            )}

            {typeof getValues('new_password') !== 'undefined' && (
              <div className='pb-3 leading-6'>
                <p className='text-[14px] pb-1'>Create a password That:</p>
                <ul className=''>
                  {PasswordRules.map((rule, index) => {
                    let icon = '\\2022';
                    let pd = 3;
                    let textColor = '#000';
                    if (verifyPasswordRule[rule.key]) {
                      icon = '\\2714\\0020';
                      pd = 2;
                      // textColor = '#00AEBD';
                      textColor = '#FE634E';
                    }
                    return (
                      <li
                        key={index}
                        className={`text-[12px] list-none before:content-['${icon}'] before:pr-${pd} before:text-[10px]`}
                        style={{ color: textColor }}
                      >
                        {rule.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className='text-center lg:text-left'>
              <button
                type='submit'
                className='inline-block w-full rounded px-7 pb-3 pt-3 text-sm font-medium text-white bg-font-primary-main'
                data-twe-ripple-init
                data-twe-ripple-color='light'
                style={{
                }}
              >
                Save New Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
