import AdminCard from "../../../components/card/AdminCard";
import Menu from "../../../components/menu/Menu";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import UsersTable from "../../../components/usersTable/UsersTable";

const Dashboard = () => {
   return (
      <>
         <Menu />
         <div className="flex ml-80 overflow-hidden">
            <AdminCard />
         </div>
         <div className="ml-80 mt-5">
            <UsersTable />
         </div>
         <RightSideBar />
      </>
   );
};

export default Dashboard;
