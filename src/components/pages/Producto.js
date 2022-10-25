import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Main } from './Inicio';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import styled from 'styled-components';

const Producto = () => {

    const { id } = useParams();
    const { add } = useCart();

    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const itemCategory = (product) => ( product.categorias.split(' > ')[0] )

    const peticionGet = () => {
        const db = getFirestore();
        const productsQuery = collection(db, "products");

        const q = query(productsQuery, where("tag", "==", id));

        getDocs(q).then(response => {
            let producto;
            response.forEach((doc) => {
                producto = {
                    docId: doc.id,
                    ...doc.data()
                }
            });
            setProducto(producto);
            setLoading(false);
        })
    }

    useEffect(() => {
        peticionGet();
    }, [])


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
                    <ProductSection key={producto.id}>
                        <ProductImages>
                            <img src={producto.imagenes[0]} alt="Foto del Producto"/>
                        </ProductImages>
                        <ProductInfo>
                            <InfoNav>
                                <NavLink to={"/"}>INICIO</NavLink>
                                <NavLink to={`/tienda/${itemCategory(producto).toLowerCase()}`}>{itemCategory(producto).toUpperCase()}</NavLink>
                                <NavProduct>{producto.nombre.toUpperCase()}</NavProduct>
                            </InfoNav>
                            <ProductTitle>{producto.nombre}</ProductTitle>
                            <ProductPrecios>
                                {producto.precio_rebajado ? (
                                    <>
                                        <ProductPrecio className="descuento">${producto.precio_normal}</ProductPrecio>
                                        <ProductPrecio>${producto.precio_rebajado}</ProductPrecio>
                                    </>
                                ) : (
                                    <ProductPrecio >${producto.precio_normal}</ProductPrecio>
                                )}
                                <ProductIva>- IVA Incluido</ProductIva>
                            </ProductPrecios>
                            <ProductDescription>{producto.descripcion_corta}</ProductDescription>

                            <ProductCarrito>
                                <ProductBtn type="button" onClick={addToCart}>AÑADIR AL CARRITO</ProductBtn>
                            </ProductCarrito>
                        </ProductInfo>
                    </ProductSection>
            }
        </Main>
    )
}

const ProductSection = styled.section`
    padding: 20px 20px;
    min-width: 58.5%;
    max-width: 1140px;
    display: flex;
`;

const ProductImages = styled.div`
    width: 43.7%;
    margin: 0;

    img {
        width: 100%;
    }
`;

const ProductInfo = styled.div`
    padding: 0 20px;
    width: 56.3%;
    min-width: 50%;
`;

const InfoNav = styled.nav`
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-bottom: 10px;
    gap: 10px;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: #777777;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 5px;
    transition: all .3s ease 0s;

    &::after {
        border-top: 1px solid currentColor;
        border-left: 1px solid currentColor;
        content: "";
        width: 5px;
        height: 5px;
        transform: rotate(135deg);
    }

    &:hover {
        color: #000;
    }
`;

const NavProduct = styled.p`
    margin: 0;
    color: #777777;
    transition: all .3s ease 0s;

    &:hover {
        color: #000;
    }
`;

const ProductTitle = styled.h1`
    font-size: 26px;
`;

const ProductPrecios = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 10px 0;
`;

const ProductPrecio = styled.span`
    display: inline-block;
    font-size: 16px;
    color: #000;
    font-weight: 600;
    margin: 0;

    &.descuento {
        color: rgb(189, 189, 189);
        text-decoration: line-through;
    }
`;

const ProductIva = styled.p`
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    color: #000;
`;

const ProductDescription = styled.p`
    margin: 20px 0;
    font-weight: 500;
    font-size: 16px;
`;

const ProductCarrito = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-height: 50px;
    max-width: 20rem;
    margin-top: 10px;
    justify-content: start;
    align-items: center;
    gap: 20px;
`;

const ProductBtn = styled.button`
    border: 0;
    border-radius: 10px;
    background-color: #0f700d;
    opacity: .5;
    color: #fff;
    transition: $transition-4s;
    font-size: 16px;
    font-weight: 600;
    padding: 0;
    cursor: pointer;
    text-align: center;
    width: 200px;
    height: 30px;

    &:hover {
        opacity: 1;
    }
`;

export default Producto;