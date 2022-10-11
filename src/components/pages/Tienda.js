import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import ProductoItem from '../ProductoItem';
import { Main } from './Inicio';
import { Link, NavLink, useParams } from 'react-router-dom';

const Tienda = () => {

    let categoria = useParams();
    categoria = categoria['*'];

    const [productos, setProductos] = useState([]);
    const [productosByCategory, setProductosByCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sorted, setSorted] = useState('nuevos');

    const itemCategory = (product) => {
        return product.categorias.split(' > ')[0];
    }
    
    const ordenarHandler = (e) => {
        setSorted(e.target.value);
    }

    const peticionGet = () => {
        axios.get('../data.json').then(response=>{
            let sortedArr;

            if(sorted === 'nuevos') {
                sortedArr = response.data.sort((a, b) => a.id - b.id);
            } else if(sorted === 'preciomenor') {
                sortedArr = response.data.sort((a, b) => {
                    let a_precio = a.precio_rebajado ? a.precio_rebajado : a.precio_normal;
                    let b_precio = b.precio_rebajado ? b.precio_rebajado : b.precio_normal;

                    return a_precio - b_precio;
                });
            } else {
                sortedArr = response.data.sort((a, b) => {
                    let a_precio = a.precio_rebajado ? a.precio_rebajado : a.precio_normal;
                    let b_precio = b.precio_rebajado ? b.precio_rebajado : b.precio_normal;

                    return b_precio - a_precio;
                });
            }

            setProductos(sortedArr);
            setProductosByCategory(sortedArr.filter(item => itemCategory(item).toLowerCase() === categoria));

            let categoriasArr = [];
            productos.forEach(product => {
                if(!categoriasArr.includes(itemCategory(product))) categoriasArr.push(itemCategory(product));
            })
            setCategories(categoriasArr);
        }).catch(error=>{
            console.log(error.message);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [productos])

    return (
        <Main>
            <section className="main__tienda">
                <aside className="tienda__filtros">
                    <div className="filtros__categoria">
                        <h4 className="filtros--subtitle">FILTRAR POR CATEGORIA</h4>
                        {
                            categories.map(category => 
                                <div key={category} className="categoria__input">
                                    <span className="input--title">{category}</span>
                                    <NavLink to={`/tienda/${category.toLowerCase()}`} className="input__input">
                                        <input className="input--input" type="checkbox" name="categoria" id={category}/>
                                        <span className="input--count">{productos.filter(item => itemCategory(item) === category).length}</span>
                                    </NavLink>
                                </div>
                            )
                        }
                    </div>

                    {/* <div className="filtros__color">
                        <h4 className="filtros--subtitle">FILTRAR POR COLOR</h4>
                        <select className="color__select">
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

                    <div className="filtros__talle">
                        <h4 className="filtros--subtitle">FILTRAR POR TALLE</h4>
                        <div className="talle__input">
                            <span className="input--title">Small</span>
                            <div className="input__input">
                                <input className="input--input" type="checkbox" name="talle" id="small"/>
                                <span className="input--count">6</span>
                            </div>
                        </div>
                        <div className="talle__input">
                            <span className="input--title">Medium</span>
                            <div className="input__input">
                                <input className="input--input" type="checkbox" name="talle" id="medium"/>
                                <span className="input--count">6</span>
                            </div>
                        </div>
                        <div className="talle__input">
                            <span className="input--title">Large</span>
                            <div className="input__input">
                                <input className="input--input" type="checkbox" name="talle" id="large"/>
                                <span className="input--count">6</span>
                            </div>
                        </div>
                    </div> */}
                </aside>
                <div className="tienda__productos" id="productosDiv">
                    <div className="productos__top">
                        <p className="top--title" id="productsResults"></p>
                        <select onChange={ordenarHandler} defaultValue={"nuevos"} className="top--orden" id="ordenSelect">
                            <option value="nuevos">Ordenar por nuevos</option>
                            <option value="preciomenor">Ordenar por precio: bajo a alto</option>
                            <option value="preciomayor">Ordenar por precio: alto a bajo</option>
                        </select>
                    </div>
                    <div className="productos__agregado" id="productoAgregadoDiv">
                        <p className="agregado--title" id="productoAgregado"></p>
                        <a href="./cart.html" className="agregado--carrito">VER CARRITO</a>
                    </div>
                    <ul id="productosUl" className="productos__lista">
                        {
                            categoria ? 
                                productosByCategory.map(item => <ProductoItem key={item.id} producto={item}/> )
                            :
                                productos.map(item => <ProductoItem key={item.id} producto={item}/> )
                        }
                    </ul>
                    <div className="productos__bottom">
                        <div className="bottom--linea"></div>
                        <div className="bottom--cargar" id="circleCargar"></div>
                        <div className="bottom--linea"></div>
                    </div>
                </div>
            </section>
        </Main>
    )
}

export default Tienda;
