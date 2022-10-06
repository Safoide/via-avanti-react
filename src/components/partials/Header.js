import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../imgs/VALogo.png';
import BurguerMenu from './BurguerMenu';
import HeaderTop from './HeaderTop';
import NavBar from './NavBar';

const Header = () => {
    return (
        <>
            <HeaderTop/>

            <header className="header">
                <div className="header__burguer" id="burguerToggleDiv">
                    <i className='bx bx-menu' id="burguerToggle"></i>
                </div>
                
                <NavLink end to={"/"} className="header__logo">
                    <img className="header__logo--img" src={logo} alt="LOGO VIA AVANTI"/>
                    <h1 className="header__logo--title">VIA AVANTI</h1>
                </NavLink>

                <NavBar/>

                <div className="header__cart">
                    <NavLink to={"/cart"} className="header__cart__link">
                        CARRITO <i className='bx bxs-shopping-bag'></i>
                        <div className="header__cart__link--linea"></div>
                    </NavLink>
                    <span className="header__cart--unidades" id="cartUnidades">1</span>
                </div>
            </header>

            <BurguerMenu/>
        </>
    )
}

export default Header;
