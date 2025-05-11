import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarCollapse, Button } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { handleSignOut } from '../services/userService'
import { useDispatch } from 'react-redux';  

const SidebarItemGroupWeb = ({tab, handleSignOut}) => {

return (
  <>
    <SidebarItemGroup>
        <SidebarItem as={Link} active={tab === 'profile'} to='/dashboard?tab=profile' icon={HiUser} label="User" labelColor="dark">
          Profile
        </SidebarItem>
        <SidebarItem as={Link} to='/dashboard?tab=other' icon={HiUser} >
          other Item
        </SidebarItem>
      </SidebarItemGroup>
      <SidebarItemGroup>
        <SidebarItem icon={HiArrowSmRight} onClick={handleSignOut}>
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
  </>
)
}

const SidebarItemGroupCollapse = ({tab, handleSignOut}) => {

  return(
    <>  
    <SidebarItemGroup>
          <SidebarCollapse  label="Menu">
            <SidebarItemGroup>
              <SidebarItem as={Link} active={tab === 'profile'} to='/dashboard?tab=profile' icon={HiUser} label="User" labelColor="dark">
                Profile
              </SidebarItem>
              <SidebarItem as={Link} to='/dashboard?tab=other' icon={HiUser} >
                other Item
              </SidebarItem>
            </SidebarItemGroup>
            <SidebarItemGroup>
              <SidebarItem icon={HiArrowSmRight} onClick={handleSignOut}>
                Sign Out
              </SidebarItem>
            </SidebarItemGroup>
            </SidebarCollapse>
    </SidebarItemGroup>
    </>
  )
}

const DashSidebar = ({tab}) => {

  const dispatch = useDispatch();


  const handleSignOutHook = async () => {
    try {
      await handleSignOut(dispatch);
      window.location = '/';

    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  return (
    <Sidebar className="w-full">

      {/* Web version */}
      <SidebarItems className=' flex-col justify-evenly hidden md:flex'> 
        <SidebarItemGroupWeb tab={tab} handleSignOut={handleSignOutHook} />
      </SidebarItems>

      {/* Mobile version - collapse able  */}
      <SidebarItems className=' flex-col justify-evenly md:hidden flex'> 
        <SidebarItemGroupCollapse tab={tab} handleSignOut={handleSignOutHook} />
      </SidebarItems>

  </Sidebar>
  )
}

export default DashSidebar