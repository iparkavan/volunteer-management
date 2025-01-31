import { useNavigate } from 'react-router-dom';
import AdminCards from './AdminCards';
import TotalTicketIcon from '../../../assets/icons/total-tickets.svg';
import NewTicketIcon from '../../../assets/icons/new-ticket-icon.svg';
import PendingTicketIcon from '../../../assets/icons/pending-ticket-icon.svg';
import CompleteTicketIcon from '../../../assets/icons/complete-ticket-icon.svg';

const AdminCardSection = () => {
  const navigate = useNavigate();

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div onClick={() => navigate('/tickets')}>
        <AdminCards
          title={'Total Tickets'}
          count={289}
          imgUrl={TotalTicketIcon}
          bg={'#e6f8fe'}
        />
      </div>
      <div onClick={() => navigate('/tickets')}>
        <AdminCards
          title={'New Tickets'}
          count={32}
          imgUrl={NewTicketIcon}
          bg={'#E2F8FA'}
        />
      </div>
      <div onClick={() => navigate('/tickets')}>
        <AdminCards
          // isLoading={isLoading}
          title={'Pending Tickets'}
          count={289}
          // count={data?.new?.count}
          imgUrl={PendingTicketIcon}
          bg={'#FFFBE9'}
        />
      </div>
      <div onClick={() => navigate('/tickets')}>
        <AdminCards
          // isLoading={isLoading}
          title={'Complete Tickets'}
          count={289}
          // count={data?.pending?.count}
          imgUrl={CompleteTicketIcon}
          bg={'#EBFFF3'}
        />
      </div>
    </div>
  );
};

export default AdminCardSection;
