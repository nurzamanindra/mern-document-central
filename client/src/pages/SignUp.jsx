import React from 'react'

import logo from '../assets/images/logo-chatgpt-light-mode.png'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";


const LeftSignupComponent = ()=> {

  return (
    <div className=''>
      <Link to="/sign-up">
      <div className='flex flex-col justify-center items-center'>
        <img src={logo} className="mb-1 h-16" alt="Central Doc" />
        <span className="text-3xl font-semibold dark:text-white">
          Central Doc
        </span>
      </div>
      </Link>
    </div>
  )
}

const RightSignupComponent = ()=> {

  return (
    <form className="flex md:w-full md:px-16 flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username">Username</Label>
        </div>
        <TextInput id="username" type="text" placeholder="username" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email">Email</Label>
        </div>
        <TextInput id="email" type="email" placeholder="name@yourmail.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Password</Label>
        </div>
        <TextInput id="password" type="password" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password">Repeat password</Label>
        </div>
        <TextInput id="repeat-password" type="password" required shadow />
      </div>
      <Button className='mt-3' type="submit">Register new account</Button>
    </form>
  )
}


const SignUp = () => {
  return (
    <div className='min-h-screen mt-14 p-10 md:container md:mx-auto md:max-w-screen-md'>
        {/* signup form container */}
        <div className='border-gray-400 shadow-2xl 
        rounded-xl flex flex-col gap-y-5
        mx-auto p-0 py-14 md:px-10 justify-center items-center hover:scale-[1.05] duration-500'>
          {/* left side */}
          <LeftSignupComponent/>

          {/* right side */}
          <RightSignupComponent/>
        </div>

    </div>
  )
}

export default SignUp