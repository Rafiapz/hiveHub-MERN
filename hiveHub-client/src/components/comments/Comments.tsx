import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    handleCommentDeleteReducer,
  handleCommentModal,
  handleCommentsIsEditing,
} from "../../store/slices/posts/postSlice";
import {
    deleteComment,
  fetchAllCommentsOfPost,
  postComment,
} from "../../store/actions/post/postActions";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { commentSchema } from "../../schemas/CommentSchema";
import { useState } from "react";
import toast from "react-hot-toast";

function Comments() {
  const isOpen = useSelector(
    (state: RootState) => state.posts.comments.modalIsOpen
  );
  const dispatch = useDispatch<AppDispatch>();
  const postId = useSelector((state: RootState) => state.posts.comments.postId);
  const allComments: any = useSelector(
    (state: RootState) => state.posts.comments.data
  );
  const userId = useSelector((state: RootState) => state.user.user.userId);
  const [showOptions, setShowOptions] = useState<{
    status: boolean;
    index: number;
  }>({ status: false, index: 0 });
  const [editInitialValues,setEditInitialValues]=useState<{}>({comment:''})

  const initialValues: { comment: string } = {
    comment: "",
  };



  if (!isOpen) {
    document.body.style.overflow = "auto";
    return;
  } else {
    document.body.style.overflow = "hidden";
  }

  const handleCommentSubmit = (values: { comment: string }) => {
    const { comment } = values;

    const formData = new FormData();
    formData.append("comment", comment);

    dispatch(postComment({ formData, postId })).then((response) => {
      if (response.payload.status === "ok") {
        dispatch(fetchAllCommentsOfPost(postId));
      }
    });
  };

  const handleOptionsClick = (index: number) => {
    setShowOptions((prev) => {
      if (index == prev.index) {
        return {
          index: index,
          status: !prev.status,
        };
      } else {
        return {
          index: index,
          status: true,
        };
      }
    });
  };

  const handleIsEditing = (index: number, comment: string) => {
  
    setEditInitialValues({comment:comment})

    const updated = allComments.map((ob: any, i: number) => {
      return {
        ...ob,
        isEditing: i === index,
      };
    });

    dispatch(handleCommentsIsEditing(updated));
  };

  const handleEditCommentSubmit = (values:{comment:string}) => {

    console.log('editcom',values);
    

  };


  const handleCommentDelete=(id:number,index:number)=>{

    handleOptionsClick(index)

    dispatch(deleteComment(id)).then((response)=>{
        if(response.payload.status==='ok'){
            const updated=allComments.filter((item:any,i:number)=>i!==index)
            dispatch(handleCommentDeleteReducer(updated))
            toast(response.payload.message,{style:{ backgroundColor: "#4caf50", color: "white" }})
        }else{
            toast(response.payload.message,{style:{ backgroundColor: "#ff6347", color: "#eeeeee" }})
        }
    })

  }

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center ">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-50 w-1/2 max-w-md relative">
        <button
          className="absolute top-0 right-0 m-1 text-gray-500 focus:outline-none"
          onClick={() => dispatch(handleCommentModal({ status: false }))}
        >
          <i className="fa-regular fa-circle-xmark fa-2x "></i>
        </button>
        <div className="max-w-sm mx-auto mb-4">
          <Formik
            initialValues={initialValues}
            onSubmit={handleCommentSubmit}
            validationSchema={commentSchema}
          >
            <Form>
              <div className="flex">
                <Field
                  name="comment"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="Add a comment..."
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
              <ErrorMessage
                className="text-red-700"
                name="comment"
                component="span"
              />
            </Form>
          </Formik>
        </div>
        <ul className="list-none p-0 max-h-[300px] overflow-y-auto">
          {allComments?.map((item: any, i: number) => {
            return (
              <>
                {item?.isEditing ? (
                  <div
                    key={item?._id + "editing"}
                    className="max-w-sm mx-auto mb-4"
                  >
                    <Formik
                      initialValues={{comment:''}}
                      onSubmit={handleEditCommentSubmit}
                      validationSchema={commentSchema}
                    >
                      <Form>
                        <div className="flex">
                          <Field
                            name="comment"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            placeholder="Add a comment..."
                          />
                          <button
                            type="submit"
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </div>
                        <ErrorMessage
                          className="text-red-700"
                          name="comment"
                          component="span"
                        />
                      </Form>
                    </Formik>
                  </div>
                ) : (
                  <li
                    key={item?._id}
                    className="relative mb-4 px-4 py-2 border border-gray-300 rounded"
                  >
                    <div className="absolute top-0 right-0 mt-2 mr-1">
                      <div
                        onClick={() => handleOptionsClick(i)}
                        className="relative flex flex-col gap-1 hover:bg-gray-200 w-4 h-10 justify-center items-center"
                      >
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <img
                        src="https://source.unsplash.com/150x150/?nature"
                        alt=""
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-semibold">
                          {item?.userId?.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item?.createAt}
                        </p>
                      </div>
                    </div>
                    <br />
                    <p>{item?.comment}</p>
                    {showOptions.index === i && showOptions.status && (
                      <div className="absolute top-1 right-1 w-28 h-22 bg-blue-300 mt-2 mr-4 border border-gray-300 shadow-lg rounded-md">
                        <ul>
                          {item?.userId?._id === userId ? (
                            <>
                              <li
                                onClick={() =>
                                  handleIsEditing(i, item?.comment)
                                }
                                className="p-1 hover:bg-blue-500"
                              >
                                <button>Edit</button>
                              </li>
                              <li onClick={()=>handleCommentDelete(item?._id,i)} className="p-1 hover:bg-blue-500">
                                <button>Delete</button>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="p-1 hover:bg-blue-500">
                                <button>Report</button>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Comments;
