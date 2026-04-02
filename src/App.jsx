import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Header from "./core/layout/Header";
import Modal from "./features/authentication/components/Modal";
import UserLoginForm from "./features/authentication/components/UserLoginForm";
import RegisterForm from "./features/authentication/components/UserRegistrationForm";
import WelcomePage from "./core/layout/WelcomePage";
import { loginUser } from "./features/authentication/services/authService";
import AddUserForm from "./features/admin/components/AddUserForm";
import UsersList from "./features/admin/components/UsersList";
import HomePage from "./core/layout/HomePage";
import RestaurantsList from "./features/restaurants/components/RestaurantsList";
import AdminRestaurantsList from "./features/admin/components/AdminRestaurantsList";
import AdminDashboard from "./features/admin/components/AdminDashboard";
import RestaurantForm from "./features/admin/components/RestaurantForm";
import ActiveOrderPage from "./features/courier/components/ActiveOrderPage";
import OwnerMealsList from "./features/meals/components/OwnerMealList";
import RestaurantMenu from "./features/meals/components/RestaurantMenu";
import OwnerDashboard from "./features/owner/components/OwnerDashboard";
import OrdersList from "./features/orders/components/OrdersList";
import OwnerRestaurants from "./features/owner/components/OwnerRestaurants";
import OwnerRestaurantPage from "./features/owner/components/OwnerRestaurantPage";
import OwnerOrders from "./features/owner/components/OwnerOrders";
import OwnerOrdersPage from "./features/owner/components/OwnerOrdersPage";
import CustomerDashboard from "./features/customers/components/CustomerDashboard";
import CustomerOrders from "./features/customers/components/CustomerOrders";


function App() {
  const [authModal, setAuthModal] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openLogin = () => {
    setAuthModal("login");
    setLoginError(null);
  };

  const openRegister = () => setAuthModal("register");

  const closeModal = () => {
    setAuthModal(null);
    setLoginError(null);
  };

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await loginUser(credentials);
      console.log("Login successful:", response);

      const userData = {
        id: response.id,
        username: response.username,
        role: response.role
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      closeModal();
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(error.response?.data || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Header 
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
        onLogoutClick={handleLogout}
        isLoggedIn={!!user}
      />

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/admin/add-user" element={<AddUserForm />} />
        <Route path="/courier/active-order" element={<ActiveOrderPage />} />

        <Route path="/admin" element={<AdminDashboard user={user} />}>
          <Route path="users" element={<UsersList />} />
          <Route path="restaurants" element={<AdminRestaurantsList />} />
          <Route path="restaurant/add" element={<RestaurantForm />} />
          <Route path="restaurant/update/:id" element={<RestaurantForm />} />
        </Route>

        <Route path="/customer" element={<CustomerDashboard user={user} />}>
          <Route path="" element={<RestaurantsList />} />
          <Route path="restaurants/:id/menu" element={<RestaurantMenu user={user} />} />
          <Route path="orders" element={<CustomerOrders user={user} />} />
        </Route>

        <Route path="/owner" element={<OwnerDashboard user={user} />}>
          <Route path="restaurants" element={<OwnerRestaurants user={user} />} />
          <Route path="orders" element={<OwnerOrders user={user} />} />
          <Route path="restaurants/:restaurantId" element={<OwnerRestaurantPage />} />
          <Route path="restaurants/:restaurantId/orders" element={<OwnerOrdersPage />} />
          <Route path="restaurants/:restaurantId/meals" element={<OwnerMealsList />} />
          <Route path="restaurants/:restaurantId/orders/list" element={<OrdersList />} />
        </Route>

      </Routes>

      <Modal isOpen={!!authModal} onClose={closeModal}>
        {authModal === "login" && (
          <UserLoginForm 
            onSubmit={handleLogin}
            error={loginError}
            isLoading={isLoading}
          />
        )}
        {authModal === "register" && (
            <RegisterForm
                onSuccess={closeModal}
                onSwitchToLogin={() => setAuthModal("login")}
            />
        )}
      </Modal>
    </BrowserRouter>
  );
}

export default App;
