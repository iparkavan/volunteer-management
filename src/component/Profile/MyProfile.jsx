import React, { useState } from 'react';
import ProfileIcon from '../../assets/icons/profile-icon.svg';
import SecurityIcon from '../../assets/icons/security-icon.svg';
import PermissionIcon from '../../assets/icons/permission-icon.svg';
import ProfileTab from './tabs/ProfileTab';
import PermissionTab from './tabs/PermissionTab';
import SecurityTab from './tabs/SecurityTab';
import EditProfile from './edit-profile';
import { useSelector } from 'react-redux';
import { GroupEditForm } from './section-edit/groupEditForm';
import { IndivitualEditForm } from './section-edit/indivitualEditForm';

export const roleBasedSections = {
  mentor: [
    'Personal Information',
    'Professional Bakground',
    'Educational Background',
    'Area of expertise',
    'Program Management Experience',
    'Document upload',
    'Program Management Preference',
    'Goals and Expections',
    'Availability and Commitment',
    'Additional Information',
  ],
  mentee: [
    'Personal Information',
    'Document upload',
    'Volunteer List'
  ],
  admin: ['Personal Information'],
};

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const { profile, loading, status } = useSelector(
    (state) => state.profileInfo
  );
  const userInfo = useSelector((state) => state.userInfo);
  const userRole = userInfo?.data?.role;

  const tabs = [
    {
      label: 'Profile',
      icon: ProfileIcon,
      content: <ProfileTab setEditMode={() => setEditMode(true)} />,
    },
    {
      label: 'Security',
      icon: SecurityIcon,
      content: <SecurityTab />,
    },
    {
      label: 'Permissions',
      icon: PermissionIcon,
      content: <PermissionTab />,
    },
  ];

  return (
    <div className='profile-container'>
      <div className='flex justify-between items-center mb-6'>
        <p className='text-color text-2xl font-semibold'>
          {editMode ? 'Edit Profile' : 'Settings'}
        </p>
      </div>
      {!editMode ? (
        <div className='border grid grid-cols-5 rounded-xl bg-white'>
          <div className='grid col-span-1 border-r pl-6 py-10'>
            <div className='flex flex-col gap-1'>
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`p-4 font-semibold pl-6 flex items-start cursor-pointer gap-4 ${activeTab === index
                    ? 'text-font-primary-main bg-background-primary-light border-r-4 rounded-tl-lg rounded-bl-lg border-background-primary-main'
                    : 'text-gray-500 hover:text-font-primary-main'
                    }`}
                  onClick={() => setActiveTab(index)}
                >
                  <img src={tab.icon} alt='' />
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
          <div className='grid col-span-4'>
            <div className='p-12'>
              {tabs[activeTab] && (
                <div className='text-sm text-gray-700'>
                  {tabs[activeTab].content}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {
            userRole === "mentee" ?
              <>
                {
                  profile?.mentee_type === "group" ?
                    <GroupEditForm setEditMode={setEditMode} />
                    :
                    <IndivitualEditForm setEditMode={setEditMode} />
                }
              </> :
              <EditProfile setEditMode={setEditMode} />
          }
        </>

      )}
    </div>
  );
}
