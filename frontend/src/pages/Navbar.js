import React from 'react'
import '../styles/style.css'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <h1>HỆ THỐNG QUẢN LÝ CÔNG TY</h1>
        <div className='account'>
            <span>Admin</span>
            <button className='account-button'>
                <img className='account-img' />
            </button>
        </div>
    </div>
  )
}

export default Navbar