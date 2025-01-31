import React, { useCallback, useRef } from 'react'
import {
    LoginSocialFacebook,
    LoginSocialGoogle,
    LoginSocialInstagram,
    // LoginSocialInstagram,
} from "reactjs-social-login";
import { userAccountLogin } from "../../services/loginInfo";
// import FacebookLogin from 'react-facebook-login';
import GoogleIcon from '../../assets/images/google1x.png';
import FacebookIcon from '../../assets/images/facebook1x.png';
import InstagramIcon from '../../assets/images/instagram1x.png';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

export default function SocialMediaLogin({ view = 'vertical' }) {

    const dispatch = useDispatch();

    const googleRef = useRef();

    const onLoginStart = useCallback(() => {
        // alert("login start");
    }, []);

    const onLoginSuccess = (data) => {
        if (data && Object.keys(data).length && data.hasOwnProperty('name') && data.hasOwnProperty('email')) {
            let l = { first_name: data.name, last_name: data.name, email: data.email, auth_type: 'google' }
            const f = data.name.split(" ")
            l = { ...l, first_name: f[0], last_name: f[0] }
            if (f.length > 1) {
                l = { ...l, first_name: f[0], last_name: f[1] }
            }
            dispatch(userAccountLogin(l))
        }
    }

    const onLogoutFailure = useCallback(() => {
        alert("logout fail");
    }, []);

    const onLogoutSuccess = useCallback(() => {
        alert("logout success");
    }, []);


    const handleFacebookLogin = async (response) => {
        try {
        //   console.log('Facebook response:', response);
          // Handle the successful login here
          // response will contain accessToken and other user info
          if (response?.data && Object.keys(response?.data).length && response?.data?.hasOwnProperty('email')) {
              let l = { 
                first_name: response?.data?.first_name, 
                last_name: response?.data?.last_name, 
                email: response?.data?.email,
                auth_access_token:response?.data?.accessToken, 
                auth_type: 'facebook'
             }
            dispatch(userAccountLogin(l))
        }
        } catch (error) {
          console.error('Facebook login error:', error);
        }
      };
    const handleInstaLogin = async (response) => {
        console.log('Insta response:', response);
        try {
          console.log('Insta response:', response);
        //   Handle the successful login here
        //   response will contain accessToken and other user info
        //   if (response?.data && Object.keys(response?.data).length && response?.data?.hasOwnProperty('email')) {
        //       let l = { 
        //         first_name: response?.data?.first_name, 
        //         last_name: response?.data?.last_name, 
        //         email: response?.data?.email,
        //         auth_access_token:response?.data?.accessToken, 
        //         auth_type: 'facebook'
        //      }
        //     dispatch(userAccountLogin(l))
        // }
        } catch (error) {
          console.error('Facebook login error:', error);
        }
      };
    //   console.log(process.env.REACT_APP_SOCIAL_AUTH_INSTA_KEY,process.env.REACT_APP_SOCIAL_AUTH_INSTA_SECRET)
    return (
        <div className={`flex gap-7 ${view === 'vertical' ? 'flex-col justify-center' : ''}`}>
            {
                view === 'vertical' ?
                    <>
                        <LoginSocialGoogle
                            client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onLogoutFailure={onLogoutFailure}
                            onLoginStart={onLoginStart}
                            onLogoutSuccess={onLogoutSuccess}
                            scope="openid profile email"
                            onResolve={(e) => {
                                onLoginSuccess(e.data)
                            }}
                            onReject={(err) => {
                                console.log("hbhbdhd", err);
                            }}
                        >
                            <Button fullWidth color='inherit' size='large' variant="outlined" startIcon={<img src={GoogleIcon} className='w-[20px]' alt='GoogleIcon' />}>
                                Continue With Google
                            </Button>
                        </LoginSocialGoogle>
                        <LoginSocialInstagram
                       client_id={process.env.REACT_APP_SOCIAL_AUTH_INSTA_KEY} 
                       client_secret={process.env.REACT_APP_SOCIAL_AUTH_INSTA_SECRET}
                       fields={
                        'id,first_name,last_name,middle_name,name,email,picture'
                      }
                      onResolve={handleInstaLogin}
                      onReject={(error) => {
                        console.log('Facebook login failed:', error);
                      }}>
                        <Button fullWidth color='inherit' size='large' variant="outlined" startIcon={<img src={InstagramIcon} className='w-[20px]' alt='InstagramIcon' />}>
                            Continue with Instagram
                        </Button>
                       </LoginSocialInstagram>
                        <LoginSocialFacebook
                       appId={process.env.REACT_APP_SOCIAL_AUTH_FACEBOOK_KEY} 
                    //    appId={"939158531445780"} 
                       fieldsProfile={
                        'id,first_name,last_name,middle_name,name,email,picture'
                      }
                      onResolve={handleFacebookLogin}
                      onReject={(error) => {
                        console.log('Facebook login failed:', error);
                      }}
                        >
                        <Button fullWidth color='inherit' size='large' variant="outlined" startIcon={<img src={FacebookIcon} className='w-[20px]' alt='FacebookIcon' />}>
                            Continue with Facebook
                        </Button>
                        </LoginSocialFacebook>
                       
                    </>
                    :

                    <>
                        <LoginSocialGoogle
                            ref={googleRef}
                            client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onLogoutFailure={onLogoutFailure}
                            onLoginStart={onLoginStart}
                            onLogoutSuccess={onLogoutSuccess}
                            scope="openid profile email"
                            onResolve={(e) => {
                                onLoginSuccess(e.data)
                            }}
                            onReject={(err) => {
                                console.log("hbhbdhd", err);
                            }}
                        >
                            <Button fullWidth color='inherit' size='large' variant="outlined" startIcon={<img src={GoogleIcon} className='w-[20px]' alt='GoogleIcon' />}>
                                Continue With Google
                            </Button>
                        </LoginSocialGoogle>
                        <Button fullWidth color='inherit' size='large' variant="outlined" startIcon={<img src={InstagramIcon} className='w-[20px]' alt='InstagramIcon' />}>
                            Continue with Instagram
                        </Button>
                        <LoginSocialFacebook
                       appId={process.env.REACT_APP_SOCIAL_AUTH_FACEBOOK_KEY} 
                    //    appId={"939158531445780"} 
                    fieldsProfile={
                        'id,first_name,last_name,middle_name,name,email,picture'
                      }
                      onResolve={handleFacebookLogin}
                      onReject={(error) => {
                        console.log('Facebook login failed:', error);
                      }}
                        >
                        <Button fullWidth color='inherit' size='large' variant="outlined" startIcon={<img src={FacebookIcon} className='w-[20px]' alt='FacebookIcon' />}>
                            Continue with Facebook
                        </Button>
                        </LoginSocialFacebook>
                    </>
            }

        </div>
    )
}
