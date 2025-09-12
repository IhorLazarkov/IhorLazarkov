import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/HomePage/HomePage'
import WhatIDoPage from './components/WhatIdoPage/WhatIDoPage'
import ExperiancePage from './components/ExperiencePage/ExperiancePage'
import ProjectsPage from './components/ProjectsPage/ProjectsPage'
import EducationPage from './components/EducationPage/EducationPage'
import AwardsPage from './components/AwardsPage/AwardsPage'
import AiAgentPage from './components/AiAgentPage/AiAgentPage'

const router = createBrowserRouter([
  {
    element: <Navigation />,
    children: [
      { path: "/IhorLazarkov/", element: <HomePage /> },
      { path: "/IhorLazarkov/whatido", element: <WhatIDoPage /> },
      { path: "/IhorLazarkov/experience", element: <ExperiancePage /> },
      { path: "/IhorLazarkov/projects", element: <ProjectsPage /> },
      { path: "/IhorLazarkov/education", element: <EducationPage /> },
      { path: "/IhorLazarkov/recognition", element: <AwardsPage /> },
      { path: "/IhorLazarkov/agent", element: <AiAgentPage /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
