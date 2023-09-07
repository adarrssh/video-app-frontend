import axios from "axios";

const updateUserDetails = async (setAlertVisible, setUserData,userData,setLoading) => {
    if (localStorage.token) {
        setLoading(true)
      try {
        const response = await axios.post(
            `${process.env.REACT_APP_SOCKET}/user/`, 
            {
              email: userData.email,
              username: userData.username,
              password: userData.password
            },
            {
              headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            });
        const {user} =  response?.data
        setUserData({
            username: user?.username,
            email: user?.email,
            password: user?.password
        })        
        setAlertVisible({
          show:true,
          message:'Success',
          severity:'success'
        })
        setLoading(false)
      } catch (error) {
        setAlertVisible({
          show:true,
          message:'Error in update details',
          severity:'error'
        })
        console.error('An error occurred fetchUserDetails', error);
        setLoading(false)
      }
    }
  }

  export default updateUserDetails