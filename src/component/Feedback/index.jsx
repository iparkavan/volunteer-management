import React, { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';

import FeedbackIcon from '../../assets/icons/feedback.svg'
import CalenderIcon from '../../assets/images/calender_1x.png'
import SearchIcon from '../../assets/icons/SearchColor.svg'
import ChatImage from '../../assets/images/chatimage.png'
import LikeIcon from '../../assets/icons/like.svg'
import LikeWhiteIcon from '../../assets/icons/LikeWhite.svg'
import CommentWhiteIcon from '../../assets/icons/CommentWhite.svg'
import CommentIcon from '../../assets/icons/feedbackComment.svg'
import ShareFeedbackIcon from '../../assets/icons/ShareFeedback.svg'
import ReplyFeedbackIcon from '../../assets/icons/ReplyFeedback.svg'
import MoreIcon from '../../assets/icons/moreIcon.svg'
import UserIcon from '../../assets/images/user.jpg';

import { 
  getPost, 
  getRecentPosts,
  getFeedTrack
} from '../../services/feeds';

import { PostList, RecentDiscussion } from '../../mock'
import ReadableDate from '../../shared/ReadableDateTime';


export default function Feedback() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePost, setActivePost] = useState(0)
  const [activePostInfo, setActivePostInfo] = useState(null)
  const { recentPosts, feeds, feedTrack, loading, status  } = useSelector((state) => state.feeds);
  const [activePostComments, setActivePostComments] = useState({
    commentId: null
  })
  // const [activePostCommentsReplies, setActivePostCommentsReplies] = useState({
  //   commentId: null
  // })
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log("FEEDS", feeds)
    console.log("recentPosts", recentPosts)
    console.log("FeedTrack", feedTrack)

  }, [feeds, recentPosts, feedTrack])

  useEffect(() => {
    dispatch(getPost());
    dispatch(getRecentPosts());

  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activePostInfo) {
        console.log("activePost", activePostInfo);
        dispatch(getFeedTrack(activePostInfo.id));
      }
    }, 300); 
    return () => clearTimeout(timeout);
  }, [activePostInfo, dispatch]);

  const handlePostClick = (list, index) => {
    setActivePost(index)
    setActivePostInfo(list)
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewReplies = (commentId) => {
    setActivePostComments((prevState) => ({
      commentId: prevState.commentId === commentId ? null : commentId,
    }));
  };


  return (
    <div className="feedback px-9 py-9">
      <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '10px' }}>
        <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
          <div className='flex w-full gap-5 items-center justify-between'>
            <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 700 }}>Feedback</p>
            {/* <img className='cursor-pointer' src={FeedbackIcon} alt={'FeedbackIcon'} /> */}
          </div>
        </div>
        <div className='feedback-content'>

          <div className='feedback-action'>
            <div className="relative">
              <input type="text" className="block w-full p-2 text-sm text-gray-900 border-none"
                placeholder="Search feedback" style={{
                  backgroundColor: "#FFF8F2",
                  height: '55px',
                  width: '400px',
                  borderRadius: '6px'
                }} />
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <img src={SearchIcon} alt='SearchIcon' />
              </div>
            </div>

            <div className="relative flex gap-3 py-3 px-3"
              style={{ border: '1px solid rgba(24, 40, 61, 0.25)', background: 'rgba(238, 245, 255, 1)', borderRadius: '3px' }}>
              <img src={CalenderIcon} alt="CalenderIcon" />
              <select className='focus:outline-none' style={{ background: 'rgba(238, 245, 255, 1)' }}>
                <option>Month</option>
                <option>Week</option>
                <option>Day</option>
              </select>
            </div>

          </div>


          <div className='feedback-info'>

            <div className="grid grid-cols-6 gap-7 py-5">
              <div className="col-span-4">
                <div className="post-content" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
                  <div className="grid grid-cols-5">
                    <div className='list-post col-span-2'>
                      <div className="title flex justify-between py-3 px-4 br-bt-blue">
                        <h4 className="text-base">Post</h4>
                        <p className="text-sm leading-8">View All</p>
                      </div>

                      {
                        feeds && feeds.results && feeds.results.length > 0 && feeds.results.map((list, index) =>

                          <div className={`post-info ${activePost === index ? 'active' : ''}`} key={index} onClick={() => handlePostClick(list, index)}>

                            <div className='program-name py-1'>
                              {list.user_name}
                            </div>
                            <p className='text-[12px] py-1'>
                              {list.content}
                            </p>
                            <div className='flex gap-3 py-1'>
                              <div className='flex items-center gap-2'>
                                <img src={activePost === index ? LikeWhiteIcon : LikeIcon} alt="likeicon" />
                                <span className='like-count text-[14px]'>({list.like_post_counts})</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                <img src={activePost === index ? CommentWhiteIcon : CommentIcon} alt="CommentIcon" />
                                <span className='comment-count text-[14px]'>({list.comment_count})</span>
                              </div>
                            </div>

                          </div>)
                      }

                    </div>
                    {
                      activePostInfo &&


                      <div className='post-program-detail list-post col-span-3'>

{/* 
                        <div className="title flex justify-between py-3 px-4 br-bt-blue">
                          <h4 className="text-base">{activePostInfo.user_name}</h4>

                          <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e)}>
                            <img src={MoreIcon} alt='MoreIcon' />
                          </div>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={handleClose} className='!text-[12px]'>

                              More from this Program
                            </MenuItem>
                            <MenuItem onClick={handleClose} className='!text-[12px]'>

                              Remove this feedback
                            </MenuItem>
                          </Menu>
                        </div> */}

                        <div className='post-details'>
                          <img className='user-img' src={activePostInfo.image_url? activePostInfo.image_url : UserIcon} alt="Userimage" />
                          <div style={{ width: 'calc(100% - 50px)' }}>
                            <div className='flex justify-between py-1'>
                              <p className='text-[14px]'><span style={{ fontWeight: 700 }}>Johnson</span> ({activePostInfo.type})</p>
                              <p className='text-[10px]'>{activePostInfo.posted}</p>
                            </div>
                            <div className='py-5 my-2 text-[13px]' style={{ background: 'rgba(217, 217, 217, 0.15)', padding: '10px' }}>
                              {activePostInfo.content}
                            </div>
                            <div className='flex gap-3 py-1'>
                              <div className='count-content'>
                                <img src={LikeIcon} alt="likeicon" />
                                <p>Like({activePostInfo.like_post_counts})</p>
                              </div>
                              <div className='count-content' style={{
                                background: 'rgba(255, 219, 225, 1)', color: 'rgba(243, 81, 109, 1)'
                              }}>
                                <img src={CommentIcon} alt="CommentIcon" />
                                <p>Comment({activePostInfo.comment_count})</p>
                              </div>
                              <div className='count-content' style={{
                                background: 'rgba(182, 249, 255, 1)', color: 'rgba(0, 174, 189, 1)'
                              }}>
                                <img src={ShareFeedbackIcon} alt="ShareFeedbackIcon" />
                                <p>Share({activePostInfo.shareCount ? activePostInfo.shareCount : '0'})</p>
                              </div>
                              {/* <div className='count-content' style={{
                              background: 'rgba(201, 239, 214, 1)', color: 'rgba(51, 161, 90, 1)'
                            }}>
                              <img src={ReplyFeedbackIcon} alt="ReplyFeedbackIcon" />
                              <p>Reply({activePostInfo.replyCount})</p>
                            </div> */}
                            </div>
                            <div className="comments-section">
                              {activePostInfo.comments && activePostInfo.comments.length > 0 && activePostInfo.comments.map((comment) => (
                                <div key={comment.id} className="comment-details">
                                  <img className='user-img' src={comment.image_url ? comment.image_url : UserIcon} alt="Userimage" />
                                  <div style={{ width: 'calc(100% - 50px)' }}>
                                    <div className="flex justify-between py-1">
                                      <p className="text-[14px]">
                                        <span style={{ fontWeight: 700 }}>{comment.user_name}</span>
                                        ({comment.role})
                                      </p>
                                      <p className="text-[10px]">{comment.time_since_action}</p>
                                    </div>
                                    <div
                                      className="py-5 my-2 text-[13px]"
                                      style={{
                                        background: 'rgba(217, 217, 217, 0.15)',
                                        padding: '10px',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => handleViewReplies(comment.id)}
                                    >
                                      {comment.content}
                                    </div>
                                    <div className="flex gap-3 py-1">
                                      <div className="count-content">
                                        <img src={LikeIcon} alt="likeicon" />
                                        <p>Like({comment.like_count})</p>
                                      </div>
                                      <div className="count-content" style={{
                                        background: 'rgba(255, 219, 225, 1)', color: 'rgba(243, 81, 109, 1)'
                                      }}>
                                        <img src={CommentIcon} alt="CommentIcon" />
                                        <p>Replies({comment.reply_count})</p>
                                      </div>
                                    </div>

                                    {activePostComments.commentId === comment.id && comment.replies && comment.replies.length > 0 && (
                                      <div className="replies-section" style={{ marginLeft: '20px', marginTop: '10px' }}>
                                        {comment.replies && comment.replies.length > 0 && comment.replies.map((reply) => (
                                          <div key={reply.id} className="reply-details">
                                            <img className="user-img" src={reply.image_url ? reply.image_url : UserIcon} alt="Reply User Image" />
                                            <div style={{ width: 'calc(100% - 50px)' }}>
                                              <div className="flex justify-between py-1">
                                                <p className="text-[14px]">
                                                  <span style={{ fontWeight: 700 }}>{reply.user_name}</span>
                                                  ({reply.role}, {reply.gender})
                                                </p>
                                                <p className="text-[10px]">{reply.time_since_action}</p>
                                              </div>
                                              <div
                                                className="py-2 text-[13px]"
                                                style={{ background: 'rgba(235, 235, 235, 0.15)', padding: '8px' }}
                                              >
                                                {reply.content}
                                              </div>
                                              <div className="flex gap-3 py-1">
                                                <div className="count-content">
                                                  <img src={LikeIcon} alt="likeicon" />
                                                  <p>Like({reply.like_count})</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                          </div>

                        </div>


                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className='col-span-2'>
                <div className="recent-discussion pb-3" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
                  <div className="title flex justify-between py-3 px-4 border-b-2">
                    <h4 className="text-base">Recent View</h4>
                    <p className="text-sm leading-8">View All</p>
                  </div>

                  <div className='chat-discussions'>
                    {
                      feedTrack && feedTrack.results && feedTrack.results.length > 0 && feedTrack.results.map(ft =>
                        <div className='chat-user-info' key={String(ft.id)}>
                          <div className='user-details gap-3'>
                            <img src={ft.image_url ? ft.image_url : UserIcon} alt="ChatImage" />
                            <div>
                              <p>{ft.username}</p>
                            </div>
                          </div>

                          <div className='text-[12px]'>
                            {ft.viewed_at ? <ReadableDate timestamp={ft.viewed_at} />  : null}
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
