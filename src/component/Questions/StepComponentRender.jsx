import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Button } from '../../shared';
import { useForm } from 'react-hook-form';
import CalendarIcon from '../../assets/images/calender_1x.png';
import DocumentUpload from '../Mentees/DocumentUpload';
import FileUploadIcon from '../../assets/icons/Upload.svg';
import UploadIcon from '../../assets/images/image_1x.png';
import DeleteIcon from '../../assets/images/delete_1x.png';
import ToastNotification from '../../shared/Toast';
import { formatPhoneNumber } from '../../utils/formFields';

const StepComponenRender = ({
  stepFields,
  currentStep,
  handleNextStep,
  role,
  handlePreviousStep,
  stepData,
  stepName,
  handleSkip,
  totalSteps,
}) => {
  const navigate = useNavigate();
  const calendarRef = useRef([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setError,
    setValue,
  } = useForm();

  const [dateFormat, setDateFormat] = useState({});
  const [checkBoxValue, setCheckBoxValue] = useState('');
  const [disabledFields, setDisabledFields] = useState({});
  const [errorNot, setErrorNot] = useState(false);
  const [idProof, setIdProof] = useState([]);
  const onSubmit = (data) => {
    handleNextStep(data);
    reset();
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;

    if (
      field.name === 'phone_number' ||
      field.name === 'secondary_phone_number'
    ) {
      const formattedValue = formatPhoneNumber(value);
      setValue(field.name, formattedValue);
    } else {
      setValue(field.name, value);
    }
  };

  const handleDeleteImage = (index) => {
    const files = idProof.filter((fil, i) => i !== index);
    if (files.length) setValue('documents', '');
    setIdProof(files);
  };

  const previousStep = () => {
    const { first_name, email, ...rest } = getValues();
    handlePreviousStep(rest);
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (value === true) {
      register('mentor_exp_desc', {
        required: 'This field is required',
      });
    } else {
      register('mentor_exp_desc', {
        required: false,
      });
    }
    setCheckBoxValue(e.target.value);
  };

  const handleRadioBox = (e) => {
    const value = e.target.value;
    if (value === 'true') {
      setDisabledFields((prev) => ({
        ...prev,
        mentor_exp_desc: false, // Disable the field if value is false
      }));
      register('mentor_exp_desc', {
        required: 'This field is required',
      });
    } else {
      setDisabledFields((prev) => ({
        ...prev,
        mentor_exp_desc: true, // Disable the field if value is false
      }));
      register('mentor_exp_desc', {
        required: false,
      });
      setValue('mentor_exp_desc', '');
    }
    setCheckBoxValue(e.target.value);
  };

  useEffect(() => {
    const fName = [];
    const f = {};
    stepFields.forEach((step) => fName.push(step.name));
    for (const field in stepData) {
      if (fName.includes(field)) f[field] = stepData[field];
    }
    reset(f);
  }, [stepFields, stepData]);
  return (
    <>
      <div className='form-container'>
        {/* {errorNot && (
          <ToastNotification
            openToaster={errorNot}
            message={'Please fill all mandatory fields'}
            handleClose={() => setErrorNot(false)}
            toastType={'error'}
          />
        )} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-wrap gap-4'>
            {stepFields.map((field, index) => {
              const checkbox =
                field.type === 'checkbox'
                  ? register(field.name, field.inputRules)
                  : undefined;
              const radiobox =
                field.type === 'radio'
                  ? register(field.name, field.inputRules)
                  : undefined;
              const dateField =
                field.type === 'date'
                  ? register(field.name, field.inputRules)
                  : undefined;
              // const fileUpload = field.type === 'file'? register(field.name, field.inputRules):undefined
              return (
                <div
                  className={`relative mb-6 ${
                    field.size ? 'width-49' : 'w-full'
                  }`}
                  key={index}
                >
                  <label
                    className='block tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor={field.label}
                  >
                    {field.label}{' '}
                    <span style={{ color: 'red' }}>
                      {field?.inputRules?.required ? '*' : ''}
                    </span>
                  </label>
                  {field.type === 'input' ? (
                    <>
                      <input
                        {...register(field.name, field.inputRules)}
                        type={field.fieldtype}
                        className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                            focus-visible:outline-none text-[14px] h-[60px]'
                        placeholder={field.placeholder}
                        onChange={(e) => handleInputChange(e, field)}
                        style={{
                          color: '#232323',
                        }}
                        disabled={
                          field.name === 'mentor_exp_desc'
                            ? disabledFields[field.name]
                            : field.disable
                            ? field.disable
                            : false
                        }
                        aria-invalid={!!errors[field.name]}
                      />

                      {errors[field.name] && (
                        <p className='error' role='alert'>
                          {errors[field.name].message}
                        </p>
                      )}
                    </>
                  ) : field.type === 'dropdown' ? (
                    <>
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
                            {' '}
                            {option.value}{' '}
                          </option>
                        ))}
                      </select>
                      {errors[field.name] && (
                        <p className='error' role='alert'>
                          {errors[field.name].message}
                        </p>
                      )}
                    </>
                  ) : field.type === 'file' ? (
                    <>
                      <div className='flex items-center justify-center w-full'>
                        <label
                          htmlFor='dropzone-file'
                          className='flex flex-col items-center justify-center w-full h-64 border-2
                                                border-gray-300 border-dashed cursor-pointer
                                                dark:hover:bg-bray-800  hover:bg-gray-100
                                                dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 input-bg'
                        >
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <img src={FileUploadIcon} alt='FileUploadIcon' />
                            <p
                              className='mb-2 text-sm pt-5'
                              style={{ color: '#C6C6C6' }}
                            >
                              <span>Upload Documents</span>
                            </p>
                          </div>
                          <input
                            id='dropzone-file'
                            type='file'
                            // {...fileUpload}
                            accept='image/png, image/jpeg, application/pdf'
                            onChange={(e) => {
                              // fileUpload.onChange(e);

                              if (e.target.files && e.target.files[0]) {
                                let types = [
                                  'image/png',
                                  'image/jpeg',
                                  'application/pdf',
                                ];
                                if (types.includes(e.target.files[0].type)) {
                                  setIdProof([...idProof, e.target.files]);
                                  setValue(field.name, [
                                    ...idProof,
                                    e.target.files,
                                  ]);
                                } else {
                                  setError(['documents'], 'Invalid file type');
                                }
                              }
                            }}
                            className='hidden'
                          />
                        </label>
                      </div>
                      {idProof.length > 0 && (
                        <>
                          <div>
                            {idProof.map((proof, i) => (
                              <div
                                key={i}
                                className='flex justify-between items-center w-[30%] mt-5 px-4 py-4'
                                style={{
                                  border: '1px solid rgba(29, 91, 191, 0.5)',
                                  borderRadius: '3px',
                                }}
                              >
                                <div className='flex w-[80%] gap-3 items-center'>
                                  <img src={UploadIcon} alt='altlogo' />
                                  <span className='text-[12px]'>
                                    {' '}
                                    {proof[0]?.name}
                                  </span>
                                </div>
                                <img
                                  className='w-[30px] cursor-pointer'
                                  onClick={() => handleDeleteImage(i)}
                                  src={DeleteIcon}
                                  alt='DeleteIcon'
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : field.type === 'date' ? (
                    <div className='relative'>
                      <Calendar
                        className='calendar-control input-bg'
                        {...dateField}
                        value={dateFormat[field.name]}
                        onChange={(e) => {
                          dateField.onChange(e);
                          setDateFormat({
                            ...dateFormat,
                            [field.name]: e.value,
                          });
                          calendarRef?.current[index]?.hide();
                        }}
                        hourFormat='12'
                        dateFormat='dd/mm/yy'
                        ref={(el) => (calendarRef.current[index] = el)}
                      />
                      <img
                        className='absolute top-5 right-2 cursor-pointer'
                        src={CalendarIcon}
                        alt='CalendarIcon'
                        onClick={(e) => {
                          calendarRef?.current[index]?.show();
                        }}
                      />
                      {errors[field.name] && (
                        <p className='error' role='alert'>
                          {errors[field.name].message}
                        </p>
                      )}
                    </div>
                  ) : field.type === 'textbox' ? (
                    <textarea
                      id='message'
                      rows='4'
                      className='block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                                                   focus:visible:outline-none focus:visible:border-none'
                      placeholder='Write your thoughts here...'
                      {...register(field.name, field.inputRules)}
                    ></textarea>
                  ) : field.type === 'radio' ? (
                    <>
                      <div className='flex items-center me-4'>
                        {field.options.map((option, index) => {
                          return (
                            <div className='flex items-center me-4' key={index}>
                              <input
                                type='radio'
                                className='w-4 h-4 text-blue-600 bg-gray-100
                                                                                    border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                                                    dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                                                                    dark:border-gray-600'
                                {...radiobox}
                                onChange={(e) => {
                                  radiobox.onChange(e);
                                  handleRadioBox(e);
                                }}
                                value={option.key}
                              />
                              <label className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                {option.value}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      {errors[field.name] && (
                        <p className='error' role='alert'>
                          {errors[field.name].message}
                        </p>
                      )}
                    </>
                  ) : field.type === 'checkbox' ? (
                    <>
                      <div className='flex items-center me-4'>
                        {field.options.map((option, index) => {
                          return (
                            <div className='flex items-center me-4' key={index}>
                              <input
                                type='checkbox'
                                className='w-4 h-4 text-blue-600 bg-gray-100
                                                                                    border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                                                    dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                                                                    dark:border-gray-600'
                                {...checkbox}
                                onChange={(e) => {
                                  checkbox.onChange(e);
                                  handleCheckbox(e);
                                }}
                                value={option.key}
                                checked={checkBoxValue === option.key}
                              />
                              <label className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                {option.value}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      {errors[field.name] && (
                        <p className='error' role='alert'>
                          {errors[field.name].message}
                        </p>
                      )}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className='flex gap-6 justify-center align-middle'>
            {currentStep === 1 && (
              <Button
                btnName='Cancel'
                btnCategory='secondary'
                onClick={() => navigate('/login-type')}
              />
            )}
            {currentStep > 1 && (
              <Button
                btnName='Back'
                btnCategory='secondary'
                onClick={previousStep}
              />
            )}
            <Button
              btnType='submit'
              btnCls='w-[100px]'
              btnName={currentStep === totalSteps ? 'Submit' : 'Next'}
              btnCategory='primary'
            />
          </div>
          <div className='flex justify-end'>{handleSkip()}</div>
        </form>
      </div>
    </>
  );
};

export default StepComponenRender;
