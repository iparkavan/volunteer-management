import React, { useEffect, useState } from 'react';
import DeleteIcon from '../../../assets/images/delete_1x.png';
import { Controller, useFormContext } from 'react-hook-form';
import { MentorDocumentUplaod } from '../../../utils/formFields';
import UploadIcon from '../../../assets/images/image_1x.png';
import { view } from '../../../utils/constant';

const DocumentUploadSection = ({ type, setRemoveFiles }) => {
  const [logoImage, setLogoImage] = useState({});
  const [filePreviews, setFilePreviews] = useState({});
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    clearErrors,
    setValue,
  } = useFormContext();

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

    if (validFiles.length > 0) {
      clearErrors(field);
    }

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
    setRemoveFiles((prev) => [...prev, itemId]);
    setValue(field, updatedFiles);
  };

  return (
    <div className='grid grid-cols-1 gap-6'>
      {MentorDocumentUplaod.map((field) => {
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

          case 'file':
            return (
              <>
                {type === view.viewOnly ? (
                  <>
                    <label
                      className='block tracking-wide  text-xs mb-2'
                      style={{ color: 'rgba(116, 116, 116, 1)' }}
                    >
                      {field.label}
                      {field?.inputRules?.required && '*'}
                    </label>
                    <p className='flex items-center flex-wrap justify-start gap-4'>
                      {getValues(field.name) ? getValues(field.name) : '-'}
                    </p>
                  </>
                ) : (
                  <>
                    <div
                      className={`flex items-center justify-center w-${field.width}`}
                    >
                      <label
                        htmlFor={field.name}
                        className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
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
                          rules={field.inputRules}
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
                    {/* <div className='flex flex-wrap gap-4 mt-4'>
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
                      {errors[field.name] && (
                        <p style={{ color: 'red', fontSize: '12px' }}>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div> */}

                    {getValues(field.name)?.length > 0 && (
                      <>
                        <div
                          className='text-[14px] pt-5'
                          style={{ color: 'rgba(0, 0, 0, 1)' }}
                        >
                          Uploaded Image{' '}
                        </div>

                        <div className='flex flex-wrap items-center justify-start gap-2'>
                          {getValues(field.name) &&
                            getValues(field.name).map((item, index) => {
                              return (
                                <div
                                  className='flex justify-between items-center w-[25%] mt-5 px-4 py-4'
                                  style={{
                                    border: '1px solid rgba(29, 91, 191, 0.5)',
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
                    )}
                    {errors[field.name] && (
                      <p className='font-semibold text-red-500'>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </>
                )}
              </>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default DocumentUploadSection;
