import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login";
import React from "react";
import Container from "../components/container";
import DashboardPage from "../pages/dashboard";
import RegisterPage from "../pages/register";
import ConfigPage from "../pages/config";
import SideBarWithBox from "../components/sidebarWithBox";
import FlashcardPage from "../pages/flashcard";
import SummariesPage from "../pages/summaries";
import StudyPage from "../pages/study";
import SummariesInsidePage from "../pages/summaries/pageInside";
import EditSummarie from "../pages/summaries/editSummariePage";
import CardsInsidePage from "../pages/flashcard/pageInside";

export const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: <SideBarWithBox comp={<DashboardPage />} />
  },
  {
    path: "/",
    element: <Container comp={<LoginPage />} />
  },
  {
    path: "/register",
    element: <Container comp={<RegisterPage />} />
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
    path: "/flashcard/cards",
    element: <CardsInsidePage />
  },
  {
    path: "/summaries",
    element: <SummariesPage />,
  },
  {
    path: "/summaries/resume",
    element: <SummariesInsidePage />
  },
  {
    path: "/summaries/resume/edit",
    element: <EditSummarie />
  },
  {
    path: "/study",
    element: <StudyPage />
  },
]);
