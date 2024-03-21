import React from 'react'

function Story() {

    const stories = [
        { name: "Add Story", image: "/add_story_icon.png" }, // Placeholder for Add Story
        { name: "John", image: "https://source.unsplash.com/150x150/?nature" },
        { name: "Jane", image: "https://source.unsplash.com/150x150/?nature" },
        { name: "Alex", image: "https://source.unsplash.com/150x150/?nature" },
        { name: "Emma", image: "https://source.unsplash.com/150x150/?nature" },
        { name: "Michael", image: "https://source.unsplash.com/150x150/?nature" },
        { name: "Sophia", image: "https://source.unsplash.com/150x150/?nature" },
        { name: "Oliver", image: "https://source.unsplash.com/150x150/?nature" },
        { name: "Ella", image: "https://source.unsplash.com/150x150/?nature" }
      ];
    
      return (
        <div className="flex items-center justify-center p-4 bg-gray-50 ">
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col items-center justify-center m-2">
              <div className="rounded-full border-2 border-blue-500 p-1">
                <img src={story.image} alt={story.name} className="rounded-full h-16 w-16" />
              </div>
              <p className="mt-2 text-sm">{story.name}</p>
            </div>
          ))}
        </div>
      );
}

export default Story