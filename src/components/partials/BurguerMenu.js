import React from 'react'
import { Link } from 'react-router-dom'

const BurguerMenu = () => {
    return (
        <nav className="burguerMenu" id="burguerMenu">
            <ul className="nav__lista">
                <li className="lista__item">
                    <Link to={"/"} className="lista__item--link">INICIO</Link>
                </li>
                <li className="lista__item">
                    <Link to={"/tienda"} className="lista__item--link"><span>TIENDA</span></Link>
                </li>
                <li className="lista__item">
                    <Link to={"/contacto"} className="lista__item--link">AYUDA</Link>
                </li>
            </ul>
        </nav>
    )
}

export default BurguerMenu;
