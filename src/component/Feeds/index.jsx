import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '../../assets/icons/SearchColor.svg';
import FeedImage from '../../assets/images/feed1.png';
import MoreIcon from '../../assets/icons/moreIcon.svg';
import UserIcon from '../../assets/images/user.jpg';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import MaleIcon from '../../assets/images/male-profile1x.png';
import FemaleIcon from '../../assets/images/female-profile1x.png';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button } from '../../shared';
import SettingsModal from './SettingsModal';
import CreatePostModal from './CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPost } from '../../services/feeds';
import { Backdrop, CircularProgress } from '@mui/material';
import { feedStatus } from '../../utils/constant';
import { Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Feeds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null)
  const [pageSize, setPageSize] = useState(null)


  const defaultState = {
    create: false,
    settings: false,
    control: false,
    visibility: false,
  };
  const defaultForm = {
    visibility: 'anyone',
    comment_control: 'anyone',
    brand_partnership: false,
    is_published: true,
  };
  const [postModal, setPostModal] = useState({
    create: false,
    settings: false,
    control: false,
    visibility: false,
  });
  const [formData, setFormData] = useState({
    visibility: 'anyone',
    comment_control: 'anyone',
    brand_partnership: false,
    is_published: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { feeds, loading, status } = useSelector((state) => state.feeds);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm();

useEffect(()=>{
  if(feeds){
    setCurrentPage((prevState)=>feeds.current_page)
    setPreviousPage((prevState)=>feeds.previous)
    setTotalPages((prevState)=>feeds.count)
    setPageSize((prevState)=>feeds.page_size)
  }
},[feeds])


useEffect(()=>{
  let feedData = {
    'page' : currentPage,
    'pageSize': pageSize
  }
  dispatch(getPost(feedData))

},[currentPage, pageSize])




  // // console.log("---feeds---", feeds)
  // const feedList = [
  //   {
  //     name: 'Lorem ipsum dolor sit amet, consectetur',
  //     comment: '85M Views . 2 months ago',
  //   },
  //   {
  //     name: 'Lorem ipsum dolor sit amet, consectetur',
  //     comment: '85M Views . 2 months ago',
  //   },
  //   {
  //     name: 'Lorem ipsum dolor sit amet, consectetur',
  //     comment: '85M Views . 2 months ago',
  //   },
  //   {
  //     name: 'Lorem ipsum dolor sit amet, consectetur',
  //     comment: '85M Views . 2 months ago',
  //   },
  //   {
  //     name: 'Lorem ipsum dolor sit amet, consectetur',
  //     comment: '85M Views . 2 months ago',
  //   },
  // ];

  const handleClose = () => {
    setPostModal(defaultState);
  };

  const handleVisibilty = () => {
    setPostModal({ ...postModal, settings: true });
  };

  const handleSettingsBack = () => {
    setPostModal({ ...postModal, settings: false, create: true });
  };

  const handleSettingsData = (data) => {
    setFormData({ ...formData, ...data });
    setPostModal({ ...postModal, settings: false, create: true });
  };

  const handlePostData = (data) => {
    const apiData = {
      ...formData,
      ...data,
    };
    dispatch(createPost(apiData));
    setFormData(defaultForm);
  };

  const handleCreatePostPopup = () => {
    setPostModal({ create: true, visibility: false });
  };

  useEffect(() => {
    if (status === feedStatus.create) {
      handleClose();
      setTimeout(() => {
        dispatch(getPost());
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  // console.log(formData);

  const onSubmit = (data) => {
    const formDatas = new FormData();

    if (data.image) {
      if (Array.isArray(data.image)) {
        data.image.forEach((file, index) => {
          formDatas.append('uploaded_files', file);
        });
      } else {
        formDatas.append('uploaded_files', data.image);
      }
    }

    formDatas.append('title', data.title);
    formDatas.append('content', data.content);
    formDatas.append('brand_partnership', formData.brand_partnership);
    formDatas.append('comment_control', formData.comment_control);
    formDatas.append('visibility', formData.visibility);
    formDatas.append('is_published', formData.is_published);

    // console.log(formDatas);
    dispatch(createPost(formDatas));
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {

    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };


  const renderPagination = () => {
    return (
      <div style={{}} >
        <Tooltip title="Previous">
      <IconButton onClick={handlePrevious}  disabled={currentPage === 1} color="primary">
        <ArrowLeftIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Next">
      <IconButton onClick={handleNext}  disabled={currentPage === totalPages} color="primary">
        <ArrowRightIcon />
      </IconButton>
    </Tooltip>
          
      </div>
    )
  }


  return (
    <div className='feed-container px-9 py-9'>
      <div
        className='px-10 pt-5 pb-56 mb-8'
        style={{
          boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
        }}
      >
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex items-center justify-between'>
            <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 700 }}>
              Feeds
            </p>
          </div>
          <div className='flex gap-12'>
            <img src={SearchIcon} alt='SearchIcon' className='cursor-pointer' />
            <Button
              style={{ backgroundColor: "#FE634E" }}

              btnName='Add Posts'
              btnCls={'w-[170px]'}
              onClick={handleCreatePostPopup}
            />
          </div>
        </div>

        <Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={status === feedStatus.create}
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
                Your post is successfully uploaded
              </p>
            </div>
          </div>
        </Backdrop>

        {postModal.create && (
          <CreatePostModal
            register={register}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            open={postModal.create}
            handlePostData={onSubmit}
            handleClose={handleClose}
            handleVisibilty={handleVisibilty}
          />
        )}

        {postModal.settings && (
          <SettingsModal
            formData={formData}
            register={register}
            errors={errors}
            reset={reset}
            handleSubmit={handleSubmit}
            handleSettingsData={onSubmit}
            open={postModal.settings}
            handleClose={handleClose}
            handleSettingsBack={handleSettingsBack}
            handlePostData={handleSettingsData}
          />
        )}
        <div className='feeds-list'>
          <div className='grid grid-cols-3 gap-7'>
            {feeds && feeds.results && feeds.results.length > 0 && feeds.results.map((feed, index) => {
              let imageUrl = feed?.image_url || '';

              if (imageUrl === '') {
                imageUrl = feed.gender === 'male' ? MaleIcon : FemaleIcon;
              }
              const feedImg = feed?.media_files?.[0]?.media_files ?? FeedImage

              return (
                <div
                  className='feed-card cursor-pointer'
                  key={index}
                  onClick={() => navigate(`/feed-details/${feed.id}`)}
                >
                  <img className='feed-image' src={feedImg} alt='FeedImage' />
                  <div className='feed-content flex justify-between pt-5'>
                    <div className='flex gap-4 items-center'>
                      <img
                        className='user-image'
                        src={imageUrl}
                        alt='UserIcon'
                      />
                      <div>
                        <p className='text-[14px]'>{feed.content}</p>
                        <p className='text-[12px]'>
                          {feed.post_view_count} {' . '}{' '}
                          {feed.time_since_action}
                        </p>
                      </div>
                    </div>
                    <img
                      src={MoreIcon}
                      className='cursor-pointer'
                      alt='MoreIcon'
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: 50 }}>
        {renderPagination()}

        </div>
      </div>
      
    </div>
  );
}
