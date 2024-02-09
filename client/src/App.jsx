import React from 'react';
import GamePage from './GamePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import Login from './components/Registration/Login';
import Signup from './components/Registration/Signup';
import Rules from './components/Rules/Rules';
import ProfilePage from './components/Profile/ProfilePage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Login />}/>
           <Route path='/signup' element={<Signup />}/>
           <Route path='/start' element={<StartPage/>}/>
           <Route path="/game" element={<GamePage />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/profile' element={<ProfilePage />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
