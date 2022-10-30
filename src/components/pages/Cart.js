import { useCart } from "../../context/CartContext";
import { Main } from "./Inicio";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-modal';
import CartItem from "../CartItem";
import ModalContent from "../ModalContent";

const modalStyles = {
    overlay: {
        zIndex: 300,
        backgroundColor: 'rgba(255, 255, 255, .3)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
};

Modal.setAppElement('#root');

const Cart = () => {
    
    const {cartItems } = useCart();

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onDiscount = (item) => (item.precio_rebajado ? item.precio_rebajado : item.precio_normal);

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
                                        cartItems.map(item => <CartItem key={item.docId} item={item}/> )
                                    }
                                </tbody>
                            </CartTable>

                            <CartResume>
                                <ResumeTitle>RESUMEN DE COMPRA</ResumeTitle>
                                <ResumeInfo>
                                    <ResumePrices>
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
                                                    <TablePrice>$ 300</TablePrice>
                                                </tr>
                                                <tr>
                                                    <TableTitle>Total</TableTitle>
                                                    <TablePrice>
                                                        $ { cartItems.reduce((previousValue, currentValue) => previousValue + (onDiscount(currentValue) * currentValue.cantidad), 0 ) + 300 }
                                                    </TablePrice>
                                                </tr>
                                            </tbody>
                                        </ResumeTable>
                                    </ResumePrices>
                                    <ResumeBtn onClick={openModal}>TERMINAR COMPRA</ResumeBtn>
                                </ResumeInfo>       
                            </CartResume>
                        </>
                }
            </CartSection>

            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              style={modalStyles}
            >
                <ModalContent modal={setIsOpen}/>
            </Modal>
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

const ResumePrices = styled.div`
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
    color: #098003;
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
