
import Posts from "../post/Posts";

function Activity() {


    return (
        // <div className="activity w-2/4 bg-red-500  p-6 mt-20 flex justify-center ml-36 gap-6">
         <>
         <div className="mt-24">
            <div className=" w-1/2   mx-auto mt-2 relative">
           <h1 className="font-bold text-2xl underline" >Posts</h1>
           </div>
               <Posts />
            
            {/* <div className="followers">
                <h2 className="text-lg font-semibold mb-2">Likes</h2>
                <ul className="list-disc ml-4">
                    <li>User A</li>
                    <li>User B</li>
                    <li>User C</li>
                </ul>
            </div>
            <div className="posts">
                <h2 className="text-lg font-semibold mb-2">Posts</h2>
                <ul className="list-disc ml-4">
                    <li>Post 1</li>
                    <li>Post 2</li>
                    <li>Post 3</li>
                </ul>
            </div>
            <div className="likes">
                <h2 className="text-lg font-semibold mb-2">Likes</h2>
                <ul className="list-disc ml-4">
                    <li>Like A</li>
                    <li>Like B</li>
                    <li>Like C</li>
                </ul>
        //     </div> */}
        // 
        </div>
        </>
    );
}

export default Activity;
