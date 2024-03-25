function ConverPhoto() {


    return (
       
        <div className="flex justify-center w-full h-64 ">
            <div style={{width:'800px'}} className="user-profile mt-1 bg-white rounded-lg shadow-lg h-full relative">
                <div className="cover-photo mb-4 w-full h-full relative">
                    <img src='http://localhost:7700/posts/image-1711090006523-812441820' alt="Cover" className="rounded-lg w-full h-full object-cover" />
                </div>
                <div className="flex justify-between profile-info ">
                    <h1 className="text-xl ml-36 font-bold">username</h1>
                    <div className="profile-actions ">
                        <button className="edit-profile-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">Edit Profile</button>
                        <button className="share-button bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">Share</button>
                    </div>
                </div>
                <div className="profile-photo absolute top-48 left-8 ml-4 mb-8">
                    <img src='http://localhost:7700/posts/image-1711090006523-812441820' alt="Profile" className="rounded-full w-24 h-24" />
                </div>
            </div>            
        </div>
        
    );
}

export default ConverPhoto;
