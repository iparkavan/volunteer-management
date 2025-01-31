import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function MuiModal({
  modalOpen,
  title = '',
  children,
  footer = false,
  modalClose,
  modalSize = 'sm',
  noheader = false,
  rightIcon,
  onClick,
}) {
  const [open, setOpen] = React.useState(modalOpen);

  const handleClose = () => {
    setOpen(false);
    modalClose(false);
  };

  React.useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);

  return (
    <React.Fragment>
      {/* <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog> */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth={modalSize}
      >
        {!noheader && (
          <>
            <DialogTitle
              sx={{ m: 0, p: 2 }}
              id='customized-dialog-title'
              className='flex items-center gap-3'
            >
              {title}
              {rightIcon && (
                <img
                  className='cursor-pointer'
                  src={rightIcon}
                  alt=''
                  width={20}
                  height={20}
                  onClick={onClick}
                />
              )}
            </DialogTitle>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        )}

        <DialogContent dividers>{children}</DialogContent>
        {footer ? (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        ) : null}
      </BootstrapDialog>
    </React.Fragment>
  );
}
