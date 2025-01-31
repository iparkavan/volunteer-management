import {
  Avatar,
  Button,
  DialogActions,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import modal_close_icon from "../../assets/icons/modal_close_icon.svg";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef, useEffect } from "react";

const MuiCustomModal = (props) => {
  const {
    children,
    open,
    scroll = "paper",
    fullWidth = true,
    handleClose,
    dialogTitle,
    actionButtons,
    ...restProps
  } = props;
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      scroll={scroll}
      fullWidth={fullWidth}
      onClose={handleClose}
      {...restProps}
    >
      <div
        className={`flex ${
          dialogTitle ? "justify-between" : "justify-end"
        } items-center pr-6`}
      >
        {dialogTitle && (
          <>
            <DialogTitle
              component={Typography}
              fontWeight={500}
              variant="body1"
              id="scroll-dialog-title"
            >
              {dialogTitle}
            </DialogTitle>
            <IconButton size="small" onClick={handleClose}>
              <Avatar
                sx={{ width: 20, height: 20 }}
                src={modal_close_icon}
                color="primary"
                fontSize="small"
              />
            </IconButton>
          </>
        )}
      </div>
      {dialogTitle && (
        <div className="px-4">
          <Divider />
        </div>
      )}
      <DialogContent>{children}</DialogContent>
      {actionButtons && (
        <DialogActions className="mt-4 gap-x-5 !justify-center">
          {actionButtons?.map(({ children, ...restButtonProps }) => (
            <Button {...restButtonProps}>{children}</Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export { MuiCustomModal };
