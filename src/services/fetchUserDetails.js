import axios from "axios";

const fetchUserDetails = async (alertVisible,setAlertVisible,setUserData,setLoading) => {
    if (localStorage.token) {
      try {
        const response = await axios(`${process.env.REACT_APP_SOCKET}/user/`, {
          headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
        const {user} =  response?.data
        setUserData({
            username: user?.username,
            email: user?.email,
            password: user?.password
        })        
      } catch (error) {
        setAlertVisible({
          show:true,
          message:'Error in fetching details',
          severity:'error'
        })
        console.error('An error occurred fetchUserDetails', error);
      }
    }
  }

  export default fetchUserDetails