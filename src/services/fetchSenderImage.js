import fetchSenderProfileImage from "./fetchSenderProfileImage"

const fetchSenderImage = async (users,isHostRef,setSenderProfileImage) =>{
    const email = isHostRef.current ? users[1].email : users[0].email
    const data = await fetchSenderProfileImage(email,setSenderProfileImage)
}  

export default fetchSenderImage