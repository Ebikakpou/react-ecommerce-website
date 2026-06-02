import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
    const { user } = useAuth();

    const {
        getCartItemsWithProducts,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        clearCart,
    } = useCart();

    const cartItems = getCartItemsWithProducts();
    const cartTotal = getCartTotal();

    const profile =
        JSON.parse(
            localStorage.getItem(
                `profile_${user.email}`
            )
        ) || {
            name: "",
            email: user.email,
            phone: "",
            address: "",
        };

    function placeOrder() {
        if (
            !profile.name ||
            !profile.phone ||
            !profile.address
        ) {
            alert(
                "Please complete your profile before placing an order."
            );
            return;
        }

        const order = {
            customer: profile,
            items: cartItems,
            total: cartTotal,
            date: new Date().toISOString(),
        };

        console.log("Order:", order);

        alert("Order placed successfully!");

        clearCart();
    }

    return (
        <div className="page">
            <div className="container">
                <h1 className="page-title">
                    Checkout
                </h1>

                <div className="checkout-container">
                    <div className="checkout-items">
                        <h2 className="checkout-section-title">
                            Order Summary
                        </h2>

                        {cartItems.length === 0 ? (
                            <p>
                                Your cart is empty.
                            </p>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="checkout-item"
                                >
                                    <img
                                        src={
                                            item.product
                                                .image
                                        }
                                        alt={
                                            item.product
                                                .name
                                        }
                                        className="checkout-item-image"
                                    />

                                    <div className="checkout-item-details">
                                        <h3 className="checkout-item-name">
                                            {
                                                item
                                                    .product
                                                    .name
                                            }
                                        </h3>

                                        <p>
                                            Quantity:{" "}
                                            {
                                                item.quantity
                                            }
                                        </p>
                                    </div>

                                    <div className="checkout-item-controls">
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-btn"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity -
                                                            1
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span>
                                                {
                                                    item.quantity
                                                }
                                            </span>

                                            <button
                                                className="quantity-btn"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity +
                                                            1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="checkout-item-total">
                                            $
                                            {(
                                                item
                                                    .product
                                                    .price *
                                                item.quantity
                                            ).toFixed(
                                                2
                                            )}
                                        </p>

                                        <button
                                            className="btn btn-secondary btn-small"
                                            onClick={() =>
                                                removeFromCart(
                                                    item.id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="checkout-summary">
                        <h2 className="checkout-section-title">
                            Shipping Information
                        </h2>

                        <div className="shipping-card">
                            <p>
                                <strong>
                                    Name:
                                </strong>{" "}
                                {profile.name ||
                                    "Not Provided"}
                            </p>

                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {profile.email}
                            </p>

                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {profile.phone ||
                                    "Not Provided"}
                            </p>

                            <p>
                                <strong>
                                    Address:
                                </strong>{" "}
                                {profile.address ||
                                    "Not Provided"}
                            </p>
                        </div>

                        <hr />

                        <h2 className="checkout-section-title">
                            Total
                        </h2>

                        <div className="checkout-total">
                            <p>Subtotal:</p>

                            <p>
                                $
                                {cartTotal.toFixed(
                                    2
                                )}
                            </p>
                        </div>

                        <div className="checkout-total">
                            <p>Total:</p>

                            <p className="checkout-total-final">
                                $
                                {cartTotal.toFixed(
                                    2
                                )}
                            </p>
                        </div>

                        <button
                            className="btn btn-primary btn-large btn-block"
                            disabled={
                                cartItems.length === 0
                            }
                            onClick={placeOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}