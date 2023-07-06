import React from 'react';
import './App.css';
import Container from './components/container';
import LoginPage from './pages/login';

export default function App() {

  return (
    <div className="App">
      <Container comp={<LoginPage/>}/>
    </div>
  );
}

