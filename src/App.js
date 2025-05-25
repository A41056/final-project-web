import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import { useAuthStore } from "./stores/authStore";
import { Home } from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import ConfirmPayment from "./components/ConfirmPayment/ConfirmPayment";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? children : _jsx(Navigate, { to: "/login", replace: true });
};
function App() {
    return (_jsx(Router, { children: _jsxs("div", { className: "App", children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/account", element: _jsx(ProtectedRoute, { children: _jsx(Account, {}) }) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/confirm-payment", element: _jsx(ConfirmPayment, {}) }), _jsx(Route, { path: "/products/:id", element: _jsx(ProductDetail, {}) }), _jsx(Route, { path: "/category/:slug", element: _jsx(CategoryPage, {}) })] }), _jsx(Footer, {})] }) }));
}
export default App;
