import React from 'react';
import logo from '../images/VALogo.png';
import NavBar from './NavBar';

const Header = () => {
    return (
        <>
            <div class="headerTop">
                <div class="headerTop__texto">
                    <p class="headerTop__texto--text">ENVIO GRATIS A PARTIR DE LOS $2500 - SOLO PARA CABA</p>
                </div>
                <nav class="headerTop__redes">
                    <a class="headerTop__redes--link" href="https://www.instagram.com/viaavanti8" target="_blank"><i class='bx bxl-instagram-alt'></i></a>
                    <a class="headerTop__redes--link" href="https://www.facebook.com/viaavantiok" target="_blank"><i class='bx bxl-facebook-circle'></i></a>  
                </nav>
            </div>

            <header class="header">
                <div class="header__burguer" id="burguerToggleDiv">
                    <i class='bx bx-menu' id="burguerToggle"></i>
                </div>
                
                <a class="header__logo" href="./index.html">
                    <img class="header__logo--img" src={logo} alt="LOGO VIA AVANTI"/>
                    <h1 class="header__logo--title">VIA AVANTI</h1>
                </a>

                <NavBar/>

                <div class="header__cart">
                    <a class="header__cart__link" href="./cart.html">
                        CARRITO <i class='bx bxs-shopping-bag'></i>
                        <div class="header__cart__link--linea"></div>
                    </a>
                    <span class="header__cart--unidades" id="cartUnidades">1</span>
                </div>
            </header>
        </>
    )
}

export default Header;
