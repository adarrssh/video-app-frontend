// import React, { useEffect } from 'react';
// import Alert from '@mui/material/Alert';
// import './Alert.css';

// const ShowAlert = ({alert,setAlert}) => {
// const {message,severity='success',timeout=3000,show} = alert
//   useEffect(() => {
//     const timer = setTimeout(() => {
//         setAlert({
//         ...alert,
//         show:false
//       });
//     }, timeout);

//     return () => clearTimeout(timer);
//   }, [timeout]);

//   if (!show) {
//     return null;
//   }

//   return (
//     <div className="alert-container">
//       <Alert severity={severity}>{message}</Alert>
//     </div>
//   );
// };

// export default ShowAlert;



import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import './Alert.css';

const ShowAlert = ({ alertVisible, setAlertVisible, timeout = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (!alertVisible) {
    return null;
  }

  return (
    <div className="alert-container">
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </div>
  );
};

export default ShowAlert;
