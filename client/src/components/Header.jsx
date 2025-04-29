import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

import logo from '../assets/images/logo-chatgpt-light-mode.png'

const activeNavbar = {
    "on": "bg-cyan-300 text-white md:bg-cyan-300  md:bg-cyan-300  dark:text-white",
    "off": "border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
  }
const Header = () => {
  const {pathname} = useLocation();

  return (
    <Navbar fluid className='border-b-2'>
      <NavbarBrand as={Link} to="/">
        <img src={logo} className="mr-2 h-6 sm:h-9" alt="Central Doc" />
        <span className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            Central Doc
        </span>
      </NavbarBrand>
      <form className='hidden md:inline md:w-2/12 lg:w-5/12'>
        <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
        />
      </form>
      <Button className='rounded-full md:hidden' color="light">
           <AiOutlineSearch/>
       </Button>
      <div className='flex flex-row justify-center items-center gap-2  md:order-3'>
            <div className='flex items-center gap-2'>
                <Button className='rounded-full  sm:inline' color="light">
                    <FaMoon/>
                </Button>
                <Link to="/sign-in">
                    <Button className='rounded-full hidden sm:inline bg-blue-500 border-none focus:outline-non hover:scale-95 hover:bg-blue-500 duration-200'>
                        Sign In
                    </Button>
                </Link>
            </div>

            <NavbarToggle />
        </div>
      <NavbarCollapse >
        <div className='flex flex-col md:flex-row lg:gap-12 md:gap-10 text-center'>
        <NavbarLink as={Link} to="/" active={pathname==="/"} >Home</NavbarLink>
        <NavbarLink as={Link} to="/about"  active={pathname==="/about"} >About</NavbarLink>
        <NavbarLink as={Link} to="/projects" active={pathname==="/projects"} >Project</NavbarLink>
        <NavbarLink as={Link} to="/sign-up" className='mt-4 hover:bg-blue-500 rounded-md hover:scale-95 duration-150 bg-blue-500 text-white md:hidden' >Sign Up</NavbarLink>
        </div>
      </NavbarCollapse>
      
    </Navbar>
  )
}

export default Header