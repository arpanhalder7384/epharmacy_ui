import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router'
import Footer from './Components/Footer'
import { ToastProvider } from './utils/ToastProvider'

export default function Layout() {
    return (

        <div className='min-h-screen min-w-fit' >
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
