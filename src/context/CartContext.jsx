import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId) {
        setCartItems((prevItems) => {
            const existing = prevItems.find(
                (item) => item.id === productId
            );

            if (existing) {
                return prevItems.map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                );
            }

            return [
                ...prevItems,
                {
                    id: productId,
                    quantity: 1,
                },
            ];
        });
    }

    function getCartItemsWithProducts() {
        return cartItems
            .map((cartItem) => ({
                ...cartItem,
                product: getProductById(cartItem.id),
            }))
            .filter((item) => item.product);
    }

    function removeFromCart(productId) {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) => item.id !== productId
            )
        );
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }

    function getCartTotal() {
        return cartItems.reduce((total, item) => {
            const product = getProductById(item.id);

            return (
                total +
                (product
                    ? product.price * item.quantity
                    : 0)
            );
        }, 0);
    }

    function clearCart() {
        setCartItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                getCartItemsWithProducts,
                removeFromCart,
                updateQuantity,
                getCartTotal,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used within a CartProvider"
        );
    }

    return context;
}

export { useCart };