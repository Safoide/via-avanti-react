import React from 'react';
import { useEffect, useState } from "react";
import ProductoItem from '../ProductoItem';
import { Main } from './Inicio';
import { NavLink, useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const Tienda = () => {

    let categoria = useParams();
    categoria = categoria['*'];

    const [productos, setProductos] = useState([]);
    const [productosByCategory, setProductosByCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);

    const itemCategory = (product) => ( product.categorias.split(' > ')[0] )
    
    const onDiscount = (item) => ( item.precio_rebajado ? item.precio_rebajado : item.precio_normal );
    
    const ordenarHandler = (e) => {
        let sorted = e.target.value;

        let sortedArr;

        if(sorted === 'nuevos') {
            sortedArr = productos.sort((a, b) => a.id - b.id);
        } else if(sorted === 'preciomenor') {
            sortedArr = productos.sort((a, b) => onDiscount(a) - onDiscount(b));
        } else {
            sortedArr = productos.sort((a, b) => onDiscount(b) - onDiscount(a));
        }

        setProductos(sortedArr);
        setProductosByCategory(sortedArr.filter(item => itemCategory(item).toLowerCase() === categoria));
    }

    const peticionGet = () => {

        const db = getFirestore();
        const productsCollection = collection(db, "products");

        getDocs( productsCollection ).then( response => {
            const productsData = response.docs.map( doc => ({docId: doc.id, ...doc.data()}));

            setProductos(productsData);
            setProductosByCategory(productsData.filter(item => itemCategory(item).toLowerCase() === categoria));
           
            let categoriasArr = [];
            let colorsArr = [];

            productsData.forEach(item => {
                if(!categoriasArr.includes(itemCategory(item))) categoriasArr.push(itemCategory(item));

                for(let i = 0; i < item.colores.length; i++) {
                    if(!colorsArr.includes(item.colores[i])) colorsArr.push(item.colores[i]);
                }
            })

            setCategories(categoriasArr);
            setColors(colorsArr);
        })
    }

    const categoryHandler = () => {
        
        setProductosByCategory(productos.filter(item => itemCategory(item).toLowerCase() === categoria));

        console.log(categoria)
    }

    useEffect(() => {
        peticionGet();
    }, [])

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
                                    <NavLink to={`/tienda/${category.toLowerCase()}`} onClick={categoryHandler} className="input__input">
                                        <input className="input--input" type="checkbox" name="categoria" id={category}/>
                                        <span className="input--count">{productos.filter(item => itemCategory(item) === category).length}</span>
                                    </NavLink>
                                </div>
                            )
                        }
                    </div>

                    <div className="filtros__color">
                        <h4 className="filtros--subtitle">FILTRAR POR COLOR</h4>
                        <select className="color__select">
                            <option value>Cualquier Color</option>
                            {
                                colors.map(color => 
                                    <option key={color} value={color.toLowerCase()}>{color}</option>
                                )
                            }
                        </select>
                    </div>

                    {/* <div className="filtros__talle">
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
