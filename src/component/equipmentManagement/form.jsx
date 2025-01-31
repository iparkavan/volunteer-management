import { Box, Stack } from "@mui/material";
import React from "react";
import CustomAccordian from "../../shared/Accordian/accordian";
import { EquipmentFormFields } from "./formFields";
import { Button } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import {
  createEquipment,
  getParticularEquipment,
  updateEquipment,
} from "./network/equipment";
import { useLocation, useNavigate } from "react-router-dom";
import { ActivityPopup } from "../../shared/activityPopup/activityPopup";
import dayjs from "dayjs";

const EquipmentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useLocation()?.state;
  const userInfo = useSelector((state) => state.userInfo);
  const signaturePadRef = React.useRef();

  const [activity, setActivity] = React.useState(false);

  const [formData, setFormData] = React.useState({
    created_by: "",
    equipment_type: "own",
    equipment_name: "",
    equipment_category: "",
    equipment_owner: "",
    equipment_owner_contact: "",
    rental_start_date: "",
    rental_end_date: "",
    equipment_descriptions: "",
    equipment_image: [],
    purchase_number: "",
    ssn_number: "",
    rent: "",
    additional_fees: "",
    total_amount_due: "",
    deposit_amount: "",
    paid: "",
    payment_method: "",
    purchase_bill: [],
    memo: "",
    signature_type: "",
    signature_document: [],
    date_of_purchase: "",
    purchase_type: "",
    purchase_price: "",
    vendor_supplier: "",
    vendor_supplier_location: "",
    vendor_supplier_contact: "",
    warranty_avaiability: "",
    warranty_period: "",
    rent_status: "",
    address_line1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    error: {
      equipment_type: "",
      equipment_name: "",
      equipment_category: "",
    },
  });

  React.useEffect(() => {
    if (userInfo?.data?.user_id && state?.type !== "edit") {
      updateState("created_by", userInfo?.data?.user_id);
    }
  }, [userInfo]);

  React.useMemo(() => {
    if (state?.id && state?.type === "edit") {
      dispatch(getParticularEquipment(state?.id)).then((res) => {
        console.log("res", res);
        if (res?.meta?.requestStatus === "fulfilled") {
          const resData = res?.payload;
          setFormData({
            ...formData,
            isEdit: true,
            created_by: userInfo?.data?.user_id,
            equipment_type: resData?.equipment_type.toLowerCase(),
            equipment_name: resData?.equipment_name ?? "",
            equipment_category: resData?.equipment_category ?? "",
            equipment_owner: resData?.equipment_owner ?? "",
            equipment_owner_contact: resData?.equipment_owner_contact ?? "",
            rental_start_date: resData?.rental_start_date
              ? new Date(resData?.rental_start_date)
              : "",
            rental_end_date: resData?.rental_end_date
              ? new Date(resData?.rental_end_date)
              : "",
            equipment_descriptions: resData?.equipment_descriptions ?? "",
            equipment_image: resData?.equipment_image
              ? {
                name: resData?.equipment_image.split("/").pop(),
                url: resData?.equipment_image,
              }
              : "",
            purchase_number: resData?.purchase_number ?? "",
            ssn_number: resData?.ssn_number ?? "",
            rent: resData?.rent ?? "",
            additional_fees: resData?.additional_fees ?? "",
            total_amount_due: resData?.total_amount_due ?? "",
            deposit_amount: resData?.deposit_amount ?? "",
            paid: resData?.paid ?? "",
            payment_method: resData?.payment_method ?? "",
            purchase_bill: resData?.purchase_bill
              ? {
                name: resData?.purchase_bill.split("/").pop(),
                url: resData?.purchase_bill,
              }
              : "",
            memo: resData?.memo ?? "",
            signature_type: resData?.signature_type ?? "",
            signature_document: resData?.signature_document
              ? {
                name: resData?.signature_document.split("/").pop(),
                url: resData?.signature_document,
              }
              : "",
            date_of_purchase: resData?.date_of_purchase ? new Date(resData?.date_of_purchase) : "",
            purchase_type: resData?.purchase_type ?? "",
            purchase_price: resData?.purchase_price ?? "",
            vendor_supplier: resData?.vendor_supplier ?? "",
            vendor_supplier_location: resData?.vendor_supplier_location ?? "",
            vendor_supplier_contact: resData?.vendor_supplier_contact ?? "",
            warranty_avaiability: resData?.warranty_avaiability ?? "",
            warranty_period: resData?.warranty_period ?? "",
            purchase_description: resData?.purchase_description ?? "",
            paid_type: resData?.paid_type ?? "",
            address_line1: resData?.address_line1 ?? "",
            address_line_2: resData?.address_line_2 ?? "",
            city: resData?.city ?? "",
            state: resData?.state ?? "",
            zip_code: resData?.zip_code ?? "",
            country: resData?.country ?? "",
          });
        }
      });
    }
  }, [userInfo]);

  const fields = [
    {
      title: "Equipment Information",
      field: [
        {
          type: "full_checkbox",
          label: "",
          isRequired: true,
          col: 12,
          key: "equipment_type",
          options: [
            {
              label: "Own",
              value: "own",
            },
            {
              label: "Rent",
              value: "rent",
            },
          ],
        },
        {
          type: "textbox",
          label: "Equipment name",
          isRequired: true,
          col: 6,
          key: "equipment_name",
        },
        {
          type: "selectBox",
          label: "Equipment Category",
          isRequired: true,
          col: 6,
          key: "equipment_category",
          options: [
            {
              label: "Vehicle",
              value: "vehicle",
            },
            {
              label: "Machinery",
              value: "machinery",
            },
            {
              label: "Essentials",
              value: "essentials",
            },
          ],
        },
        {
          type: "textbox",
          label: "Equipment Owner Organization",
          isRequired: false,
          col: 6,
          key: "equipment_owner",
          isHide: formData?.equipment_type === "own",
        },
        {
          type: "textbox",
          label: "Equipment Owner Contact Number",
          isRequired: false,
          col: 6,
          key: "equipment_owner_contact",
          isHide: formData?.equipment_type === "own",
          is_pattern: true,
          pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}",
        },
        {
          type: "date",
          label: "Rental Start date",
          isRequired: false,
          col: 6,
          key: "rental_start_date",
          isHide: formData?.equipment_type === "own",
        },
        {
          type: "date",
          label: "Rental End date",
          isRequired: false,
          col: 6,
          key: "rental_end_date",
          isHide: formData?.equipment_type === "own",
          minDate: formData?.rental_start_date,
        },
        {
          type: "textarea",
          label: "Description",
          isRequired: false,
          col: 12,
          key: "equipment_descriptions",
        },
        {
          type: "upload",
          label: "Equipment Image",
          isRequired: false,
          col: 12,
          key: "equipment_image",
        },
      ],
    },
    {
      title: "Purchase Information",
      field: [
        {
          type: "textbox",
          label: "Purchase number (PO. No)",
          isRequired: false,
          col: 6,
          key: "purchase_number",
          // fieldType: "number"
        },
        {
          type: "textbox",
          label: "Serial number",
          isRequired: false,
          col: 6,
          key: "ssn_number",
        },
        {
          type: "selectBox",
          label: "Purchase Type",
          isRequired: false,
          col: 6,
          key: "purchase_type",
          options: [
            {
              label: "In Store",
              value: "instore",
            },
            {
              label: "Online Store",
              value: "online",
            },
          ],
          isHide: formData?.equipment_type === "rent",
        },

        {
          type: "date",
          label: "Date of Purchase",
          isRequired: false,
          col: 6,
          key: "date_of_purchase",
          isHide: formData?.equipment_type === "rent",
        },
        {
          type: "textbox",
          label: "Purchase Price",
          isRequired: false,
          col: 6,
          key: "purchase_price",
          fieldType: "number",
          isHide: formData?.equipment_type === "rent",
        },
        {
          type: "textbox",
          label: "Vendor",
          isRequired: false,
          col: 6,
          key: "vendor_supplier",
          isHide: formData?.equipment_type === "rent",
        },
        {
          type: "textbox",
          label: "Vendor Location",
          isRequired: false,
          col: 6,
          key: "vendor_supplier_location",
          isHide: formData?.equipment_type === "rent",
        },
        {
          type: "textbox",
          label: "Vendor Contact Number",
          isRequired: false,
          col: 6,
          key: "vendor_supplier_contact",
          isHide: formData?.equipment_type === "rent",
          is_pattern: true,
          pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}"
        },
        {
          type: "checkbox",
          label: "Warranty Availability",
          isRequired: false,
          col: 6,
          options: [
            {
              label: "Yes",
              value: true,
            },
            {
              label: "No",
              value: false,
            },
          ],
          key: "warranty_avaiability",
          isHide: formData?.equipment_type === "rent",
        },
        {
          type: "textbox",
          label: "Warranty Period",
          isRequired: false,
          col: formData?.equipment_type === "rent" ? 12 : 6,
          key: "warranty_period",
          isHide: formData?.equipment_type === "rent",
        },

        {
          type: "checkbox",
          label: "Rent Status",
          isRequired: false,
          col: 6,
          options: [
            {
              label: "Daily",
              value: "daily",
            },
            {
              label: "Weekly",
              value: "weekly",
            },
            {
              label: "Monthly",
              value: "monthly",
            },
          ],
          key: "rent_status",
          isHide: formData?.equipment_type === "own",
        },
        {
          type: "textbox",
          label: "Rent",
          isRequired: false,
          col: 6,
          key: "rent",
          fieldType: "number",
          isHide: formData?.equipment_type === "own",
        },

        {
          type: "textbox",
          label: "Additional Fees (if any)",
          isRequired: false,
          col: 6,
          key: "additional_fees",
          fieldType: "number",
          isHide: formData?.equipment_type === "own",
        },
        {
          type: "textbox",
          label: "Total Amount Due",
          isRequired: false,
          col: 6,
          key: "total_amount_due",
          fieldType: "number",
          isHide: formData?.equipment_type === "own",
        },
        {
          type: "textbox",
          label: "Deposit Amount",
          isRequired: false,
          col: 6,
          key: "deposit_amount",
          fieldType: "number",
          isHide: formData?.equipment_type === "own",
        },
        {
          type: "checkbox",
          label: "Paid Status",
          isRequired: false,
          col: 6,
          options: [
            {
              label: "Fully Paid",
              value: "fully_paid",
            },
            {
              label: "Partially Paid",
              value: "partially_paid",
            },
            {
              label: "Not Paid",
              value: "not_paid",
            },
          ],
          key: "paid",
          isHide: formData?.equipment_type === "own",
        },
        {
          type: "selectBox",
          label: "Payment Method",
          isRequired: false,
          col: formData?.equipment_type === "own" ? 12 : 6,
          key: "payment_method",
          options: [
            {
              label: "Cash",
              value: "cash",
            },
            {
              label: "Online",
              value: "online",
            },
          ],
          // isHide: formData?.equipment_type === "own"
        },
        {
          type: "textarea",
          label: "Description",
          isRequired: false,
          col: 12,
          key: "purchase_description",
          isHide: formData?.equipment_type === "rent",
        },
        {
          type: "upload",
          label: "Upload bill (if any)",
          isRequired: false,
          col: 12,
          key: "purchase_bill",
        },
        {
          type: "textbox",
          label: "Address Line 1",
          isRequired: false,
          col: 6,
          key: "address_line1",
        },
        {
          type: "textbox",
          label: "Address Line 2",
          isRequired: false,
          col: 6,
          key: "address_line_2",
        },
        {
          type: "textbox",
          label: "City",
          isRequired: false,
          col: 6,
          key: "city",
        },
        {
          type: "textbox",
          label: "State",
          isRequired: false,
          col: 6,
          key: "state",
        },
        {
          type: "textbox",
          label: "Zip Code",
          isRequired: false,
          col: 6,
          key: "zip_code",
          format_type: "zip_code",
          pattern: "/^\d{5}(-\d{4})?$/",
          is_pattern: true
        },
        {
          type: "textbox",
          label: "Country",
          isRequired: false,
          col: 6,
          key: "country",
        },
      ],
    },
    {
      title: "Other Information",
      field: [
        {
          type: "textarea",
          label: "Memo",
          isRequired: false,
          col: 12,
          key: "memo",
        },
        {
          type: "title",
          label: "",
          isRequired: false,
          col: 12,
          content:
            "Acknowledgment: By signing below, I confirm that the service/maintenance has been performed as described above.",
        },
        {
          type: "checkbox",
          label: "Signature Type",
          isRequired: false,
          col: 12,
          options: [
            {
              label: "Add Document",
              value: true,
            },
            {
              label: "Add Signature",
              value: false,
            },
          ],
          key: "signature_type",
        },
        {
          // type: (!formData?.signature_type && formData?.signature_type !== "") ? "signature" : "upload",
          // label: (!formData?.signature_type && formData?.signature_type !== "") ? "signature" : "Upload Document",
          type: "upload",
          label: "Upload Document",
          isRequired: false,
          col: 12,
          key: "signature_document",
          ref: signaturePadRef,
        },
      ],
    },
  ];

  const updateState = (key, value) => {
    if (
      key === "equipment_image" ||
      key === "purchase_bill" ||
      key === "signature_document"
    ) {
      setFormData({
        ...formData,
        [key]: value,
      });
    } else if (key === "equipment_type") {
      setFormData({
        ...formData,
        [key]: value,
        equipment_owner: "",
        equipment_owner_contact: "",
        rental_start_date: "",
        rental_end_date: "",
      });
    }
    // else if (key === "rental_start_date" || key === "rental_end_date") {
    //     setFormData({
    //         ...formData,
    //         [key]: value
    //     })
    // }
    else {
      setFormData({
        ...formData,
        [key]: value,
        error: {
          ...formData?.error,
          [key]: "",
        },
      });
    }
  };

  const handleDeleteFile = (key, id) => {
    setFormData({
      ...formData,
      [key]: "",
      // formData[key]?.filter((e, i) => i !== id)
    });
  };

  const convertSignature = async () => {
    const signatureDataUrl = signaturePadRef.current.toDataURL("image/png");

    const response = await fetch(signatureDataUrl);
    const blob = await response.blob();
    return new File([blob], "signature.png", { type: "image/png" });
  };

  const handleSetFormData = (data) => {
    let newForm = new FormData();
    Object.keys(data)?.forEach(async (key) => {
      if (
        key === "rental_start_date" ||
        key === "rental_end_date" ||
        key === "date_of_purchase"
      ) {
        newForm.append(
          key,
          formData[key] ? new Date(formData[key]).toISOString() : ""
        );
      } else if (
        (key === "signature_document" ||
          key === "equipment_image" ||
          key === "purchase_bill") &&
        formData?.isEdit
      ) {
        if (formData?.signature_document?.type) {
          newForm.append("signature_document", formData[key]);
        }
        if (formData?.equipment_image?.type) {
          newForm.append("equipment_image", formData[key]);
        }
        if (formData?.purchase_bill?.type) {
          newForm.append("purchase_bill", formData[key]);
        }
      }
      // else if (key === "signature_document" && formData?.signature_type === false && formData?.signature_type !== "") {
      //     let signatureFile = await convertSignature()
      //     newForm.append(key, signatureFile)
      // }
      else {
        newForm.append(key, formData[key]);
      }
    });
    return newForm;
  };

  const handleValidate = () => {
    const error = formData?.error;
    let isValid = true;
    if (formData?.equipment_type?.length === 0) {
      isValid = false;
      error.equipment_type = "Equipment Type is Required";
    }
    if (formData?.equipment_name?.length === 0) {
      isValid = false;
      error.equipment_name = "Equipment Name is Required";
    }
    if (formData?.equipment_category?.length === 0) {
      isValid = false;
      error.equipment_category = "Equipment Type is Required";
    }

    if (formData?.zip_code?.length > 0 && !/^\d{5}(-\d{4})?$/.test(formData?.zip_code)) {
      isValid = false;
      error.zip_code = "Zip code format is invalid";
    }

    if (formData?.equipment_owner_contact && formData?.equipment_owner_contact &&
      !/^(?:\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/.test(
        formData?.equipment_owner_contact
      )
    ) {
      error.equipment_owner_contact = "Equipment Owner contact format is invalid";
      isValid = false;
    }


    if (formData?.vendor_supplier_contact && formData?.vendor_supplier_contact &&
      !/^(?:\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/.test(
        formData?.vendor_supplier_contact
      )
    ) {
      error.vendor_supplier_contact = "Vendor contact format is invalid";
      isValid = false;
    }

    setFormData({
      ...formData,
      error: error,
    });
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidate()) {
      const val = handleSetFormData(formData);
      if (state?.type === "edit") {
        dispatch(updateEquipment({ id: state?.id, data: val })).then((res) => {
          if (res?.meta?.requestStatus === "fulfilled") {
            setActivity(true);
            setTimeout(() => {
              setActivity(false);
              navigate("/equipment");
            }, [2000]);
          }
        });
      } else {
        dispatch(createEquipment(val)).then((res) => {
          if (res?.meta?.requestStatus === "fulfilled") {
            setActivity(true);
            setTimeout(() => {
              setActivity(false);
              navigate("/equipment");
            }, [2000]);
          }
        });
      }
    }
  };

  return (
    <Box
      className="bg-[#fff] rounded-[10px]"
      sx={{
        boxShadow: "4px 4px 15px 4px #0000000D",
        padding: "30px 20px",
        margin: "50px 30px 30px 30px",
      }}
    >
      <Stack spacing={2}>
        {fields?.map((data) => {
          return (
            <CustomAccordian
              title={data?.title}
              children={
                <EquipmentFormFields
                  fields={data?.field}
                  formData={formData}
                  handleChange={updateState}
                  handleDeleteFile={handleDeleteFile}
                />
              }
              defaultValue={true}
            />
          );
        })}
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        spacing={2}
        mt={2}
      >
        <Button
          btnCategory={"secondary"}
          btnName="Cancel"
          onClick={() => navigate(-1)}
        />
        <Button
          btnCategory={"primary"}
          btnName="Submit"
          onClick={() => handleSubmit()}
        />
      </Stack>
      <ActivityPopup
        open={activity}
        message={
          state?.type === "edit"
            ? "Equipment updated successfully"
            : "Equipment created successfully"
        }
      />
    </Box>
  );
};

export default EquipmentForm;
