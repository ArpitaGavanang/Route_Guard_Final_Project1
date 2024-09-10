import React from 'react';
import { HashLink } from 'react-router-hash-link';

import { Dropdown } from 'react-bootstrap';
import './Navlinks.css'; // Ensure the CSS file is correctly referenced

const NavLinks = () => {
    return (
        <>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#about">
                About
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#SuperAdmin">
                SuperAdmin
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#AdminLogin">
                AdminLogin
            </HashLink>
            
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/">
                Portfolio
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/contact#contact">
                Contact Us
            </HashLink>
            <HashLink className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" smooth to="/get-demo#demo">
                Demo our products
            </HashLink>

            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Login
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={HashLink} smooth to="/superAdmin/login">SuperAdminLogin</Dropdown.Item>
                    <Dropdown.Item as={HashLink} smooth to="/admin/login">AdminLogin</Dropdown.Item>
                   
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Registration
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={HashLink} smooth to="/admin/register">Admin Registration</Dropdown.Item>
                    <Dropdown.Item as={HashLink} smooth to="/customer/register">Customer Registration</Dropdown.Item>
                    <Dropdown.Item as={HashLink} smooth to="/driver/register">Driver Registration</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            
        </>
    )
}

export default NavLinks;
 