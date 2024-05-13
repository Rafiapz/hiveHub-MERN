import React, { FC, useState } from "react";
import { createPoll } from "../../service/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import toast from "react-hot-toast";

const PollInput: FC<any> = ({ addOption }) => {
   const [question, setQuestion] = useState("");
   const [newOption, setNewOption] = useState("");
   const [pollOptions, setPollOptions] = useState<any>([]);
   const [editMode, setEditMode] = useState<boolean>(false);
   const [editOptionId, setEditOptionId] = useState<number | null>(null);
   const [editOptionText, setEditOptionText] = useState<string>("");
   const userId: any = useSelector((state: RootState) => state?.user?.user?.userId);

   const handleQuestionChange = (e: any) => {
      setQuestion(e.target.value);
   };

   const handleQuestionSubmit = (e: any) => {
      e.preventDefault();
      if (question.trim()) {
         setPollOptions([]);
      }
   };

   const handleOptionChange = (e: any) => {
      setNewOption(e.target.value);
   };

   const handleOptionSubmit = (e: any) => {
      e.preventDefault();
      if (newOption.trim()) {
         const newOptionData = {
            id: pollOptions.length + 1,
            option: newOption.trim(),
         };
         setPollOptions([...pollOptions, newOptionData]);
         setNewOption("");
      }
   };

   const handleEditOption = (optionId: number, optionText: string) => {
      setEditMode(true);
      setEditOptionId(optionId);
      setEditOptionText(optionText);
   };

   const handleSaveEditedOption = () => {
      if (editOptionText.trim()) {
         const updatedOptions = pollOptions.map((option: any) =>
            option.id === editOptionId ? { ...option, option: editOptionText.trim() } : option
         );
         setPollOptions(updatedOptions);
         setEditMode(false);
         setEditOptionId(null);
         setEditOptionText("");
      }
   };

   const handleSubmit = async () => {
      try {
         const form = new FormData();
         form.append("userId", userId);
         form.append("question", question);

         const options = pollOptions?.map((ob: any) => {
            return ob?.option;
         });

         form.append("options", JSON.stringify(options));

         const response = await createPoll(form);
         toast.success(response?.data?.message);
      } catch (error) {
         toast.error("Failed to submit");
      }
   };

   const totalVotes = pollOptions.reduce((sum: any, option: any) => sum + option.votes, 0);

   return (
      <div className="max-w-3xl mx-auto shadow-lg p-2 border border-gray-300 rounded-lg">
         <form onSubmit={handleQuestionSubmit} className="mb-4">
            <div className="flex items-center">
               <input
                  type="text"
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="Enter the poll question"
                  className="flex-grow py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Set Question
               </button>
            </div>
         </form>

         <form onSubmit={handleOptionSubmit} className="flex items-center mb-4">
            <input
               type="text"
               value={newOption}
               onChange={handleOptionChange}
               placeholder="Enter a new poll option"
               className="flex-grow py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
               type="submit"
               className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               Add Option
            </button>
         </form>

         {question && (
            <div className="poll-results bg-white rounded-lg  p-6 ">
               <h2 className="text-2xl font-bold mb-4">{question}</h2>
               <div className="space-y-4">
                  {pollOptions.map((option: any) => (
                     <div key={option.id} className="flex items-center">
                        <div
                           className="h-8 bg-blue-500 rounded-l-md"
                           style={{
                              width: `${(option.votes / totalVotes) * 100}%`,
                              maxWidth: "90%",
                           }}
                        ></div>
                        <div className="flex-grow  bg-gray-200 rounded-md">
                           <div className="flex justify-between h-14 items-center">
                              {editMode && editOptionId === option.id ? (
                                 <input
                                    type="text"
                                    value={editOptionText}
                                    onChange={(e) => setEditOptionText(e.target.value)}
                                    className="font-semibold w-full ml-1 p-4 bg-white h-12 rounded-lg focus:outline-none"
                                 />
                              ) : (
                                 <span className="font-semibold p-4 ml-4">{option.option}</span>
                              )}
                              <div className="flex items-center space-x-2">
                                 {/* <span className="text-gray-600">{option.votes} votes</span> */}
                                 {editMode && editOptionId === option.id ? (
                                    <button
                                       onClick={handleSaveEditedOption}
                                       className="bg-green-500 w-32 h-14 text-white py-1 px-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                       Save
                                    </button>
                                 ) : (
                                    <button
                                       onClick={() => handleEditOption(option.id, option.option)}
                                       className="bg-yellow-300 w-32 h-14 text-white py-1 px-2 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                       Edit
                                    </button>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="flex justify-end mt-4">
                  <button
                     onClick={handleSubmit}
                     type="submit"
                     className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                     Submit Poll
                  </button>
               </div>
               <p className="text-gray-600 mt-4">
                  Total votes: <span className="font-semibold">{0}</span>
               </p>
            </div>
         )}
      </div>
   );
};

export default PollInput;
