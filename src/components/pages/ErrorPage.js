import { Main } from './Inicio';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <Main>
            <ErrorSection className="main__content error">
                <ErrorEmote className='content--emote bx bx-error-circle'></ErrorEmote>
                <ErrorTitle className="content--title">Lamentablemente no pudimos encontrar esa página.</ErrorTitle>
                <ErrorLink className="content--linkHome" to="/">INICIO</ErrorLink>
            </ErrorSection>
        </Main>
    )
}

const ErrorSection = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px 80px;
    text-align: center;
    width: 100%;
    max-width: 100vw;
    gap: 20px;
`;

const ErrorEmote = styled.i`
    font-size: 100px;
`;

const ErrorTitle = styled.h2`
    font-weight: bold;
    margin-bottom: 1rem;
`;

const ErrorLink = styled(Link)`
    color: #FFF;
    text-decoration: none;
    font-weight: 600;
    padding: 15px 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    opacity: .7;
    background-color: #000;
    width: 10rem;
    transition: all .4s ease 0s;

    &:hover,
    &:focus {
        opacity: 1;
        color: #FFF;
    }
`;

export default ErrorPage;
