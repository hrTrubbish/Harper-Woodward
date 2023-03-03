import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/_Home';
import { AuthEmail } from './components/_AuthEmail';
import { AuthGoogle } from './components/_AuthGoogle';
import Live from './components/_Live';

const App = () => {
  return (
    <div className="App">
      <AuthEmail />
      <AuthGoogle />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </div>
  );
};

export default App;
