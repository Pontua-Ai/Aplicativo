import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const saved = await AsyncStorage.getItem('userLogado');
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setLoading(false);
  }

  async function signIn(userData) {
    setUser(userData);
    await AsyncStorage.setItem('userLogado', JSON.stringify(userData));
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem('userLogado');
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
