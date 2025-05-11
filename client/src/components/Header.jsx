import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

import logo from '../assets/images/logo-chatgpt-light-mode.png'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectTheme } from '../redux/store';
import { logout } from '../redux/user/userSlice';
import { toggleTheme } from '../redux/theme/themeSlice';
import { getAuth, signOut } from "firebase/auth";
import {app} from '../firebase';
import AvatarComp from './AvatarComp';

const Header = () => {
  const {pathname} = useLocation();

  const {currentUser : user} = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {theme} = useSelector(selectTheme);

  return (
    <Navbar fluid className='border-b-2'>
      <NavbarBrand as={Link} to="/">
        <img src={logo} className="mr-2 h-6 sm:h-9" alt="Central Doc" />
        <span className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            Central Doc
        </span>
      </NavbarBrand>
      <form className='hidden md:inline md:w-2/12 xl:inline xl:w-6/12'>
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
                <Button className='rounded-full  sm:inline' color="light" onClick={()=> dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun/> :<FaMoon/>}
                </Button>
                {user == null ?
                  <>
                <Link to="/sign-in">
                    <Button className='rounded-full focus:outline-non hover:text-black' color="alternative">
                        Sign In
                    </Button>
                </Link>
                <Link to="/sign-up">
                    <Button className='rounded-full hidden  md:inline bg-blue-500 border-none focus:outline-non hover:scale-95 hover:bg-blue-500 duration-200'>
                        Sign Up
                    </Button>
                </Link>
                </> :
                 <AvatarComp user={user.user} />
                }
            </div>
            <NavbarToggle 
            // className='sm:inline md:inline xl:hidden'
            />
        </div>
      <NavbarCollapse >
        <div className='flex flex-col md:flex-row md:gap-5 lg:gap-5  text-center'>
        <NavbarLink as={Link} to="/" active={pathname==="/"} >Home</NavbarLink>
        <NavbarLink as={Link} to="/about"  active={pathname==="/about"} >About</NavbarLink>
        <NavbarLink as={Link} to="/projects" active={pathname==="/projects"} >Project</NavbarLink>
        {!user && <NavbarLink as={Link} to="/sign-up" className='mt-4 hover:bg-blue-500 rounded-md hover:scale-95 duration-150 bg-blue-500 text-white md:hidden' >Sign Up</NavbarLink>}
        </div>
      </NavbarCollapse>
      
    </Navbar>
  )
}

export default Header