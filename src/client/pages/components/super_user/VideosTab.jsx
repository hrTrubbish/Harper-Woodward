import React, { useState, useEffect } from 'react';

import {
  getDocs, collection, serverTimestamp, deleteDoc, doc,
  getFirestore,
} from 'firebase/firestore';
import { db } from '../../../../config/firebaseFE.js';

// renders list of all videos from DB collection and allows superuser CRUD functionality
export default function VideosTab() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const snapshot = await getDocs(collection(db, 'videos'));
        const data = snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
        setVideos(data);
      } catch (err) {
        return err;
      }
    }
    fetchVideos();
  }, [videos]);

  const deleteVideo = async (id) => {
    const videoRef = doc(db, 'videos', id);
    await deleteDoc(videoRef);
  };

  return (
    <section className="h-max border-solid border-2 border-current">
      <h1 className="border-solid border-2 border-red">VIDEOS TAB</h1>
      <ul>
        {videos?.map((video) => (
          <li className="flex gap-5 border-solid border-2 border-blue-500">
            <p>{`title: ${video.data.title}`}</p>
            <p>{`description: ${video.data.description}`}</p>
            <p>{`date uploaded: ${video.data.createdAt.toDate().toDateString()}`}</p>
            <p>{`views: ${video.data.views}`}</p>
            <button
              onClick={() => deleteVideo(video.id)}
              type="submit"
            >
              delete video
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
