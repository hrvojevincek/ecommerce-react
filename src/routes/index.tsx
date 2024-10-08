// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { LoginForm } from "@/components/auth/login-form";
import { Dashboard } from "@/pages/dashboard";
import { Cart } from "@/pages/cart";
import { Profile } from "@/pages/profile";
import { Layout } from "@/components/layout";

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Protected routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
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
    </Layout>
  );
}
