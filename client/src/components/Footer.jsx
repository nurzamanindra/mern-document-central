import React from 'react'
import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
  } from "flowbite-react";
  import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
  import { Link } from 'react-router-dom';

import logo from '../assets/images/logo-chatgpt-light-mode.png'


const FooterComponent = () => {
  return (
 <Footer container className='border-t-2 rounded-t-3xl'>
    <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
            <Link to="/">
            <div className='flex flex-row justify-start items-center gap-3 mb-2'>
                <img src={logo} className="mb-1 h-10" alt="CentralDoc Logo" />
                <span className="text-2xl font-semibold dark:text-white">Central Doc</span>
            </div>
            </Link>
            </div>            
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
                <FooterTitle title="about" />
                <FooterLinkGroup col>
                <FooterLink as={Link} to="/">Flowbite</FooterLink>
                <FooterLink as={Link} to="/">Tailwind CSS</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                <FooterLink  as={Link} to="/">Github</FooterLink>
                <FooterLink  as={Link} to="/">Discord</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                <FooterLink  as={Link} to="/">Privacy Policy</FooterLink>
                <FooterLink  as={Link} to="/">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
            </div>
            </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Link to="/"><FooterCopyright by="Central Doc" year={2025} /></Link>
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <Link to="/"><FooterIcon icon={BsFacebook} /></Link>
                <Link to="/"><FooterIcon icon={BsInstagram} /></Link>
                <Link to="/"><FooterIcon icon={BsTwitter} /></Link>
                <Link to="/"><FooterIcon icon={BsGithub} /></Link>
                <Link to="/"><FooterIcon icon={BsDribbble} /></Link>
            </div>
        </div>
    </div>
  </Footer>
  )
}

export default FooterComponent