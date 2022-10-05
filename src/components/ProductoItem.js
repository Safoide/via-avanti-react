import React from 'react'
import { Link } from 'react-router-dom';

const ProductoItem = ( {id, nombre, descripcion_corta, precio_rebajado, precio_normal, categorias, imagenes, colores} ) => {
    return (
        precio_rebajado ? (
            <li key={id} className='menu__item'>
                <Link to={`/producto/${nombre.split(' ').join('-').toLowerCase()}`} className="menu__item__link descuento" data-producto={id}>
                    <img className="menu__item__link--img fimg" src={imagenes[0]} alt={nombre.toUpperCase()}/>
                    <img className="menu__item__link--img simg" src={imagenes[1]} alt={nombre.toUpperCase()} />
                    <h3 className="menu__item__link--title">{nombre.toUpperCase()}</h3>
                    <div className="link__precio">
                        <span className="link__precio--precio descuento">${precio_normal}</span>
                        <span className="link__precio--precio">${precio_rebajado}</span>
                        <p className="link__precio--iva">- IVA Incluido</p>
                    </div>
                </Link>
            </li>
        ) : (
            <li key={id} className='menu__item'>
                <Link to={`/producto/${nombre.split(' ').join('-').toLowerCase()}`} className="menu__item__link" data-producto={id}>
                    <img className="menu__item__link--img fimg" src={imagenes[0]} alt={nombre.toUpperCase()}/>
                    <img className="menu__item__link--img simg" src={imagenes[1]} alt={nombre.toUpperCase()} />
                    <h3 className="menu__item__link--title">{nombre.toUpperCase()}</h3>
                    <div className="link__precio">
                        <span className="link__precio--precio">${precio_normal}</span>
                        <p className="link__precio--iva">- IVA Incluido</p>
                    </div>
                </Link>
            </li>
        )
    )
}

export default ProductoItem;
