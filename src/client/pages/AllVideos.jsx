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
          <div className="border-solid border-2 border-current">
            <YouTubeEmbed
              src={featuredVideo[0]?.url}
              title="*FEATURE VIDEO*"
            />
            <div className="border-solid border-t-2 border-current p-2 text-center">
              <h2>*FEATURE VIDEO*</h2>
            </div>
          </div>
          <div className="border-solid border-2 border-current">
            <YouTubeEmbed
              src="https://www.youtube.com/embed/mvCgSqPZ4EM"
              title="Friends in Low Places"
            />
            <div className="border-solid border-t-2 border-current p-2 text-center">
              <h2>Friends in Low Places</h2>
            </div>
          </div>
          <div className="border-solid border-2 border-current">
            <YouTubeEmbed
              src="https://www.youtube.com/embed/0MS3OUyOnyo"
              title="Rodeo"
            />
            <div className="border-solid border-t-2 border-current p-2 text-center">
              <h2>Rodeo</h2>
            </div>
          </div>
          <div className="border-solid border-2 border-current">
            <YouTubeEmbed
              src="https://www.youtube.com/embed/mT56hZhmP9E"
              title="The Thunder Rolls"
            />
            <div className="border-solid border-t-2 border-current p-2 text-center">
              <h2>The Thunder Rolls</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
