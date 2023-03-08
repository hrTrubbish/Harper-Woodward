import React, {useEffect} from 'react';
// import {useSelector, useDispatch} from 'react-redux'
// import { fetchTours} from '../redux/global'
import YouTubeEmbed from './components/video_player/YouTubeEmbed.jsx';
import TourDateList from './components/home/TourDateList.jsx';

export default function Home() {
  // const dispatch = useDispatch()
  // const { tours} = useSelector((state) => state.global)


  // useEffect(() => {
  //   dispatch(fetchTours())
  // })

  return (
    <div className="flex flex-col">
      <div className="featured flex flex-col p-10">
        <span className="text-3xl self-center">
          featured video
        </span>
        <YouTubeEmbed
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Dancing in a Bar"
        />
        <div className="flex justify-between mr-5 ml-5">
          <span className="font-bold text-3xl">
            Dancing in a Bar
          </span>
          <div className="flex gap-2">
            <span>{`Views: ${500000}`}</span>
            <span>{`Likes: ${100000}`}</span>
          </div>
        </div>
      </div>
      <div className="info flex flex-col p-10">
        <span className="text-3xl self-center">info</span>
        <div className="flex justify-around h-60">
          <img className="w-3/12 border-dotted border-2 border-current" alt="" />
          <div className="flex flex-col self-center">
            <span>
              THIS IS SOME INFO ABOUT BROOKS GARTH
            </span>
            <span>NEXT EVENT: 3/10/23</span>
          </div>
        </div>
      </div>
      <div className="tour flex flex-col p-10 border-t-2 border-current">
        <span className="text-3xl self-center">tour</span>
        <TourDateList />
      </div>
      <div className="merch flex flex-col p-10 border-t-2 border-current">
        <span className="text-3xl self-center">merch</span>
        <div className="flex justify-around mb-20 p-5">
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid border-2 border-current">
            <img src="src/client/styles/img/BGBook.jpg" alt="" />
          </div>
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid border-2 border-current">
            <img src="src/client/styles/img/BGFacemask.jpg" alt="" />
          </div>
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid border-2 border-current">
            <img src="src/client/styles/img/BGRecord.jpg" alt="" />
          </div>
          <div className="w-40 cursor-pointer hover:scale-125 transition-transform border-solid border-2 border-current">
            <img src="src/client/styles/img/BGSweatshirt.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
