import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { categoryCreateEditFields } from '../../utils/formFields';
import { useForm } from 'react-hook-form';
import { Button } from '../../shared';
import CloseIcon from '../../assets/icons/closeIcon.svg';
import { useSelector } from 'react-redux';

export const CategoryCreateEdit = ({
  handleCancelForm = () => false,
  onSubmit = () => false,
}) => {
  const { formDetails } = useSelector((state) => state.category);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm();

  React.useEffect(() => {
    reset(formDetails);
  }, [formDetails]);

  return (
    <Box className={'border border-[#1D5BBF] rounded-[3px] p-[12px]'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={'12px 24px 24px'}
      >
        <Typography
          className='text-[18px] text-[#1D5BBF]'
          sx={{ fontWeight: 600 }}
        >
          Create Category
        </Typography>
        <Box className='cursor-pointer' onClick={handleCancelForm}>
          <img src={CloseIcon} alt='close' />
        </Box>
      </Stack>

      <Divider></Divider>

      <Box p={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {categoryCreateEditFields?.map((field) => {
              return (
                <Stack spacing={'12px'}>
                  <label
                    className='block tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor={field.label}
                  >
                    {field.label}
                  </label>

                  {field?.type === 'input' && (
                    <input
                      {...register(field.name, field.inputRules)}
                      type={field.fieldtype}
                      className='w-full border-none px-3 py-[0.32rem] leading-[2.15] 
                                            input-bg focus:border-none focus-visible:border-none 
                                            focus-visible:outline-none text-[14px] h-[60px]'
                      placeholder={field.placeholder}
                      style={{
                        color: '#232323',
                        borderRadius: '3px',
                      }}
                      disabled={field.disabled}
                      aria-invalid={!!errors[field.name]}
                    />
                  )}
                  {field?.type === 'textbox' && (
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
                    ></textarea>
                  )}

                  {errors[field.name] && (
                    <p className='error' role='alert'>
                      {errors[field.name].message}
                    </p>
                  )}
                </Stack>
              );
            })}
          </Stack>

          <Box className='flex w-[100%] align-middle justify-center pt-[32px]'>
            <Stack direction={'row'} alignItems={'center'} spacing={'30px'}>
              <Button
                btnCategory='secondary'
                btnCls='!border !border-[#18283D] !text-[#18283D]'
                btnName={'Cancel'}
                onClick={handleCancelForm}
              />
              <Button btnCategory='primary' btnType='submit' btnName={'Save'} />
            </Stack>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
