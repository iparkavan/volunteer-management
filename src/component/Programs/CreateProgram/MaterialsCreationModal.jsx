import React, { useEffect } from "react";
import { MuiCustomModal } from "../../../shared/Modal/MuiCustomModal";
import TextField from "@mui/material/TextField";
import { useCreateMaterialMutation } from "../../../features/materials/materialApis.services";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  styled,
} from "@mui/material";
import AttachmentIcon from "../../../assets/icons/attachement_icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import modal_tick_icon from "../../../assets/icons/modal_tick_icon.svg";

const materialTypeOptions = [
  {
    label: "Video",
    value: "video",
  },
  {
    label: "Document",
    value: "document",
  },
  {
    label: "PowerPoint",
    value: "ppt",
  },
];

const defaultValues = {
  name: "",
  category: "",
  material_type: "",
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

const MaterialsCreationModal = (props) => {
  const { isOpen, handleCloseModal, categoryData, categoryId } = props;

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
    createMaterial,
    {
      isLoading: isMaterialsCreating,
      isSuccess: isMaterialsCreated,
      isError: IsErrorMaterialsCreating,
      data,
      reset: resetCreateMaterialState,
    },
  ] = useCreateMaterialMutation();

  const handleMaterialCreate = async () => {
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

      createMaterial(formData);
    }
  };

  const handleCancel = () => {
    reset(defaultValues); // Reset form values
    clearErrors(); // Clear any form errors
    resetCreateMaterialState(); // Reset mutation state
    handleCloseModal(); // Close the modal
  };

  useEffect(() => {
    if (isMaterialsCreated || IsErrorMaterialsCreating) {
      setShowBackdrop(true);

      // Set timeout to handle cleanup after 3 seconds
      const timer = setTimeout(() => {
        // Reset all states
        setShowBackdrop(false);

        // Only navigate on success cases
        if (isMaterialsCreated) {
          handleCancel();
        }
      }, 3000);
      return () => {
        clearTimeout(timer);
        resetCreateMaterialState();
        reset(defaultValues);
        clearErrors();
      };
    }
  }, [IsErrorMaterialsCreating, isMaterialsCreated]);

  useEffect(() => {
    const sub = watch((values) =>
      console.log("matetial creation values:", values)
    );

    return () => sub.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (categoryId && isOpen) {
      setValue("category", +categoryId);
    }
  }, [categoryId, isOpen]);

  return (
    <>
      <MuiCustomModal
        hideBackdrop
        dialogTitle={"Add Materials"}
        open={isOpen}
        handleClose={handleCancel}
        maxWidth="sm"
        actionButtons={[
          {
            color: "inherit",
            variant: "outlined",
            children: "Cancel",
            disabled: isMaterialsCreating,
            onClick: handleCancel,
          },
          {
            color: "primary",
            variant: "contained",
            disabled: isMaterialsCreating,
            children: isMaterialsCreating ? "Adding..." : "Add",
            onClick: handleMaterialCreate,
          },
        ]}
      >
        <label className="block tracking-wide text-gray-700 text-xs font-bold mt-4">
          Material Name
        </label>
        <TextField
          fullWidth
          placeholder="Material Name"
          margin="normal"
          {...register("name", {
            required: "Material name is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Category */}
        <label className="block tracking-wide text-gray-700 text-xs font-bold mt-4">
          Category
        </label>
        <TextField
          disabled
          select
          fullWidth
          value={formValues.category || ""}
          placeholder="Category"
          margin="normal"
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          {categoryData?.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Material Type */}
        <label className="block tracking-wide text-gray-700 text-xs font-bold mt-4">
          Material Type
        </label>
        <TextField
          select
          fullWidth
          placeholder="Material Type"
          margin="normal"
          {...register("material_type", {
            required: "Material type is required",
          })}
          error={!!errors.material_type}
          helperText={errors.material_type?.message}
        >
          {materialTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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
            background: "rgba(249, 249, 249, 1)",
          },
        }}
        open={showBackdrop}
        maxWidth="sm"
        onClose={() => setShowBackdrop(false)}
      >
        <div className="flex justify-center items-center flex-col gap-y-4">
          {isMaterialsCreated && <Avatar src={modal_tick_icon} />}
          <p
            className={`
            ${isMaterialsCreated ? "to-background-primary-main" : "text-red-500"} 
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

export default MaterialsCreationModal;
