import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../imgs/VALogo.png';
import NavBar from './NavBar';

const Header = () => {
    return (
        <>
            <div className="headerTop">
                <div className="headerTop__texto">
                    <p className="headerTop__texto--text">ENVIO GRATIS A PARTIR DE LOS $2500 - SOLO PARA CABA</p>
                </div>
                <nav className="headerTop__redes">
                    <a className="headerTop__redes--link" href="https://www.instagram.com/viaavanti8" target="_blank"><i className='bx bxl-instagram-alt'></i></a>
                    <a className="headerTop__redes--link" href="https://www.facebook.com/viaavantiok" target="_blank"><i className='bx bxl-facebook-circle'></i></a>  
                </nav>
            </div>

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
        </>
    )
}

export default Header;
