import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cancel from "../../assets/images/cancel-colour1x.png";
import ArrowRightIcon from "../../assets/icons/arrowRightColor.svg";

import DataTable from "../../shared/DataGrid";
import { certificateMenberColumns } from "../../utils/tableFields";
import {
  certificateResultColor,
  certificateResultText,
  certificateStatus,
  resultColor,
  resultText,
} from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getReportProgramDetails } from "../../services/reportsInfo";
import { Button } from "../../shared";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import { Backdrop, Menu, MenuItem } from "@mui/material";
import SuccessTik from "../../assets/images/blue_tik1x.png";
import { createCertificate } from "../../services/certificate";
import TickCircle from '../../assets/icons/tickCircle.svg';

export default function CertificateMemberDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { programDetails } = useSelector((state) => state.reports);
  const { status } = useSelector((state) => state.certificates);
  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [seletedItem, setSelectedItem] = useState({});
  const [menteeList, setMenteeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCertificateDetails = async () => {
    dispatch(getReportProgramDetails(id,"type"));
  };
  const role = userInfo.data.role
  const getMenteeList = async () => {
    const constructedPassList = programDetails?.pass_participates?.map((e) => {
      return {
        ...e,
        program_id: programDetails?.id
      }
    })

    const constructedFailList = programDetails?.fail_participates?.map((e) => {
      return {
        ...e,
        program_id: programDetails?.id
      }
    })
    const passMenteeList = constructedPassList || [];
    const failMenteeList = constructedFailList || [];
    const listMentee = [...passMenteeList, ...failMenteeList];
    const res =
      listMentee.length > 0
        ? listMentee.map((val, i) => ({
          ...val,
          id: i + 1,
          program_name: programDetails?.program_name,
        }))
        : [];
console.log(res,"res")
    setMenteeList(res);
  };

  console.log("menteeList ===>", menteeList)

  useEffect(() => {
    if (id) {
      getCertificateDetails();
    }
  }, [id]);
  useEffect(() => {
    if (programDetails) {
      getMenteeList();
    }
  }, [programDetails]);
  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let certificateColumn = [
    ...certificateMenberColumns,
    // {
    //   field: "mark",
    //   headerName: "Total Over All Mark",
    //   flex: 1,
    //   id: 1,
    //   renderCell: (params) => {
    //     return <></>;
    //   },
    // },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-3"
                style={{
                  background: certificateResultColor[params.row.result]?.bg || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: certificateResultColor[params.row.result]?.color || "",
                  fontSize: "12px",
                }}
              >
                {" "}
                {certificateResultText[params.row.result]}
              </span>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      id: 4,
      renderCell: (params) => {
        return (
          <>
            <div
              className="cursor-pointer flex items-center h-full"
              onClick={(e) => handleMoreClick(e, params.row)}
            >
              <img src={MoreIcon} alt="MoreIcon" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {role === "mentor" ? (
                <MenuItem
                  onClick={() =>
                    navigate(
                      `/mentee-task_list/${seletedItem.id}?mentee_id=${seletedItem?.mentee_id}&program_id=${seletedItem?.program_id}`, {
                        state: {
                          from: "program"
                        }
                      }
                      // `/certificate-view/${seletedItem.id}?mentee_id=${seletedItem?.mentee_id}`
                    )
                  }
                  className="!text-[12px]"
                >
                  <img
                    src={TickCircle}
                    alt="AcceptIcon"
                    className="pr-3 w-[27px]"
                  />
                  View
                </MenuItem>
              ) : null}

              {/* <MenuItem onClick={handleCeritificateDownload} className='!text-[12px]'>
                            <img src={DownloadIcon} alt="AcceptIcon" className='pr-3 w-[27px]' />
                            
                        </MenuItem> */}
            </Menu>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    if (status === certificateStatus.create) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [status]);

  const handleSubmit = () => {
    dispatch(createCertificate({ program: +id, request_type: "certificate" }));
  };
  return (
    <div className="px-8 mt-10 pb-5">
      <div
        className="px-3 py-5"
        style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={status === certificateStatus.create}
          onClick={() => setLoading(false)}
        >
          <div className='px-5 py-1 flex justify-center items-center'>
            <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
              style={{ background: '#fff', borderRadius: '10px' }}>
              <img src={SuccessTik} alt="SuccessTik" />
              <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                style={{
                  fontWeight: 600
                }}
              >Certificate request is successfully created</p>
            </div>

          </div>
        </Backdrop>
        <div className="flex justify-between px-5 pb-4 mb-8 items-center border-b-2">
          <div className="flex gap-5 items-center text-[14px]">

            <p> Member Select</p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/generate_certificate/${id}`)}
          >
            <img src={Cancel} alt="link" className="w-[20px] h[10px]" />
          </div>
        </div>
        <DataTable
          rows={menteeList || []}
          columns={certificateColumn}
          hideCheckbox
          hideFooter
        />

        <div>
          <div className="flex gap-6 justify-center align-middle py-16">
            <Button
              btnName="Cancel"
              btnCls="w-[13%]"
              btnCategory="secondary"
              onClick={() => navigate(-1)}
            />
            <Button
              btnType="button"
              btnCls="w-[13%]"
              onClick={() => handleSubmit()}
              style={{ backgroundColor: "#FE634E" }}
              btnName="Submit"
              btnCategory="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
