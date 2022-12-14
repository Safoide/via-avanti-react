import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductoItem = ({ producto }) => {

    return (
        producto.precio_rebajado ?
            <ItemList key={producto.id}>
                <ItemLink to={`/producto/${producto.tag}`} className="descuento">
                    <ItemImg className="fimg" src={producto.imagenes[0]} alt={producto.nombre}/>
                    <ItemImg className="simg" src={producto.imagenes[1]} alt={producto.nombre} />
                    <ItemTitle>{producto.nombre.toUpperCase()}</ItemTitle>
                    <ItemPrecio>
                        <Precio className="descuento">${producto.precio_normal}</Precio>
                        <Precio>${producto.precio_rebajado}</Precio>
                        <PrecioIva>- IVA Incluido</PrecioIva>
                    </ItemPrecio>
                </ItemLink>
            </ItemList>
        :
            <ItemList key={producto.id}>
                <ItemLink to={`/producto/${producto.tag}`}>
                    <ItemImg className="fimg" src={producto.imagenes[0]} alt={producto.nombre}/>
                    <ItemImg className="simg" src={producto.imagenes[1]} alt={producto.nombre}/>
                    <ItemTitle>{producto.nombre.toUpperCase()}</ItemTitle>
                    <ItemPrecio>
                        <Precio>${producto.precio_normal}</Precio>
                        <PrecioIva>- IVA Incluido</PrecioIva>
                    </ItemPrecio>
                </ItemLink>
            </ItemList>
    )
}

const ItemList = styled.li`
    height: 100%;
    width: 100%;
    padding: 0;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.15);
`;

const ItemImg = styled.img`
    width: 100%;
    pointer-events: none;

    &.fimg {
        transition: all 0.3s ease 0s;
    }

    &.simg {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        transition: all .3s ease 0s;
    }
`;

const ItemLink = styled(Link)`
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(236, 236, 236);
    position: relative;
    transition: all .3s ease 0s;
    gap: 15px;

    &.descuento::after {
        content: 'OFERTA';
        background-color: #008000;
        padding: 0 7px;
        height: 30px;
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        font-weight: 700;
        color: #fff;
        opacity: .8;
        transition: all .3s ease 0s;
        pointer-events: none;
    }

    &:hover,
    &:focus {
        background-color: rgb(211, 211, 211);

        ${ItemImg}.fimg {
            opacity: 0;
        }

        ${ItemImg}.simg {
            opacity: 1;
        }

        &.descuento::after {
            opacity: 1;
        }
    }
`;

const ItemTitle = styled.h3`
    font-size: 1.2em;
    color: #000;
    font-weight: bold;
    max-width: 90%;
    text-align: center;
    pointer-events: none;
`;

const ItemPrecio = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1em;
    pointer-events: none;
    margin-bottom: 15px;
`;

const Precio = styled.span`
    display: inline-block;
    font-weight: 600;
    color: #000;
    margin: 0;

    &.descuento {
        color: rgb(189, 189, 189);
        text-decoration: line-through;
    }
`;

const PrecioIva = styled.p`
    color: #000;
    margin: 0;
    font-weight: 500;
`;

export default ProductoItem;