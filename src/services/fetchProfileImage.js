import axios from "axios";


const fetchUserProfileImage = async (setAlertVisible, setImageSrc) => {

    if (localStorage.token) {
      try {
        const response = await axios(`${process.env.REACT_APP_SOCKET}/user/download/image`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
          responseType: 'arraybuffer'
        });
        if (response.status === 200) {
          const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // Change the type if needed
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageUrl);
        } else {
          throw new Error('Error in fetching profile image')
        }
      } catch (error) {
        setAlertVisible({
          show:true,
          message:'Error in fetching details',
          severity:'error'
        })
        console.error('An error occurred fetchUserProfileImage', error);
      }
    }
  }

export default fetchUserProfileImage