import Header from "../../../components/header/Header";
import Menu from "../../../components/menu/Menu";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";
import UsersTable from "../../../components/usersTable/UsersTable";

const Dashboard = () => {
   return (
      <>
         <Menu />
         <Header />

         {/* <AdminCard /> */}

         <UsersTable />

         <RightSideBar />
      </>
   );
};

export default Dashboard;
