import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './pages/components/common/Header.jsx';
import LivePage from './pages/LivePage.jsx';
import AllVideos from './pages/AllVideos.jsx';
import VideoPlayer from './pages/VideoPlayer.jsx';
import SuperUser from './pages/SuperUser.jsx';
import Payment from './pages/Payment.jsx';
import { LogIn } from './pages/components/_LogIn.jsx';
import { SignUp } from './pages/components/_SignUp.jsx';
import { AuthContext } from './pages/components/_AuthProvider.jsx';

const admin = import.meta.env.VITE_ADMIN_EMAIL;
const altAdmin = import.meta.env.VITE_ADMIN_EMAIL_ALT;

export default function App() {
  // STATE DATA
  const [messages, setMessages] = useState([]);
  const { currEmail } = useContext(AuthContext);

  return (
    <>
      <Header />
      <div
        id="App"
        className="bg-hero-pattern bg-no-repeat bg-cover bg-center bg-fixed"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={(
              <LogIn
                messages={messages}
                setMessages={setMessages}
              />
)}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/live"
            element={(
              <LivePage
                messages={messages}
                setMessages={setMessages}
              />
            )}
          />
          <Route path="/videos" element={<AllVideos />} />
          <Route
            path="/video-player"
            element={<VideoPlayer />}
          />
          <Route
            path="/admin/*"
            element={
              currEmail === admin
              || currEmail === altAdmin ? (
                <SuperUser
                  messages={messages}
                  setMessages={setMessages}
                />
                ) : (
                  <div className="flex justify-center">
                    No Authorization
                  </div>
                )
            }
          />
          <Route path="/checkout" element={<Payment />} />
        </Routes>
      </div>
    </>
  );
}
