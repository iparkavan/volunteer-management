import React from 'react'
import SearchIcon from '../../assets/icons/search.svg';
import UserImage from "../../assets/images/user.jpg";
import { programFeeds } from '../../utils/mock'

export default function ProgramFeeds({ title = 'Program Feeds', feedsList= [] } ) {
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
    return (
        <div className='program-feeds' style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px', paddingBottom: '10px' }}>
            <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                <div className="flex gap-4">
                    <div className="card-dash" style={{ background: "#FE634E" }} ></div>
                    <h4>{title}</h4>
                </div>
                <div className="flex gap-4 items-center">
                    <img src={SearchIcon} alt="statistics" />
                    <p className="text-[12px] py-2 px-2" style={{ background: 'rgba(223, 237, 255, 1)', borderRadius: '5px' }}>View All</p>
                </div>

            </div>

            {
                feedsList.map((programFeeds, index) =>
                    <div key={index} style={{ border: '1px solid #FE634E', borderRadius: '5px' }} className="program-feed-root mx-9 my-9">
                        <div className="flex py-3 px-3 gap-4">
                            <img src={UserImage} className={`program-user-image ${getWindowDimensions().width <=1536 ? 'w-1/5' : 'w-1/6'} rounded-xl h-[100px]`} style={{height: getWindowDimensions().width <=1536 ? '90px' : '100px'}} alt="" />
                            <div className="feed-content flex flex-col gap-4">
                                <h3 >{programFeeds.content}</h3>
                                {/* <h4 className="text-[12px]">{programFeeds.desc}</h4> */}
                                <div className="flex gap-3">
                                    <span style={{ background: 'rgba(238, 245, 255, 1)', borderRadius: '30px' }} className="tags py-2 px-6 text-[14px]">Tag</span>
                                    <span style={{ background: 'rgba(238, 245, 255, 1)', borderRadius: '30px' }} className="tags py-2 px-6 text-[14px]">Tag</span>
                                    <span style={{ background: 'rgba(238, 245, 255, 1)', borderRadius: '30px' }} className="tags py-2 px-6 text-[14px]">Tag</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
