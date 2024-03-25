import Activity from "../../../components/activity/Activity"
import ConverPhoto from "../../../components/converPhoto/ConverPhoto"
import Menu from "../../../components/menu/Menu"
import RightSideBar from "../../../components/rightSideBar/RightSideBar"


function Profile() {
    return (

        <>
            <Menu />

                <ConverPhoto />
                
                <Activity />           


            <RightSideBar />

        </>

    )
}

export default Profile