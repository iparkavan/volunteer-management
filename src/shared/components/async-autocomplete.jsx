import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import api from "../../services/api";

export const AsyncSelectBox = ({
  fieldName,
  payload,
  onChange,
  setValue,
  asyncOptions,
}) => {
  const loadOptions = async (inputValue) => {
    const apiUrlWithQuery = `${asyncOptions.apiUrl}?${
      asyncOptions.params
    }=${encodeURIComponent(inputValue)}`;

    try {
      const response = await api.get(apiUrlWithQuery);

      const transformedOptions = response.data.map((item, index) => ({
        ...item,
        label: `${item.state_name}, ${item.city}, ${item.zip_code}`,
        value: item.id,
      }));

      return transformedOptions;
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }
  };

  const handleChange = (selectedOption) => {
    // onChange(selectedOption, fieldName);
    console.log("selectedOption", selectedOption.city);
    if (selectedOption) {
      if (fieldName === "zip_code") {
        setValue("city", selectedOption.city);
        setValue("state", selectedOption.state_name);
      } else if (fieldName === "city") {
        setValue("zip_code", selectedOption.zip_code);
        setValue("state", selectedOption.state_name);
      } else if (fieldName === "state") {
        setValue("city", selectedOption.city);
        setValue("zip_code", selectedOption.zip_code);
      }
    }
  };

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      // onChange={(selectedOption) => onChange(selectedOption)}
      onChange={handleChange}
      placeholder="Search..."
      defaultOptions
    />
  );
};

export default AsyncSelectBox;
