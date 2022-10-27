import { useRef } from 'react';
import emailjs from '@emailjs/browser';  
import { Main } from './Inicio';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {

    const navigate = useNavigate();

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_t9tqlsm', 'template_3mlzhdi', form.current, 'slU4ntJqpV3aDM9cA')
            .then((result) => {
                result.text === 'OK' ? 
                    swal({
                        title: "¡Correo enviado con Éxito!",
                        text: "Gracias por tu consulta, en breve nos pondremos en contacto.",
                        icon: "success",
                        closeOnClickOutside: true,
                        button: {
                            text: 'VOLVER AL INICIO'
                        }
                    }).then((isConfirmed) => {
                        if(isConfirmed) navigate('/');
                    })
                :
                    swal({
                        title: "¡Hubo un error al enviar el correo!",
                        icon: "error",
                        closeOnClickOutside: true,
                        buttons: false
                    });

                e.target.reset();
            }, (error) => {
                swal({
                    title: "¡Hubo un error al enviar el correo!",
                    icon: "error",
                    closeOnClickOutside: true,
                    buttons: false
                });
                console.log(error.text);
            });
    };

    return (
        <Main>
            <ContactoSection>
                <ContactoTitle>Envianos tu consulta o comentario.</ContactoTitle>
                <ContactoForm ref={form} onSubmit={sendEmail}>
                    <FormInputs>
                        <InputsContainer >
                            <InputLabel for="name">Nombre completo <strong>*</strong></InputLabel>
                            <InputNames>
                                <Input type="text" name="user_name" placeholder="Nombre" autofocus required/>
                                <Input type="text" name="user_surname" placeholder="Apellido/s" required/>
                            </InputNames>
                        </InputsContainer>
                        <InputsContainer>
                            <InputLabel for="email">Correo electrónico <strong>*</strong></InputLabel>
                            <Input className="email" type="email" name="user_email" placeholder="Correo Electrónico" required/>
                        </InputsContainer>
                        <InputsContainer>
                            <InputLabel for="textarea">Comentario o mensaje <strong>*</strong></InputLabel>
                            <InputText name="user_message" placeholder="Dejanos tu mensaje..." required></InputText>
                        </InputsContainer>
                    </FormInputs>
                    <FormBtnContainer>
                        <FormBtn type="submit">Enviar Formulario</FormBtn>
                    </FormBtnContainer>
                </ContactoForm>
            </ContactoSection>
        </Main>
    )
}

const ContactoSection = styled.section`
    align-items: flex-start;
    width: 70%;
    font-size: 16px;
`;

const ContactoTitle = styled.h3`
    margin: 15px 0;
    font-size: 1.5em;
    font-weight: 400;
    color: #2b2b2b;
    width: 100%;
    text-align: left;
`;

const ContactoForm = styled.form`
    height: 28rem;
    width: 100%;
    max-width: 90%;
    display: flex;
    flex-direction: column;
`;

const FormInputs = styled.div`
    margin-top: 25px;
    height: 75%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    text-align: left;
`;

const InputLabel = styled.label`
    color: #252525;
    font-weight: 700;
    margin-bottom: 4px;
    font-size: 16px;

    strong {
        color: red;
        font-weight: 500;
    }
`;

const InputNames = styled.div`
    display: flex;
    gap: 20px;
    max-width: 100%;
`;

const Input = styled.input`
    width: 50%;
    padding: 6px 10px;
    height: 38px;
    transition: all .4s ease 0s;
    outline: none;
    border-radius: 2px;
    color: #333;
    border: 1px solid #ccc;
    line-height: 1.5;

    &:focus {
        border: 1px solid #999;
    }
    
    &.email {
        width: 100%;
    }
`;

const InputText = styled.textarea`
    width: 100%;
    height: 120px;
    font-family: 'Popins', sans-serif;
    padding: 6px 10px;
    transition: all .4s ease 0s;
    outline: none;
    border-radius: 2px;
    color: #333;
    border: 1px solid #ccc;
    line-height: 1.5;

    &:focus {
        border: 1px solid #999;
    }
`;

const FormBtnContainer = styled.div`
    margin-top: auto;
    margin-bottom: 15px;
    width: 20rem;
    display: flex;
    justify-content: space-between;
`;

const FormBtn = styled.button`
    padding: 10px 10px;
    border: 0;
    font-size: .9rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #333;
    transition: all .4s ease 0s;
    background-color: #EEE;
    border: 1px solid #ddd;

    &:hover {
        background-color: #ddd;
        border: 1px solid #ccc;
    }
`;

export default Contacto;