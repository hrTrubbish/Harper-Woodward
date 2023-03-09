import React from 'react';

export default function VideoTabEntry({ video, deleteVideo, setFeatured }) {
  return (
    <li
      className="grid grid-cols-3 sm:grid-cols-5 border-solid border-2 border-current-500 hover:bg-stone-800 overflow-auto"
    >
      <div className="flex flex-wrap flex-col p-3 border-r-2 overflow-auto">
        <p className="font-bold">{`${video?.data.title}`}</p>
        <p className="font-light">{`${video?.data.description}`}</p>
      </div>
      <div className="flex justify-center items-center border-r-2 overflow-auto">
        <p>{`${video?.data.createdAt.toDate().toDateString()}`}</p>
      </div>
      <div className="flex justify-center items-center border-r-2 overflow-auto">
        <p>{`${video?.data.views}`}</p>
      </div>
      <button
        onClick={() => deleteVideo(video?.id)}
        className="bg-garthbrown-500 hover:bg-amber-700"
        type="submit"
      >
        delete video
      </button>
      <button
        className="bg-garthbrown-500 hover:bg-amber-700"
        onClick={() => setFeatured(video)}
        type="button"
      >
        select video as featured
      </button>
    </li>
  );
}
