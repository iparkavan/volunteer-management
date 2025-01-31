import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import calendar_icon from "../../assets/icons/calendar_icon.svg";
import { Avatar } from "@mui/material";
import { useState } from "react";

const CustomDateTimePicker = ({ helperText,placeholder, error, ...restOfProps }) => {
  const [open, setOpen] = useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        open={open}
        onClose={() => setOpen(false)}
        // closeOnSelect={true}
        slots={{
          openPickerIcon: () => (
            <Avatar
              src={calendar_icon}
              alt={"calendar_icon"}
              onClick={() => setOpen(true)}
            />
          ),
        }}
        
        slotProps={{
          textField: {
            onClick: () => setOpen(true),
            error: !!error,
            helperText,
            ...(placeholder && { placeholder })
          },
        }}
        
        {...restOfProps}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
