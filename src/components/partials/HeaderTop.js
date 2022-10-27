import React from 'react';
import styled from 'styled-components';

const HeaderTop = () => {
    return (
        <TopContainer>
            <div>
                <Derechos>ENVIO GRATIS A PARTIR DE LOS $2500 - SOLO PARA CABA</Derechos>
            </div>
            <RedesDiv>
                <RedesLink rel="noreferrer" href="https://www.instagram.com/viaavanti8" target="_blank"><i className='bx bxl-instagram-alt'></i></RedesLink>
                <RedesLink rel="noreferrer" href="https://www.facebook.com/viaavantiok" target="_blank"><i className='bx bxl-facebook-circle'></i></RedesLink>  
            </RedesDiv>
        </TopContainer>
    )
}

const TopContainer = styled.div`
    max-width: 100vw;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ededed;
    z-index: 99;
`;

export const Derechos = styled.p`
    margin: 0;
    font-size: .8em;
    font-weight: 600;
    color: #00000099;
`;

export const RedesDiv = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    gap: 1vw;
`;

export const RedesLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 25px;
    height: 25px;
    text-decoration: none;
    transition: all 0.3s ease 0s;
    color: #00000099;

    &:hover,
    &:focus {
        color: #000;
    }
`;

export default HeaderTop;
