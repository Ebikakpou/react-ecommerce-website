import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home.jsx';
import Auth from './pages/auth.jsx';
import Checkout from './pages/checkout.jsx';
import Navbar from './components/navbar.jsx';
import AuthProvider from './context/AuthContext.jsx';


function App() {
  return (
    <AuthProvider>

    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      </div>
      </AuthProvider>
  );
}
export default App;