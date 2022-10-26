import { useEffect, useState } from "react";
import ProductoItem from '../ProductoItem';
import { Main } from './Inicio';
import { NavLink, useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';
import { Oval } from "react-loader-spinner";

const Tienda = () => {

    const { categoria } = useParams();

    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);
    const [productosByCategory, setProductosByCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [priceFilterLimit, setPriceFilterLimit] = useState([]);
 
    const itemCategory = (product) => ( product.categorias.split(' > ')[0] )
    const onDiscount = (item) => ( item.precio_rebajado ? item.precio_rebajado : item.precio_normal );
    const filterByCategory = (array) => ( array.filter( item => itemCategory(item).toLowerCase() === categoria ));
    const filterByPrice = (array, newValue) => ( array.filter(item => onDiscount(item) >= newValue[0] && onDiscount(item) <= newValue[1]));
    const isArrayEmpty = (array) => ( array.length === 0 );

    const priceHandler = (e, newValue) => {
        setPriceFilter(newValue);

        categoria ?
            setProductosByCategory(filterByPrice(filterByCategory(productos), newValue))
        :
            setProductosByCategory(filterByPrice(productos, newValue))
    }
    
    const ordenarHandler = (e) => {
        let sorted = e.target.value;

        let sortedArr;

        if(sorted === 'nuevos') {
            sortedArr = productos.sort((a, b) => a.id - b.id);
        } else if(sorted === 'preciomenor') {
            sortedArr = productos.sort((a, b) => onDiscount(a) - onDiscount(b));
        } else {
            sortedArr = productos.sort((a, b) => onDiscount(b) - onDiscount(a));
        }

        categoria ?
            setProductosByCategory(filterByCategory(sortedArr))
        :
            setProductosByCategory(sortedArr)
    }

    const peticionGet = () => {

        const db = getFirestore();
        const productsCollection = collection(db, "products");

        getDocs( productsCollection ).then( response => {
            const productsData = response.docs.map( doc => ({docId: doc.id, ...doc.data()}));
            
            let precios = productsData.map(product => onDiscount(product));
            
            setPriceFilterLimit([Math.min(...precios), Math.max(...precios)]);
            setPriceFilter([Math.min(...precios), Math.max(...precios)]);

            setProductos(productsData);
            categoria ? 
                setProductosByCategory(filterByCategory(productsData))
            :
                setProductosByCategory(productsData)
                       
            let categoriasArr = [];
            productsData.forEach(item => {
                if(!categoriasArr.includes(itemCategory(item))) categoriasArr.push(itemCategory(item));
            })

            setCategories(categoriasArr);

            setLoading(false);
        })
    } 

    useEffect(() => {
        if(productos.length === 0) peticionGet();
        else {
            categoria ? 
                setProductosByCategory(filterByCategory(productos))
            :
                setProductosByCategory(productos)
        }

        priceHandler(null, priceFilter);
    }, [categoria])

    return (
        <Main>
            <SectionTienda>
                <FiltrosTienda>
                    <FiltrosCategoria>
                        <FiltrosSubtitle>FILTRAR POR CATEGORIA</FiltrosSubtitle>
                        {
                           loading ? 
                                <Oval
                                height={40}
                                width={40}
                                color="#3498db"
                                wrapperStyle={{ margin: '100px 0' }}
                                visible={true}
                                ariaLabel='Cargando...'
                                secondaryColor="#f3f3f3"
                                strokeWidth={3}
                                strokeWidthSecondary={3}/>
                            :
                                categories.map(category => 
                                    <InputContainer key={category}>
                                        <InputTitle>{category}</InputTitle>
                                        <InputLink to={`/tienda/${category.toLowerCase()}`} className="input">
                                            <FiltrosInput type="checkbox" name="categoria" id={category}/>
                                            <InputCount>{productos.filter(item => itemCategory(item) === category).length}</InputCount>
                                        </InputLink>
                                    </InputContainer>
                                )
                        }
                    </FiltrosCategoria>
                    <FiltrosCategoria>
                        <FiltrosSubtitle>FILTRAR POR PRECIO</FiltrosSubtitle>
                        <Slider style={{ boxSizing: 'border-box' }} min={priceFilterLimit[0]} max={priceFilterLimit[1]} value={priceFilter} onChange={priceHandler} valueLabelDisplay="auto"/>
                        <InputTitle>{priceFilter[0]} - {priceFilter[1]}</InputTitle>
                    </FiltrosCategoria>
                </FiltrosTienda>
                <ProductosTienda>
                    <ProductosTop>
                        <ProductosSelect onChange={ordenarHandler} defaultValue={"nuevos"}>
                            <option value="nuevos">Ordenar por nuevos</option>
                            <option value="preciomenor">Ordenar por precio: bajo a alto</option>
                            <option value="preciomayor">Ordenar por precio: alto a bajo</option>
                        </ProductosSelect>
                    </ProductosTop>
                    <ProductosLista>
                        {
                            isArrayEmpty(productosByCategory) ?
                                loading ? 
                                    <Oval
                                    height={80}
                                    width={80}
                                    color="#3498db"
                                    wrapperStyle={{ gridColumnEnd: 'span 4', justifySelf: 'center', margin: '100px' }}
                                    visible={true}
                                    ariaLabel='Cargando...'
                                    secondaryColor="#f3f3f3"
                                    strokeWidth={3}
                                    strokeWidthSecondary={3}/>
                                :
                                    <h1 style={{ gridColumnEnd: 'span 4', textAlign: 'center' }}>NO SE ENCONTRARON PRODUCTOS</h1>
                            :
                                productosByCategory.map(item => <ProductoItem key={item.id} producto={item}/> )
                        }
                    </ProductosLista>
                    <ProductosBottom className="productos__bottom">
                        <ProductosLinea className="bottom--linea"></ProductosLinea>
                    </ProductosBottom>
                </ProductosTienda>
            </SectionTienda>
        </Main>
    )
}

const SectionTienda = styled.section`
    display: flex;
    padding: 10px 50px;
    width: 100%;
    justify-content: space-between;

    @media only screen and (max-width: 1600px) {
        padding: 10px;
    }
`;

const FiltrosTienda = styled.aside`
    width: 15%;
    min-width: 138px;
    max-height: 580px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px;
    border-radius: 10px;
    gap: 32px;
    position: sticky;
    top: 90px;

    @media only screen and (max-height: 680px) {
        position: static;
    }
`;

const FiltrosSubtitle = styled.h4`
    width: 100%;
    margin: 0 0 10px 0;
    font-weight: 500;
    color: #686868;
    text-align: left;
    font-size: 1rem;
`;

const FiltrosCategoria = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 31px;
    border-bottom: 1px solid #eaecee;
    padding-bottom: 5px;
    position: relative;
`;

const InputTitle = styled.span`
    color: #1c1c1c;
    font-weight: 400;
`;

const InputCount = styled.span`
    width: 25px;
    height: 100%;
    text-align: center;
    border-radius: 50%;
    background: #eaecee;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    transition: all 0.4s ease 0s;
    position: absolute;
    pointer-events: none;
    right: 0;
`;

const FiltrosInput = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
`;

const InputLink = styled(NavLink)`
    position: absolute;
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    &.active ${InputCount} {
        color: #000;
        background: #c9c9c9;
    }
`;

const ProductosTienda = styled.div`
    width: 80%;
    padding: 10px 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    position: relative;

    @media only screen and (min-width: 1281px) and (max-width: 1440px) {
        font-size: 14px;
    }

    @media only screen and (min-width: 901px) and (max-width: 1280px) {
        font-size: 13px;
    }

    @media only screen and (max-width: 900px) {
        font-size: 12px;
    }

    @media only screen and (max-width: 1440px) {
        padding: 10px;
    }
`;

const ProductosTop = styled.div`
    width: 100%;
    max-width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
`;

const ProductosSelect = styled.select`
    height: 30px;
    display: block;
    border: 1px solid #c9c9c9;
    padding: 5px 10px;
    background: #f7f7f7;
    color: #000;
    transition: all 0.4s ease 0s;
    font-size: 0.8em;

    &:focus {
        outline: none;
    }
`;

const ProductosLista = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    gap: 15px;
    justify-content: center;
    align-items: center;

    @media only screen and (min-width: 901px) and (max-width: 1440px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media only screen and (min-width: 631px) and (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (max-width: 630px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ProductosBottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    min-height: 30px;
`;

const ProductosLinea = styled.div`
    height: 2px;
    width: 100%;
    background: #c9c9c9;
`;

export default Tienda;