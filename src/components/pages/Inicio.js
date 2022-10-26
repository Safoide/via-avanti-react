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
                    <img src={"../imgs/carousel/carousel1.jpg"} alt="Carousel 1" />
                    <MyCarouselCaption>
                        <CaptionText>Vibramos en distintas frecuencias, <strong>compartimos un mismo ideal</strong>, ser nosotras mismas.</CaptionText>
                        <CaptionLink to="/tienda">TIENDA</CaptionLink>
                    </MyCarouselCaption>
                </MyCarouselItem>
                <MyCarouselItem>
                    <img src={"../imgs/carousel/carousel2.jpg"} alt="Carousel 2"  />
                    <MyCarouselCaption>
                        <CaptionText>Vibramos en distintas frecuencias, <strong>compartimos un mismo ideal</strong>, ser nosotras mismas.</CaptionText>
                        <CaptionLink to="/tienda">TIENDA</CaptionLink>
                    </MyCarouselCaption>
                </MyCarouselItem>
                <MyCarouselItem>
                    <img src={"../imgs/carousel/carousel3.jpg"} alt="Carousel 3"  />
                    <MyCarouselCaption>
                        <CaptionText>Vibramos en distintas frecuencias, <strong>compartimos un mismo ideal</strong>, ser nosotras mismas.</CaptionText>
                        <CaptionLink to="/tienda">TIENDA</CaptionLink>
                    </MyCarouselCaption>
                </MyCarouselItem>
            </MyCarousel>
            <InicioSection>
                <SectionTitle>OFERTAS</SectionTitle>
                <SectionArticle>
                    <SectionList>
                        {
                            productosDesc.map(item => <ProductoItem key={item.id} producto={item}/> )
                        }
                    </SectionList>
                </SectionArticle>
            </InicioSection>
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

const InicioSection = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px 80px;
    text-align: center;
    width: 100%;
    max-width: 100vw;
    gap: 20px;
`;

const SectionTitle = styled.h2`
    font-weight: 600;
`;

const SectionArticle = styled.article`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
`;

const SectionList = styled.ul`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export default Inicio;
export { Main };