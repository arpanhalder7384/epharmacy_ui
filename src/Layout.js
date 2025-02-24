import React from 'react'
import Header from './Pages/Header'
import { Outlet } from 'react-router'
import Footer from './Pages/Footer'

export default function Layout() {
    return (
        <div className='min-h-screen min-w-fit' >
            <Header />
            <div className='overflow-hidden'>
                <Outlet />
            </div>
            <Footer/>

        </div>
    )
}
