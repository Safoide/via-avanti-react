import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
        <main class="main">
            {
                productos.map(item => 
                    <section class="main__producto">
                        <article class="producto__imgs">
                            <img class="imgs__imgGrande--img" src={item.imagenes[0]} alt="Foto del Producto"/>
                        </article>
                        <div class="producto__info">
                            <nav class="info__nav">
                                <Link to={"/"} class="nav--link">INICIO</Link>
                                <Link to={"/tienda"} class="nav--link">{item.categorias}</Link>
                                <p class="nav--producto">{item.nombre}</p>
                            </nav>
                            <h1 class="info--title">{item.nombre}</h1>
                            <div class="info__precio">
                                {item.precio_rebajado ? (
                                    <>
                                        <span class="info__precio--precio descuento">${item.precio_normal}</span>
                                        <span class="info__precio--precio">${item.precio_rebajado}</span>
                                    </>
                                ) : (
                                    <span class="info__precio--precio">${item.precio_normal}</span>
                                )}
                                <p class="info__precio--iva">- IVA Incluido</p>
                            </div>
                            <p class="info--descripcion">{item.descripcion_corta}</p>

                            <form class="info__opciones">
                                <div class="opciones__carrito">
                                    <div class="carrito__unidades">
                                        <button type="button" class="carrito__unidades--boton restar" id="restarButton" onclick="RestarUnidad(event)" disabled></button>
                                        <input class="carrito__unidades--input" onchange="disableButtons(event)" type="number" max="10" min="1" value="1" name="unidades" id="unidades"/>
                                        <button type="button" class="carrito__unidades--boton sumar" id="sumarButton" onclick="SumarUnidad(event)"></button>
                                    </div>                 
                                    <button type="button" class="carrito--boton" onclick="AddToCart()">AÑADIR AL CARRITO</button>
                                </div>
                            </form>
                        </div>
                    </section>
                )
            }
        </main>
    )
}

export default Producto;
