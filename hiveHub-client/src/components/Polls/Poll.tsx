import React, { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import RightSideBar from "../rightSideBar/RightSideBar";
import PollInput from "./PollInput";
import { deletePoll, fetchAllPolls, pollVote } from "../../service/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { format } from "timeago.js";

const Poll = () => {
   const [polls, setPolls] = useState<any>();
   const userId: any = useSelector((state: RootState) => state?.user?.user?.userId);

   useEffect(() => {
      fetchPolls();
   }, []);

   const fetchPolls = async () => {
      try {
         const response = await fetchAllPolls();

         setPolls(response?.data?.data);
      } catch (error) {
         toast.error("Failed to load");
      }
   };

   const handleVote = async (pollId: any, option: any, optionId: any) => {
      try {
         // poll?.voters?.forEach((voter: any) => {
         //    if (voter === userId) {

         //       return;
         //    }
         // });

         // if (poll?.voters?.includes(userId)) {
         //    toast.error("You have already voted");
         //    return;
         // }

         const form = new FormData();
         form.append("pollId", pollId);
         form.append("option", option);
         form.append("optionId", optionId);
         form.append("userId", userId);
         const response = await pollVote(form);
         toast.success("Success");
         fetchPolls();
      } catch (error) {
         toast.error("Failed to vote");
      }
   };

   const handleDelete = async (id: any) => {
      try {
         const response = await deletePoll(id);

         if (response.data.status === "ok") {
            toast.error("Deleted successfully");
            fetchPolls();
         } else {
            throw new Error("Failed to delete");
         }
      } catch (error) {
         toast.error("Failed to delete");
      }
   };

   const handleIsEditing = (index: number) => {
      const updated = polls.map((ob: any, i: number) => {
         return {
            ...ob,
            isEditing: i === index,
         };
      });

      setPolls(updated);
   };

   // const totalVotes = polls.reduce((sum: number, option: any) => sum + option?.votes, 0);

   return (
      <>
         <Menu />
         <div className="ml-80 overflow-hidden">
            {polls?.map((ob: any, i: number) => (
               <div key={ob?._id} className="poll-results h-full w-full md:w-1/2 lg:w-3/5 mt-5 ml-10">
                  <div className="flex items-center mb-4">
                     <img src={ob?.userId?.profilePhoto} className="w-8 h-8 rounded-full mr-2 object-cover" />
                     <div className="flex flex-col">
                        <span className="text-gray-700 font-semibold">{ob?.userId?.fullName}</span>
                        <p className="text-sm text-gray-500">{format(ob?.createdAt || Date.now())}</p>
                     </div>
                     {ob.userId?._id === userId ? (
                        <div className="ml-auto">
                           {ob?.isEditing ? (
                              <button className="text-sm text-gray-500 hover:text-gray-700 mr-2" onClick={() => fetchPolls()}>
                                 Cancel
                              </button>
                           ) : (
                              <button className="text-sm text-gray-500 hover:text-gray-700 mr-2" onClick={() => handleIsEditing(i)}>
                                 Edit
                              </button>
                           )}

                           <button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => handleDelete(ob?._id)}>
                              Delete
                           </button>
                        </div>
                     ) : (
                        <button className="ml-auto text-sm text-gray-500 hover:text-gray-700" onClick={() => {}}>
                           Report
                        </button>
                     )}
                  </div>
                  {ob?.isEditing ? <></> : <h2 className="text-2xl font-bold mb-4">{ob?.question}</h2>}
                  {ob?.isEditing ? (
                     <></>
                  ) : (
                     <ul className="flex flex-col gap-3">
                        {ob?.options.map((option: any) => (
                           <>
                              <div
                                 key={option.id}
                                 className="flex items-center mb-2 rounded-md overflow-hidden"
                                 onClick={() => handleVote(ob?._id, option?.option, option?.id)}
                              >
                                 <div className="w-full relative">
                                    <div className="absolute inset-0 flex items-center">
                                       <span className="font-semibold text-gray-950 ml-4">{option.option}</span>
                                       <span className="text-gray-950 font-semibold ml-4">
                                          {ob?.options && ob.options.reduce((sum: number, opt: any) => sum + opt.votes, 0) !== 0 // Check if sum is not zero
                                             ? `${Math.floor(
                                                  (option.votes / ob.options.reduce((sum: number, opt: any) => sum + opt.votes, 0)) * 100
                                               )}%`
                                             : "0%"}
                                       </span>
                                    </div>
                                    <div className="h-8 bg-gray-200">
                                       <div
                                          className="h-full bg-gray-400"
                                          style={{
                                             width: `${
                                                (option.votes / ob?.options?.reduce((sum: number, option: any) => sum + option?.votes, 0)) * 100
                                             }%`,
                                          }}
                                       ></div>
                                    </div>
                                 </div>
                              </div>
                           </>
                        ))}
                     </ul>
                  )}

                  <p className="text-gray-600 mt-4">
                     Total votes: <span className="font-semibold">{ob?.voters?.length}</span>
                  </p>
               </div>
            ))}
         </div>
         <PollInput />
         <RightSideBar />
      </>
   );
};

export default Poll;
