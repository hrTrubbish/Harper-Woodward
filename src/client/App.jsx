import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/components/_Home';
import Header from './pages/components/common/Header.jsx';
// import { AuthEmail } from './pages/components/_AuthEmail';
// import { AuthGoogle } from './pages/components/_AuthGoogle';
import Live from './pages/LivePage';
import AllVideos from './pages/AllVideos';
import VideoPlayer from './pages/VideoPlayer';

const App = () => {
  return (
    <>
      <Header />
      <div className="App">
        {/* <VideoPlayer */}
        {/* <AuthEmail />
        <AuthGoogle /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/videos" element={<AllVideos />} />
          <Route path="/video-player" element={<VideoPlayer />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
