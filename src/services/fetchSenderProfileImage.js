import axios from "axios";


const fetchSenderProfileImage = async (email,setSenderProfileImage) => {

    if (localStorage.token) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SOCKET}/user/download/sender/image`,
        {
            email:email
        },
        
        {
            
          headers: {
            'Authorization': localStorage.token
          },
          responseType: 'arraybuffer'


        });
        if (response.status === 200) {
          const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // Change the type if needed
          const imageUrl = URL.createObjectURL(imageBlob);
          setSenderProfileImage(imageUrl)
        return response
        } else {
          throw new Error('Error in fetching profile image')
        }
      } catch (error) {
        // setAlertVisible({
        //   show:true,
        //   message:'Error in fetching details',
        //   severity:'error'
        // })
        console.error('An error occurred fetchUserProfileImage', error);
      }
    }
  }

export default fetchSenderProfileImage