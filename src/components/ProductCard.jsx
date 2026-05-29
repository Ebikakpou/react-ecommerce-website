import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
    const { addToCart , cartItems} = useCart();
    const productInItem = cartItems.find(item => item.id === product.id);

    const productQuantityLabel = productInItem ? `(${productInItem.quantity})` : '';

    return (
        <div className="product-card"> 
                            <img src={product.image} alt={product.name} className="product-card-image" />
                            <div className="product-card-content">
                                <h3 className="product-card-name">{product.name}</h3>
                                <p className="product-card-price">${product.price.toFixed(2)}</p>
                                <p className="product-card-description">{product.description}</p>
                                <div className="product-card-actions">
                                    <Link to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
                                    <button className="btn btn-primary add-to-cart" onClick={() => addToCart(product.id)}>
                                        Add to Cart {productQuantityLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
    );
}