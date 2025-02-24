
import './App.css';
import Login from './Pages/Login';
import Singup from './Pages/Singup';
import { BrowserRouter as Router, Link, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Courses from './Pages/Courses';
import Layout from './Layout';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/singup",
          element: <Singup />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/courses",
          element: <Courses />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}



export default App;
