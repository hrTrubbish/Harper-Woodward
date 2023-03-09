import React, { useState, useEffect } from 'react';
import {
  getDocs, collection, deleteDoc, doc,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from '../../../../config/firebaseFE';
import AddVideoForm from './AddVideoForm.jsx';
import { updateFeaturedVideo } from '../../../redux/global';
import { get, update } from '../../../api/firestore-services.js';
import VideoTabEntry from './VideoTabEntry.jsx';

// renders list of all videos from DB collection and allows superuser CRUD functionality
export default function VideosTab() {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  async function fetchVideos() {
    try {
      const snapshot = await getDocs(collection(db, 'videos'));
      const data = snapshot.docs.map((d) => ({ data: d.data(), id: d.id }));
      setVideos(data);
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  const deleteVideo = async (id) => {
    const videoRef = doc(db, 'videos', id);
    await deleteDoc(videoRef);
    fetchVideos();
  };

  const setFeatured = async (video) => {
    const featuredVideo = await get('featured');
    await update(featuredVideo.res[0]?.id, video.data, 'featured');
  };

  return (
    <section className="mr-5 max-w-4/5 h-2/3 md:h-5/6 max-h-fit border-solid border-2 border-current overflow-auto rounded-xl">
      <h1 className="headers border-solid border-2 border-red grid grid-cols-3 sm:grid-cols-5">
        <div className="font-bold">videos</div>
        <div className="font-bold">date uploaded</div>
        <div className="font-bold">views</div>
      </h1>
      <ul className="">
        {videos?.map((video) => (
          <VideoTabEntry
            video={video}
            key={video.id}
            deleteVideo={deleteVideo}
            setFeatured={setFeatured}
          />
        ))}
      </ul>
    </section>
  );
}
