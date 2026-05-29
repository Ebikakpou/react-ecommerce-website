import { getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user } = useAuth();
    const products = getProducts();
    return (
        <div className="page">
            <div className="home-hero">
                <h1 className="home-title">Welcome to our store</h1>
                <p className="home-subtitle">Discover the best products at unbeatable prices.</p>
                <button className="btn btn-primary shop-now">Shop Now</button>
            </div>
            {!user ? (
                <div className="auth-prompt">
                    <p className="auth-prompt-text">Please log in to access exclusive deals and personalized recommendations.</p>
                </div>
            ) : (
                <div className="container">
                    <h2 className="page-title">Our Products</h2>
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 