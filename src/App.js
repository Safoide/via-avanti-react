import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from "./components/pages/Inicio";
import Tienda from "./components/pages/Tienda";
import Producto from './components/pages/Producto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/tienda/*' element={<Tienda />} />
                <Route path='/producto/:id' element={<Producto />} />
            </Routes>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
