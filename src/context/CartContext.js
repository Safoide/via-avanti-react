import { createContext, useContext, useState } from 'react';

const cartContext = createContext([]);

const useCart = () => {
    return useContext(cartContext);
}

const CartProvider = ( {children} ) => {
    
    const [cartItems, setCartItems] = useState([]);

    const add = (item) => {
        if(!cartItems.find(cartItem => cartItem.id === item.id)) {
            item = {
                ...item,
                cantidad: 1
            }

            setCartItems( cartItems => cartItems.concat(item) );
 
        } else {
            const actualizarCantidad = cartItems.map(obj => {
                if (obj.id === item.id) {
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
        setCartItems( items => items.filter(cartItem => cartItem.id !== item.id) )
    }
    
    const context = {
        cartItems,
        add,
        remove
    };

    return (
        <cartContext.Provider value={context}>
            {children}
        </cartContext.Provider>
    )
}

export { useCart, CartProvider };