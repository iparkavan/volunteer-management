import React, { useEffect, useMemo } from "react";
import Select, { components } from "react-select";

const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderRadius: '0',
      borderWidth: '0',
    }),
    // menu: (provided) => ({
    //   ...provided,
    //   backgroundColor: 'transparent', // Optional: Set background for dropdown items
    // }),
    // option: (provided) => ({
    //   ...provided,
    //   backgroundColor: 'transparent', // Optional: Set background color for options
    // }),
  };

export default function MultiSelectElement({
  className,
  options: optionsProp, // [{ label: string, value: string }]
  name,
  value: valueProp,
  required,
  onChange,
  disabled,
  placeholder,
  width,
  disableHorizontalMargin = false,
  disableMargin = false,
  disableRemoveIcon = false,
  inputRef,
  ...rest
}) {
  const MultiValueRemove = (props) => {

    if (props.data.isFixed || disabled) {
      return null;
    }
    return <components.MultiValueRemove {...props} />;
  };

  let options = useMemo(() => {
    if (optionsProp) {
      let additionalProps = {};
      if (disableRemoveIcon) {
        additionalProps.isFixed = true;
      }
      return optionsProp.map((option) => {
        return {
          label: option.label || option,
          value: option.value || option,
          ...option,
          ...additionalProps,
        };
      });
    }
    return [];
  }, [optionsProp]);

  let value = useMemo(() => {
    if (valueProp) {
      if (disableRemoveIcon) {
        return valueProp.map((item) => {
          return {
            ...item,
            isFixed: true,
          };
        });
      } else {
        return valueProp;
      }
    }

    return [];
  }, [valueProp]);

  return (
    <div
      className={`${
        disableMargin ? "m-0" : disableHorizontalMargin ? "my-1" : "m-1"
      } ${width}`}
    >
      <Select
        className={className}
        options={options}
        isMulti
        name={name}
        styles={customStyles}
        value={value}
        onChange={onChange}
        isDisabled={disabled}
        placeholder={placeholder}
        isClearable={false}
        ref={inputRef}
        components={{ MultiValueRemove }}
        {...rest}
      />
    </div>
  );
}
