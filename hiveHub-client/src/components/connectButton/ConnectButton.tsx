import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { connectionRequestAction } from "../../store/actions/network/networkActions";
import toast from "react-hot-toast";
import { handleConnectionRequest } from "../../store/slices/posts/postSlice";


function ConnectButton({ item, index }: any) {

    const allPosts:any=useSelector((state:RootState)=>state?.posts?.posts?.data)

    

    const dispatch = useDispatch<AppDispatch>()

    const handleConnect = (targetId: number) => {

        dispatch(connectionRequestAction(targetId)).then((response) => {
            if (response.payload.status === 'ok') {
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


    return (

        <div className="absolute top-0 right-12 mt-2 mr-4">
            <div className="flex items-center">
                <button onClick={() => handleConnect(item?.userId?._id)} className="flex items-center bg-blue-300 text-black py-1 px-2 rounded-md hover:bg-blue-400 hover:text-black transition duration-300">
                   
                  {item[index]?.connectionStatus==='Pending'?(
                    <>
                           <svg
                           className="h-4 w-4 mr-1"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                           />
                         </svg>
                         {item[index]?.connectionStatus}
                         </>

                  ):(
                    <>
                     <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    <div>Follow</div>
                    </>
                  )}
                </button>
            </div>
        </div>

    )
}

export default ConnectButton