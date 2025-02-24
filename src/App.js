
import './App.css';
import Login from './Pages/Login';
import Singup from './Pages/Singup';
import { BrowserRouter as Router, Link, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Courses from './Pages/Courses';
import Layout from './Layout';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import OrderPage from './Pages/OrderPage';


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
        },
        {
          path: "/cart",
          element: <CartPage />
        },
        {
          path: "/checkout",
          element: <CheckoutPage />
        },
        {
          path: "/orders",
          element: <OrderPage />
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
