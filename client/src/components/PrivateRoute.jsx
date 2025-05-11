import React from 'react'
import { useSelector } from 'react-redux';
import{ selectUser } from '../redux/store';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
const {currentUser: user} = useSelector(selectUser);

  return user ? <Outlet/> : <Navigate to='/sign-in' replace/>;
}

export default PrivateRoute