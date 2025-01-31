import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cancel from "../../assets/images/cancel-colour1x.png";
import CertificateIcon from "../../assets/images/certficate1x.png";
import { Button } from "../../shared";

export default function GenerateCertificate() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if(id === '' || id === 'null'){
      navigate('/certificates')
    }
  },[id])

  return (
    <div className="px-8 mt-10 pb-5">
      <div
        className="px-3 py-5"
        style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",border:'1px solid #5583ce', borderRadius:"5px" }}
      >
        <div className="flex justify-end px-5 pb-4 mb-8 items-end">
          <div
            className="cursor-pointer"
            onClick={() => navigate("/reports")}
          >
            <img src={Cancel} alt="link" className="w-[20px] h[10px]" />
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center" >
          <div>Generate Certificate Request</div>
          <div>
            <img src={CertificateIcon} alt="cer" className="w-[200px] h-[200px]" />
          </div>
          <div>
            <Button
              btnType="button"
              btnCls="w-[100%]"
              btnName="Generate Certificate Request"
              btnCategory="primary"
              onClick={() => navigate(`/certificate_members/${id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
