import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowRight from "../../assets/icons/breadCrumbsArrow.svg";
import ConfirmTik from "../../assets/icons/confirmTik.svg";
import deactivatePopupIcon from "../../assets/icons/deactivatePopupIcon.svg";
import viewEquipmentIcon from "../../assets/icons/viewEquipmentIcon.svg";
import { Button } from "../../shared";
import { ActivityPopup } from "../../shared/activityPopup/activityPopup";
import CustomizedSteppers from "./components/stepper";
import {
  getParticularEquipment,
  getTrackData,
  updateEquipment,
} from "./network/equipment";

const EquipmentView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useLocation()?.state;
  const { getParticularEquipmentData: details, trackData, loading } = useSelector(
    (state) => state.equipment
  );
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role || "";
  const [viewTrack, setViewTrack] = React.useState(
    state?.type === "track" ? true : false
  );

  const [popup, setPopup] = React.useState({
    deactive: false,
    activity: false,
    type: "",
  });

  const msg = {
    deactivated: "Deactivation Successful",
    activate: "Activation Successful",
    archive: "Equipment Moved to archive",
    unarchive: "Equipment Unarchived",
  };

  const confirmMsg = {
    deactivated: "Are you sure you want to deactivate this Equipment?",
    activate: "Are you sure you want to Activate this Equipment?",
    archive: "Are you sure you want to move this Equipment to Archive",
    unarchive: "Are you sure you want to move this Equipment to Unarchive",
  };

  React.useEffect(() => {
    dispatch(getParticularEquipment(state?.id)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        if (res?.payload?.equipment_status === "inuse") {
          dispatch(getTrackData(state?.id));
        }
      }
    });
  }, []);

  const statusStyle = {
    available:
      "!border !border-[#16B681] rounded-[50px] !text-[#16B681] !bg-[#EBFFF3] !text-[14px] py-1 px-2 capitalize",
    inuse:
      "!border !border-[#FE634E] rounded-[50px] !text-[#FE634E] !bg-[#FFF8F2] !text-[14px] py-1 px-2 capitalize",
    deactivated:
      "!border !border-[#BF453A] rounded-[50px] !text-[#BF453A] !bg-[#FFE7E7] !text-[14px] py-1 px-2 capitalize",
    archived:
      "!border !border-[#4F4F4F] rounded-[50px] !text-[#4F4F4F] !bg-[#DFDFDF] !text-[14px] py-1 px-2 capitalize",
  };

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
          value: details?.equipment_owner
            ? details?.equipment_owner
            : "-",
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
            ? moment(details?.rental_start_date).format("MM-DD-YYYY")
            : "-",
          isHide: details?.equipment_type === "own",
        },
        {
          label: "Rent End Date",
          value: details?.rental_end_date
            ? moment(details?.rental_end_date).format("MM-DD-YYYY")
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
                ? moment(details?.date_of_purchase).format("MM-DD-YYYY")
                : "-",
            },
            {
              label: "Purchase Price",
              value: details?.purchase_price ? `$ ${details?.purchase_price}` : "-",
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
              value: details?.rent ? `$ ${details?.rent}` : "-",
            },
            {
              label: "Rent Type",
              value: details?.rent_status ? (details?.rent_status).charAt(0).toUpperCase() +
                (details?.rent_status).slice(1) : "-",
            },
            {
              label: "Additional Fees",
              value: details?.additional_fees
                ? `$ ${details?.additional_fees}`
                : "-",
            },
            {
              label: "Total Amount Due",
              value: details?.total_amount_due
                ? `$ ${details?.total_amount_due}`
                : "-",
            },
            {
              label: "Deposit Amount",
              value: details?.deposit_amount ? `$ ${details?.deposit_amount}` : "-",
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

  const handleTrack = () => {
    setViewTrack(true);
    dispatch(getTrackData(state?.id));
  };

  const handleOpenPopup = (type) => {
    setPopup({
      ...popup,
      [type]: true,
      type: type,
    });
  };

  const handleClosePopup = () => {
    setPopup({
      deactive: false,
      activity: false,
      type: "",
    });
  };

  const handleStatusChange = (status) => {
    let payload = {
      id: state?.id,
      data: {
        created_by: userInfo?.data?.user_id,
        equipment_status: status,
      },
    };
    if (status === "deactivated") {
      payload = {
        ...payload,
        data: {
          ...payload?.data,
          equipment_deactivated_date: new Date().toISOString(),
        },
      };
    }
    dispatch(updateEquipment(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setPopup({
          ...popup,
          [popup?.type]: false,
          activity: true,
        });
        setTimeout(() => {
          setPopup({
            ...popup,
            [popup?.type]: false,
            activity: false,
            type: "",
          });
          dispatch(getParticularEquipment(state?.id));
        }, 2000);
      }
    });
  };

  const handleAccept = () => {
    const statusType = {
      deactivated: "deactivated",
      activate: "available",
      archive: "archived",
      unarchive: "available",
    };

    handleStatusChange(statusType[popup?.type]);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        className="px-6 mt-3"
      >
        <Typography
          className="text-[#5975A2] !text-[12px] cursor-pointer"
          sx={{ fontWeight: 500 }}
          onClick={() => navigate(-1)}
        >
          {details?.equipment_name}
        </Typography>
        <img src={ArrowRight} />
        <Typography
          className="text-[#18283D] !text-[12px]"
          sx={{ fontWeight: 500 }}
          onClick={() => navigate(-1)}
        >
          Small group (Item name)
        </Typography>
      </Stack>
      <div
        style={{
          border: "1px solid rgba(228, 237, 255, 1)",
          marginTop: "30px",
        }}
        className="px-5 pt-5 mx-6"
      >
        <div>
          <Stack
            direction={"row"}
            spacing={3}
            alignItems={"center"}
            width={"100%"}
          >
            {details?.equipment_image ? (
              <img
                src={details?.equipment_image ?? viewEquipmentIcon}
                alt="viewEquipmentIcon"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.15)",
                  borderRadius: "5px",
                  boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",
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
                  boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",
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
                  <div className={statusStyle[details?.equipment_status]}>
                    {details?.equipment_status}
                  </div>
                </Stack>

                {(details?.equipment_status === "inuse" && !viewTrack && role === "admin") && (
                  <div className="flex items-center gap-4">
                    <button
                      className="py-3 px-5 w-[200px] text-[#FFFFFF] bg-[#FE634E] rounded-[3px]"
                      onClick={() => handleTrack()}
                    >
                      Track
                    </button>
                  </div>
                )}
                {viewTrack && (
                  <div
                    className="flex items-center gap-4"
                    onClick={() => setViewTrack(false)}
                  >
                    <button className="py-3 px-5 w-[200px] text-[#FFFFFF] bg-[#FE634E] rounded-[3px]">
                      View Details
                    </button>
                  </div>
                )}
                {details?.equipment_status === "deactivated" &&
                  role === "admin" &&
                  !viewTrack && (
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <Button
                        btnType="button"
                        btnCategory="secondary"
                        btnName="Move to Archive"
                        btnCls="w-[200px]"
                        onClick={() => handleOpenPopup("archive")}
                      />
                      <Button
                        btnType="button"
                        btnCategory="secondary"
                        btnName="Activate"
                        btnCls="!bg-background-success-main !text-font-secondary-white !border-none w-[200px]"
                        onClick={() => handleOpenPopup("activate")}
                      />
                    </Stack>
                  )}
                {details?.equipment_status === "archived" &&
                  role === "admin" &&
                  !viewTrack && (
                    <Button
                      btnType="button"
                      btnCategory="secondary"
                      btnName="Unarchive"
                      btnCls="!bg-[#DFDFDF] !text-[#4F4F4F] !border-[#4F4F4F] w-[200px]"
                      onClick={() => handleOpenPopup("unarchive")}
                    />
                  )}
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
                        ? moment(details?.changed_at).format("MM-DD-YYYY")
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

          {!viewTrack && (
            <Stack spacing={4} mt={4}>
              {ViewDetails?.map((e) => {
                return (
                  !e?.isHide && (
                    <Box className={"!border !border-[#E6E6E6] rounded-[3px]"}>
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
                                    <Typography className="!border !border-[#E6E6E6] !text-[#353F4F] !text-[14px]  py-[12px] px-[20px] h-full">
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
                    </Box>
                  )
                );
              })}
            </Stack>
          )}

          {!viewTrack && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              spacing={3}
              mt={3}
              mb={3}
            >
              <Button
                btnCategory={"secondary"}
                btnName="Back"
                onClick={() => navigate(-1)}
              />
              {(details?.equipment_status === "inuse" && role === "admin") && (
                <Button
                  btnCategory={"primary"}
                  btnName="Track"
                  onClick={() => handleTrack()}
                />
              )}
            </Stack>
          )}

          {viewTrack && (
            <Box mt={4} mb={3}>
              <CustomizedSteppers data={trackData} />
            </Box>
          )}
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={popup?.activate || popup?.archive || popup?.unarchive}
        >
          <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] p-[12px] justify-center items-center">
            <div className="h-[100%] w-[100%] justify-center items-center flex flex-col relative">
              <img
                src={
                  popup?.type === "activate" ? ConfirmTik : deactivatePopupIcon
                }
                alt="ConfirmTik"
              />

              <div className="py-5">
                <p
                  style={{
                    color: "rgba(24, 40, 61, 1)",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {confirmMsg[popup?.type]}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-6 justify-center align-middle">
                  <Button
                    btnName="No"
                    btnCategory="secondary"
                    btnCls="w-[110px]"
                    onClick={() => handleClosePopup()}
                  />
                  <Button
                    btnType="button"
                    btnCls={`w-[110px] ${popup?.type === "activate"
                      ? "!bg-background-success-main"
                      : "!bg-background-primary-main"
                      } !text-[#fff] !border !border-none`}
                    btnName={"Yes"}
                    btnCategory="secondary"
                    onClick={() => handleAccept()}
                  />
                </div>
              </div>
            </div>
          </div>
        </Backdrop>

        <ActivityPopup open={popup?.activity} message={msg[popup?.type]} />
      </div>
    </>
  );
};

export default EquipmentView;
