import dayjs from "dayjs";
import React from "react";
import Grid from "@mui/material/Grid";
import { Divider, Stack, Typography } from "@mui/material";
import { MuiCustomModal } from "../../../shared/Modal/MuiCustomModal";
import viewEquipmentIcon from "../../../assets/icons/viewEquipmentIcon.svg";
import { eqipmentStatusStyles } from "../../../utils/constant";

const EquipmentDetailModal = (props) => {
  const { details, isLoading, isOpen, handleCloseModal, trackData } = props;

  const paidText = {
    fully_paid: "Fully Paid",
    partially_paid: "Partially Paid",
    not_paid: "Not Paid",
  };

  const ViewDetails = [
    {
      title: "Equipment Information",
      data: [
        {
          label: "Type",
          value: details?.equipment_type
            ? (details?.equipment_type).charAt(0).toUpperCase() +
              (details?.equipment_type).slice(1)
            : "-",
        },
        {
          label: "Category",
          value: details?.equipment_category
            ? (details?.equipment_category).charAt(0).toUpperCase() +
              (details?.equipment_category).slice(1)
            : "-",
        },
        {
          label: "Owner Name",
          value: details?.equipment_owner ? details?.equipment_owner : "-",
          isHide: details?.equipment_type === "own",
        },
        {
          label: "Owner Contact number",
          value: details?.equipment_owner_contact
            ? details?.equipment_owner_contact
            : "-",
          isHide: details?.equipment_type === "own",
        },
        {
          label: "Rent Start Date",
          value: details?.rental_start_date
            ? dayjs(details?.rental_start_date).format("DD/MM/YYYY")
            : "-",
          isHide: details?.equipment_type === "own",
        },
        {
          label: "Rent End Date",
          value: details?.rental_end_date
            ? dayjs(details?.rental_end_date).format("DD/MM/YYYY")
            : "-",
          isHide: details?.equipment_type === "own",
        },
        {
          label: "Description",
          value: details?.equipment_descriptions
            ? details?.equipment_descriptions
            : "-",
        },
      ],
    },
    {
      title: "Purchase Information",
      data:
        details?.equipment_type === "own"
          ? [
              {
                label: "Purchase number (PO. No)",
                value: details?.purchase_number
                  ? details?.purchase_number
                  : "-",
              },
              {
                label: "Serial number",
                value: details?.ssn_number ? details?.ssn_number : "-",
              },
              {
                label: "Purchase type",
                value: details?.purchase_type ? details?.purchase_type : "-",
              },
              {
                label: "Date of Purchase",
                value: details?.date_of_purchase
                  ? dayjs(details?.date_of_purchase).format("DD/MM/YYYY")
                  : "-",
              },
              {
                label: "Purchase Price",
                value: details?.purchase_price ? details?.purchase_price : "-",
              },
              {
                label: "Vendor",
                value: details?.vendor_supplier
                  ? details?.vendor_supplier
                  : "-",
              },
              {
                label: "Vendor Location",
                value: details?.vendor_supplier_location
                  ? details?.vendor_supplier_location
                  : "-",
              },
              {
                label: "Vendor contact number",
                value: details?.vendor_supplier_contact
                  ? details?.vendor_supplier_contact
                  : "-",
              },
              {
                label: "Warranty Availability",
                value: details?.warranty_avaiability ? "Yes" : "No",
              },
              {
                label: "Warranty Period",
                value: details?.warranty_period
                  ? details?.warranty_period
                  : "-",
              },
              {
                label: "Payment Method",
                value: details?.payment_method
                  ? (details?.payment_method).charAt(0).toUpperCase() +
                    (details?.payment_method).slice(1)
                  : "-",
              },
              {
                label: "Description",
                value: details?.purchase_description
                  ? details?.purchase_description
                  : "-",
              },
              {
                label: "Bill",
                value: details?.purchase_bill ? details?.purchase_bill : "-",
                type: "link",
              },
              {
                label: "Address Line 1",
                value: details?.address_line1 ? details?.address_line1 : "-",
              },
              {
                label: "Address Line 2",
                value: details?.address_line_2 ? details?.address_line_2 : "-",
              },
              {
                label: "City",
                value: details?.city ? details?.city : "-",
              },
              {
                label: "State",
                value: details?.state ? details?.state : "-",
              },
              {
                label: "Zip Code",
                value: details?.zip_code ? details?.zip_code : "-",
              },
            ]
          : [
              {
                label: "Purchase number (PO. No)",
                value: details?.purchase_number
                  ? details?.purchase_number
                  : "-",
              },
              {
                label: "Serial Number",
                value: details?.ssn_number ? details?.ssn_number : "-",
              },
              {
                label: "Rent",
                value: details?.rent ? details?.rent : "-",
              },
              {
                label: "Rent Type",
                value: details?.rent_status
                  ? (details?.rent_status).charAt(0).toUpperCase() +
                    (details?.rent_status).slice(1)
                  : "-",
              },
              {
                label: "Additional Fees",
                value: details?.additional_fees
                  ? details?.additional_fees
                  : "-",
              },
              {
                label: "Total Amount Due",
                value: details?.total_amount_due
                  ? details?.total_amount_due
                  : "-",
              },
              {
                label: "Deposit Amount",
                value: details?.deposit_amount ? details?.deposit_amount : "-",
              },
              {
                label: "Deposit Paid",
                value: details?.paid ? paidText[details?.paid] : "-",
              },
              {
                label: "Payment Method",
                value: details?.payment_method
                  ? (details?.payment_method).charAt(0).toUpperCase() +
                    (details?.payment_method).slice(1)
                  : "-",
              },
              {
                label: "Bill",
                value: details?.purchase_bill ? details?.purchase_bill : "-",
                type: "link",
              },
              // {
              //   label: "Description",
              //   value: details?.daily_rent ? details?.daily_rent : "-",
              // },
              {
                label: "Address Line 1",
                value: details?.address_line1 ? details?.address_line1 : "-",
              },
              {
                label: "Address Line 2",
                value: details?.address_line_2 ? details?.address_line_2 : "-",
              },
              {
                label: "City",
                value: details?.city ? details?.city : "-",
              },
              {
                label: "State",
                value: details?.state ? details?.state : "-",
              },
              {
                label: "Zip Code",
                value: details?.zip_code ? details?.zip_code : "-",
              },
            ],
    },
    {
      title: "Other Information",
      data: [
        // {
        //   label: "Equipment Location",
        //   value:
        //     details?.city || details?.state
        //       ? `${details?.city ?? "-"}${details?.state && ","}${
        //           details?.state && details?.state
        //         }`
        //       : "-",
        // },
        {
          label: "Memo",
          value: details?.memo ? details?.memo : "-",
        },
        {
          label: "Acknowledgment Mode",
          value: details?.signature_type ? "Document" : "Signature",
        },
      ],
    },
  ];
  return (
    <MuiCustomModal
      open={isOpen}
      handleClose={handleCloseModal}
      fullScreen
      actionButtons={[
        {
          color: "primary",
          variant: "contained",
          children: "Close",
          onClick: handleCloseModal,
        },
      ]}
    >
      <Stack direction={"row"} spacing={3} alignItems={"center"} width={"100%"}>
        {details?.equipment_image ? (
          <img
            src={details?.equipment_image ?? viewEquipmentIcon}
            alt="viewEquipmentIcon"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.15)",
              borderRadius: "5px",              
              height: "120px",
              width: "120px",
            }}
          />
        ) : (
          <div
            className="px-4 py-4 bg-white"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.15)",
              borderRadius: "5px",              
            }}
          >
            <img
              src={details?.equipment_image ?? viewEquipmentIcon}
              alt="viewEquipmentIcon"
            />
          </div>
        )}
        <Stack spacing={2} width={"100%"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <h3 className="text-primary-black text-[24px]">
                {details?.equipment_name}
              </h3>
              <div className={eqipmentStatusStyles[details?.equipment_status]}>
                {details?.equipment_status}
              </div>
            </Stack>
          </Stack>
          {details?.equipment_status === "inuse" && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  className="!border !border-[#232323]"
                />
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography className="!text-[14px] !text-font-secondary-black">
                  Program name:
                </Typography>
                <Typography className="!text-[14px] !text-[#1D5BBF] underline cursor-pointer">
                  {trackData?.program_name}
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography className="!text-[14px] !text-font-secondary-black">
                  Current Holding:
                </Typography>
                <Typography className="!text-[14px] !text-[#1D5BBF] underline cursor-pointer">
                  {trackData?.current_program_holder}
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography className="!text-[14px] !text-font-secondary-black">
                  Last updated date:
                </Typography>
                <Typography className="!text-[14px] !text-[#1D5BBF] underline cursor-pointer">
                  {details?.changed_at
                    ? dayjs(details?.changed_at).format("DD/MM/YYYY")
                    : "-"}
                </Typography>
              </Stack>
            </Stack>
          )}
          <Typography className="!text-[#353F4F] !text-[16px]">
            {details?.equipment_descriptions}
          </Typography>
        </Stack>
      </Stack>
      {!isLoading && (
        <Stack spacing={4} mt={4}>
          {ViewDetails?.map((e) => {
            return (
              !e?.isHide && (
                <div className={"!border !border-[#E6E6E6] rounded-[3px]"}>
                  <Typography className="!bg-[#FFF8F2] !text-[#232323] !text-[18px] py-[12px] px-[20px] font-bold">
                    {e?.title}
                  </Typography>
                  <Grid container>
                    {e?.data?.map((val) => {
                      return (
                        !val?.isHide && (
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={6}>
                                <Typography className="!border !border-[#E6E6E6] !text-[#353F4F] !text-[14px]  py-[12px] px-[20px]">
                                  {val?.label}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                {/* {val?.type === "link" ? (
                              <a
                                href={val?.value}
                                target="_blank"
                                className="!text-font-primary-main !text-[14px] py-[12px] px-[20px] mt-2 h-[100%]"
                              >
                                {val?.value.split("/").pop()}
                              </a>
                            ) : ( */}
                                <Typography className="!border !border-[#E6E6E6] !text-[#353F4F] !text-[14px] py-[12px] px-[20px]">
                                  {val?.type === "link" ? (
                                    <a
                                      href={val?.value}
                                      target="_blank"
                                      className="!text-font-primary-main !text-[14px] py-[12px] px-[0px] mt-2 h-[100%]"
                                      rel="noreferrer"
                                    >
                                      {val?.value.split("/").pop()}
                                    </a>
                                  ) : (
                                    val?.value
                                  )}
                                </Typography>
                                {/* )} */}
                              </Grid>
                            </Grid>
                          </Grid>
                        )
                      );
                    })}
                  </Grid>
                </div>
              )
            );
          })}
        </Stack>
      )}
    </MuiCustomModal>
  );
};

export default EquipmentDetailModal;
