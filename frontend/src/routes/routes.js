import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/login'
import React from 'react';
import Container from '../components/container';
import DashboardPage from '../pages/dashboard';
import RegisterPage from '../pages/register';
import ConfigPage from '../pages/config';
import SideBarWithBox from '../components/sidebarWithBox';
import FlashcardPage from '../pages/flashcard';
import SummariesPage from '../pages/summaries';
import StudyPage from '../pages/study';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <SideBarWithBox comp={<DashboardPage />} />
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
        element: <SideBarWithBox comp={<ConfigPage />} />
    },
    {
        path: "/flashcard",
        element: <FlashcardPage />
    },
    {
        path: "/summaries",
        element: <SummariesPage />
    },
    {
        path: "/study",
        element: <StudyPage />
    },
])