import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="header__navbar">
            <ul className="navbar__menu">
                <li className="menu__item">
                    <NavLink end to={"/"} className="menu__item__link">INICIO<div className="menu__item__link--linea"></div></NavLink>
                </li>
                <li className="menu__item"> 
                    <NavLink to={"/tienda"} className="menu__item__link">TIENDA<div className="menu__item__link--linea"></div></NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to={"/contacto"} className="menu__item__link">AYUDA<div className="menu__item__link--linea"></div></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;