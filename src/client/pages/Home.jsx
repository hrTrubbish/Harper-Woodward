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
          className="flex justify-between mr-5 ml-5"
          id="feat-vid-info"
        >
          <span
            id="feat-title"
            className="font-bold text-3xl"
          >
            Dancing in a Bar
          </span>
          <div id="feat-details" className="flex gap-2">
            <span>{`Views: ${500000}`}</span>
            <span>{`Likes: ${100000}`}</span>
          </div>
        </div>
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      <div className="info flex flex-col p-10 w-screen self-center border-t-2 border-b-2 border-current">
        <span className="text-3xl self-center mb-4">
          info
        </span>
        <div className="flex flex-row-reverse justify-around">
          <img
            src="src/client/styles/img/BrooksGarth4.png"
            className=" brooks w-2/5 border-solid border-2 border-current"
            alt="good ole cowboy"
          />
          <div id="info-text" className="flex flex-col self-center">
            <span>
              THIS IS SOME INFO ABOUT BROOKS GARTH
            </span>
            <span>NEXT EVENT: 3/10/23</span>
          </div>
        </div>
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      {/* Stream section */}
      <div className="w-screen self-center">
        <StreamInfo streams={streams} />
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      <div className="tour flex flex-col w-screen self-center border-t-2 border-b-2 border-current p-10">
        <span className="text-3xl self-center">tours</span>
        <TourDateList tours={tours} />
      </div>

      <img src="src/client/styles/img/Flourish.png" alt="styled text divider" className="divider" />

      <div>
        <Merch />
      </div>
    </div>
  );
}
