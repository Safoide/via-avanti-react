import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import ProductoItem from '../ProductoItem';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const Inicio = () => {
    
    const [productosDesc, setProductosDesc] = useState([]);

    const peticionGet = () => {

        const db = getFirestore();
        const productsQuery = query(collection(db, "products"), where("precio_rebajado", "!=", null));

        getDocs(productsQuery).then(response => {
            const productsData = response.docs.map( doc => ({docId: doc.id, ...doc.data()}));

            setProductosDesc(productsData);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <Main>
            <MyCarousel interval={8000} controls={false} indicators={false} keyboard={false} pause={false} touch={false}>
                <MyCarouselItem>
                    <img src={"../imgs/carousel/carousel1.jpg"} />
                    <MyCarouselCaption>
                        <CaptionText>Vibramos en distintas frecuencias, <strong>compartimos un mismo ideal</strong>, ser nosotras mismas.</CaptionText>
                        <CaptionLink to="/tienda">TIENDA</CaptionLink>
                    </MyCarouselCaption>
                </MyCarouselItem>
                <MyCarouselItem>
                    <img src={"../imgs/carousel/carousel2.jpg"} />
                    <MyCarouselCaption>
                        <CaptionText>Vibramos en distintas frecuencias, <strong>compartimos un mismo ideal</strong>, ser nosotras mismas.</CaptionText>
                        <CaptionLink to="/tienda">TIENDA</CaptionLink>
                    </MyCarouselCaption>
                </MyCarouselItem>
                <MyCarouselItem>
                    <img src={"../imgs/carousel/carousel3.jpg"} />
                    <MyCarouselCaption>
                        <CaptionText>Vibramos en distintas frecuencias, <strong>compartimos un mismo ideal</strong>, ser nosotras mismas.</CaptionText>
                        <CaptionLink to="/tienda">TIENDA</CaptionLink>
                    </MyCarouselCaption>
                </MyCarouselItem>
            </MyCarousel>
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

const MyCarousel = styled(Carousel)`
    width: 100%;
`;

const MyCarouselItem = styled(Carousel.Item)`
    overflow: hidden;

    img {
        min-width: 100%;
        max-width: 100%;
        height: 78vh;
    }

    &.active img {
        animation: infinite alternate zoomin;
        animation-duration: 8s;
    }

    @keyframes zoomin {
        0% {
            transform: scale(1);
        }

        100% {
            transform: scale(1.1);
        }
    }
`;

const MyCarouselCaption = styled(Carousel.Caption)`
    bottom: 4rem;
    z-index: 10;
`;

const CaptionText = styled.p`
    font-size: 1.88em;
    font-weight: 200;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0.2);
    margin-bottom: 25vh;

    strong {
        font-weight: 600;
    }
`;

const CaptionLink = styled(Link)`
    background-color: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease 0s;
    margin-bottom: 10px;
    font-weight: 600;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 3px;
    font-size: 1.25em;
    color: #212529;

    &:hover,
    &:focus {
        background-color: #FFF;
        color: #000;
    }
`;

export default Inicio;
export { Main };