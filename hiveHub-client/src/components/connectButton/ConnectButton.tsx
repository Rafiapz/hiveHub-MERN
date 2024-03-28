import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { connectionRequestAction } from "../../store/actions/network/networkActions";
import toast from "react-hot-toast";
import { handleConnectionRequest } from "../../store/slices/posts/postSlice";


function ConnectButton({id}: any) {

    const allPosts: any = useSelector((state: RootState) => state?.posts?.posts?.data)

    const userId = useSelector((state: RootState) => state?.user?.user?.userId)



    const dispatch = useDispatch<AppDispatch>()

    const handleConnect = (targetId: number) => {

        // dispatch(connectionRequestAction(targetId)).then((response) => {
        //     if (response.payload.status === 'ok') {
        //         toast(response?.payload?.message, {
        //             style: { backgroundColor: "#4caf50", color: "white" },
        //         });


        //     } else {
        //         toast(response?.payload?.message, {
        //             style: { backgroundColor: "#ff6347", color: "#eeeeee" },
        //         });
        //     }
        // })
    }
  

    return (

        <>
            {userId != id && (

                <div className="">
                    <div className="flex items-center font-medium">
                        <button onClick={() => handleConnect(5)} className="flex items-center bg-orange-400 text-black py-1 px-2 rounded-md hover:bg-blue-400 hover:text-black transition duration-300">
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

                        </button>
                    </div>
                </div>
            )}


        </>

    )
}

export default ConnectButton