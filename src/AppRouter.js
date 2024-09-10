
// src/AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './Navbar/NavBar';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin component
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin Login route */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
