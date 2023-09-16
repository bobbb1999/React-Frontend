// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // เมื่อเริ่มแอปพลิเคชัน ตรวจสอบ localStorage ว่ามี token และ role อยู่หรือไม่
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      // ถ้ามี token และ role ใน localStorage
      setRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token, userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);

    // ทำการเก็บ token ใน localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = () => {
    setRole(null);
    setIsLoggedIn(false);
    // ลบ token และ role ออกจาก localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
