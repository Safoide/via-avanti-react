import React from 'react';
import styled from 'styled-components';
import { Derechos, RedesDiv, RedesLink } from './HeaderTop';

const Footer = () => {
    return (
        <FooterContainer>
            <div >
                <Derechos>Copyright © 2021 – VIA AVANTI. Todos los derechos reservados.</Derechos>
            </div>
            <RedesDiv>
                <RedesLink rel="noreferrer" href="https://www.instagram.com/viaavanti8" target="_blank"><i className='bx bxl-instagram-alt'></i></RedesLink>
                <RedesLink rel="noreferrer" href="https://www.facebook.com/viaavantiok" target="_blank"><i className='bx bxl-facebook-circle'></i></RedesLink>
            </RedesDiv>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    height: 60px;  
    max-width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ededed;
`;

export default Footer;
