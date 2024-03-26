import { useEffect, useState } from 'react'; // Import useState for form state management
import { useDispatch, useSelector } from 'react-redux';
import { editUserPassword, editUserProfile, fetchuser } from '../../store/actions/auth/userActions';
import { AppDispatch, RootState } from '../../store/store';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { emailSchema, fullNameSchema, passwordSchema } from '../../schemas/SignupSchema';
import toast from 'react-hot-toast';

function EditUserProfile() {

  const userData: any = useSelector((state: RootState) => state?.user?.user?.data)
  const [error,setError]=useState('')

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchuser())
  }, [])



  const handleFullNameSubmit = (values: any) => {

    const {fullName}=values
    const formData=new FormData()

    formData.append('fullName',fullName)

    dispatch(editUserProfile(formData)).then((response)=>{
      dispatch(fetchuser())
      if (response?.payload?.status === "ok") {
        toast(response?.payload?.message, {
          style: { backgroundColor: "#4caf50", color: "white" },
        });
      } else {
        toast(response?.payload?.message, {
          style: { backgroundColor: "#ff6347", color: "#eeeeee" },
        });
      }
    })
    
  }

  const handleEmailSubmit=(values:any)=>{

    const {email}=values
    const formData=new FormData()

    formData.append('email',email)

    dispatch(editUserProfile(formData)).then((response)=>{
      dispatch(fetchuser())
      if (response?.payload?.status === "ok") {
        toast(response?.payload?.message, {
          style: { backgroundColor: "#4caf50", color: "white" },
        });
      } else {
        toast(response?.payload?.message, {
          style: { backgroundColor: "#ff6347", color: "#eeeeee" },
        });
      }
    })
  }

  const handlePasswordSubmit=(values:any)=>{
   
    const {password,oldPassword}=values
    const formData=new FormData()

    formData.append('oldPassword',oldPassword)

    formData.append('ogOldPassword',userData.password)

    formData.append('password',password)

    
    

    dispatch(editUserPassword(formData)).then((response)=>{
      dispatch(fetchuser())
      if (response?.payload?.status === "ok") {
        toast(response?.payload?.message, {
          style: { backgroundColor: "#4caf50", color: "white" },
        });
      } else {
        if(response?.payload?.status==='invalid'){
          setError(response?.payload?.error)
        }
        toast(response?.payload?.error, {
          style: { backgroundColor: "#ff6347", color: "#eeeeee" },
        });
      }
    })

  }





  return (
    <div className='flex justify-center mt-3 -500 gap-52'>
      <div className="flex justify-center h-screen mt-20 bg-green-300">
        <div className="bg-white  w-full max-w-md"> {/* Set width constraints */}
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

          <div className="grid grid-cols-1 gap-4"> {/* Change to grid-cols-1 */}
            <Formik initialValues={{fullName:userData?.fullName}} validationSchema={fullNameSchema} onSubmit={handleFullNameSubmit}>

              <Form>

                <div className="flex flex-col"> {/* Use flex-col for vertical stacking */}
                  <label htmlFor="fullName" className="block mb-2">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full bg-gray-200 rounded-lg px-4 py-2"
                  />
                  <ErrorMessage className="text-red-700" component="span" name="fullName" />
                  <div className="flex justify-end"> {/* Align button to the right */}
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"

                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>

            <Formik initialValues={{email:userData?.email}} validationSchema={emailSchema} onSubmit={handleEmailSubmit}>
              <Form>

                <div className="flex flex-col"> {/* Use flex-col for vertical stacking */}
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-200 rounded-lg px-4 py-2"
                  />
                  <ErrorMessage className="text-red-700" component="span" name="email" />
                </div>

                <div className="flex justify-end"> {/* Align button to the right */}
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
                  >
                    Save
                  </button>
                </div>

              </Form>

            </Formik>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-28 h-screen  bg-white">
        <div className="bg-white  w-full max-w-md"> {/* Set width constraints */}

          <Formik initialValues={{password:'',oldPassword:'',confirmPassword:''}} validationSchema={()=>passwordSchema(userData?.fullName)} onSubmit={handlePasswordSubmit}>

            <Form>
              <div className="grid grid-cols-1 gap-4"> {/* Change to grid-cols-1 */}

                <div className="flex flex-col"> {/* Use flex-col for vertical stacking */}
                  <label htmlFor="oldPassword" className="block mb-2">
                    Old Password
                  </label>
                  <Field
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    className='w-full bg-gray-200 rounded-lg px-4 py-2'
                  />
                  <ErrorMessage className="text-red-700" component="span" name="oldPassword" />
                  <span className='text-red-700'>{error}</span>
                </div>
                <div className="flex flex-col"> {/* Use flex-col for vertical stacking */}
                  <label htmlFor="password" className="block mb-2">
                    New Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className='w-full bg-gray-200 rounded-lg px-4 py-2'
                  />
                  <ErrorMessage className="text-red-700" component="span" name="password" />
                </div>
                <div className="flex flex-col"> {/* Use flex-col for vertical stacking */}
                  <label htmlFor="confirmPassword" className="block mb-2">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className='w-full bg-gray-200 rounded-lg px-4 py-2'
                  />
                  <ErrorMessage className="text-red-700" component="span" name="confirmPassword" />
                </div>
                <div className="flex justify-end"> {/* Align button to the right */}
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"                 
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>

          </Formik>
        </div>
      </div>

    </div>


  )
}

export default EditUserProfile;
