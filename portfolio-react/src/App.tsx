import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/HomePage/HomePage'
import WhatIDoPage from './components/WhatIdoPage/WhatIDoPage'

const router = createBrowserRouter([
  {
    element: <Navigation />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/whatido", element: <WhatIDoPage /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
