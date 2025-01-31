import React, { useEffect, useState } from 'react';
import { Button } from '../../shared';
import UserImage from '../../assets/images/chatimage.png';
import LocationIcon from '../../assets/images/Location1x.png';
import LinkedInIcon from '../../assets/icons/linkedin.svg';
import TwitterIcon from '../../assets/icons/TwitterSmall.svg';
import FacebookIcon from '../../assets/icons/FacebookSmall.svg';
import ReportSampleImage from '../../assets/images/reportsample.png';
import MoreIcon from '../../assets/icons/moreIcon.svg';
import LikeBlackIcon from '../../assets/icons/LikeBlack.svg';
import CommentBlackIcon from '../../assets/icons/CommentBlack.svg';
import ShareBlackIcon from '../../assets/icons/ShareBlack.svg';
import RightArrowColor from '../../assets/icons/RightArrowColor.svg';
import DeleteIcon from '../../assets/icons/DeleteRed.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../services/profile';
import { Backdrop, CircularProgress } from '@mui/material';
import { getUserPost } from '../../services/feeds';
import { getFollowList } from '../../services/userList';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfo);
  const { profile, loading } = useSelector((state) => state.profileInfo);
  const { userPost, loading: postLoading } = useSelector(
    (state) => state.feeds
  );
  const { followInfo } = useSelector((state) => state.userList);

  const [actionTab, setActiveTab] = useState('activity');
  const userId = userData?.data?.user_id || '';
  const allProfileDetailTab = [
    {
      name: 'Activity',
      key: 'activity',
    },
    {
      name: 'Posts',
      key: 'post',
    },
    {
      name: 'Colleagues',
      key: 'colleagues',
    },
    {
      name: 'Gallery',
      key: 'gallery',
    },
    {
      name: 'Testimonials',
      key: 'testimonials',
    },
  ];

  const collegueList = () => {
    const list = [];
    for (let a = 1; a <= 10; a++) {
      list.push({ id: a, name: `John ${a}`, role: 'Engineer' });
    }
    return list;
  };

  const allCollegues = collegueList();

  const handleTabAction = (key) => {
    if (key === 'post') dispatch(getUserPost());
    setActiveTab(key);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (userId !== '') {
      dispatch(getFollowList(userId));
    }
  }, [userData]);

  return (
    <div className='profile-container'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || postLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <div className='flex justify-between items-center mb-8'>
        <div className='text-color font-medium'>Profile</div>
        <div>
          <Button
            onClick={() => navigate('/profile')}
            btnName='Edit'
            btnCls={'w-[140px]'}
          />
        </div>
      </div>

      <div className='profile-content'>
        <div className='grid grid-cols-8 gap-3'>
          <div className='col-span-2'>
            <div className='profile-info'>
              <div className='user-information'>
                <div className='flex gap-4 px-7 py-6'>
                  <div className='user-image w-[26%]'>
                    <img src={UserImage} alt='UserImage' />
                  </div>

                  <div className='w-[70%]'>
                    <div className='leading-7'>
                      <p className='text-[14px] font-semibold'>
                        {profile?.name}
                      </p>
                      <p className='text-[12px]'>Software Engineer( Java)</p>
                      <p className='flex gap-2'>
                        <img src={LocationIcon} alt='LocationIcon' />
                        <span className='text-[12px]'>San Francisco</span>
                      </p>
                    </div>
                    <div className='mt-9'>
                      <div className='flex justify-between'>
                        <div className='text-center'>
                          <p className='text-[12px]'>Followers</p>
                          <p className='text-[18px] font-semibold'>
                            {followInfo?.follower_count}
                          </p>
                        </div>
                        <div className='text-center'>
                          <p className='text-[12px]'>Following</p>
                          <p className='text-[18px] font-semibold'>
                            {followInfo?.following_count}
                          </p>
                        </div>
                        <div className='text-center'>
                          <p className='text-[12px]'>Post</p>
                          <p className='text-[18px] font-semibold'>
                            {followInfo?.post_count}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='professional-bio'>
                <div className='px-7 py-6'>
                  <div className='text-[14px] font-semibold pb-3'>
                    Professional Bio :
                  </div>
                  <p
                    style={{
                      color: 'rgba(118, 119, 120, 1)',
                      fontSize: '12px',
                    }}
                  >
                    {profile?.professional_bio}
                  </p>
                  {profile.link &&
                    profile.link !== null &&
                    profile.link !== '' && (
                      <>
                        <div className='text-[14px] font-semibold pt-5 pb-3'>
                          Link :
                        </div>

                        <p>
                          <a
                            href='#'
                            style={{
                              color: 'rgba(29, 91, 191, 1)',
                              fontSize: '12px',
                              fontWeight: 600,
                            }}
                          >
                            {profile?.link}
                          </a>
                        </p>
                      </>
                    )}
                </div>
              </div>

              <div className='contact-information'>
                <div className='px-7 py-4'>
                  <div className='text-[14px] font-semibold pb-3'>
                    Contact Information :
                  </div>
                  <div className='leading-7'>
                    <div className='flex justify-between text-[13px]'>
                      <div>Email</div>
                      <div>{profile?.email}</div>
                    </div>
                    <div className='flex justify-between text-[13px]'>
                      <div>Phone No</div>
                      <div>{profile?.phone_no}</div>
                    </div>
                    <div className='flex justify-between text-[13px]'>
                      <div>Location</div>
                      <div>{profile?.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='social-media'>
                <div className='px-7 py-4'>
                  <div className='flex gap-4 items-center'>
                    <div className='text-[14px] font-semibold'>
                      Social Networks :
                    </div>
                    <div className='flex gap-5'>
                      <img src={LinkedInIcon} alt='LinkedInIcon' />
                      <img src={TwitterIcon} alt='TwitterIcon' />
                      <img src={FacebookIcon} alt='FacebookIcon' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)',
                borderRadius: '10px',
                marginTop: '20px',
              }}
            >
              <div className='title flex justify-between py-3 px-4 border-b-2 items-center'>
                <div className='flex gap-4'>
                  <h4>Skills</h4>
                </div>
              </div>
              <div className='py-4 px-6'>
                <div className='py-3'>
                  <p className='flex justify-between text-[14px]'>
                    <span>Teaching skill</span>
                    <span>67%</span>
                  </p>
                  <div className='relative'>
                    <div
                      style={{
                        background: 'rgba(0, 174, 189, 1)',
                        width: '67%',
                        borderRadius: '30px',
                        height: '8px',
                        position: 'absolute',
                      }}
                    ></div>
                    <div
                      style={{
                        background: 'rgba(217, 217, 217, 1)',
                        width: '100%',
                        borderRadius: '30px',
                        height: '8px',
                        marginTop: '8px',
                      }}
                    ></div>
                  </div>
                </div>

                <div className='py-3'>
                  <p className='flex justify-between text-[14px]'>
                    <span>Program skill</span>
                    <span>32%</span>
                  </p>
                  <div className='relative'>
                    <div
                      style={{
                        background: 'rgba(29, 91, 191, 1)',
                        width: '32%',
                        borderRadius: '30px',
                        height: '8px',
                        position: 'absolute',
                      }}
                    ></div>
                    <div
                      style={{
                        background: 'rgba(217, 217, 217, 1)',
                        width: '100%',
                        borderRadius: '30px',
                        height: '8px',
                        marginTop: '8px',
                      }}
                    ></div>
                  </div>
                </div>

                <div className='py-3'>
                  <p className='flex justify-between text-[14px]'>
                    <span>Speaking skill</span>
                    <span>55%</span>
                  </p>
                  <div className='relative'>
                    <div
                      style={{
                        background: 'rgba(255, 138, 0, 1)',
                        width: '55%',
                        borderRadius: '30px',
                        height: '8px',
                        position: 'absolute',
                      }}
                    ></div>
                    <div
                      style={{
                        background: 'rgba(217, 217, 217, 1)',
                        width: '100%',
                        borderRadius: '30px',
                        height: '8px',
                        marginTop: '8px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-6'>
            <div className='profile-details'>
              <div className='detail-tab'>
                <div className='px-3 py-5'>
                  <div className='flex justify-between px-5 mb-8 items-center border-b-2 '>
                    <ul className='tab-list'>
                      {allProfileDetailTab.map((discussion, index) => (
                        <li
                          className={`${
                            actionTab === discussion.key ? 'active' : ''
                          } relative`}
                          key={index}
                          onClick={() => handleTabAction(discussion.key)}
                        >
                          {`${discussion.name}`}
                          {actionTab === discussion.key && <span></span>}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='detail-content'>
                    <div
                      className={`activity-tab ${
                        actionTab === 'activity' ? 'show' : 'hidden'
                      }`}
                    >
                      <div className='activity-details flex gap-4'>
                        <div className='batch-container'>E</div>
                        <div className=''>
                          <div className='flex justify-between text-[13px] pb-2'>
                            <p className='font-semibold'>Program Report 1</p>
                            <p className='text-[12px]'>24,Dec 2022 - 14:34</p>
                          </div>
                          <div className='text-[12px]'>
                            <p className='mt-4'>
                              <img
                                className='w-[200px]'
                                style={{ borderRadius: '6px' }}
                                src={ReportSampleImage}
                                alt='ReportSampleImage'
                              />
                            </p>
                          </div>
                        </div>
                        <div
                          className='progress'
                          style={{ height: '193px' }}
                        ></div>
                      </div>

                      <div className='activity-details flex gap-4'>
                        <div className='user-image'>
                          <img src={UserImage} alt='UserImage' />
                        </div>
                        <div className=''>
                          <div className='flex justify-between text-[13px] pb-2'>
                            <p className='font-semibold'>Program Report 1</p>
                            <p className='text-[12px]'>24,Dec 2022 - 14:34</p>
                          </div>
                          <div className='text-[12px]'>
                            <p className='mt-2'>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, repellendus rem rerum excepturi
                              aperiam ipsam temporibus inventore ullam tempora
                              eligendi libero sequi dignissimos cumque, et a
                              sint tenetur consequatur omnis!
                            </p>
                          </div>
                        </div>
                        <div
                          className='progress'
                          style={{ height: '87px' }}
                        ></div>
                      </div>

                      <div className='activity-details flex gap-4'>
                        <div className='user-image'>
                          <img src={UserImage} alt='UserImage' />
                        </div>
                        <div className=''>
                          <div className='flex justify-between text-[13px] pb-2'>
                            <p className='font-semibold'>
                              Yoga Content Created
                            </p>
                            <p className='text-[12px]'>24,Dec 2022 - 14:34</p>
                          </div>
                          <div className='text-[12px]'>
                            <p className='mt-2'>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, repellendus rem rerum excepturi
                              aperiam ipsam temporibus inventore ullam tempora
                              eligendi libero sequi dignissimos cumque, et a
                              sint tenetur consequatur omnis!
                            </p>
                          </div>
                        </div>
                        <div
                          className='progress'
                          style={{ height: '87px' }}
                        ></div>
                      </div>

                      <div className='activity-details flex gap-4'>
                        <div className='batch-container'>E</div>
                        <div className=''>
                          <div className='flex justify-between text-[13px] pb-2'>
                            <p className='font-semibold'>
                              Program 1 Report Lorem ipsum dolor sit amet
                              consectetur adipisicing elit. Re
                            </p>
                            <p className='text-[12px]'>24,Dec 2022 - 14:34</p>
                          </div>
                          <div className='text-[12px]'>
                            <p className='mt-4'>
                              <img
                                className='w-[200px]'
                                style={{ borderRadius: '6px' }}
                                src={ReportSampleImage}
                                alt='ReportSampleImage'
                              />
                            </p>
                          </div>
                        </div>
                        <div className='progress'></div>
                      </div>

                      <div className='activity-details flex gap-4'>
                        <div className='user-image'>
                          <img src={UserImage} alt='UserImage' />
                        </div>
                        <div className=''>
                          <div className='flex justify-between text-[13px] pb-2'>
                            <p className='font-semibold'>
                              Yoga Content Created
                            </p>
                            <p className='text-[12px]'>24,Dec 2022 - 14:34</p>
                          </div>
                          <div className='text-[12px]'>
                            <p className='mt-2'>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, repellendus rem rerum excepturi
                              aperiam ipsam temporibus inventore ullam tempora
                              eligendi libero sequi dignissimos cumque, et a
                              sint tenetur consequatur omnis!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`post-tab ${
                        actionTab === 'post' ? 'show' : 'hidden'
                      }`}
                    >
                      <div>
                        {/* <div style={{ border: '1px solid rgba(217, 228, 242, 1)', padding: '20px', borderRadius: '3px' }}>
                                                    <div className='flex gap-4 items-center'>
                                                        <div className='user-image'>
                                                            <img src={UserImage} alt="UserImage" />
                                                        </div>

                                                        <div className='flex justify-between items-center w-full text-[13px] '>
                                                            <div className='leading-5'>
                                                                <p className='flex gap-2 font-semibold'>
                                                                    <span>Jhon Doe</span>
                                                                    <span className='flex gap-2 items-center font-normal'>
                                                                        <div
                                                                            className="w-[6px] h-[6px]  mx-[-1px]  flex items-center justify-center">
                                                                            <span className="w-[6px] h-[6px]  rounded-full"
                                                                                style={{ background: 'rgba(24, 40, 61, 1)' }}></span>
                                                                        </div>
                                                                        <span >2days ago</span>
                                                                    </span>
                                                                </p>
                                                                <p>Developer</p>
                                                            </div>
                                                            <p className='text-[12px]'>

                                                                <div className='cursor-pointer h-full flex items-center'>
                                                                    <img src={MoreIcon} alt='MoreIcon' />
                                                                </div>
                                                            </p>
                                                        </div>


                                                    </div>
                                                    <div className='post-details'>
                                                        <img src={ReportSampleImage} alt="ReportSampleImage" />
                                                        <div style={{ borderBottom: '1px solid rgba(217, 228, 242, 1)', paddingBottom: '25px' }}>
                                                            <div className='text-color font-semibold pb-5'>
                                                                Lorem ipsum dolor sit amet
                                                            </div>
                                                            <p className='text-[12px]'>
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                                Ut enim ad minim veniam, quis nostrud exercitation
                                                                ullamco laboris nisi ut aliquip ex ea  voluptate velit esse cillum dolore eu fugiat nulla pariatur
                                                                <span style={{ color: 'rgba(29, 91, 191, 1)', fontWeight: 600, paddingLeft: '4px', cursor: 'pointer' }}>Show More......</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className='action-item flex gap-16 items-center pt-5 text-[12px]'>
                                                        <div className='flex gap-2'>
                                                            <img src={LikeBlackIcon} alt="LikeBlackIcon" />
                                                            <p>Like(20)</p>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <img src={CommentBlackIcon} alt="CommentBlackIcon" />
                                                            <p>Comment(19)</p>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <img src={ShareBlackIcon} alt="ShareBlackIcon" />
                                                            <p>Share</p>
                                                        </div>
                                                    </div>
                                                </div> */}

                        {userPost.map((post) => (
                          <div
                            style={{
                              border: '1px solid rgba(217, 228, 242, 1)',
                              padding: '20px',
                              borderRadius: '3px',
                              marginTop: '40px',
                            }}
                            key={post.id}
                          >
                            <div className='flex gap-4 items-center'>
                              <div className='user-image'>
                                <img src={UserImage} alt='UserImage' />
                              </div>

                              <div className='flex justify-between items-center w-full text-[13px] '>
                                <div className='leading-5'>
                                  <p className='flex gap-2 font-semibold'>
                                    <span>{post?.user_name}</span>
                                    <span className='flex gap-2 items-center font-normal'>
                                      <div className='w-[6px] h-[6px]  mx-[-1px]  flex items-center justify-center'>
                                        <span
                                          className='w-[6px] h-[6px]  rounded-full'
                                          style={{
                                            background: 'rgba(24, 40, 61, 1)',
                                          }}
                                        ></span>
                                      </div>
                                      <span>{post?.time_since_action}</span>
                                    </span>
                                  </p>
                                  <p>Developer</p>
                                </div>
                                <p className='text-[12px]'>
                                  <div className='cursor-pointer h-full flex items-center'>
                                    <img src={MoreIcon} alt='MoreIcon' />
                                  </div>
                                </p>
                              </div>
                            </div>
                            <div className='post-details'>
                              <div
                                style={{
                                  borderBottom:
                                    '1px solid rgba(217, 228, 242, 1)',
                                  paddingBottom: '25px',
                                }}
                              >
                                <div className='text-color font-semibold pb-5 pt-8'>
                                  {post?.content}
                                </div>
                                {/* <p className='text-[12px]'>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                                        Ut enim ad minim veniam, quis nostrud exercitation
                                                                        ullamco laboris nisi ut aliquip ex ea  voluptate velit esse cillum dolore eu fugiat nulla pariatur
                                                                        <span style={{ color: 'rgba(29, 91, 191, 1)', fontWeight: 600, paddingLeft: '4px', cursor: 'pointer' }}>Show More......</span>
                                                                    </p> */}
                              </div>
                            </div>

                            <div className='action-item flex gap-16 items-center pt-5 text-[12px]'>
                              <div className='flex gap-2'>
                                <img src={LikeBlackIcon} alt='LikeBlackIcon' />
                                <p>Like(20)</p>
                              </div>
                              <div className='flex gap-2'>
                                <img
                                  src={CommentBlackIcon}
                                  alt='CommentBlackIcon'
                                />
                                <p>Comment(19)</p>
                              </div>
                              <div className='flex gap-2'>
                                <img
                                  src={ShareBlackIcon}
                                  alt='ShareBlackIcon'
                                />
                                <p>Share</p>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div
                          style={{
                            border: '1px solid rgba(217, 228, 242, 1)',
                            margin: '44px 0px 10px',
                            width: '100%',
                          }}
                        ></div>
                        <div
                          className='flex justify-center items-center cursor-pointer font-semibold pt-3'
                          style={{ color: 'rgba(29, 91, 191, 1)' }}
                          onClick={() => navigate('/feeds')}
                        >
                          Show all Posts
                          <img
                            className='pl-3'
                            src={RightArrowColor}
                            alt='RightArrowColor'
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`collegue-tab ${
                        actionTab === 'colleagues' ? 'show' : 'hidden'
                      }`}
                    >
                      <div className='px-6 py-2'>
                        <div className='grid grid-cols-3 gap-20'>
                          {allCollegues.map((collegue) => (
                            <div className='collegue-list' key={collegue.id}>
                              <div className='flex gap-3'>
                                <img
                                  className='user-image'
                                  src={UserImage}
                                  alt='UserImage'
                                />
                                <div>
                                  <p className='text-[14px] font-semibold'>
                                    {collegue.name}
                                  </p>
                                  <p className='text-[12px]'>{collegue.role}</p>
                                  <p
                                    style={{ color: 'rgba(29, 91, 191, 1)' }}
                                    className='text-[13px] cursor-pointer pt-3'
                                  >
                                    View Profile
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`gallery-tab ${
                        actionTab === 'gallery' ? 'show' : 'hidden'
                      }`}
                    >
                      <div className='px-3'>
                        <div className='grid grid-cols-3 gap-3'>
                          <img
                            style={{ borderRadius: '6px' }}
                            src={ReportSampleImage}
                            alt='ReportSampleImage'
                          />
                          <img
                            style={{ borderRadius: '6px' }}
                            src={ReportSampleImage}
                            alt='ReportSampleImage'
                          />
                          <img
                            style={{ borderRadius: '6px' }}
                            src={ReportSampleImage}
                            alt='ReportSampleImage'
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`testimonials-tab ${
                        actionTab === 'testimonials' ? 'show' : 'hidden'
                      }`}
                    >
                      <div className='px-3'>
                        <div className='testimonial-list'>
                          <img
                            className='absolute top-2 right-2 cursor-pointer'
                            src={DeleteIcon}
                            alt='DeleteIcon'
                          />
                          <div className='flex gap-3'>
                            <img
                              className='user-image'
                              src={UserImage}
                              alt='UserImage'
                            />
                            <div>
                              <p
                                style={{
                                  color: 'rgba(29, 91, 191, 1)',
                                  fontWeight: 600,
                                }}
                              >
                                John Doe
                              </p>
                              <p className='py-3 text-[14px] leading-6'>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, ook.standard dummy text ever since
                                the 1500s, ook.
                              </p>
                            </div>
                          </div>
                          <div
                            className='flex justify-end'
                            style={{
                              color: 'rgba(29, 91, 191, 1)',
                              fontSize: '12px',
                            }}
                          >
                            24,Dec 2022 - 14:34
                          </div>
                        </div>

                        <div className='testimonial-list'>
                          <img
                            className='absolute top-2 right-2 cursor-pointer'
                            src={DeleteIcon}
                            alt='DeleteIcon'
                          />
                          <div className='flex gap-3'>
                            <img
                              className='user-image'
                              src={UserImage}
                              alt='UserImage'
                            />
                            <div>
                              <p
                                style={{
                                  color: 'rgba(29, 91, 191, 1)',
                                  fontWeight: 600,
                                }}
                              >
                                John Doe
                              </p>
                              <p className='py-3 text-[14px] leading-6'>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, ook.standard dummy text ever since
                                the 1500s, ook.
                              </p>
                            </div>
                          </div>
                          <div
                            className='flex justify-end'
                            style={{
                              color: 'rgba(29, 91, 191, 1)',
                              fontSize: '12px',
                            }}
                          >
                            24,Dec 2022 - 14:34
                          </div>
                        </div>

                        <div className='testimonial-list'>
                          <img
                            className='absolute top-2 right-2 cursor-pointer'
                            src={DeleteIcon}
                            alt='DeleteIcon'
                          />
                          <div className='flex gap-3'>
                            <img
                              className='user-image'
                              src={UserImage}
                              alt='UserImage'
                            />
                            <div>
                              <p
                                style={{
                                  color: 'rgba(29, 91, 191, 1)',
                                  fontWeight: 600,
                                }}
                              >
                                John Doe
                              </p>
                              <p className='py-3 text-[14px] leading-6'>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, ook.standard dummy text ever since
                                the 1500s, ook.
                              </p>
                            </div>
                          </div>
                          <div
                            className='flex justify-end'
                            style={{
                              color: 'rgba(29, 91, 191, 1)',
                              fontSize: '12px',
                            }}
                          >
                            24,Dec 2022 - 14:34
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
