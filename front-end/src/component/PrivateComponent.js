// import React from "react";
// import{} from "react-router-dom"; 
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent=()=>{
    const auth= localStorage.getItem('user');

    return auth?<Outlet />:<Navigate to="/signup" />
}

export default PrivateComponent
