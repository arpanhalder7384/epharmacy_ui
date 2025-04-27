import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router'
import Footer from './Components/Footer'
import Loader from './Components/Loader'
import { ToastProvider } from './utils/ToastProvider'

export default function Layout() {
    return (
        <div className='min-h-screen min-w-fit' >
            <Loader />
            <ToastProvider>
                <Header />
                <div className='overflow-hidden'>
                    <Outlet />
                </div>
                <Footer />
            </ToastProvider>
        </div>
    )
}
