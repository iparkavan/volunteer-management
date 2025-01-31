import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { forgotPassword, resetUserInfo, validateOTP } from "../../services/loginInfo";
import { userStatus } from "../../utils/constant";

export const VerifyOTP = () => {
  const numberOfDigits = 6;
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get("email");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.userInfo);
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState("")
  const otpBoxReference = useRef([]);

  const handleSubmit = () => {
    if (!otp.every(num => num)) {
      setError("Enter 6 digit OTP number")
      return
    }
    const verifyOtp = otp.join("");
    if (verifyOtp !== '' && verifyOtp.length === 6 && userEmail !== '') {
      dispatch(validateOTP({ "email": userEmail, "otp": verifyOtp }))
    }
  };

  useEffect(() => {
    console.log('seconds', seconds)
    if (!isActive) return;

    if (seconds === 0) { setIsActive(false); return }



    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    dispatch(resetUserInfo())
  }, [])

  useEffect(() => {
    if (!userInfo.loading && userInfo.status === userStatus.otpSuccess) {
      navigate(`/change-password?email=${userEmail}`)
    }
  }, [userInfo])

  function handleChange(value, index) {
    let newArr = [...otp];
    if (value.length === numberOfDigits) {
      // Split the pasted value into individual digits
      const pastedOTP = value.split('').slice(0, numberOfDigits);
      
      // Update the entire OTP array
      setOtp(pastedOTP);
      
      // Focus on the last input field
      otpBoxReference.current[numberOfDigits - 1].focus();
    } else {
    // Ensure only one digit is entered
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
  
    // Update the OTP array
    newArr[index] = value;
    setOtp(newArr);
  
    // Move to the next field if a digit is entered
    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }
  }
  
  function handleBackspaceAndEnter(e, index) {
    // Handle Backspace
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
  
    // Handle Enter key to move to the next input
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  
    // Clear error if OTP length is correct
    if (otp.join("").length === numberOfDigits) setError("");
  
    // Add error if OTP length is incorrect
    // if (otp.join("").length !== numberOfDigits) setError("Enter 6 digit OTP number");
  }

  const handleResendOTP = (e) => {
    e.preventDefault()
    dispatch(forgotPassword({ email: userEmail })).then(() => setIsActive(true))
  }

  return (
    <React.Fragment>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={userInfo.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full flex items-center justify-center">
        <div className="w-4/5 max-w-md mt-20">
          <div className="text-center">

            <h4 className="mt-1 pl-3 pb-1 text-xl font-semibold logoColor">
              MyLogo
            </h4>

            <h4 className="mb-2 mt-6 pb-1 text-xl font-semibold defaultTextColor">
              Verification
            </h4>

            <p className="mb-8 text-sm">Your code was sent to you via email or Phone number</p>
          </div>
          <form>
            {
              userInfo.error !== '' ? <div className="pb-7">
                <p className="error" role="alert">
                  {userInfo.error}
                </p></div> : error ? <div className="pb-7">
                  <p className="error" role="alert">
                    {error}
                  </p></div> : null
            }
            <div className="relative mb-6 flex justify-evenly gap-5  pr-5">
              {otp.map((digit, index) => (
                <input
                  type="number"
                  key={index}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                  ref={(reference) =>
                    (otpBoxReference.current[index] = reference)
                  }
                  className={`otp-input border w-12 h-auto  p-3 rounded-md block  focus:border-2 focus:outline-none appearance-none`}
                />
              ))}

            </div>

            <div className="text-center lg:text-left">
              <button
                type="button"
                className="inline-block w-full rounded px-7 pb-3 pt-3 text-sm font-medium text-white "
                data-twe-ripple-init
                data-twe-ripple-color="light"
                style={{
                  background:"#FE634E",
                }}
                onClick={handleSubmit}
                // disabled={disableSubmit}
              >
                Verify
              </button>
              {
                !isActive ?

                  <p
                    className="mb-0 mt-2 pt-1 text-sm font-semibold text-center"
                    style={{ color: "#232323" }}
                  >
                    <button
                      className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 pl-1 text-font-primary-main"
                      // style={{ color: "#1D5BBF" }}
                      onClick={handleResendOTP}
                      type='button'
                    >
                      Resend OTP
                    </button>
                  </p>
                  :
                  <span className="mt-2 flex justify-center">00:{String(seconds).padStart(2, '0')}</span>
              }

            </div>
          </form>
        </div>

      </div >
    </React.Fragment >
  );
};
