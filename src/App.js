
import './App.css';
import Login from './Pages/Login';
import Singup from './Pages/Singup';
import { BrowserRouter as Router, Link, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Layout from './Layout';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import OrderPage from './Pages/OrderPage';
import AllopathyPage from './Pages/AllopathyPage';
import HomeopathyPage from './Pages/HomeopathyPage';
import ProfilePage from './Pages/ProfilePage';
import NotFoundPage from './Pages/NotFoundPage';
import MedicineDetails from './Pages/MedicineDetails';
import OrderSuccess from './Pages/OrderSuccess';
import ChangePassword from './Pages/ChangePassword';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
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
        },
        {
          path: "/allopathy",
          element: <AllopathyPage />
        },
        {
          path: "/homeopathy",
          element: <HomeopathyPage />
        },
        {
          path: "/profile",
          element: <ProfilePage/>
        },
        {
          path: "/medicineDetails/:id",
          element: <MedicineDetails/>
        },
        {
          path: "/orderSuccess",
          element: <OrderSuccess/>
        },
        {
          path: "/changePassword",
          element: <ChangePassword/>
        },
        {
          path: "*",
          element: <NotFoundPage/>
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
