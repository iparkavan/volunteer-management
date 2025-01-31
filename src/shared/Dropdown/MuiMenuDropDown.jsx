import { Menu, MenuItem } from "@mui/material";

function MuiMenuDropDown(props) {
  const { menuItems, handleMenuClick, ...restOfMenuProps } = props;
  return (
    <Menu
      {...restOfMenuProps}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            ml: -3,
            border: "1px solid #D9D9D9",
            "& .MuiAvatar-root": {
              width: 25,
              height: 25,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              border: "1px solid #D9D9D9",
              borderRight: 0,
              borderBottom: 0,
              top: 0,
              right: 35,
              width: 20,
              height: 20,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
    >
      {menuItems.map((item) => {
        return (
          <MenuItem
            key={item?.action}
            onClick={() => handleMenuClick(item?.action)}
          >
            {item?.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
}

export { MuiMenuDropDown };
