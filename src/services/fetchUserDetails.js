import axios from "axios";

const fetchUserDetails = async (setUserData,setLoading) => {
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
        alert('error')
        console.error('An error occurred fetchUserDetails', error);
      }
    }
  }

  export default fetchUserDetails