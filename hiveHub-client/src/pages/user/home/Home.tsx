import Menu from "../../../components/menu/Menu";
import Story from "../../../components/story/Story";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import Posts from "../../../components/post/Posts";
import CreatePostModal from "../../../components/modal/CreatePostModal";
import EditPostModal from "../../../components/modal/EditPostModal";

function Home() {
  return (
    <div className="bg-gray-100">
      <Menu />
      <Story />
      <Posts/>
      <CreatePostModal/>
      <EditPostModal/>
      <RightSideBar/>
    </div>
  );
}

export default Home;
