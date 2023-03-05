import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/components/_Home';
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
        {/* <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/live" element={<Live />} />
        </Routes> */}
      <LivePage/>
      </div>
    </>
  );
};

export default App;
