import { useCart } from "../../context/CartContext";
import { Main } from "./Inicio";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Cart = () => {

    const onDiscount = (item) => (item.precio_rebajado ? item.precio_rebajado : item.precio_normal);

    const {cartItems, remove} = useCart();

    const removeFromCart = (item) => {
        remove(item);
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

    return (
        <Main>
            <h2 class="main--title">CARRITO</h2>

            <div class="main__barra" id="cartBarraDiv">
                <p class="barra--title" id="cartBarra"></p>
            </div>

            <section id="section" class="main__content cart">
                <table class="content__table">
                    <thead class="table__head">
                        <tr class="head__row">
                            <th class="head__row--tag productoName">Producto</th>
                            <th class="head__row--tag productoPrice">Precio Unitario</th>
                            <th class="head__row--tag productoCantidad">Cantidad</th>
                            <th class="head__row--tag productoSubtotal">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody class="table__body" id="tableBody">
                        {
                            cartItems.map(item =>
                                <tr key={item.docId} className="body__row">
                                    <th class="row__item">
                                        <div class="item__productoInfo">
                                            <i onClick={() => removeFromCart(item)} class='bx bxs-x-circle'></i>
                                            <a class="productoInfo__link">
                                                <img class="productoInfo__link--img" src={item.imagenes[0]} alt={item.nombre} />
                                                <span class="productoInfo__link--title">{item.nombre}</span>
                                            </a>   
                                        </div>       
                                    </th>
                                    <th class="row__item">
                                        <span class="row__item--precio">
                                            { onDiscount(item) }
                                        </span>
                                    </th>
                                    <th class="row__item">
                                        <div class="item__unidades">
                                            <h4 class="item__unidades--cantidad">{item.cantidad}</h4>
                                        </div>
                                    </th>
                                    <th class="row__item">
                                        <span class="row__item--subtotal">{onDiscount(item) * item.cantidad}</span>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <div class="content__resumen">
                    <h3 class="resumen--title">RESUMEN DE COMPRA</h3>
                    <div class="resumen__bottom">
                        <div class="resumen__precios">
                            <table class="precios__table">
                                <tbody class="table__body">
                                    <tr class="body__row">
                                        <th class="body__row--title">Subtotal</th>
                                        <td class="body__row--content" id="subtotal">    
                                            $ { cartItems.reduce((previousValue, currentValue) => previousValue + (onDiscount(currentValue) * currentValue.cantidad), 0 ) }
                                        </td>
                                    </tr>
                                    <tr class="body__row">
                                        <th class="body__row--title">Envío</th>
                                        <td class="body__row--content">$300</td>
                                    </tr>
                                    <tr class="body__row">
                                        <th class="body__row--title">Total</th>
                                        <td class="body__row--content" id="total">
                                            $ { cartItems.reduce((previousValue, currentValue) => previousValue + (onDiscount(currentValue) * currentValue.cantidad), 0 ) + 300 }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button class="resumen--boton" onClick={añadirOrden}>COMPRAR</button>
                    </div>       
                </div>
            </section>
        </Main>
    )
}

export default Cart;
