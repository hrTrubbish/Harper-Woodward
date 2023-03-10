import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTours,
  getStreams,
  getFeatured,
} from '../redux/global';
import YouTubeEmbed from './components/video_player/YouTubeEmbed.jsx';
import {
  TourDateList,
  StreamInfo,
  Merch,
} from './components/home';

export default function Home() {
  const dispatch = useDispatch();
  const { tours, streams } = useSelector(
    (state) => state.global,
  );
  const { featuredVideo } = useSelector(
    (state) => state.global,
  );

  useEffect(() => {
    Promise.all([
      dispatch(getTours('asc')),
      dispatch(getStreams()),
      dispatch(getFeatured()),
    ]);
  }, []);

  return (
    // Featured Video
    <div className="flex flex-col max-w-7xl m-auto">
      <div className="featured flex flex-col p-10">
        <YouTubeEmbed
          src={featuredVideo[0]?.url}
          title="Dancing in a Bar"
        />
        <div
          className="feat flex justify-between mr-5 ml-5"
          id="feat-vid-info"
        >
          <span
            id="feat-title"
            className="font-bold text-3xl"
          >
            Dancing in a Bar
          </span>
          <div id="feat-details" className="flex gap-2">
            <span>Views: 22,106,351</span>
            <span>Likes: 2,594,308</span>
          </div>
        </div>
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      <div className="info flex flex-col p-10 w-screen self-center border-t-2 border-b-2 border-current">
        <span id="info-title" className="text-3xl self-center mb-4">
          info
        </span>
        <div className="info-div flex flex-row-reverse justify-around">
          <img
            src="src/client/styles/img/BrooksGarth4.png"
            className=" brooks w-2/5 border-solid border-2 border-current"
            alt="good ole cowboy"
          />
          <div id="info-text" className="flex flex-col self-center">
            <span>
              Brooks Garth is a legendary country singer with a soulful voice and electrifying stage presence. With over three decades of experience, he's one of the most recognizable figures in the music industry, earning multiple Grammy Awards and countless accolades. His iconic hits like "Friends in Low Places" continue to resonate with fans of all ages.
            </span>
            <span className="info-bottom">NEXT EVENT: 3/15/23</span>
          </div>
        </div>
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      {/* Stream section */}
      <div id="upcoming" className="w-screen self-center">
        <StreamInfo streams={streams} />
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      <div className="tour flex flex-col w-screen self-center border-t-2 border-b-2 border-current p-10">
        <span id="tour-title" className="text-3xl self-center">tours</span>
        <TourDateList tours={tours} />
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      <div>
        <Merch />
      </div>
    </div>
  );
}
