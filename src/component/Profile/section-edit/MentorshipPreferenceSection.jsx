import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MentorshipPreferenceFields } from '../../../utils/formFields';
import { view } from '../../../utils/constant';

const MentorshipPreferenceSection = ({ type }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
  } = useFormContext();

  return (
    <div className='grid grid-cols-2 gap-6'>
      {MentorshipPreferenceFields.map((field) => {
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
  );
};

export default MentorshipPreferenceSection;
