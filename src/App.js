import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/start" exact Component={Play} />
        <Route path="/start/quizSummary" exact Component={QuizSummary} />
      </Routes>
    </Router>
  );
}

export default App;
