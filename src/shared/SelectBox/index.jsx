import { MenuItem, Select } from "@mui/material";
import React, { useRef } from "react";
import ArrowDown from "../../assets/icons/menuDownIcon.svg";
import BlackSelectBoxArrow from "../../assets/icons/blackSelectBoxArrow.svg";

export const SelectBox = ({
  value = "",
  handleChange = () => false,
  menuList = [],
  background = "#FE634E",
  isBlackArrow = false,
  borderColor = "#FE634E",
  height = "40px",
  color = "#FFFFFF",
  width = "100px",
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (selectRef.current) {
      if (!isOpen) {
        selectRef.current.focus();
      } else {
        selectRef.current.blur();
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Select
        ref={selectRef}
        value={value}
        onChange={handleChange}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        placeholder={placeholder ?? ""}
        sx={{
          height: height ?? "40px",
          border: "1px solid",
          borderColor: borderColor ?? "#FE634E",
          color: color ?? "#FFFFFF",
          width: width ?? "100px",
          background: background ?? "#FE634E",
          "& .MuiSelect-select": {
            fontSize: "14px",
            borderColor: borderColor ?? "#FE634E",
            "&:hover": {
              border: "none",
            },
          },
          "&:hover": {
            border: "none",
          },
        }}
        IconComponent={(props) => (
          <div
            onClick={toggleOpen}
            style={{
              height: "100%",
              width: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={isBlackArrow ? BlackSelectBoxArrow : ArrowDown}
              alt="ArrowDown"
              style={{
                transform: isOpen ? "rotate(180deg)" : "",
                cursor: "pointer",
              }}
            />
          </div>
        )}
      >
        {menuList?.map((e, index) => (
          <MenuItem
            key={index}
            value={e?.value}
            sx={{
              "&.Mui-selected": {
                background: "#EEF5FF",
                color: "#1D5BBF",
                fontSize: "14px",
                fontWeight: 500,
              },
              background: "#FFF",
              color: "#18283D",
              fontSize: "14px",
            }}
          >
            {e?.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
