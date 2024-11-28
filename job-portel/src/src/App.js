import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import LoginPage from './Input/LoginPage';
import Home from './Todos/Home'; // Employee pages
import About from './Todos/AboutPage';
import JobListings from './Todos/JobListingsPage';
import Contact from './Todos/ContactPage';
import CompanyShowcase from './Todos/CompanyShowcase';
import AdminEmployees from './Admin/AdminEmployees'; // Admin page
import AddJobPage from './Admin/AddJobPage';
import PrivateRoute from './PrivateRoute'; // For role-based access

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public route for login */}
        <Route path="/" element={<LoginPage />} />

        {/* Employee routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute requiredRole="employee">
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute requiredRole="employee">
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/job-listings"
          element={
            <PrivateRoute requiredRole="employee">
              <JobListings />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute requiredRole="employee">
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/company-showcase"
          element={
            <PrivateRoute requiredRole="employee">
              <CompanyShowcase />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/employees"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminEmployees />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-job"
          element={
    <       PrivateRoute requiredRole="admin">
            <AddJobPage />
    </PrivateRoute>
  }
/>

        {/* You can add more admin routes here for features like Add Job */}
      </Routes>
    </Router>
  );
};

export default App;
