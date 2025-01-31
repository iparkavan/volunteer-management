import { createTheme, responsiveFontSizes } from "@mui/material";

let MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#FE634E",
      light: "#FFF8F2"
    },
    success: {
      main: "#16B681",
      light: "#EBFFF3"
    },
    error: {
      main: "#BF453A"
    }
  },
  typography: {
    fontFamily: [
      "Plus Jakarta Sans",
      "sans-serif",
    ].join(","),
  }, components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
        colorInherit: {
          borderColor: "rgba(62, 62, 62, 1)",
          color: "rgba(62, 62, 62, 1)",
        },
        contained: {
          color: "#fff"
        }
      },
      defaultProps: {
        size: "large",
        disableElevation: true,
        disableTouchRipple: true,
        variant: 'contained',
        color: 'primary'
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&&&': {
            textTransform: 'capitalize',
          },
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiTypography: {
      defaultProps: {
        component: 'p'
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          maxWidth: 500,
        }
      }
    },
    MuiInputBase: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          background: "#1D5BBF0D",
          border: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
          }
        },
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true
      }
    },
    MuiAvatar: {
      defaultProps: {
        variant: "rounded",
        sx: {
          width: 25, height: 25
        }
      }
    },
    MuiDataGrid: {
      defaultProps: {
        sx: {
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#FFF1E7",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F9FAFB",
          },
        }
      }
    }
  }
});

export default MuiTheme = responsiveFontSizes(MuiTheme);

