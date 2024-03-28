import Activity from "../../../components/activity/Activity";
import Comments from "../../../components/comments/Comments";
import ConverPhoto from "../../../components/converPhoto/ConverPhoto";
import Menu from "../../../components/menu/Menu";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";

function Profile() {
   return (
      <>
         <Menu />
         <ConverPhoto />
         <Activity />
         <Comments />
         <RightSideBar />
      </>
   );
}

export default Profile;
