import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/login'
import React from 'react';
import Container from '../components/container';
import DashboardPage from '../pages/dashboard';
import RegisterPage from '../pages/register';
import ConfigPage from '../pages/config';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />
    },
    {
        path: "/login",
        element: <Container comp={<LoginPage/>} />
    },
    {
        path: "/register",
        element: <Container comp={<RegisterPage/>} />
    },
    {
        path: "/config",
        element: <ConfigPage />
    }
])