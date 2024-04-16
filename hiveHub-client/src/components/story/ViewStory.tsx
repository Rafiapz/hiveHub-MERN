import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAllStories } from "../../store/actions/post/postActions";
import { Carousel } from "flowbite-react";

const ViewStory: FC<any> = ({ view }: any) => {
   const stories: any = useSelector((state: RootState) => state?.posts?.stories?.data);

   const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
      dispatch(fetchAllStories());
   }, []);

   return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 ">
         <Carousel slide={true}>
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
         </Carousel>
      </div>
   );
};

export default ViewStory;

// const stories: any = useSelector((state: RootState) => state?.posts?.stories?.data);

// const dispatch = useDispatch<AppDispatch>();
// useEffect(() => {
//    dispatch(fetchAllStories());
// });

// return (
//    <>
//       <div id="controls-carousel" classNameNameNameName="relative w-full" data-carousel="static">
//          <div classNameNameNameName="relative h-56 overflow-hidden rounded-lg md:h-96">
//             {stories?.map((story: any) => (
//                <div classNameNameNameName="hidden duration-700 ease-in-out" data-carousel-item>
//                   <img src={story?.media} classNameNameNameName="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
//                </div>
//             ))}
//          </div>

//          <button
//             type="button"
//             classNameNameNameName="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//             data-carousel-prev
//          >
//             <span classNameNameNameName="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                <svg
//                   classNameNameNameName="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 6 10"
//                >
//                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
//                </svg>
//                <span classNameNameNameName="sr-only">Previous</span>
//             </span>
//          </button>
//          <button
//             type="button"
//             classNameNameNameName="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//             data-carousel-next
//          >
//             <span classNameNameNameName="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                <svg
//                   classNameNameNameName="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 6 10"
//                >
//                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
//                </svg>
//                <span classNameNameNameName="sr-only">Next</span>
//             </span>
//          </button>
//       </div>
//    </>
// );
