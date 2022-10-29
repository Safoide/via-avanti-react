// import { addDoc, collection, getFirestore } from "firebase/firestore";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtilts.js'
import styled from "styled-components";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Oval } from 'react-loader-spinner';
// import { useCart } from "../context/CartContext.js";

const MySwal = withReactContent(Swal);

const ModalContent = () => {

    const [loading, setLoading] = useState(true);
    const [cardInfo, setCardInfo] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    // const {cartItems, setCartItems } = useCart();

    const handleInputFocus = (e) => setCardInfo({ ...cardInfo, focus: e.target.name });
      
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        e.target.setCustomValidity('');

        if (name === "number") {
            value = formatCreditCardNumber(value);
        } else if (name === "expiry") {
            value = formatExpirationDate(value, e);
        } else if (name === "cvc") {
            value = formatCVC(value, cardInfo);
        }
        
        setCardInfo({ ...cardInfo, [name]: value });
    }

    // const añadirOrden = (e) => {
    //     e.preventDefault();

    //     const ordenObj = {
    //         fecha: new Date(),
    //         items: cartItems
    //     }

    //     const db = getFirestore();
    //     const ordersCollection = collection(db, "orders");

    //     addDoc(ordersCollection, ordenObj);
        
    //     setCartItems([]);
    // }

    const handleSumbit = (e) => {
        e.preventDefault();

        console.log(cardInfo);

        MySwal.fire({
            title: <Oval
                height={80}
                width={80}
                color="#3498db"
                visible={true}
                ariaLabel='Cargando...'
                secondaryColor="#f3f3f3"
                strokeWidth={3}
                strokeWidthSecondary={3}/>,
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            MySwal.fire({
                title: "¡Correo enviado con Éxito!",
                text: "Gracias por tu consulta, en breve nos pondremos en contacto.",
                icon: "success",
                closeOnClickOutside: true,
                button: {
                    text: 'VOLVER AL INICIO'
                }
            })
        })

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    return (
        <ModalContainer>
            <Cards
                number={cardInfo.number}
                name={cardInfo.name}
                expiry={cardInfo.expiry}
                cvc={cardInfo.cvc}
                focused={cardInfo.focus}
                placeholders={{ name: 'Nombre y apellido' }}
            />
            <CardForm onSubmit={handleSumbit}>
                <input
                    type="text"
                    name="number"
                    placeholder="Número de tarjeta"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={cardInfo.number}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre y apellido"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={cardInfo.name}
                    required
                />
                <ShortInputs>
                    <input
                        type="text"
                        name="expiry"
                        placeholder="Fecha de expiración"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={cardInfo.expiry}
                        required
                    />
                    <input
                        type="text"
                        name="cvc"
                        placeholder="Código de seguridad"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={cardInfo.cvc}
                        required
                    />
                </ShortInputs>
                <FormBtn type="sumbit">COMPRAR</FormBtn>
            </CardForm>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
`;

const CardForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    
    input {
        border: 0;
        outline: none;
        border-bottom: 2px solid black;
        transition: all .3s ease 0s;
        height: 30px;
        border-radius: 0;

        &:focus {
            border-bottom-color: #3483fa;
        }
    }
`;

const ShortInputs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const FormBtn = styled.button`
    border: 0;
    border-radius: 5px;
    background: #3483fa;
    color: #fff;
    padding: 5px 0;
    transition: all .3s ease 0s;

    &:hover {
        background: #0165fa;
    }
`;

export default ModalContent
