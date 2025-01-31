import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const FormContextProvider = ({ children, onSubmit, initialValues }) => {
  const methods = useForm();

  useEffect(() => {
    if (Object.keys(initialValues).length) {
      const name = initialValues?.name?.split(" ");
      methods.reset({
        ...initialValues,
        first_name: initialValues.first_name || "",
        last_name: initialValues.last_name || "",
        phone_number: initialValues?.phone_number,
        secondary_phone_number: initialValues?.secondary_phone_number || "",
        email: initialValues?.email,
        address: initialValues?.address,
        professional_bio: initialValues?.professional_bio,
        documents: initialValues?.documents.map((doc) => (
          <Link
            {...doc}
            target='_blank'
            className='underline text-blue-500'
            to={doc.file}
          >
            {doc.file_display_name}
          </Link>
        )),
      });
    }
  }, [initialValues, methods]);

  return (
    <FormProvider {...methods}>
      <form action='' onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormContextProvider;
