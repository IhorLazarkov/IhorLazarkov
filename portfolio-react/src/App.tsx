import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/HomePage/HomePage'
import WhatIDoPage from './components/WhatIdoPage/WhatIDoPage'
import ExperiancePage from './components/ExperiencePage/ExperiancePage'
import ProjectsPage from './components/ProjectsPage/ProjectsPage'
import EducationPage from './components/EducationPage/EducationPage'

const router = createBrowserRouter([
  {
    element: <Navigation />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/whatido", element: <WhatIDoPage /> },
      { path: "/experiance", element: <ExperiancePage />},
      { path: "/projects", element: <ProjectsPage />},
      { path: "/education", element: <EducationPage />},
      { path: "/awards", element: <h1>awards page</h1>},
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
