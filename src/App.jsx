import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './Pages/Homepage';
import Dsa from './Pages/Dsa';
import Buisness from './Pages/Buisness';
import Finance from './Pages/Finance';
import Mathematics from './Pages/Mathematics';
import Science from './Pages/Science';
import Engineering from './Pages/Engineering';
import Computer_science from './Pages/Computer_science';
import Recommended from './Pages/Recommended.jsx';
import Exam from './Pages/Exam.jsx';
import Courses from './Pages/Courses.jsx';
import Accounting from './Pages/Accounting'
import Player from './Pages/Player';
import Searchpage from './Pages/Searchpage.jsx';
import Quizpage from './Pages/Quizpage.jsx';
import t from './Pages/t.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dsa" element={<Dsa />} />
        <Route path="/business" element={<Buisness />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/mathematics" element={<Mathematics />} />
        <Route path="/science" element={<Science />} />
        <Route path="/engineering" element={<Engineering />} />
        <Route path="/computer-science" element={<Computer_science />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/exam-prep" element={<Exam/>} />
        <Route path="/searchpage" element={<Searchpage/>} />
        <Route path="/quiz/:videoId" element={<Quizpage />} />
        <Route path="/player/:id" element={<Player/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
