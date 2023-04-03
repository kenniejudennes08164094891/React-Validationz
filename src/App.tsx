import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/login-page/login-page';
import FormPage from './components/form-page/form-page';
import TablePage from './components/Table-page/Table-page';
import EditProfile from './components/Edit-profile/Edit-profile';
import UserProfile from './components/user-profile/user-profile';

function App() {
  return (
    <>
    <div className="container">
    <Routes>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/form" element={<FormPage/>}/>
    <Route path="/table" element={<TablePage/>}/>
    <Route path="/editProfile" element={<EditProfile/>}/>
    <Route path="/userProfile" element={<UserProfile/>}/>
    </Routes>
    </div>
    </>
      );
}

export default App;
