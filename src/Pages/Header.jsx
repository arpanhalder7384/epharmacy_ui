import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import SearchBox from '../Components/SearchBox';
import MenuSimple from '../Components/ProfileMene';
import Cart from '../Components/Cart';
import SortDropDown from '../Components/SortDropDown';
export default function Header() {
  const navigate = useNavigate();

  return (
    <header class='flex top-0 border-b py-3 px-3 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50 bg-white'>
      <div class='flex items-center gap-5 w-full justify-between'>
        <div className='justify-start items-center flex flex-col'>
          <h1 class="animate-text bg-gradient-to-tr from-blue-700 via-purple-500 to-orange-500 bg-clip-text text-4xl font-black text-transparent whitespace-nowrap">
            E-Pharmacy</h1>
        </div>
        <div className='flex '>
          <div className='mx-4'>

            <SearchBox />
          </div>
          <div className='w-28'>
            <SortDropDown />
          </div>
        </div>

        {/* <div className='flex flex-row justify-between '>
          <button type="submit" className="w-12 h-10 rounded-3xl bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            onClick={() => {
              navigate("./login")
            }}
          >Login</button>
          <button type="submit" className="w-12 h-10 ml-3 rounded-3xl bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            onClick={() => {
              navigate("./singup")
            }}
          >Sing up</button>
        </div> */}

        <button id="toggleOpen" class='lg:hidden ml-auto'>
          <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd">
            </path>
          </svg>
        </button>
        <div className='flex'>
          <div className='mr-8'><MenuSimple /></div>
          <div><Cart /></div>
        </div>


      </div>
    </header>
  )
}
