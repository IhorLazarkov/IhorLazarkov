import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/HomePage/HomePage'

const router = createBrowserRouter([
  {
    element: <Navigation />,
    children: [
      { path: "/", element: <HomePage /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
