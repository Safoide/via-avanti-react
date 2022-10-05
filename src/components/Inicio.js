import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import ProductoItem from './ProductoItem';

const Inicio = () => {
    
    const [productos, setProductos] = useState([]);
    const [productosDesc, setProductosDesc] = useState([]);

    const peticionGet = () => {
        axios.get('data.json').then(response=>{
            setProductos(response.data);
            setProductosDesc(productos.filter(p => p.precio_rebajado != null));
        }).catch(error=>{
            console.log(error.message);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [productos])

    return (
        <main className="main">
            <section className="main__content">
                <h2 className="content--title">OFERTAS</h2>
                <article className="content__article">
                    <ul className="article__menu" id="ofertasUl">
                        {
                            productosDesc.map(item => <ProductoItem key={item.id} {...item}/> )
                        }
                    </ul>
                </article>
            </section>
        </main>
    )
}

export default Inicio
