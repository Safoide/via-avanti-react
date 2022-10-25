import { createContext, useContext } from 'react';
import useLocalStorage from "../hooks/useLocalStorage";

const cartContext = createContext({
    cartItems: [],
    add: () => {},
    remove: () => {},
    count: 0
});

const useCart = () => {
    return useContext(cartContext);
}

const CartProvider = ( {children} ) => {
    
    const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

    const add = (item) => {
        if(!cartItems.find(cartItem => cartItem.id === item.id)) {
            item = {
                ...item,
                cantidad: 1
            }

            setCartItems( cartItems => cartItems.concat(item) );
 
        } else {
            const actualizarCantidad = cartItems.map(obj => {
                if (obj.docId === item.docId) {
                    if(obj.cantidad >= 10) return {
                        ...obj,
                        cantidad: 10
                    }
                    
                    return {
                        ...obj,
                        cantidad: obj.cantidad + 1
                    };
                }
          
                return obj;
            });
          
            setCartItems(actualizarCantidad);
        }
    }

    const remove = (item) => {
        setCartItems( items => items.filter(cartItem => cartItem.docId !== item.docId) )
    }
    
    const context = {
        cartItems: cartItems,
        setCartItems: setCartItems,
        add: add,
        remove: remove,
        count: cartItems.length
    };

    return (
        <cartContext.Provider value={context}>
            {children}
        </cartContext.Provider>
    )
}

export { useCart, CartProvider };