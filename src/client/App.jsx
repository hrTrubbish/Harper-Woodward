import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './pages/components/common/Header.jsx';
// import { AuthEmail } from './pages/components/_AuthEmail';
// import { AuthGoogle } from './pages/components/_AuthGoogle';
import LivePage from './pages/LivePage.jsx';

const App = () => {
  return (
    <>
      <Header />
      <div className="App">
        {/* <AuthEmail />
        <AuthGoogle /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/live" element={<LivePage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
