import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router'
import Footer from './Components/Footer'
<<<<<<< HEAD
import Loader from './Components/Loader'
=======
>>>>>>> e1c2be0 (Added Toast Message Part)
import { ToastProvider } from './utils/ToastProvider'

export default function Layout() {
    return (

        <div className='min-h-screen min-w-fit' >
<<<<<<< HEAD
            <Loader />
=======
>>>>>>> e1c2be0 (Added Toast Message Part)
            <ToastProvider>
                <Header />
                <div className='overflow-hidden'>
                    <Outlet />
                </div>
                <Footer />
            </ToastProvider>
<<<<<<< HEAD
=======

>>>>>>> e1c2be0 (Added Toast Message Part)
        </div>
    )
}
