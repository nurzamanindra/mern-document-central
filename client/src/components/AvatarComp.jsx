import React from 'react'
import {handleSignOut} from '../services/userService';
import { useDispatch } from 'react-redux';

import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem
  } from "flowbite-react";
import { Link } from 'react-router-dom';

const AvatarComp = ({user}) => {

  const dispatch = useDispatch();

  const handleSignOutHook = async () => {
    try {
      await handleSignOut(dispatch);
      window.location = '/';
    } catch (error) {
      console.error(error);
    }
  };

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
      <DropdownItem onClick={handleSignOutHook}>Signout</DropdownItem>
    </Dropdown>
  </div>
  )
}

export default AvatarComp