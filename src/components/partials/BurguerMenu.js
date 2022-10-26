import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

let burguerMenu;

export const toggleMenu = () => {
    burguerMenu.current.classList.toggle('active');
}

const BurguerMenu = () => {
    burguerMenu = useRef();
    
    return (
        <BurguerNav ref={burguerMenu}>
            <BurguerList>
                <BurguerItem>
                    <BurguerLink to={"/"}>INICIO</BurguerLink>
                </BurguerItem>
                <BurguerItem>
                    <BurguerLink to={"/tienda"}>TIENDA</BurguerLink>
                </BurguerItem>
                <BurguerItem>
                    <BurguerLink to={"/contacto"}>AYUDA</BurguerLink>
                </BurguerItem>
            </BurguerList>
        </BurguerNav>
    )
}

const BurguerList = styled.ul`
    list-style-type: none;
    padding: 15px 0;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    pointer-events: none;
    transition: all .4s ease 0s;
    animation: moveList2 .6s forwards;

    
    @keyframes moveList2 {    
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(-200px);
        }
    }
`;

const BurguerNav = styled.nav`
    background-color: #EBEBEB;
    pointer-events: all;
    z-index: 98;
    transform: scale(1, 0);
    transform-origin: top;
    position: sticky;
    top: 80px;
    max-height: 0;
    transition: max-height .4s ease 0s, transform 2s ease 0s;

    &.active {
        transform: scale(1, 1);
        max-height: 276px;
        transition: max-height .4s ease 0s, transform .2s ease 0s;

        ${BurguerList} {
            animation: moveList .2s forwards;
        }
    }

    @keyframes moveList {
        from {
            transform: translateY(-200px);
        }

        to {
            transform: translateY(0);
        }
    }
`;

const BurguerItem = styled.li`
    display: inline-block;
    text-align: center;
    width: 100%;
    pointer-events: none;
`;

const BurguerLink = styled(Link)`
    display: inline-block;
    color: #000;
    opacity: .7;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    padding: 10px 0;
    transition: all .4s ease 0s;
    width: 100%;
    pointer-events: all;

    &:hover,
    &:focus {
        background-color: #DBDBDB;
        opacity: 1;
        color: #000;
    }
`;

export default BurguerMenu;