import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './pages/components/common/Header.jsx';
import LivePage from './pages/LivePage.jsx';
import AllVideos from './pages/AllVideos.jsx';
import VideoPlayer from './pages/VideoPlayer.jsx';
import SuperUser from './pages/SuperUser.jsx';

import { AuthContext } from './pages/components/_AuthProvider.jsx';
import { LogIn } from './pages/components/_LogIn.jsx';
import { SignUp } from './pages/components/_SignUp.jsx';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/videos" element={<AllVideos />} />
        <Route path="/video-player" element={<VideoPlayer />} />
        <Route path="/superuser" element={<SuperUser />} />
        <Route path="/superuser" element={<SuperUser />} />
      </Routes>
    </div>
  );
}
