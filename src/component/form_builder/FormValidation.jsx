// formValidationUtils.js

// Validate a single field based on its type and rules
export const validateField = (value, fieldInfo, fieldType, formData) => {
  // Skip validation for non-required empty fields
  if (!fieldInfo.is_required && !value) {
    return null;
  }

  // Required field validation
  if (fieldInfo.is_required && !value) {
    return "This field is required";
  }

  // Type-specific validations
  switch (fieldType) {
    case "text":
    case "textarea":
      if (fieldInfo.min_length && value.length < fieldInfo.min_length) {
        return `Minimum ${fieldInfo.min_length} characters required`;
      }
      if (fieldInfo.max_length && value.length > fieldInfo.max_length) {
        return `Maximum ${fieldInfo.max_length} characters allowed`;
      }
      break;

    case "number":
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return "Please enter a valid number";
      }
      if (fieldInfo.min) {
        if (numValue < fieldInfo.min) {
          return `Value must be at least ${fieldInfo.min}`;
        }
      }
      if (fieldInfo.max) {
        if (numValue > fieldInfo.max) {
          return `Value must not exceed ${fieldInfo.max}`;
        }
      }
      break;

    case "file":
    case "image":
      if (fieldInfo.is_required && !formData?.[`${fieldInfo.label}_filename`]) {
        return "This field is required";
      }
      break;

    case "select":
      if (fieldInfo.is_required && (!value || value === "")) {
        return "Please select an option";
      }
      break;

    case "signature":
      if (fieldInfo.is_required && !value) {
        return "Signature is required";
      }
      break;
  }

  return null;
};

// Validate entire form
export const validateForm = (formJson, formData) => {
  const errors = {};
  let hasError = false;

  formJson?.fields?.forEach((element) => {
    const fieldInfo = element.field_info || {};
    const value = formData?.[fieldInfo?.label];

    const error = validateField(value, fieldInfo, element.type, formData);
    if (error) {
      errors[fieldInfo.label] = error;
      hasError = true;
    }
  });

  return {
    hasError,
    errors,
  };
};

// Scroll to first error
export const scrollToFirstError = () => {
  const firstErrorField = document.querySelector(".border-red-500");
  if (firstErrorField) {
    firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
