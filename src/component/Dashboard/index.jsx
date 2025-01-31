import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mentor } from './Mentor';
import { Mentee } from './Mentee';
import Admin from './Admin';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { user } from '../../utils/constant';
import SuperAdmin from './super-admin/SuperAdmin';

export const Dashboard = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = userInfo.data.role;

  // useEffect(() => {
  //   if(userInfo?.data?.userinfo?.approve_status === 'new'){
  //     localStorage.removeItem('access_token');
  //     localStorage.removeItem('refresh_token');
  //     navigate('/logout');
  //   }
  // },[userInfo])

  if (role === '') return <></>;

  return (
    <div>
      {role === user.mentee && <Mentee />}

      {role === user.mentor && <Mentor />}

      {role === user.admin && <Admin />}

      {role === user.super_admin && <SuperAdmin />}
    </div>
  );
};
