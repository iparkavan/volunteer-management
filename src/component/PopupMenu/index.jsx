import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

function PopupMenu({ children, disablePopupMenu = false, menuOption = [] }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopupMenu, setOpenPopupMenu] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopupMenu(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopupMenu(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="h-100 w-100 flex justify-center items-center my-2"
    >
      {React.cloneElement(children, {
        onClick: (e) => {
          !disablePopupMenu && handleClick(e);
        },
        ...children?.props,
      })}

      <Menu
        anchorEl={anchorEl}
        open={openPopupMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuOption.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default PopupMenu;
