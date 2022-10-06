import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import ProductoItem from '../ProductoItem';
import styled from 'styled-components';

const Inicio = () => {
    
    const [productosDesc, setProductosDesc] = useState([]);

    const peticionGet = () => {
        axios.get('data.json').then(response=>{
            setProductosDesc(response.data.filter(p => p.precio_rebajado != null));
        }).catch(error=>{
            console.log(error.message);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [productosDesc])

    return (
        <Main>
            <section className="main__content">
                <h2 className="content--title">OFERTAS</h2>
                <article className="content__article">
                    <ul className="article__menu" id="ofertasUl">
                        {
                            productosDesc.map(item => <ProductoItem key={item.id} producto={item}/> )
                        }
                    </ul>
                </article>
            </section>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
`;

export default Inicio;
export { Main };