import React, { useState } from 'react'
import SearchIcon from '../../assets/icons/search.svg';
import ViewIcon from '../../assets/images/view1x.png'
import DataTable from '../../shared/DataGrid';
import { discussionData } from '../../mock';
import { discussionColumns } from '../../utils/tableFields';
import { useNavigate } from 'react-router-dom';

export default function Discussions() {
    const navigate = useNavigate()
    const [actionTab, setActiveTab] = useState('new')
    const programRequestTab = [
        {
            name: 'New',
            key: 'new'
        },
        {
            name: 'Active',
            key: 'active'
        },
        {
            name: 'Completed',
            key: 'completed'
        },
        {
            name: 'Archieve',
            key: 'archieve'
        }
    ]

    const handleClick = (event, data) => {
        // console.log('Chat')
        navigate("/discussions/32")
    };


    const discussionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e, params.row)}>
                        <img src={ViewIcon} alt='MoreIcon' />
                    </div>
                </>
            },
        },
        ...discussionColumns,
        {
            field: 'chat',
            headerName: 'Chat',
            flex: 1,
            id: 8,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e, params.row)}>
                        <button style={{
                            background: '#FE634E', color: '#fff', display: 'flex',
                            justifyContent: 'center', alignItems: 'center', height: '35px', width: '70px', borderRadius: '5px'
                        }}>Chat</button>
                    </div>
                </>
            },
        },
    ]

    return (
        <div className='px-8 mt-10'>
            <div className='mb-5'>
                Discussions
            </div>
            <div className="program-request ">
                <div className="col-span-4">
                    <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>



                        <div className='px-6 py-7 program-info'>

                            <div className='flex justify-between px-5 mb-8 items-center border-b-2 '>
                                <ul className='tab-list'>
                                    {
                                        programRequestTab.map((discussion, index) =>
                                            <li className={`${actionTab === discussion.key ? 'active' : ''} relative`} key={index}
                                                onClick={() => setActiveTab(discussion.key)}
                                            >
                                                <div className={`text-[13px] ${actionTab === discussion.key ? 'text-font-primary-main' : 'text-font-secondary-black'}`}> {`${discussion.name}(5)`}</div>
                                                {actionTab === discussion.key && <span className={`${actionTab === discussion.key ? '!bg-background-primary-main' : 'bg-font-secondary-black'}`}></span>}
                                            </li>)
                                    }
                                </ul>
                                {/* <div>
                                    <div className="relative">
                                        <input type="text" id="search-navbar" className="block w-full p-2 text-sm text-gray-900 border-none"
                                            placeholder="Search here..." style={{
                                                border: '1px solid #FE634E',
                                                height: '41px',
                                                width: '345px'
                                            }} />
                                        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                            <img src={SearchIcon} alt='SearchIcon' />
                                        </div>
                                    </div>

                                </div> */}


                            </div>
                            <DataTable rows={discussionData} columns={discussionColumn} hideCheckbox />
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
