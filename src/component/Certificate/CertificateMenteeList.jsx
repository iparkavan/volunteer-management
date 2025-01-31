import React, { useEffect, useState , } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Cancel from '../../assets/images/cancel-colour1x.png';
import ArrowRightIcon from '../../assets/icons/arrowRightColor.svg';
import TickCircle from '../../assets/icons/tickCircle.svg';
import DataTable from '../../shared/DataGrid';
import { certificateMenberColumns } from '../../utils/tableFields';
import {
  certificateResultColor,
  certificateResultText,
  certificateStatus,
  resultColor,
  resultText,
} from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getReportProgramDetails } from '../../services/reportsInfo';
import { Button } from '../../shared';
import MoreIcon from '../../assets/icons/moreIcon.svg';
import { Backdrop, Box, Menu, MenuItem, Stack } from '@mui/material';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import {
  createCertificate,
  getCertificateMember,
} from '../../services/certificate';
import MuiModal from '../../shared/Modal';
import { updateCertificateRequest } from '../../services/request';
import TickColorIcon from '../../assets/icons/tickColorLatest.svg'
import CancelColorIcon from '../../assets/icons/cancelCircle.svg'
import { Typography } from '@mui/material';

export default function CertificateMenteeList() {
  const navigate = useNavigate();
  const state = useLocation()?.state
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data } = useSelector((state) => state.userInfo);
  const role = data?.role || '';

  const { status, certificatesMembers } = useSelector(
    (state) => state.certificates
  );

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [seletedItem, setSelectedItem] = useState({});

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [actionPopup, setActionPopup] = React.useState({
    bool: false,
    activity: false,
    type: ""
  })

  useEffect(()=>{
    console.log("state", state)
  },[state])

  const getCertificateDetails = async () => {
    const type = searchParams.get('type')
    dispatch(
      getCertificateMember(
        (type === 'approved' || type === 'pending')
          ? `?certificate_id=${id}&page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize
          }&request_type=certificate`
          : `?program_id=${id}&page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize
          }&request_type=certificate`
      )
    );
  };

  useEffect(() => {
    if (id) {
      getCertificateDetails();
    }
  }, [id]);

  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let certificateColumn = [
    ...certificateMenberColumns,
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className='cursor-pointer flex items-center h-full relative'>
              <span
                className='w-[80px] flex justify-center h-[30px] px-3'
                style={{
                  background:
                    certificateResultColor[params.row.status]?.bg || '',
                  lineHeight: '30px',
                  borderRadius: '3px',
                  width: '110px',
                  height: '34px',
                  color: certificateResultColor[params.row.status]?.color || '',
                  fontSize: '12px',
                }}
              >
                {' '}
                {certificateResultText[params.row.status]}
              </span>
            </div>
          </>
        );
      },
    },
  ];

  if (role !== 'mentee') {
    certificateColumn = [
      ...certificateColumn,
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        id: 4,
        renderCell: (params) => {
          return (
            <>
              <div
                className='cursor-pointer flex items-center h-full'
                onClick={(e) => handleMoreClick(e, params.row)}
              >
                <img src={MoreIcon} alt='MoreIcon' />
              </div>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {(searchParams.get('type') === 'approved' ||
                  searchParams.get('type') === 'waiting_for_response' ||
                  searchParams.get('type') === 'pending' ||
                  role === 'admin'||role==="mentor") && (
                    <MenuItem
                      onClick={() => {
                        let url =
                          searchParams.get('type') === 'approved'
                            ? `/certificate-view/${id}?mentee_id=${seletedItem?.mentee_id_task}`
                            : `/mentee-task_list/${id}?mentee_id=${seletedItem?.mentee_id_task}&program_id=${seletedItem.program_id}`;
                        return navigate(url);
                      }}
                      className='!text-[12px]'
                    >
                      <img
                        src={TickCircle}
                        alt='AcceptIcon'
                        className='pr-3 w-[27px]'
                      />
                      View
                    </MenuItem>
                  )}
              </Menu>
            </>
          );
        },
      },
    ];
  }

  useEffect(() => {
    if (status === certificateStatus.create) {
      setTimeout(() => {
        navigate('/certificates');
      }, 3000);
    }
  }, [status]);

  const handleSubmit = () => {
    dispatch(
      createCertificate({
        // id:
        //   certificatesMembers &&
        //   certificatesMembers.length > 0 &&
        //   certificatesMembers[0].program_id,
        program: id,
        request_type: "certificate"
      })
    );
  };


  const handleOpenActionPopup = (type) => {
    handleClose()
    setActionPopup({
      ...actionPopup,
      bool: true,
      type: type
    })
  }

  const handleCloseActionPopup = (type) => {
    setActionPopup({
      bool: false,
      type: "",
      activity: false
    })
  }

  const handleApproveCertificateApiRequest = () => {
    dispatch(updateCertificateRequest({
      "id": state?.rowId,
      "status": "approved"
    })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setActionPopup({
          bool: false,
          activity: true
        })
        setTimeout(() => {
          setActionPopup({
            bool: false,
            type: "",
            activity: false
          })
          navigate(-1)
        }, 2000);
      }
    })
  }

  const handleCancelCertificateApiRequest = () => {
    dispatch(updateCertificateRequest({
      "id": state?.rowId,
      "status": "rejected"
    })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setActionPopup({
          bool: false,
          activity: true
        })
        setTimeout(() => {
          setActionPopup({
            bool: false,
            type: "",
            activity: false
          })
          navigate(-1)
        }, 2000);
      }
    })
  }

  const handleCertificateRequest = () => {
    if (actionPopup.type === 'approve') {
      handleApproveCertificateApiRequest()
    }
    if (actionPopup.type === 'reject') {
      handleCancelCertificateApiRequest()
    }
  }



  return (
    <div className='px-8 mt-10 pb-5'>
      <div
        className='px-3 py-5'
        style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}
      >
        {/* <MuiModal
          modalOpen={status === certificateStatus.create}
          modalClose={() => setLoading(false)}
          noheader
        >
          <div className='px-5 py-1 flex justify-center items-center'>
            <div
              className='flex justify-center items-center flex-col gap-5 py-10 px-20 mt-20 mb-20'
              style={{
                background:
                  'linear-gradient(101.69deg, #1D5BBF -94.42%, #00AEBD 107.97%)',
                borderRadius: '10px',
              }}
            >
              <img src={SuccessTik} alt='SuccessTik' />
              <p className='text-white text-[12px]'>
                Certificate request is successfully created
              </p>
            </div>
          </div>

        </MuiModal> */}


        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={status === certificateStatus.create}
          onClick={() => setLoading(false)}
        >
          <div className='px-5 py-1 flex justify-center items-center'>
            <div
              className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
              style={{ background: '#fff', borderRadius: '10px' }}
            >
              <img src={SuccessTik} alt='SuccessTik' />
              <p
                className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                style={{
                  fontWeight: 600,
                }}
              >
                Certificate request is successfully created
              </p>
            </div>
          </div>
        </Backdrop>
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex gap-5 items-center text-[14px]'>
            <p style={{ color: 'rgba(89, 117, 162, 1)', fontWeight: 500 }}>
              Generate Certificates Request
            </p>
            <img src={ArrowRightIcon} alt='ArrowRightIcon' />
            {searchParams.get('type') === 'approved' ? (
              <>
                <p style={{ color: 'rgba(89, 117, 162, 1)', fontWeight: 500 }}>
                  Member List
                </p>
                <img src={ArrowRightIcon} alt='ArrowRightIcon' />
                <p>Accept</p>
              </>
            ) : (
              <>
                <p>View Member List</p>
              </>
            )}
          </div>
          <div
            className='cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <img src={Cancel} alt='link' className='w-[20px] h[10px]' />
          </div>
        </div>
        <DataTable
          rows={certificatesMembers?.results || []}
          columns={certificateColumn}
          hideCheckbox
          hideFooter={certificatesMembers?.results?.length <= 10}
          rowCount={certificatesMembers?.count}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
        <div style={{ display: 'flex', flexDirection: 'row', width: "100%", justifyContent: 'center', marginTop: 20 }}>
          {
            role === "admin" &&
              state?.status === "approved" ?
              <Typography style={{
                background: "#16B681",
                borderRadius: "8px",
                padding: "8px 16px",
                color: "white",
                display: "inline-block",
                marginRight: 30
              }}> Approved </Typography> :
              state?.status === "rejected" ?
                <Typography style={{
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: "rgb(224, 56, 45)",
                  fontSize: "12px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#fff",
                }} color="error"> Rejected </Typography>
                : null

          }
          {role !== "admin" &&state?.status !== "Wating_for_response"&& <Button
                btnName="Close"
                btnCategory='secondary'
                onClick={() => navigate(-1)} />}
        </div>
        
        {(state?.status !== "approved" && state?.status !== "rejected"&&state?.status !== "pending") && <>
          {role === "mentor"&&state?.status !== "new" && <div>
            <div className='flex gap-6 justify-center align-middle py-16'>
              <Button
                btnName='Cancel'
                btnCls='w-[16%]'
                btnCategory='secondary'
                onClick={() => navigate('/certificates')}
              />
              {certificatesMembers && certificatesMembers?.results?.length > 0 && (
                <Button
                  btnType='button'
                  btnCls='w-[16%]'
                  onClick={() => handleSubmit()}
                  btnName='Submit Request to Supervisor'
                  btnCategory='primary'
                />
              )}
            </div>
          </div>}
          {role === "admin" && <Box className="flex flex-col items-center justify-center w-[full]" mt={3}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              {/* <Button
                btnName='Reject Request'
                btnCls='w-[100%] !border !border-[#E50027] !text-[#E50027]'
                btnCategory='secondary'
                onClick={() => handleOpenActionPopup("reject")}
              /> */}
              <Button
                btnName="Close"
                btnCategory='secondary'
                onClick={() => navigate(-1)} />
              <Button
                btnName='Approve Request'
                btnCls='w-[100%] whitespace-nowrap !bg-[#16B681] !text-[#FFFFFF] !border !border-[#16B681]'
                btnCategory='secondary'
                onClick={() => handleOpenActionPopup("approve")}
              />
            </Stack>
          </Box>}
        </>
        }
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => 1 }}
        open={actionPopup?.bool}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <img src={actionPopup.type === 'approve' ? TickColorIcon : actionPopup.type === 'reject' ? CancelColorIcon : ''} alt="TickColorIcon" />
          <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
            {actionPopup.type === 'approve' ? 'Approve' : actionPopup.type === 'reject' ? 'Reject' : ''}
          </span>
          <div className='py-5'>
            <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>
              Are you sure want to {actionPopup.type === 'approve' ? 'Approve' : "Reject"} Certificates?
            </p>
          </div>
          <div className='flex justify-center'>
            <div className="flex gap-6 justify-center align-middle">
              <Button btnCls="w-[110px]" btnName={actionPopup.type === 'approve' ? 'Cancel' : actionPopup.type === 'reject' ? 'No' : ''} btnCategory="secondary"
                onClick={handleCloseActionPopup}
              />
              <Button btnType="button" btnCls="w-[110px]" btnName={actionPopup.type === 'approve' ? 'Approve' : actionPopup.type === 'reject' ? 'Yes' : ''}
                style={{ background: actionPopup.type === 'approve' ? '#16B681' : '#E0382D' }} btnCategory="primary"
                onClick={handleCertificateRequest}
              />
            </div>
          </div>
        </div>

      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={actionPopup?.activity}
      >
        <div className='px-5 py-1 flex justify-center items-center'>
          <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
            style={{ background: '#fff', borderRadius: '10px' }}>
            <img src={SuccessTik} alt="SuccessTik" />
            <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
              style={{
                fontWeight: 600
              }}
            >{actionPopup?.type === "approve" ? "Certificate Request Accept is Successfully" : "Certificate Request has been Successfully cancelled"}</p>
          </div>

        </div>

      </Backdrop>
    </div>
  );
}
