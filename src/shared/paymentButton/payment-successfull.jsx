import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessfull = () => {
  const navigate = useNavigate()
  const handleNavigate = () =>{
    const program_id = localStorage.getItem("program_id")
    navigate(`/program-details/${program_id}`)
    localStorage.removeItem("program_id")
  }
  return (
    <div className='flex flex-col items-center justify-center mt-44 bg-gray-50 '>
      <div className='max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg '>
        <div className='flex flex-col items-center'>
          <CircleCheckIcon className='text-green-500 h-16 w-16' />
          <h1 className='text-3xl font-bold   mt-4'>Payment Successful</h1>
          <p className='text-gray-500 mt-2'>
            Thank you for your payment. Your order is being processed.
          </p>
        </div>
        <div className='border-t border-gray-200  pt-6 space-y-4'>
          {/* <div className='flex justify-between'>
            <span className='text-gray-500 dark:text-gray-400'>
              Amount Paid:
            </span>
            <span className='font-medium text-gray-900 dark:text-gray-50'>
              $99.99
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500 dark:text-gray-400'>
              Payment Method:
            </span>
            <span className='font-medium text-gray-900 dark:text-gray-50'>
              Visa ending in 1234
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500 dark:text-gray-400'>
              Date &amp; Time:
            </span>
            <span className='font-medium text-gray-900 dark:text-gray-50'>
              April 18, 2024 at 3:45 PM
            </span>
          </div> */}
        </div>
        <div className='flex justify-center'>
          <p
            onClick={()=> handleNavigate()}
            className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer'
            prefetch={false}
          >
            Go to programs
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfull;

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <path d='m9 12 2 2 4-4' />
    </svg>
  );
}
