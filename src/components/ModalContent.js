// import { addDoc, collection, getFirestore } from "firebase/firestore";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
    checkCreditCard,
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtilts.js'
import styled from "styled-components";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Oval } from 'react-loader-spinner';
import { useCart } from '../context/CartContext.js';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import { useCart } from "../context/CartContext.js";

const MySwal = withReactContent(Swal);

const ModalContent = ({modal}) => {

    const {cartItems, setCartItems} = useCart();

    const [inputs, setInputs] = useState({
        cvc: {},
        expiry: {},
        name: {},
        number: {} 
    });

    const [cardInfo, setCardInfo] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    const navigate = useNavigate();

    const handleInputFocus = (e) => setCardInfo({ ...cardInfo, focus: e.target.name });
      
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        e.target.setCustomValidity('');

        switch (name) {
            case "number":
                value = formatCreditCardNumber(value);
                break;
            case "expiry":
                value = formatExpirationDate(value, e);
                break;
            case "cvc":
                value = formatCVC(value, cardInfo);
                break;
        }
        
        setInputs({ ...inputs, [name]: e.target });
        setCardInfo({ ...cardInfo, [name]: value });
    }

    const añadirOrden = () => {
        const ordenObj = {
            fecha: new Date(),
            items: cartItems
        }

        const db = getFirestore();
        const ordersCollection = collection(db, "orders");

        addDoc(ordersCollection, ordenObj);
        
        setCartItems([]);
        modal(false);
    }

    const handleSumbit = (e) => {
        e.preventDefault();

        if(cardInfo.number.split(' ').join('').length < 16) return inputs.number.setCustomValidity('Numero invalido!');
        if(cardInfo.cvc.length < 3) return inputs.cvc.setCustomValidity('Numero invalido!');
        if(cardInfo.expiry.length < 5) return inputs.expiry.setCustomValidity('Numero invalido!');

        MySwal.fire({
            title: <Oval
                height={80}
                width={80}
                color="#3498db"
                visible={true}
                ariaLabel='Cargando...'
                secondaryColor="#f3f3f3"
                wrapperStyle={{ display: 'flex', justifyContent: 'center'}}
                strokeWidth={3}
                strokeWidthSecondary={3}/>,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            timer: 2000
        }).then(() => {
            MySwal.fire({
                title: "¡Pago Aprobado!",
                text: "Gracias por tu compra.",
                icon: "success",
                confirmButtonText: 'VOLVER AL INICIO'
            }).then((isConfirmed) => {
                if(isConfirmed) navigate('/');
            })

            añadirOrden();
        })
        
        setCardInfo({
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        });
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
