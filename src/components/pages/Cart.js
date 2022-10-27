import { useCart } from "../../context/CartContext";
import { Main } from "./Inicio";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {

    const navigate = useNavigate();

    const onDiscount = (item) => (item.precio_rebajado ? item.precio_rebajado : item.precio_normal);

    const {cartItems, setCartItems, remove} = useCart();

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

    const añadirOrden = (e) => {
        e.preventDefault();

        const ordenObj = {
            fecha: new Date(),
            items: cartItems
        }

        const db = getFirestore();
        const ordersCollection = collection(db, "orders");

        addDoc(ordersCollection, ordenObj);
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
        <Main>
            <MainTitle>CARRITO</MainTitle>

            <CartSection>
                {
                    cartItems.length === 0 ? 
                        <CartVacio>
                            <VacioBarra>
                                <h5>Tu carrito está vacío.</h5>
                            </VacioBarra>
                            <VacioLink to="/tienda">VOLVER A LA TIENDA</VacioLink>
                        </CartVacio>
                    :
                        <>
                            <CartTable>
                                <thead>
                                    <tr>
                                        <TableTag>Producto</TableTag>
                                        <TableTag>Precio Unitario</TableTag>
                                        <TableTag>Cantidad</TableTag>
                                        <TableTag>Subtotal</TableTag>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map(item =>
                                            <tr key={item.docId}>
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
                                                    <ItemText>${onDiscount(item)}</ItemText>
                                                </RowItem>
                                                <RowItem>
                                                    <RowUnidades>
                                                        <UnidadBtn disabled={item.cantidad <= 1 ? true : false} onClick={(event) => restarHandler(event, item)}>-</UnidadBtn>
                                                        <ItemUnidades>{item.cantidad}</ItemUnidades>
                                                        <UnidadBtn disabled={item.cantidad >= 10 ? true : false} onClick={(event) => sumarHandler(event, item)}>+</UnidadBtn>
                                                    </RowUnidades>
                                                </RowItem>
                                                <RowItem>
                                                    <ItemText>${onDiscount(item) * item.cantidad}</ItemText>
                                                </RowItem>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </CartTable>

                            <CartResume>
                                <ResumeTitle>RESUMEN DE COMPRA</ResumeTitle>
                                <ResumeInfo>
                                    <ResumePrice>
                                        <ResumeTable>
                                            <tbody>
                                                <tr>
                                                    <TableTitle>Subtotal</TableTitle>
                                                    <TablePrice>    
                                                        $ { cartItems.reduce((previousValue, currentValue) => previousValue + (onDiscount(currentValue) * currentValue.cantidad), 0 ) }
                                                    </TablePrice>
                                                </tr>
                                                <tr>
                                                    <TableTitle>Envío</TableTitle>
                                                    <TablePrice>$300</TablePrice>
                                                </tr>
                                                <tr>
                                                    <TableTitle>Total</TableTitle>
                                                    <TablePrice>
                                                        $ { cartItems.reduce((previousValue, currentValue) => previousValue + (onDiscount(currentValue) * currentValue.cantidad), 0 ) + 300 }
                                                    </TablePrice>
                                                </tr>
                                            </tbody>
                                        </ResumeTable>
                                    </ResumePrice>
                                    <ResumeBtn onClick={añadirOrden}>COMPRAR</ResumeBtn>
                                </ResumeInfo>       
                            </CartResume>
                        </>
                }
            </CartSection>
        </Main>
    )
}

const MainTitle = styled.h2`
    margin: 1rem 0;
    font-size: 1.5rem;
`;

const CartSection = styled.section`
    display: flex;
    width: 90vw;
    max-width: 1200px;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    flex-direction: row;
    gap: 1rem;
    margin: 0 20px 40px 20px;

    @media only screen and (max-width: 900px) {
        flex-direction: column;
        gap: 20px;
    }
`;

const CartTable = styled.table`
    width: 70%;
    border-collapse: collapse;

    @media only screen and (max-width: 900px) {
        width: 100%;
    }
`;

const TableTag = styled.th`
    border-bottom: 2px solid #ededed;
    padding: 9px 12px;
    text-align: center;
`;

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

const CartVacio = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

const VacioBarra = styled.div`
    border-top: 3px solid #1e85be;
    width: 100%;
    height: 75px;
    background-color: #f7f6f7;
    color: #515151;
    margin: 0 0 1em 0;
    padding: 0 2em;
    font-size: 0.9em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const VacioLink = styled(Link)`
    background-color: #333333;
    color: #fff;
    border: 0;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    padding: 10px 10px;
    text-align: center;
    transition: all .4s ease 0s;

    &:hover {
        background-color: #000;
        color: #fff;
    }
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

const CartResume = styled.div`
    margin-top: 1rem;
    width: 30%;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    padding: 1rem 1rem;

    @media only screen and (max-width: 900px) {
        width: 100%;
    }
`;

const ResumeTitle = styled.h3`
    margin-top: 9px;
    font-size: 1rem;
`;

const ResumeInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;
`;

const ResumePrice = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const ResumeTable = styled.table`
    width: 100%;
`;

const TableTitle = styled.th`
    color: #686868;
    text-align: left;
    font-weight: 600;
    font-size: 1rem;
    padding: 10px 0;
`;

const TablePrice = styled.td`
    color: #252525;
    text-align: right;
    font-weight: 500;
    font-size: 1rem;
    padding: 10px 0;
`;

const ResumeBtn = styled.button`
    padding: 20px 40px;
    border-radius: 10px;
    background-color: #0f700d;
    margin-bottom: 20px;
    font-weight: 600;
    opacity: .7;
    color: white;
    border: 0;
    transition: all .4s ease 0s;

    &:hover {
        opacity: 1;
    }
`;

export default Cart;
