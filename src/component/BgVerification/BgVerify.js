import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import React, { use, useState } from 'react';
import axios from 'axios';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


export default function BgVerify() {

    const navigate = useNavigate()

    React.useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });

        const candidateData = {
            first_name: "Test",
            last_name: "User",
            email: "jayakant@dataterrain.com",
            dob: "1990-01-01",
            zipcode: "80201",
            middle_name: "",
            copy_requested: true,
            work_location_country: "US",
            work_location_state: "CO",
            work_location_city: "Denver"
        };

        // console.log('Sending data:', candidateData);

        axiosInstance.post('/api/bg_verify/candidate/', candidateData)
            .then((res) => {

                axiosInstance.post('api/bg_verify/invitation/', {
                    candidate_id: res.data.id,
                    package: 'test_pro_criminal_and_mvr',
                    work_locations: [{ country: 'US' }]
                }).then((res) => {
                    console.log("Invitation created")
                    console.log(res.data.invitation_url)
                    window.open(res.data.invitation_url, '_blank');
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 2000);
                }).catch((err) => {
                    console.log("Inv error")
                    console.log(err)
                })

            })
            .catch((err) => {
                console.log('Full err:', err);
                console.log('err details:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status,
                    config: err.config
                });
            });
    }, [])
    return (<>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    </>)
}