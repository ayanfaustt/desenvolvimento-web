import React from 'react';
import './App.css';
import Container from './components/container';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { Button } from 'react-bootstrap';

export default function App() {

  return (
    <div className="App">
      <Container comp={<RegisterPage/>}/>
    </div>
  );
}

