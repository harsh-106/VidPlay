import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const Body = () => {
  return (
    <div className='flex mt-16'>
    <Sidebar />
    <Outlet  />
    </div>
  )
}

export default Body;
