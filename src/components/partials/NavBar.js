import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
    return (
        <HeaderNav>
            <NavList>
                <NavBtn>
                    <HeaderLink end to={"/"}>INICIO<NavLinea></NavLinea></HeaderLink>
                </NavBtn>
                <NavBtn> 
                    <HeaderLink to={"/tienda"}>TIENDA<NavLinea></NavLinea></HeaderLink>
                </NavBtn>
                <NavBtn>
                    <HeaderLink to={"/contacto"}>AYUDA<NavLinea></NavLinea></HeaderLink>
                </NavBtn>
            </NavList>
        </HeaderNav>
    )
}

const HeaderNav = styled.nav`
    height: 60%;
    width: 30rem;
    display: flex;
    align-items: center;

    @media only screen and (min-width: 901px) and (max-width: 1280px) {
        width: 23rem;
    }

    @media only screen and (min-width: 769px) and (max-width: 900px) {
        width: 18rem;
    }

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const NavList = styled.ul`
    width: 100%;
    height: 100%;
    list-style-type: none;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    gap: 10px;
`;

const NavBtn = styled.li`
    padding: 0;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
`;

const NavLinea = styled.div`
    height: 3px;
    background-color: #1e73be;
    opacity: 0;
    position: absolute;
    transition: all .4s ease 0s;
    left: .5rem;
    right: 70%;
`;

const HeaderLink = styled(NavLink)`
    display: inline-block;
    text-decoration: none;
    color: #cacaca;
    width: 100%;
    height: 100%;
    letter-spacing: 1px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: all .4s ease 0s;
    padding: .5rem .5rem;
    position: relative;
    line-height: 1.5;

    &.active,
    &:hover,
    &:focus {
        color: #fff;

        ${NavLinea} {
            opacity: 1;
            right: .5rem;
        }
    }
`;

export default NavBar;