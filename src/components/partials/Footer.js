import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__derechos">
            <p className="footer__derechos--text">Copyright © 2021 – VIA AVANTI. Todos los derechos reservados.</p>
        </div>
        <nav className="footer__redes">
            <a className="footer__redes--link" rel="noreferrer" href="https://www.instagram.com/viaavanti8" target="_blank"><i className='bx bxl-instagram-alt'></i></a>
            <a className="footer__redes--link" rel="noreferrer" href="https://www.facebook.com/viaavantiok" target="_blank"><i className='bx bxl-facebook-circle'></i></a>
        </nav>
    </footer>
  )
}

export default Footer;
