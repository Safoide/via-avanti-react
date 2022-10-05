import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from "./components/Inicio";
import Tienda from "./components/Tienda";
import Producto from './components/Producto';

function App() {
    return (
        <>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/tienda' element={<Tienda />} />
                <Route path='/producto/:id' element={<Producto />} />
            </Routes>
            <Footer/>
        </BrowserRouter>   
        </>
    );
}

export default App;
