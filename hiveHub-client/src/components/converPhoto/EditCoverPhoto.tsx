import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { handleEditUserPhotosModal } from '../../store/slices/user/userSlice';


function EditCoverPhoto() {

  const userData:any=useSelector((state:RootState)=>state?.user?.user?.data)

  const dispatch=useDispatch<AppDispatch>()


  
  return (
    <div className="flex justify-center w-full h-64 ">
      <div style={{ width: '800px' }} className="user-profile mt-1 bg-white rounded-lg shadow-lg h-full relative">
        <div className="cover-photo mb-4 w-full h-full relative">  <img
          src={userData?.coverPhoto}
          alt="Cover"
          className="rounded-lg w-full h-full object-cover absolute top-0 left-0"
        />
          <div onClick={()=>dispatch(handleEditUserPhotosModal({ status: true,type:'coverPhoto' }))} className="absolute top-0 right-0 p-2 z-10">
            
              <FontAwesomeIcon icon={faPen} className="text-blue-500" />
             
          </div>

          <div className="profile-photo absolute bottom-0 left-12 top-56 rounded-full w-24 h-24 bg-white z-20">
            <img
              src={userData?.profilePhoto}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
            <div onClick={()=>dispatch(handleEditUserPhotosModal({status:true,type:'profilePhoto'}))} className="absolute top-0 right-0 p-2 z-30">
            
              <FontAwesomeIcon icon={faPen} className="text-blue-500" />

            </div>
          </div>
        </div>
        <div className="flex justify-between items-center ml-36 absolute mb-16 ">
          <h1 className="text-xl font-bold">{userData?.fullName}</h1>
        </div>
      </div>
    </div>
  );
}

export default EditCoverPhoto;
