import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="header__navbar">
            <ul className="navbar__menu">
                <li className="menu__item">
                    <NavLink end to={"/"} className="menu__item__link">INICIO<div className="menu__item__link--linea"></div></NavLink>
                </li>
                <li className="menu__item tiendaButton"> 
                    <NavLink to={"/tienda"} className="menu__item__link">TIENDA<div className="menu__item__link--linea"></div></NavLink>
                    <div id="mydropdown" className="menu__item__dropdown">
                        <i className='dropdown--arrow bx bx-chevron-right'></i>
                        <ul className="menu__item__submenu">
                            <li className="submenu__item">
                                <a className="submenu__item--link" href="./tienda.html#pantalones">PANTALONES</a>
                            </li>
                            <li className="submenu__item">
                                <a className="submenu__item--link" href="./tienda.html#remeras">REMERAS</a>
                            </li>
                            <li className="submenu__item">
                                <a className="submenu__item--link" href="./tienda.html#sweaters">SWEATERS</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="menu__item">
                    <NavLink to={"/contacto"} className="menu__item__link">AYUDA<div className="menu__item__link--linea"></div></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;