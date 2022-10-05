import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import ProductoItem from './ProductoItem';

const Tienda = () => {
    const [productos, setProductos] = useState([]);

    const peticionGet = () => {
        axios.get('data.json').then(response=>{
            setProductos(response.data);
        }).catch(error=>{
            console.log(error.message);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [productos])

    return (
        <main class="main">
            <section class="main__tienda">
                <aside class="tienda__filtros">
                    <div class="filtros__categoria">
                        <h4 class="filtros--subtitle">FILTRAR POR CATEGORIA</h4>
                        <div class="categoria__input">
                            <span class="input--title">Pantalones</span>
                            <div class="input__input">
                                <input class="input--input" type="checkbox" name="categoria" id="pantalones"/>
                                <span class="input--count">2</span>
                            </div>
                        </div>
                        <div class="categoria__input">
                            <span class="input--title">Remeras</span>
                            <div class="input__input">
                                <input class="input--input" type="checkbox" name="categoria" id="remeras"/>
                                <span class="input--count">1</span>
                            </div>
                        </div>
                        <div class="categoria__input">
                            <span class="input--title">Sweaters</span>
                            <div class="input__input">
                                <input class="input--input" type="checkbox" name="categoria" id="sweaters"/>
                                <span class="input--count">7</span>
                            </div>
                        </div>
                    </div>

                    <div class="filtros__color">
                        <h4 class="filtros--subtitle">FILTRAR POR COLOR</h4>
                        <select class="color__select">
                            <option value>Cualquier Color</option>
                            <option value="coral">Coral</option>
                            <option value="orquidea">Orquidea</option>
                            <option value="celeste">Celeste</option>
                            <option value="beige">Beige</option>
                            <option value="mostaza">Mostaza</option>
                            <option value="camel">Camel</option>
                            <option value="grismelange">Gris Melange</option>
                            <option value="negro">Negro</option>
                            <option value="crudo">Crudo</option>
                            <option value="fucsia">Fucsia</option>
                        </select>
                    </div>

                    <div class="filtros__talle">
                        <h4 class="filtros--subtitle">FILTRAR POR TALLE</h4>
                        <div class="talle__input">
                            <span class="input--title">Small</span>
                            <div class="input__input">
                                <input class="input--input" type="checkbox" name="talle" id="small"/>
                                <span class="input--count">6</span>
                            </div>
                        </div>
                        <div class="talle__input">
                            <span class="input--title">Medium</span>
                            <div class="input__input">
                                <input class="input--input" type="checkbox" name="talle" id="medium"/>
                                <span class="input--count">6</span>
                            </div>
                        </div>
                        <div class="talle__input">
                            <span class="input--title">Large</span>
                            <div class="input__input">
                                <input class="input--input" type="checkbox" name="talle" id="large"/>
                                <span class="input--count">6</span>
                            </div>
                        </div>
                    </div>
                </aside>
                <div class="tienda__productos" id="productosDiv">
                    <div class="productos__top">
                        <p class="top--title" id="productsResults"></p>
                        <select class="top--orden" id="ordenSelect">
                            <option value="nuevos" selected="selected">Ordenar por nuevos</option>
                            <option value="preciomenor">Ordenar por precio: bajo a alto</option>
                            <option value="preciomayor">Ordenar por precio: alto a bajo</option>
                        </select>
                    </div>
                    <div class="productos__agregado" id="productoAgregadoDiv">
                        <p class="agregado--title" id="productoAgregado"></p>
                        <a href="./cart.html" class="agregado--carrito">VER CARRITO</a>
                    </div>
                    <ul id="productosUl" class="productos__lista">
                        {
                            productos.map(item =>
                                <ProductoItem key={item.id} {...item}/>    
                            )
                        }
                    </ul>
                    <div class="productos__bottom">
                        <div class="bottom--linea"></div>
                        <div class="bottom--cargar" id="circleCargar"></div>
                        <div class="bottom--linea"></div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Tienda
