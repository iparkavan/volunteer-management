
const ReadableDate = ({ timestamp }) => {
  const formatTimestamp = (ts) => {
    const date = new Date(ts);
    const day = String(date.getDate()).padStart(2, '0');  
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return <span>{formatTimestamp(timestamp)}</span>;
};

export default ReadableDate;
