import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from "./components/pages/Inicio";
import Tienda from "./components/pages/Tienda";
import Producto from './components/pages/Producto';
import Cart from './components/pages/Cart';
import ErrorPage from "./components/pages/ErrorPage";
import { ToastContainer } from 'react-toastify';
import {CartProvider} from './context/CartContext';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/tienda' element={<Tienda />} />
                    <Route path='/tienda/:categoria' element={<Tienda />} />
                    <Route path='/producto/:id' element={<Producto />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
                <ToastContainer/>
                <Footer/>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
