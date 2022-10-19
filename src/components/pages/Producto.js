import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Main } from './Inicio';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Producto = () => {

    const { id } = useParams();
    const [producto, setProducto] = useState([]);

    const navigate = useNavigate();

    const peticionGet = () => {
        axios.get('../data.json').then(response => {
            setProducto(response.data.filter(i => i.nombre.split(' ').join('-').toLowerCase() === id));
        }).catch(error=>{
            console.log(error.message);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [producto])

    const {add} = useCart();

    const addToCart = (e) => {
        e.preventDefault();
        
        add(...producto);

        toast.info(`${producto[0].nombre} fue añadido al carrito!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            onClick: () => navigate('/cart')
        });
    }

    return (
        <Main>
            {
                producto.map(item => 
                    <section className="main__producto">
                        <article className="producto__imgs">
                            <img className="imgs__imgGrande--img" src={item.imagenes[0]} alt="Foto del Producto"/>
                        </article>
                        <div className="producto__info">
                            <nav className="info__nav">
                                <Link to={"/"} className="nav--link">INICIO</Link>
                                <Link to={`/tienda/${item.categorias.split(' > ')[0].toLowerCase()}`} className="nav--link">{item.categorias.split(' > ')[0]}</Link>
                                <p className="nav--producto">{item.nombre}</p>
                            </nav>
                            <h1 className="info--title">{item.nombre}</h1>
                            <div className="info__precio">
                                {item.precio_rebajado ? (
                                    <>
                                        <span className="info__precio--precio descuento">${item.precio_normal}</span>
                                        <span className="info__precio--precio">${item.precio_rebajado}</span>
                                    </>
                                ) : (
                                    <span className="info__precio--precio">${item.precio_normal}</span>
                                )}
                                <p className="info__precio--iva">- IVA Incluido</p>
                            </div>
                            <p className="info--descripcion">{item.descripcion_corta}</p>

                            <form className="info__opciones">
                                <div className="opciones__carrito">
         
                                    <button type="button" className="carrito--boton" onClick={addToCart}>AÑADIR AL CARRITO</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )
            }
        </Main>
    )
}

export default Producto;
