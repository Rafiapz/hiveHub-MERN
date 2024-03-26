import React, { useEffect, useState } from 'react'; // Import useState for form state management
import { useDispatch, useSelector } from 'react-redux';
import { fetchuser } from '../../store/actions/auth/userActions';
import { AppDispatch, RootState } from '../../store/store';

function EditUserProfile() {

  const user:any=useSelector((state:RootState)=>state?.user?.user?.data)

  const dispatch=useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(fetchuser())
  },[])

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  

  return (
    <div className="flex justify-center  w-full h-screen mt-24 bg-white">
      <div className="bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center">
            <label htmlFor="fullname" className="block mb-2">Full Name</label>
            <div className="flex items-center w-full">
              <input type="text" id="fullname" name="fullname" value={user?.fullName} className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-2 w-1/4">Change</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="oldPassword" className="block mb-2">Old Password</label>
            <input type="password" id="oldPassword" name="oldPassword" value={formData.confirmPassword} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="email" className="block mb-2">Email</label>
            <div className="flex items-center w-full">
              <input type="email" id="email" name="email" value={user?.email}  className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              <button  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-2 w-1/4">Change</button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block mb-2">New Password</label>
            <input type="password" id="password" name="password" value={formData.password} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex justify-between items-center">
            {/* <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" /> */}
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className='flex'>
          <button  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 ml-auto">Save</button>
        </div>

      </div>
    </div>
  )
}

export default EditUserProfile;
