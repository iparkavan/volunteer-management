import React, { useState } from 'react'
import SearchIcon from '../../assets/images/search1x.png'
import { discussionColumns, discussionRow } from '../../mock'

export default function ProgramsData() {
  const [actionTab, setActiveTab] = useState('new')
  const allDiscussions = [
    {
      name: 'New',
      count: 7,
      key: 'new'
    },
    {
      name: 'Active',
      count: 10,
      key: 'active'
    },
    {
      name: 'Completed',
      count: 4,
      key: 'completed'
    },
    {
      name: 'Archive',
      count: 1,
      key: 'archive'
    }
  ]

  const discussionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      id: 4,
      renderCell: (params) => {
        return <>

        </>
      }
    },
    ...discussionColumns,

  ]

  return (
    <div className='root-container discussion-container'>
      <div className='title-container'>Discussions</div>
      <div className='discussion-table'>
        <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}>
          <div className='flex justify-between px-5 mb-8 items-center border-b-2 '>
            <ul className='tab-list'>
              {
                allDiscussions.map((discussion, index) =>
                  <li className={`${actionTab === discussion.key ? 'active' : ''} relative`} key={index}
                    onClick={() => setActiveTab(discussion.key)}
                  >
                    {`${discussion.name}(${discussion.count})`}
                    {actionTab === discussion.key && <span></span>}
                  </li>)
              }
            </ul>

            <div className='flex gap-8 items-center pb-5'>
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


              {/* <DataTable rows={discussionRow} columns={discussionColumn} hideCheckbox /> */}

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
