import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Main } from './Inicio';

const Producto = () => {

    const { id } = useParams();
    const [productos, setProductos] = useState([]);

    const peticionGet = () => {
        axios.get('../data.json').then(response => {
            setProductos(response.data.filter(i => i.nombre.split(' ').join('-').toLowerCase() === id));
        }).catch(error=>{
            console.log(error.message);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [productos])

    return (
        <Main>
            {
                productos.map(item => 
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
                                    <div className="carrito__unidades">
                                        <button type="button" className="carrito__unidades--boton restar" id="restarButton" onclick="RestarUnidad(event)" disabled></button>
                                        <input className="carrito__unidades--input" onchange="disableButtons(event)" type="number" max="10" min="1" value="1" name="unidades" id="unidades"/>
                                        <button type="button" className="carrito__unidades--boton sumar" id="sumarButton" onclick="SumarUnidad(event)"></button>
                                    </div>                 
                                    <button type="button" className="carrito--boton" onclick="AddToCart()">AÑADIR AL CARRITO</button>
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
