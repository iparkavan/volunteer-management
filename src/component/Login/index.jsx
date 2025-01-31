import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { LoginFields } from "../../utils/loginFields";
import SocialMediaLogin from "../../shared/SocialMedia";
import { userAccountLogin, resetUserInfo, updateInfo, updateUserInfo } from "../../services/loginInfo";
import { userStatus } from "../../utils/constant";
import { ReactComponent as EyeCloseIcon } from "../../assets/icons/eyeClose.svg";
import { ReactComponent as EyeOpenIcon } from "../../assets/icons/eyeOpen.svg";
import SuccessIcon from "../../assets/images/Success_tic1x.png"
import FailedIcon from "../../assets/images/cancel3x.png"
import vmMainLogo from "../../assets/icons/vmMainLogo.svg"

const Login = () => {

  // Internal State
  const [remeberPassword, setRememberPassword] = React.useState(false);
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [userFormDetails, setFormDetails] = React.useState({ email: '', password: '' })

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfo);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    if (email !== "" && password !== "") {
      if (/\s/.test(password)) {
        setError("password", {
          type: "manual",
          message: "Password must not contain spaces",
        });
        return; // Stop further execution if the password contains spaces
      }
      if (localStorage.getItem('rememberme') === 'true') {
        localStorage.setItem('useremail', email)
        localStorage.setItem('userpassword', btoa(password))
      }
      dispatch(userAccountLogin(data))
      setFormDetails(data)
    }
  };

  const handleRemeberPassword = () => {
    localStorage.setItem('rememberme', !remeberPassword)
    setRememberPassword(!remeberPassword);
  };

  // const handleRedirect = () => {
  //   dispatch(updateInfo())
  //   if (userData.data.role === 'fresher') navigate("/login-type");
  //   else if (userData.data.is_registered) navigate("/dashboard")
  //   else if(userData.data.role === 'mentee' && !userData.data.is_registered) navigate('/programs')
  //   else navigate("/questions");
  // }

  const handleRedirect = () => {
    dispatch(updateInfo());
    if (
      userData.data.role === "super_admin" &&
      userData.data.is_registered === true
    ) {
      navigate("/super-members");
    } else if (userData.data.role === "fresher") {
      navigate("/login-type");
    } else if (userData.data.is_registered) {
      navigate("/dashboard");
    } else if (
      userData.data.role === "mentee" &&
      !userData.data.is_registered
    ) {
      navigate("/programs");
    } else {
      navigate("/questions");
    }
  };

  React.useEffect(() => {
    const rememberme = localStorage.getItem('rememberme')
    const email = localStorage.getItem('useremail')
    const password = localStorage.getItem('userpassword')
    dispatch(resetUserInfo())
    if (localStorage.getItem('rememberme') === 'true') {
      setRememberPassword(true)
      reset({ email, password: atob(password) })
    }
  }, [])

  React.useEffect(() => {
    if (!userData.loading && userData.status === userStatus.login) {
      setTimeout(() => {
        handleRedirect()
      }, 20)
    }

    if (!userData.loading && userData.status === userStatus.pending) {
      setTimeout(() => {
        dispatch(updateUserInfo({ status: '' }))
      }, 3000)
    }
  }, [userData]);

  // Prevent Enter key from triggering forgot password action
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.name === 'forgot-password') {
      e.preventDefault();
    }
  }

  console.log('errors', errors)

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={userData.loading || userData.status === userStatus.pending}

      >
        {
          (userData.status === userStatus.pending) ?
            <div className="popup-content w-2/6 bg-white flex flex-col gap-4 h-[330px] justify-center items-center">
              <img src={userData.status === userStatus.pending ? FailedIcon : SuccessIcon} alt="VerifyIcon" />
              <span style={{ color: '#232323', fontWeight: 600 }}>
                {
                  userData.status === userStatus.pending ? 'Waiting for admin approval' : ' Login Successful!'
                }



              </span>
            </div>
            :
            <CircularProgress color="inherit" />
        }

      </Backdrop>

      {/* Right Section */}
      <div className="w-full flex items-center justify-center">
        <div className="w-4/5 max-w-md">
          <div style={{ display:'flex', justifyContent:'flex-start', width:"100%"}} >
            <img  src={vmMainLogo} alt="" />
            <h4 style={{ marginLeft: 10, alignContent: 'center', color:"#18283DDD"}} className="pb-1 text-xl font-semibold  text-font-primary-logoColor">
              Logo
            </h4>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome to Log In
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-background-primary-main font-semibold underline cursor-pointer"
            >
              Create one
            </span>
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
            <SocialMediaLogin />
            <div className="mb-8 mt-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
              <p
                className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200"
                style={{
                  color: "#232323",
                }}
              >
                OR
              </p>
            </div>
            {
              userData.error !== '' ? <div className="pb-7">
                <p className="error" role="alert">
                  {userData.error}
                </p></div> : null
            }
            {
              LoginFields.map((field, index) =>

                <div className="relative mb-6" key={index}>
                  <label className="block tracking-wide text-gray-700 text-xs mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.fieldtype === 'password' ? (passwordVisibility ? 'text' : field.fieldtype) : field.fieldtype}
                    className={`w-full rounded px-3 py-[0.32rem] text-[14px] leading-[2.15] h-[60px] ${errors[field.name] ? 'focus:border-teal focus:outline-none focus:ring-0' : ''}`}
                    placeholder={field.placeholder}
                    style={{
                      color: "#232323",
                      border: `1px solid ${errors[field.name] ? 'rgb(239 68 68)' : '#3E3E3E'}`,
                    }}
                    {...register(field.name, field.inputRules)}
                    aria-invalid={errors[field.name] ? "true" : "false"}
                  />
                  {
                    field.fieldtype === 'password' &&

                    <button
                      type="button"
                      className="absolute top-8 end-0 p-3.5 rounded-e-md"
                      onClick={() =>
                        setPasswordVisibility(!passwordVisibility)
                      }
                    >
                      {passwordVisibility ? (
                        <EyeOpenIcon />
                      ) : (
                        <EyeCloseIcon />
                      )}
                    </button>
                  }
                  {errors[field.name] && (
                    <p className="error" role="alert">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              )
            }

            <div className="mb-6 flex items-center justify-between">
              <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                <input
                  className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem]"
                  type="checkbox"
                  value={remeberPassword}
                  checked={remeberPassword}
                  onChange={handleRemeberPassword}
                />
                <label className="inline-block ps-[0.15rem] text-[14px] hover:cursor-pointer defaultTextColor">
                  Remember me
                </label>
              </div>

              <button
                type="button" // Set type to 'button' to prevent it from submitting the form
                className="text-[12px] text-background-primary-main"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>

            <div className="login-button flex justify-center text-center lg:text-left relative mb-16">
              <button
                type="submit"
                className="inline-block w-1/3 rounded px-7 pb-3 pt-3 text-sm font-medium text-white !bg-background-primary-main"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                disabled={userData.loading}
              >
                Login
              </button>

            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Login };
