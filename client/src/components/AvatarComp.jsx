import React from 'react'

import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem
  } from "flowbite-react";
import { Link } from 'react-router-dom';

const AvatarComp = ({user, handleLogout}) => {

  return (
    <div className="flex md:order-2">
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar alt="Profile" img={user?.profilePicture} rounded referrerPolicy="no-referrer"/>
      }
    >
      <DropdownHeader>
        <span className="block text-sm">@{user?.username}</span>
        <span className="block truncate text-sm font-medium">{user?.email}</span>
      </DropdownHeader>
      <DropdownItem as={Link} to="/dashboard?tab=profile">Dashboard</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
    </Dropdown>
  </div>
  )
}

export default AvatarComp