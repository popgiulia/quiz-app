import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Play from './components/Play';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Play />} /> //aici era Home inainte, modifica la loc
      </Routes>
    </Router>
  );
}

export default App;
