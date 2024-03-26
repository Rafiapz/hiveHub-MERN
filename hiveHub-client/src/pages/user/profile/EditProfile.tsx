import EditCoverPhoto from "../../../components/converPhoto/EditCoverPhoto"
import Menu from "../../../components/menu/Menu"
import EditUserPhotosModal from "../../../components/modal/EditUserPhotosModal"

import EditUserProfile from "../../../components/profileEdit/EditUserProfile"
import RightSideBar from "../../../components/rightSideBar/RightSideBar"


function EditProfile() {
  return (
   
    <>
     <Menu  />

        <EditCoverPhoto/> 
        <EditUserProfile/>
        <EditUserPhotosModal/>
        
            


    <RightSideBar />

</>
  )
}

export default EditProfile