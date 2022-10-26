import { NavLink } from 'react-router-dom';
import logo from '../../imgs/VALogo.png';
import BurguerMenu from './BurguerMenu';
import HeaderTop from './HeaderTop';
import NavBar from './NavBar';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { toggleMenu } from './BurguerMenu';

const Header = () => {
    const {count} = useCart();

    const burguerHandler = (event) => {
        event.target.classList.toggle('is-active');

        toggleMenu();
    }

    return (
        <>
            <HeaderTop/>

            <HeaderEl>
                <BurguerBtn onClick={burguerHandler} className="hamburger hamburger--squeeze" type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </BurguerBtn>
                
                <LogoLink end to={"/"}>
                    <img src={logo} alt="LOGO VIA AVANTI"/>
                    <LogoTitle>VIA AVANTI</LogoTitle>
                </LogoLink>

                <NavBar/>

                <Cart>
                    <CartLink to={"/cart"}>
                        CARRITO <i className='bx bxs-shopping-bag'></i>
                        <CartLinea></CartLinea>
                    </CartLink>
                    {
                        count !== 0 && <CartUnidades id="cartUnidades">{count}</CartUnidades>
                    }
                </Cart>
            </HeaderEl>

            <BurguerMenu/>
        </>
    )
}

const HeaderEl = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #1a1a1a;
    position: sticky;
    top: 0;
    max-width: 100vw;
    height: 80px;
    z-index: 99;
    gap: 5px;
    transition: background-color .4s ease 0s;
`;

const BurguerBtn = styled.button`
    display: none;

    span {
        pointer-events: none;
    }

    @media only screen and (max-width: 768px) {
        display: flex;
    }
`;

const LogoLink = styled(NavLink)`
    max-width: 220px;
    height: 80px;
    padding: .5rem .5rem;
    display: flex;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    gap: 10px;

    &:hover {
        color: #fff;
    }

    img {
        width: 64px;
    }
`;

const LogoTitle = styled.h1`
    font-size: 1.25em;
    font-weight: 500;
    line-height: 1;

    @media only screen and (max-width: 768px) {
        font-size: 15px;
    }
`;

const Cart = styled.div`
    height: 65px;
    display: flex;
    align-items: center;
    pointer-events: none;
    position: relative;
`;

const CartLinea = styled.div`
    height: 3px;
    background-color: #1e73be;
    opacity: 0;
    position: absolute;
    transition: all .4s ease 0s;
    left: .5rem;
    right: 70%;
`;

const CartLink = styled(NavLink)`
    text-decoration: none;
    color: #cacaca;
    padding: .5rem .5rem;
    letter-spacing: 1px;
    font-weight: 600;
    transition: all .4s ease 0s;
    pointer-events: all;
    cursor: pointer;
    position: relative;
    line-height: 1.5;

    &.active,
    &:hover,
    &:focus {
        color: #fff;

        ${CartLinea} {
            opacity: 1;
            right: .5rem;
        }
    }
`;

const CartUnidades = styled.span`
    position: absolute;
    background-color: #0f700d;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -5px;
    top: 19%;
    font-weight: 700;
    opacity: 1;
    margin: 0;
    transition: all .4s ease 0s;
    color: #fff;
    border: 2px solid #1a1a1a;
`;

export default Header;
