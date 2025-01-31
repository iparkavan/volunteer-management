import React from 'react';
import UserImage from '../../../assets/icons/user-image.svg';
import CustomTicketAccordian from '../../../shared/custom-accordian/CustomTicketAccordian';
import ImageIcon from '../../../assets/icons/image-icon.svg';
import DownloadIcon from '../../../assets/icons/download-icon.svg';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TicketComments = ({ comment }) => {
  return (
    <div>
      <div className='p-8 mt-6 grid grid-cols-4 gap-4'>
        <div className='col-span-1 flex items-center justify-center flex-col'>
          <img
            src={comment?.created_by_detail?.profile_image || UserImage}
            className='ring-8 ring-[#1D5BBF] rounded-full'
            alt=''
          />
          <p className='mt-10 font-semibold'>
            {comment?.created_by?.first_name} {comment?.created_by?.last_name} (
            {comment?.created_by?.role})
          </p>
        </div>
        <div className='grid col-span-3 border rounded-lg my-6'>
          <table className='w-full'>
            <tbody>
              <tr className='border-b'>
                <td className='p-4 text-sm border-r'>Due Date</td>
                <td className='p-4 text-sm text-gray-600'>
                  {comment.due_date
                    ? moment(comment.due_date).format('YYYY-MM-DD')
                    : 'Not Mentioned'}
                </td>
              </tr>
              <tr>
                <td className='p-4 text-sm border-r'>Update Details</td>
                <td className='p-4 text-sm text-gray-600'>
                  {comment?.comment}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='p-9'>
        {comment.attachments.length > 0 && (
          <CustomTicketAccordian title={'Documents'} defaultValue={true}>
            <div className='flex items-center justify-start gap-4'>
              {comment.attachments &&
                comment.attachments.map((file, index) => (
                  <Link
                    to={file.file}
                    target='_blank'
                    className='flex border rounded-md p-2'
                    key={index}
                  >
                    <img src={ImageIcon} alt='' />
                    <p className='truncate p-2'>{file.file}</p>
                    <img src={DownloadIcon} alt='' />
                  </Link>
                ))}
            </div>
          </CustomTicketAccordian>
        )}
      </div>
    </div>
  );
};

export default TicketComments;
