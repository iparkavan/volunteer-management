import { Skeleton } from '@mui/material';
import WrapperCard from '../../../shared/WrapperCard';

const AdminCards = ({ title, count, imgUrl, bg, isLoading }) => {
  return (
    <WrapperCard className='cursor-pointer transition-all duration-300'>
      {/* {isLoading ? (
        <>
          <div className='p-3 flex items-center justify-between'>
            <div className='space-y-5'>
              <h5 className='text-lg mb-2 w-[100px]'>
                <Skeleton />
              </h5>
              <p className='font-bold text-2xl mb-1 w-[40px]'>
                <Skeleton />
              </p>
            </div>

            <div className='relative'>
              <Skeleton className='w-12 p-6' />
            </div>
          </div>

          <div className='border-t py-2 px-3 flex items-center justify-between'>
            <div className='text-xs w-[130px]'>
              <Skeleton />
            </div>
            <div className='text-xs w-[30px]'>
              <Skeleton />
            </div>
          </div>
        </>
      ) : ( */}
      <>
        <div className='p-8 flex items-center justify-start gap-12 '>
          <div className='relative'>
            <img
              src={imgUrl}
              width={80}
              height={54}
              style={{ backgroundColor: `${bg}` }}
              alt='#Users'
              className={`p-5 rounded-md`}
            />
          </div>
          <div>
            <h5 className='text-xl font-semibold mb-2'>{title}</h5>
            <p className='font-bold text-2xl mb-1'>
              {/* {<CountUp end={count} />} */} {count}
            </p>
          </div>
        </div>

        <div className='border-t py-2 px-3 flex items-center justify-between'>
          <div className='text-xs'>
            <span className='text-primary'>&#8593; 28%</span> vs Last Month
          </div>
          <div className='text-xs'>6 mins</div>
        </div>
      </>
      {/* )} */}
    </WrapperCard>
  );
};

export default AdminCards;
