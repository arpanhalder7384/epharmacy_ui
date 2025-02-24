import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [emailIdErr, setEmailIdErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (!validEmailId(emailId)) {
      setEmailIdErr("Email id should be in valid format (example: example@gmail.com")
    } else {
      setEmailIdErr("")
    }
  }, [emailId])

  useEffect(() => {
    if (password.length < 8) {
      setPasswordErr("password should contain minimum 8 charater")
    } else {
      setPasswordErr("")
    }
  }, [password])

  useEffect(() => {
    if (emailIdErr === "" && passwordErr === "") {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [emailIdErr, passwordErr])

  function validEmailId(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  return (
    <div className="h-screen w-full flex flex-row justify-evenly max-h-screen">

      <div className="flex flex-col h-full justify-center items-center ">
        <div className='w-full h-full flex flex-col py-10 '>

          <div className='justify-center items-center flex flex-col px-8'>
            <h1 class="animate-text mb-[4%] bg-gradient-to-tr from-blue-700 via-purple-500 to-orange-500 bg-clip-text text-5xl font-black text-transparent whitespace-nowrap">
              Welcome to E-Pharmacy</h1>
          </div>

          <div className='flex mt-10  '>
            <form className="w-full">
              <div className="mb-5w-full">
                <label for="email" className="mb-2 block text-sm font-medium text-gray-900">Email *</label>
                <input type="email" onChange={(e) => setEmailId(e.target.value)} value={emailId} placeholder="Your email" id="email" className=" block w-[100%]  rounded-lg border-2 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" required />
                {emailIdErr !== "" && <label className='text-red-800'>{emailIdErr}</label>}
              </div>
              <div className="w-full">
                <label for="password" className="mb-2 block text-sm font-medium text-gray-900">Password *</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" id="password" className="block w-[100%] rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" required />
                {passwordErr !== "" && <label className='text-red-800'>{passwordErr}</label>}

              </div>
              <div className="m-5 flex justify-center">
                <div className="flex h-5 items-center">
                  <input id="remember" type="checkbox" value="" className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300" required />
                </div>
                <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
              </div>
              <div className='flex flex-col justify-center w-full'>
                <button type="submit" disabled={!isValid}
                  className={`w-full h-12 rounded-lg bg-blue-300 px-5 py-2.5 text-center text-sm font-medium text-white ${isValid ? "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto" : "cursor-not-allowed"} `}>
                  Log in</button>
              </div>
              <div class="inline-flex items-center justify-center w-full">
                <hr class="w-[95%] h-0.5 my-8  border-0 rounded dark:bg-gray-700" />
                <div class="absolute px-4  bg-gray-50">
                  Or continue with
                </div>
              </div>

              <div class="flex  w-full justify-around">
                <button type="button" class="text-black w-[40%] border-2 bg-white hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2">
                  <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">

                    </path>
                  </svg>
                  Log in with Google
                </button>
                <button type="button" class="text-black w-[40%] border-2 bg-white hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640" className='h-6 w-6 mr-2 -ml-1'>
                    <path d="M494.782 340.02c-.803-81.025 66.084-119.907 69.072-121.832-37.595-54.993-96.167-62.552-117.037-63.402-49.843-5.032-97.242 29.362-122.565 29.362-25.253 0-64.277-28.607-105.604-27.85-54.32.803-104.4 31.594-132.403 80.245C29.81 334.457 71.81 479.58 126.816 558.976c26.87 38.882 58.914 82.56 100.997 81 40.512-1.594 55.843-26.244 104.848-26.244 48.993 0 62.753 26.245 105.64 25.406 43.606-.803 71.232-39.638 97.925-78.65 30.887-45.12 43.548-88.75 44.316-90.994-.969-.437-85.029-32.634-85.879-129.439l.118-.035zM414.23 102.178C436.553 75.095 451.636 37.5 447.514-.024c-32.162 1.311-71.163 21.437-94.253 48.485-20.729 24.012-38.836 62.28-33.993 99.036 35.918 2.8 72.591-18.248 94.926-45.272l.036-.047z" />
                  </svg>
                  Log in with Apple
                </button>
              </div>
              <div class="flex gap-2 pt-5 justify-center items-center">
                <p class="text-gray-600 text-sm">Don't have an account?</p><p class="text-gray-600 text-sm underline"
                  onClick={() => {
                    navigate("../singup")
                  }}>Register here</p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
