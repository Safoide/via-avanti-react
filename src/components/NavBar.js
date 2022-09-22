import React from 'react';

const NavBar = () => {
    return (
        <nav class="header__navbar">
            <ul class="navbar__menu">
                <li class="menu__item">
                    <a href="./index.html" class="menu__item__link active">INICIO<div class="menu__item__link--linea"></div></a>
                </li>
                <li class="menu__item tiendaButton"> 
                    <a href="./tienda.html" class="menu__item__link">TIENDA<div class="menu__item__link--linea"></div></a>
                    <div id="mydropdown" class="menu__item__dropdown">
                        <i class='dropdown--arrow bx bx-chevron-right'></i>
                        <ul class="menu__item__submenu">
                            <li class="submenu__item">
                                <a class="submenu__item--link" href="./tienda.html#pantalones">PANTALONES</a>
                            </li>
                            <li class="submenu__item">
                                <a class="submenu__item--link" href="./tienda.html#remeras">REMERAS</a>
                            </li>
                            <li class="submenu__item">
                                <a class="submenu__item--link" href="./tienda.html#sweaters">SWEATERS</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="menu__item">
                    <a href="./contacto.html" class="menu__item__link">AYUDA<div class="menu__item__link--linea"></div></a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;