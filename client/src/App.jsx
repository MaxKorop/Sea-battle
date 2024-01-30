import React from 'react';
import GamePage from './GamePage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import StartPage from './StartPage';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  return (
    <div>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Login />}/>
           <Route path='/signup' element={<Signup />}/>
           <Route path='/start' element={<StartPage/>}/>
           <Route path="/game" element={<GamePage />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
