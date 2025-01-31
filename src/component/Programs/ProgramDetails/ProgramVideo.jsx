import React from 'react'
import DoubleArrowIcon from '../../../assets/images/double_arrow 1x.png';

export default function ProgramVideo() {
    return (
        <div className="px-9 my-6 grid">
            <div className='grid mb-10' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '5px' }}>
                <div className='breadcrum'>
                    <nav className="flex px-7 pt-6 pb-5 mx-2 border-b-2" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">

                                <a href="#" className="inline-flex items-center text-sm font-medium" style={{ color: 'rgba(89, 117, 162, 1)' }}>
                                    Program
                                </a>
                                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                        Program Details </a>
                                </div>
                            </li>

                        </ol>
                    </nav>
                </div>
                <div className='content px-32 py-6'>
                    <div className='px-20 py-10' style={{ border: '1px solid rgba(107, 107, 107, 1)', borderRadius: '7px' }}>
                        <div>Setting Goals for this Teaching program</div>
                        <div className='flex gap-4 pt-3'>
                            <div className='text-[12px] py-3 px-6' style={{ background: 'rgba(217, 228, 242, 1)', borderRadius: '5px', color: 'rgba(29, 91, 191, 1)' }}>Introduction Training and Theory</div>
                            <div className='text-[12px] py-3 px-6' style={{ background: 'rgba(219, 252, 255, 1)', borderRadius: '5px', color: 'rgba(0, 174, 189, 1)' }}>1 Days left</div>
                        </div>
                        <div className='pt-5 pb-40 text-[12px]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        <div className='flex justify-center items-center gap-6'>
                            <button className='py-2 px-9 text-[12px] flex items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '28px' }}>Back
                                {/* <span className='pl-8 pt-1'><img style={{ width: '15px', height: '13px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span> */}

                            </button>

                            <button className='py-2 px-9 text-white text-[12px] flex items-center' style={{
                                background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                borderRadius: '28px'
                            }}>Next
                                <span className='pl-3 '><img style={{ width: '13px', height: '11px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
