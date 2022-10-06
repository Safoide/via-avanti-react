import React from 'react'
import { Link } from 'react-router-dom'

const BurguerMenu = () => {
    return (
        <nav class="burguerMenu" id="burguerMenu">
            <ul class="nav__lista">
                <li class="lista__item">
                    <Link to={"/"} class="lista__item--link">INICIO</Link>
                </li>
                <li class="lista__item">
                    <Link to={"/tienda"} class="lista__item--link"><span>TIENDA</span></Link>
                </li>
                <li class="lista__item">
                    <Link to={"/contacto"} class="lista__item--link">AYUDA</Link>
                </li>
            </ul>
        </nav>
    )
}

export default BurguerMenu;
