import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Main } from './Inicio';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';

const Producto = () => {

    const { id } = useParams();
    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const peticionGet = () => {
        const db = getFirestore();
        const productsQuery = collection(db, "products");

        getDoc(doc(productsQuery, id)).then(response => {
            setProducto(response.data());
            setLoading(false);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    const {add} = useCart();

    const addToCart = (e) => {
        e.preventDefault();
        
        add(producto);

        toast.info(`${producto.nombre} fue añadido al carrito!`, {
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
                loading ?
                    <h1>CARGANDO...</h1>
                :
                <section key={producto.id} className="main__producto">
                    <article className="producto__imgs">
                        <img className="imgs__imgGrande--img" src={producto.imagenes[0]} alt="Foto del Producto"/>
                    </article>
                    <div className="producto__info">
                        <nav className="info__nav">
                            <Link to={"/"} className="nav--link">INICIO</Link>
                            <Link to={`/tienda/${producto.categorias.split(' > ')[0].toLowerCase()}`} className="nav--link">{producto.categorias.split(' > ')[0]}</Link>
                            <p className="nav--producto">{producto.nombre}</p>
                        </nav>
                        <h1 className="info--title">{producto.nombre}</h1>
                        <div className="info__precio">
                            {producto.precio_rebajado ? (
                                <>
                                    <span className="info__precio--precio descuento">${producto.precio_normal}</span>
                                    <span className="info__precio--precio">${producto.precio_rebajado}</span>
                                </>
                            ) : (
                                <span className="info__precio--precio">${producto.precio_normal}</span>
                            )}
                            <p className="info__precio--iva">- IVA Incluido</p>
                        </div>
                        <p className="info--descripcion">{producto.descripcion_corta}</p>

                        <form className="info__opciones">
                            <div className="opciones__carrito">
        
                                <button type="button" className="carrito--boton" onClick={addToCart}>AÑADIR AL CARRITO</button>
                            </div>
                        </form>
                    </div>
                </section>
            }
        </Main>
    )
}

export default Producto;
