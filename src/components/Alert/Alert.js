import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import './Alert.css';

const ShowAlert = ({ alertVisible, setAlertVisible, timeout = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertVisible({
        show:false
      });
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (!alertVisible) {
    return null;
  }

  return (
    <div className="alert-container">
      <Alert severity={alertVisible.severity}>{alertVisible.message}</Alert>
    </div>
  );
};

export default ShowAlert;
