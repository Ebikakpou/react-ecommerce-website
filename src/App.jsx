import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Profile from "./pages/Profile.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import AuthProvider from "./context/AuthContext.jsx";
import CartProvider from "./context/CartContext.jsx";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <div className="App">
                    <Navbar />

                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/auth"
                            element={<Auth />}
                        />

                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />

                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>
                                    <Checkout />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;