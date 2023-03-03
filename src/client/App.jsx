import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/components/_Home';
// import { AuthEmail } from './pages/components/_AuthEmail';
// import { AuthGoogle } from './pages/components/_AuthGoogle';
import Live from './pages/components/_Live';

const App = () => {
  return (
    <div className="App">
      Brooks Garth
      {/* <AuthEmail />
      <AuthGoogle /> */}
      {/* <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/live" element={<Live />} />
      </Routes> */}
    </div>
  );
};

export default App;
