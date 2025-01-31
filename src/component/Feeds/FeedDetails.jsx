import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tooltip from '../../shared/Tooltip';
import CancelIcon from '../../assets/images/cancel-colour1x.png';
import FeedImage from '../../assets/images/feed1.png';
import LikeBlackIcon from '../../assets/icons/LikeBlack.svg';
import ShareIcon from '../../assets/icons/Share.svg';
import CommentIcon from '../../assets/icons/CommentBlack.svg';
import ChatImage from '../../assets/images/chatimage.png';
import UserIcon from '../../assets/images/user.jpg';
import LikeIcon from '../../assets/icons/like.svg';
import CommentRedIcon from '../../assets/icons/feedbackComment.svg';
import ShareFeedbackIcon from '../../assets/icons/ShareFeedback.svg';
import ReplyFeedbackIcon from '../../assets/icons/ReplyFeedback.svg';
import MaleIcon from '../../assets/images/male-profile1x.png';
import FemaleIcon from '../../assets/images/female-profile1x.png';
import Programs from '../Dashboard/Programs';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import {
  getPostDetails,
  getRecentPosts,
  postComment,
  postCommentLike,
  updateFeedTrack,
} from '../../services/feeds';
// import ProgramFeeds from '../../shared/ProgramFeeds';
import { Button } from '../../shared';
import { feedStatus } from '../../utils/constant';
import { ProgramFeeds } from '../Dashboard/programFeeds';
import LikedHeartIcon from "../../assets/icons/likedHear-Icon.svg";

export default function FeedDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { feedDetails, recentPosts, loading, status } = useSelector(
    (state) => state.feeds
  );

  const [comment, setComment] = useState('');
  const [replyInfo, setReplyInfo] = useState({ id: '', msg: '' });

  const handlePostChange = (e) => {
    setComment(e.target.value);
  };

  const handleCancelComment = () => {
    setComment('');
  };

  const handleCreateComment = () => {
    dispatch(
      postComment({
        post_id: params.id,
        content: comment,
      })
    );
  };

  const handleCommentLike = (type, id) => {
    const payload = type === "post" ? { post_id: id } : { comment_id: id };
    dispatch(postCommentLike(payload));
  };

  const handleReply = (commendId) => {
    setReplyInfo({ id: commendId, msg: '' });
  };

  const handleReplyComment = () => {
    dispatch(
      postComment({
        parent_comment_id: replyInfo.id,
        content: replyInfo.msg,
      })
    );
  };

  const handleCancelReplyComment = () => {
    setReplyInfo({ id: '', msg: '' });
  };

  let imageUrl = feedDetails?.image_url || '';

  if (imageUrl === '' && Object.keys(feedDetails).length) {
    imageUrl = feedDetails.gender === 'male' ? MaleIcon : FemaleIcon;
  }

  useEffect(() => {
    if (params.id !== '') {
      dispatch(getPostDetails(params.id));
      dispatch(getRecentPosts());
      dispatch(updateFeedTrack({ id: params.id }));
    }
  }, [params]);

  useEffect(() => {
    if (status === feedStatus.createcomment || status === feedStatus.postlike) {
      setComment('');
      setReplyInfo({ id: '', msg: '' });
      dispatch(getPostDetails(params.id));
    }
  }, [status]);
  const feedImg = feedDetails?.media_files?.[0]?.media_files ?? FeedImage;
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {Object.keys(feedDetails).length > 0 && (
        <div className='feed-container px-9 py-9'>
          <div
            className='px-3 pt-5 pb-56 mb-8'
            style={{
              boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)',
              borderRadius: '10px',
              border: '1px solid rgba(219, 224, 229, 1)',
            }}
          >
            <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
              <div className='flex items-center justify-between'>
                <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 700 }}>
                  {feedDetails.title}
                </p>
              </div>
              <div className='flex gap-20 items-center'>
                <Tooltip title='Cancel'>
                  <img
                    className='cursor-pointer'
                    onClick={() => navigate('/feeds')}
                    src={CancelIcon}
                    alt='CancelIcon'
                  />
                </Tooltip>
              </div>
            </div>

            <div className='feed-details'>
              <div className='grid grid-cols-6 gap-7'>
                <div className='col-span-4'>
                  <div className='feed-info'>
                    <img
                      className='feed-detail-image'
                      src={feedImg}
                      alt='FeedImage'
                    />
                    <div className='feed-action-info'>
                      <div className='list-item cursor-pointer' 
                       onClick={() =>
                          handleCommentLike("post", feedDetails.id)
                        }>
                        <img src={
                            feedDetails.like_post_counts > 0
                              ? LikedHeartIcon
                              : LikeBlackIcon
                          } alt='LikeBlackIcon' />
                        <p>
                          Like
                          {feedDetails.like_post_counts > 0
                            ? `(${feedDetails.like_post_counts})`
                            : null}
                        </p>
                      </div>
                      <div className='list-item'>
                        <img src={CommentIcon} alt='CommentIcon' />
                        <p>
                          Comment{' '}
                          {feedDetails.comment_count > 0
                            ? `(${feedDetails.comment_count})`
                            : null}
                        </p>
                      </div>
                      {/* <div className='list-item'>
                        <img src={ShareIcon} alt='ShareIcon' />
                        <p>Share (20)</p>
                      </div> */}
                    </div>

                    <div className='post-details'>
                      <h4
                        className='pb-5'
                        style={{ color: 'rgba(0, 0, 0, 1)' }}
                      >
                        {feedDetails.content}
                      </h4>
                    </div>

                    <div className='post-comments'>
                      <h3>
                        Post Comments{' '}
                        {feedDetails.comments.length > 0
                          ? `(${feedDetails.comments.length})`
                          : null}
                      </h3>
                      <div className='add-comments relative'>
                        <img src={imageUrl} alt='UserIcon' />
                        <input
                          className='comment-input'
                          type='text'
                          value={comment}
                          placeholder='Add Comment...'
                          onChange={handlePostChange}
                        />
                      </div>
                      {comment !== '' && (
                        <div className='flex gap-2 justify-end'>
                          <Button
                            btnType='button'
                            btnCls='w-[150px]'
                            btnName={'Cancel'}
                            onClick={handleCancelComment}
                          />
                          <Button
                            btnType='button'
                            btnCls='w-[150px]'
                            btnName={'Comment'}
                            btnCategory='primary'
                            onClick={handleCreateComment}
                          />
                        </div>
                      )}
                      {feedDetails.comments.length > 0 && (
                        <div>
                          {feedDetails.comments.map((postComment, index) => (
                            <div className='post-list-comments' key={index}>
                              <img
                                className='user-img'
                                src={ChatImage}
                                alt='Userimage'
                              />
                              <div style={{ width: 'calc(100% - 50px)' }}>
                                <div className='flex gap-3 items-center py-1'>
                                  <p className='text-[14px] capitalize'>
                                    <span style={{ fontWeight: 700 }}>
                                      {postComment.user_name}
                                    </span>{' '}
                                    ({postComment.role})
                                  </p>
                                  <p className='text-[10px]'>
                                    {postComment.time_since_action}
                                  </p>
                                </div>
                                <div
                                  className='py-5 my-2 text-[13px]'
                                  style={{
                                    background: 'rgba(217, 217, 217, 0.15)',
                                    padding: '10px',
                                  }}
                                >
                                  {postComment.content}
                                </div>

                                <div className='flex gap-1 py-1'>
                                  <div
                                    className='count-content cursor-pointer'
                                    onClick={() =>
                                      handleCommentLike('comment',postComment.id)
                                    }
                                  >
                                    <img src={LikeIcon} alt='likeicon' />
                                    <p>
                                      Like{' '}
                                      {postComment.like_count > 0
                                        ? `(${postComment.like_count})`
                                        : null}
                                    </p>
                                  </div>

                                  <div
                                    className='count-content cursor-pointer'
                                    style={{
                                      color: 'rgba(0, 174, 189, 1)',
                                    }}
                                  >
                                    <img
                                      src={ShareFeedbackIcon}
                                      alt='ShareFeedbackIcon'
                                    />
                                    <p>Share</p>
                                  </div>
                                  <div
                                    className='count-content cursor-pointer'
                                    style={{
                                      color: 'rgba(51, 161, 90, 1)',
                                    }}
                                    onClick={() => handleReply(postComment.id)}
                                  >
                                    <img
                                      src={ReplyFeedbackIcon}
                                      alt='ReplyFeedbackIcon'
                                    />
                                    <p>
                                      Reply
                                      {postComment.replies.length > 0
                                        ? `(${postComment.replies.length})`
                                        : null}
                                    </p>
                                  </div>
                                </div>

                                {replyInfo.id === postComment.id && (
                                  <>
                                    <div className='add-comments relative'>
                                      <img src={imageUrl} alt='UserIcon' />
                                      <input
                                        className='comment-input'
                                        type='text'
                                        value={replyInfo.msg}
                                        placeholder='Add Reply...'
                                        onChange={(e) =>
                                          setReplyInfo({
                                            ...replyInfo,
                                            msg: e.target.value,
                                          })
                                        }
                                      />
                                    </div>

                                    <div className='flex gap-2 justify-end'>
                                      <Button
                                        btnType='button'
                                        btnCls='w-[150px]'
                                        btnName={'Cancel'}
                                        onClick={handleCancelReplyComment}
                                      />
                                      <Button
                                        btnType='button'
                                        btnCls='w-[150px]'
                                        btnName={'Reply'}
                                        btnCategory='primary'
                                        onClick={handleReplyComment}
                                      />
                                    </div>
                                  </>
                                )}

                                {postComment.replies.length > 0 &&
                                  postComment.replies.map(
                                    (replyData, rIndex) => {
                                      return (
                                        <>
                                          <div
                                            className='post-list-comments ml-7 mt-4'
                                            key={rIndex}
                                          >
                                            <img
                                              className='user-img'
                                              src={ChatImage}
                                              alt='Userimage'
                                            />
                                            <div
                                              style={{
                                                width: 'calc(100% - 50px)',
                                              }}
                                            >
                                              <div className='flex gap-3 items-center py-1'>
                                                <p className='text-[14px] capitalize'>
                                                  <span
                                                    style={{ fontWeight: 700 }}
                                                  >
                                                    {replyData.user_name}
                                                  </span>{' '}
                                                  ({replyData.role})
                                                </p>
                                                <p className='text-[10px]'>
                                                  {replyData.time_since_action}
                                                </p>
                                              </div>
                                              <div
                                                className='py-5 my-2 text-[13px]'
                                                style={{
                                                  background:
                                                    'rgba(217, 217, 217, 0.15)',
                                                  padding: '10px',
                                                }}
                                              >
                                                {replyData.content}
                                              </div>
                                            </div>
                                          </div>
                                          <div className='flex pl-20'>
                                            <div
                                              className='count-content cursor-pointer'
                                              onClick={() =>
                                                handleCommentLike('comment',replyData.id)
                                              }
                                            >
                                              <img
                                                src={LikeIcon}
                                                alt='likeicon'
                                              />
                                              <p>
                                                Like{' '}
                                                {replyData.like_count > 0
                                                  ? `(${replyData.like_count})`
                                                  : null}
                                              </p>
                                            </div>

                                            <div
                                              className='count-content cursor-pointer'
                                              style={{
                                                color: 'rgba(0, 174, 189, 1)',
                                              }}
                                            >
                                              <img
                                                src={ShareFeedbackIcon}
                                                alt='ShareFeedbackIcon'
                                              />
                                              <p>Share</p>
                                            </div>
                                            <div
                                              className='count-content cursor-pointer'
                                              style={{
                                                color: 'rgba(51, 161, 90, 1)',
                                              }}
                                              onClick={() =>
                                                handleReply(replyData.id)
                                              }
                                            >
                                              <img
                                                src={ReplyFeedbackIcon}
                                                alt='ReplyFeedbackIcon'
                                              />
                                              <p>
                                                Reply
                                                {replyData.replies.length > 0
                                                  ? `(${replyData.replies.length})`
                                                  : null}
                                              </p>
                                            </div>
                                          </div>

                                          {replyInfo.id === replyData.id && (
                                            <>
                                              <div className='add-comments relative'>
                                                <img
                                                  src={imageUrl}
                                                  alt='UserIcon'
                                                />
                                                <input
                                                  className='comment-input'
                                                  type='text'
                                                  value={replyInfo.msg}
                                                  placeholder='Add Reply...'
                                                  onChange={(e) =>
                                                    setReplyInfo({
                                                      ...replyInfo,
                                                      msg: e.target.value,
                                                    })
                                                  }
                                                />
                                              </div>

                                              <div className='flex gap-2 justify-end'>
                                                <Button
                                                  btnType='button'
                                                  btnCls='w-[150px]'
                                                  btnName={'Cancel'}
                                                  onClick={
                                                    handleCancelReplyComment
                                                  }
                                                  btnCategory = 'secondary'
                                                />
                                                <Button
                                                  btnType='button'
                                                  btnCls='w-[150px]'
                                                  btnName={'Reply'}
                                                  btnCategory='primary'
                                                  onClick={handleReplyComment}
                                                />
                                              </div>
                                            </>
                                          )}
                                        </>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='col-span-2'>
                  <ProgramFeeds feedsList={recentPosts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
