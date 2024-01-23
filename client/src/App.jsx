import React from 'react';
import GamePage from './GamePage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import StartPage from './StartPage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<StartPage/>}/>
           <Route path="/game" element={<GamePage />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
