import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarCollapse } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";


const SidebarItemGroupWeb = ({tab}) => {

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
        <SidebarItem as={Link} to='/' icon={HiArrowSmRight}>
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
  </>
)
}

const SidebarItemGroupCollapse = ({tab}) => {
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
              <SidebarItem as={Link} to='/' icon={HiArrowSmRight}>
                Sign Out
              </SidebarItem>
            </SidebarItemGroup>
            </SidebarCollapse>
    </SidebarItemGroup>
    </>
  )
}

const DashSidebar = ({tab}) => {
  return (
    <Sidebar className="w-full">

      {/* Web version */}
      <SidebarItems className=' flex-col justify-evenly hidden md:flex'> 
        <SidebarItemGroupWeb tab={tab}/>
      </SidebarItems>

      {/* Mobile version - collapse able  */}
      <SidebarItems className=' flex-col justify-evenly md:hidden flex'> 
        <SidebarItemGroupCollapse tab={tab}/>
      </SidebarItems>

  </Sidebar>
  )
}

export default DashSidebar