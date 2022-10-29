import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { toast } from "react-toastify";

const CartItem = ({ item }) => {

    const { cartItems, setCartItems, remove} = useCart();
    const navigate = useNavigate();

    const onDiscount = (item) => (item.precio_rebajado ? item.precio_rebajado : item.precio_normal);

    const removeFromCart = (item) => {
        remove(item);

        toast.error(`${item.nombre} fue eliminado del carrito!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            onClick: () => navigate(`/producto/${item.tag}`)
        });
    }

    const recargarBoton = (sibling, unidades) => {
        if(unidades < 10) {
            sibling.nextElementSibling.disabled = false;
        }
        if(unidades > 1) {
            sibling.previousElementSibling.disabled = false;
        }
    }

    const restarHandler = (event, item) => {
        let unidades = item.cantidad;
        const actualizarCantidad = cartItems.map(obj => {
            if (obj.docId === item.docId) {
                unidades--;
                return {
                    ...obj,
                    cantidad: obj.cantidad - 1
                };
            }
            
            return obj;
        });
        
        setCartItems(actualizarCantidad);

        if(unidades <= 1) event.target.disabled = true;

        recargarBoton(event.target.nextElementSibling, unidades);
    }

    const sumarHandler = (event, item) => {
        let unidades = item.cantidad;

        const actualizarCantidad = cartItems.map(obj => {
            if (obj.docId === item.docId) {
                unidades++;
                return {
                    ...obj,
                    cantidad: obj.cantidad + 1
                };
            }
        
            return obj;
        });
        
        setCartItems(actualizarCantidad);

        if(unidades >= 10) event.target.disabled = true;

        recargarBoton(event.target.previousElementSibling, unidades);
    }

    return (
        <tr>
            <RowItem>
                <ItemProduct>
                    <i onClick={() => removeFromCart(item)} className='bx bx-trash'></i>
                    <ItemLink to={`/producto/${item.tag}`}>
                        <img src={item.imagenes[0]} alt={item.nombre} />
                        <ItemText >{item.nombre}</ItemText>
                    </ItemLink>
                </ItemProduct>
            </RowItem>
            <RowItem>
                <ItemText>$ {onDiscount(item)}</ItemText>
            </RowItem>
            <RowItem>
                <RowUnidades>
                    <UnidadBtn disabled={item.cantidad <= 1 ? true : false} onClick={(event) => restarHandler(event, item)}>-</UnidadBtn>
                    <ItemUnidades>{item.cantidad}</ItemUnidades>
                    <UnidadBtn disabled={item.cantidad >= 10 ? true : false} onClick={(event) => sumarHandler(event, item)}>+</UnidadBtn>
                </RowUnidades>
            </RowItem>
            <RowItem>
                <ItemText>$ {onDiscount(item) * item.cantidad}</ItemText>
            </RowItem>
        </tr>
    )
}

const RowItem = styled.th`
    border-top: 1px solid #ededed;
    padding: 5px 5px;
    text-align: center;
`;

const ItemProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 10px;

    .bx::before {
        font-size: 1.25rem;
        color: red;
        cursor: pointer;
    }
`;

const ItemLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
        height: 140px;
        margin: 0 10px;
    }

    @media only screen and (max-width: 519px) {
        flex-direction: column;

        img {
            height: 100px;
        }
    }
`;

const ItemText = styled.span`
    color: black;
    font-weight: 700;
`;

const RowUnidades = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ItemUnidades = styled.span`
    display: inline-block;
    width: 30px;
    padding: 0 5px;
`;

const UnidadBtn = styled.button`
    border: 1px solid rgba(0, 0, 0, 1);
    width: 30px;
    height: 30px;
    background: #fff;
    font-weight: 700;
    transition: all .3s ease 0s;

    &:disabled {
        color: gray;
        border-color: rgba(0, 0, 0, .4);
    }

    &:hover {
        background: rgba(0, 0, 0, .1);
    }
`;

export default CartItem
