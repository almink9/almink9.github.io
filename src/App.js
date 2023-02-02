import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {

  return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile/:username' element={<Profile />} />
				<Route path='/profile/:username/editprofile' element={<EditProfile />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
