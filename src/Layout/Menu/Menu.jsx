import React from 'react';
import {Outlet} from "react-router-dom";
import "./Menu.css"
import Navbar from "../Navbar/Navbar";

const Menu = () => {
    return (
        <div className='outlet'>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Menu;