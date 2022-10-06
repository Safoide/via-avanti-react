import React from 'react';

const HeaderTop = () => {
    return (
        <div className="headerTop">
            <div className="headerTop__texto">
                <p className="headerTop__texto--text">ENVIO GRATIS A PARTIR DE LOS $2500 - SOLO PARA CABA</p>
            </div>
            <nav className="headerTop__redes">
                <a className="headerTop__redes--link" href="https://www.instagram.com/viaavanti8" target="_blank"><i className='bx bxl-instagram-alt'></i></a>
                <a className="headerTop__redes--link" href="https://www.facebook.com/viaavantiok" target="_blank"><i className='bx bxl-facebook-circle'></i></a>  
            </nav>
        </div>
    )
}

export default HeaderTop;
