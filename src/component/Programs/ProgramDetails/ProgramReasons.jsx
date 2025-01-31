import React from 'react';
import { dateFormat } from '../../../utils';

const ProgramReasons = ({ 
  programdetails, 
  role, 
  requestId, 
  programActionStatus 
}) => {
  // Helper function to get formatted request type heading
  const getRequestTypeHeading = (requestType) => {
    const headings = {
      'program_reschedule': 'Reschedule Reason',
      'program_cancel': 'Cancel Reason',
    //   'program_join': 'Cancelled Reason',
      'program_new': 'New Program Request'
    };
    return headings[requestType] || requestType?.replace('_', ' ')?.toUpperCase();
  };

  const renderAdminView = () => {
    const validRequestTypes = ['program_reschedule', 'program_cancel', 'program_new'];
    
    if (role !== 'admin' || !requestId) return null;

    const showRequestDetails = 
      validRequestTypes.includes(programdetails?.request_data?.request_type) &&
      ['new', 'pending', 'approved', 'rejected'].includes(
        programdetails?.request_data?.status
      );

    if (!showRequestDetails) return null;

    return (
      <>

        {/* Rejection Reason Box */}
        {showRequestDetails&& 
         programdetails?.request_data?.rejection_reason && (
          <div className="action-set action_cancelled mb-4">
            <div className="reason-title">{programdetails?.request_data?.is_active?"Request Rejected Reason":"Request Cancelled Reason"}</div>
            <div className="reason-content">
              {programdetails?.request_data?.rejection_reason}
            </div>
          </div>
        )}

        {/* Comments Box */}
        {programdetails?.request_data?.comments && (
          <div className={`action-set ${programdetails?.request_data?.request_type === 'program_reschedule'?"action_rescheduled": "action_cancelled"}`}>
            <div className="reason-title">
              {getRequestTypeHeading(programdetails?.request_data?.request_type)}
            </div>
            <div className="reason-content">
            {programdetails?.request_data?.request_type === 'program_reschedule' && (
              <div className="flex gap-2 text-[12px] pb-2">
                <div className="font-bold">
                  Reschedule Start & End Date:
                </div>
                <div className="text-[11px]">
                  {`${dateFormat(
                    programdetails?.request_data?.start_date
                  )} - ${dateFormat(
                    programdetails?.request_data?.end_date
                  )}`}
                </div>
              </div>
            )}
              {programdetails?.request_data?.comments}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderMentorView = () => {
    const validRequestTypes = ['program_reschedule', 'program_cancel', 'program_new'];
    
    if (role !== 'mentor' || !requestId) return null;

    const showRequestDetails = 
      validRequestTypes.includes(programdetails?.request_data?.request_type) &&
      ['new', 'pending', 'approved', 'rejected'].includes(
        programdetails?.request_data?.status
      );

    if (!showRequestDetails) return null;

    return (
      <>

        {/* Rejection Reason Box */}
        {showRequestDetails&& 
         programdetails?.request_data?.rejection_reason && (
          <div className="action-set action_cancelled mb-4">
            <div className="reason-title">{programdetails?.request_data?.is_active?"Request Rejected Reason":"Request Cancelled Reason"}</div>
            <div className="reason-content">
              {programdetails?.request_data?.rejection_reason}
            </div>
          </div>
        )}

        {/* Comments Box */}
        {programdetails?.request_data?.comments && (
          <div className={`action-set ${programdetails?.request_data?.request_type === 'program_reschedule'?"action_rescheduled": "action_cancelled"}`}>
            <div className="reason-title">
              {getRequestTypeHeading(programdetails?.request_data?.request_type)}
            </div>
            <div className="reason-content">
            {programdetails?.request_data?.request_type === 'program_reschedule' && (
              <div className="flex gap-2 text-[12px] pb-2">
                <div className="font-bold">
                  Reschedule Start & End Date:
                </div>
                <div className="text-[11px]">
                  {`${dateFormat(
                    programdetails?.request_data?.start_date
                  )} - ${dateFormat(
                    programdetails?.request_data?.end_date
                  )}`}
                </div>
              </div>
            )}
              {programdetails?.request_data?.comments}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderMenteeView = () => {
    const validRequestTypes = ['program_reschedule', 'program_cancel','program_join', 'program_new'];
    
    if (role !== 'mentee' || !requestId) return null;

    const showRequestDetails = 
      validRequestTypes.includes(programdetails?.request_data?.request_type) &&
      ['new', 'pending', 'approved', 'rejected'].includes(
        programdetails?.request_data?.status
      );

    if (!showRequestDetails) return null;

    return (
      <>

        {/* Rejection Reason Box */}
        {showRequestDetails&& 
         programdetails?.request_data?.rejection_reason && (
          <div className="action-set action_cancelled mb-4">
            <div className="reason-title">{programdetails?.request_data?.is_active?"Request Rejected Reason":"Request Cancelled Reason"}</div>
            <div className="reason-content">
              {programdetails?.request_data?.rejection_reason}
            </div>
          </div>
        )}

        {/* Comments Box */}
        {programdetails?.request_data?.comments && (
          <div className={`action-set ${programdetails?.request_data?.request_type === 'program_reschedule'?"action_rescheduled": "action_cancelled"}`}>
            <div className="reason-title">
              {getRequestTypeHeading(programdetails?.request_data?.request_type)}
            </div>
            <div className="reason-content">
            {programdetails?.request_data?.request_type === 'program_reschedule' && (
              <div className="flex gap-2 text-[12px] pb-2">
                <div className="font-bold">
                  Reschedule Start & End Date:
                </div>
                <div className="text-[11px]">
                  {`${dateFormat(
                    programdetails?.request_data?.start_date
                  )} - ${dateFormat(
                    programdetails?.request_data?.end_date
                  )}`}
                </div>
              </div>
            )}
              {programdetails?.request_data?.comments}
            </div>
          </div>
        )}
      </>
    );
  };

  // Render reschedule history (visible to admin only)
  const renderRescheduleHistory = () => {
    if (
      role !== 'admin' ||
      !requestId ||
      !programdetails?.reschedule_reason ||
      !Object.keys(programdetails?.reschedule_reason)?.length ||
      programdetails.reschedule_reason.id !== parseInt(requestId)
    ) return null;

    return (
      <div 
        className="action-set action_cancelled mt-4"
        style={{
          border: '1px solid rgba(255, 118, 0, 1)',
          background: 'rgba(255, 242, 231, 1)',
        }}
      >
        <div 
          className="reason-title"
          style={{ color: 'rgba(255, 118, 0, 1)' }}
        >
          Reschedule History
        </div>
        <div className="reason-content">
          {programdetails?.reschedule_reason?.reason}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderAdminView()}
      {renderMentorView()}
      {renderMenteeView()}
      {renderRescheduleHistory()}
    </div>
  );
};

export default ProgramReasons;