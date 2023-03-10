import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStreams, getFeatured } from '../redux/global';
import YouTubeEmbed from './components/video_player/YouTubeEmbed.jsx';

export default function AllVideos() {
  const dispatch = useDispatch();
  const { streams, featuredVideo } = useSelector(
    (state) => state.global,
  );

  useEffect(() => {
    Promise.all([
      dispatch(getStreams()),
      dispatch(getFeatured()),
    ]);
  }, []);

  return (
    <div className="p-6 w-screen">
      <div className="max-w-7xl m-auto">
        <div className="grid gap-24 grid-cols-2 grid-rows-auto">
          <div className="hover:scale-105 transition-transform">
            <YouTubeEmbed
              src={featuredVideo[0]?.url}
              title="*FEATURE VIDEO*"
            />
            <div id="text-shadow" className="p-2 text-2xl text-center">
              <h2>*FEATURE VIDEO*</h2>
            </div>
          </div>
          <div className="hover:scale-105 transition-transform">
            <YouTubeEmbed
              src="https://www.youtube.com/embed/mvCgSqPZ4EM"
              title="Friends in Low Places"
            />
            <div id="text-shadow" className="p-2 text-xl text-center">
              <h2>Friends in Low Places</h2>
            </div>
          </div>
          <div className="hover:scale-105 transition-transform">
            <YouTubeEmbed
              src="https://www.youtube.com/embed/0MS3OUyOnyo"
              title="Rodeo"
            />
            <div id="text-shadow" className="p-2 text-xl text-center">
              <h2>Rodeo</h2>
            </div>
          </div>
          <div className="hover:scale-105 transition-transform">
            <YouTubeEmbed
              src="https://www.youtube.com/embed/mT56hZhmP9E"
              title="The Thunder Rolls"
            />
            <div id="text-shadow" className="p-2 text-xl text-center">
              <h2>The Thunder Rolls</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
