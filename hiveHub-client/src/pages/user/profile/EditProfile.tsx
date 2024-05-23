import { FC } from "react";
import EditCoverPhoto from "../../../components/converPhoto/EditCoverPhoto";
import Menu from "../../../components/menu/Menu";
import EditUserPhotosModal from "../../../components/modal/EditUserPhotosModal";

import EditUserProfile from "../../../components/profileEdit/EditUserProfile";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import Header from "../../../components/header/Header";

const EditProfile: FC = () => {
   return (
      <>
         <Menu />
         <Header />
         <EditCoverPhoto />
         <EditUserProfile />
         <EditUserPhotosModal />
         <RightSideBar />
      </>
   );
};

export default EditProfile;
