import React, { useEffect } from "react";
import { MuiCustomModal } from "../../../shared/Modal/MuiCustomModal";
import TextField from "@mui/material/TextField";
import { useCreateCertificateMutation } from "../../../features/certificates/certifcatesApi.services";
import { useForm } from "react-hook-form";
import {
  Avatar,
  styled,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import modal_tick_icon from "../../../assets/icons/modal_tick_icon.svg";
import AttachmentIcon from "../../../assets/icons/attachement_icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";

const defaultValues = {
  name: "",
  description: null,
  file: null,
};

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CertificatesCreationModal = (props) => {
  const { isOpen, handleCloseModal } = props;

  const {
    setValue,
    watch,
    register,
    trigger,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues });

  const formValues = watch();
  const [showBackdrop, setShowBackdrop] = React.useState(false);

  const [
    createCertificate,
    {
      isLoading: isCertificatesCreating,
      isSuccess: isCertificatesCreated,
      isError: IsErrorCertificatesCreating,
      data,
      reset: resetCreateCertificateState,
    },
  ] = useCreateCertificateMutation();

  const handleCertificateCreate = async () => {
    const isValid = await trigger();

    if (isValid) {
      const formData = new FormData();

      // Append regular form fields
      Object.keys(formValues).forEach((key) => {
        if (key !== "file") {
          formData.append(key, formValues[key]);
        }
      });

      // Append file if they exist
      if (formValues.file && formValues.file.length > 0) {
        Array.from(formValues.file).forEach((file) => {
          formData.append("file", file);
        });
      }

      createCertificate(formData);
    }
  };

  const handleCancel = () => {
    reset(defaultValues); // Reset form values
    clearErrors(); // Clear any form errors
    resetCreateCertificateState(); // Reset mutation state
    handleCloseModal(); // Close the modal
  };

  useEffect(() => {
    if (isCertificatesCreated || IsErrorCertificatesCreating) {
      setShowBackdrop(true);

      // Set timeout to handle cleanup after 3 seconds
      const timer = setTimeout(() => {
        // Reset all states
        setShowBackdrop(false);

        // Only navigate on success cases
        if (isCertificatesCreated) {
          handleCancel();
        }
      }, 3000);
      return () => {
        clearTimeout(timer);
        resetCreateCertificateState();
        reset(defaultValues);
        clearErrors();
      };
    }
  }, [IsErrorCertificatesCreating, isCertificatesCreated]);

  useEffect(() => {
    const sub = watch((values) =>
      console.log("matetial creation values:", values)
    );

    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <>
      <MuiCustomModal
        hideBackdrop
        dialogTitle={"Add Certificates"}
        open={isOpen}
        handleClose={handleCancel}
        maxWidth="sm"
        actionButtons={[
          {
            color: "inherit",
            variant: "outlined",
            children: "Cancel",
            disabled: isCertificatesCreating,
            onClick: handleCancel,
          },
          {
            color: "primary",
            variant: "contained",
            disabled: isCertificatesCreating,
            children: isCertificatesCreating
              ? "Adding..."
              : "Add New Certificate",
            onClick: handleCertificateCreate,
          },
        ]}
      >
        <label className="block tracking-wide text-gray-700 text-xs font-bold mt-4">
          Certification Name
        </label>
        <TextField
          fullWidth
          placeholder="Certificate Name"
          margin="normal"
          {...register("name", {
            required: "Certificate name is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* File Upload Area */}
        <label className="block tracking-wide text-gray-700 text-xs font-bold my-4">
          Add Material
        </label>
        <Button
          component="label"
          role={undefined}
          variant={"text"}
          tabIndex={-1}
          startIcon={
            <Avatar
              className="!w-10 !h-10"
              src={AttachmentIcon}
              slotProps={{ img: { className: "!object-contain" } }}
              alt={"AttachmentIcon"}
            />
          }
          fullWidth
          className="flex flex-col items-center justify-center text-center my-2 !border-2 !border-dashed !border-gray-200 rounded-lg p-8 !bg-gray-100 !text-gray-400"
        >
          Add .pdf,.doc / Browser
          <VisuallyHiddenInput
            type="file"
            {...register("file", {
              required: "Please upload at least one file",
            })}
          />
        </Button>
        {formValues?.file && (
          <List
            sx={{ marginTop: 2, marginBottom: 4 }}
            component="div"
            dense
            disablePadding
            className="rounded-sm border border-[#1D5BBF80] border-solid"
          >
            <ListItem
              secondaryAction={
                <IconButton
                  onClick={() => setValue("file", null)}
                  edge="end"
                  aria-placeholder="delete"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <WallpaperOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: "primary",
                  sx: { textAlign: "start" },
                }}
                primary={`${formValues?.file[0]?.name}`}
              />
            </ListItem>
          </List>
        )}
      </MuiCustomModal>
      <MuiCustomModal
        PaperProps={{
          sx: {
            background: isCertificatesCreated
              ? "linear-gradient(97.86deg, #005DC6 -15.07%, #00B1C0 112.47%)"
              : "rgba(249, 249, 249, 1)",
          },
        }}
        open={showBackdrop}
        maxWidth="sm"
        onClose={() => setShowBackdrop(false)}
      >
        <div className="flex justify-center items-center flex-col gap-y-4">
          {isCertificatesCreated && <Avatar src={modal_tick_icon} />}
          <p
            className={`
            ${isCertificatesCreated ? "text-white" : "text-red-500"} 
          pb-4 text-center font-normal text-md`}
            role="alert"
          >
            {data?.message}
          </p>
        </div>
      </MuiCustomModal>
    </>
  );
};

export default CertificatesCreationModal;
