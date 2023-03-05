import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './pages/components/common/Header.jsx';
// import { AuthEmail } from './pages/components/_AuthEmail';
// import { AuthGoogle } from './pages/components/_AuthGoogle';
import LivePage from './pages/LivePage.jsx';
import AllVideos from './pages/AllVideos.jsx';
import VideoPlayer from './pages/VideoPlayer.jsx';

export default function App () {
  return (
    <>
      <Header />
      <div className="App">
        {/* <VideoPlayer */}
        {/* <AuthEmail />
        <AuthGoogle /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/videos" element={<AllVideos />} />
          <Route path="/video-player" element={<VideoPlayer />} />
        </Routes>
      </div>
    </>
  );
};
