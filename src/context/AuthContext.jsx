import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

const safeParse = (value, fallback) => {
  try {
    if (!value) return fallback;
    return JSON.parse(value);
  } catch (err) {
    console.warn('Failed to parse auth storage', err);
    return fallback;
  }
};

const readUsers = () => safeParse(localStorage.getItem(USERS_KEY), []);

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const readCurrentUser = () => safeParse(localStorage.getItem(CURRENT_USER_KEY), null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => readCurrentUser());

  const register = ({ email, password }) => {
    const users = readUsers();
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, error: 'This email is already registered.' };
    }

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...users, newUser];
    writeUsers(nextUsers);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setCurrentUser(newUser);
    return { ok: true, user: newUser };
  };

  const login = ({ email, password }) => {
    const users = readUsers();
    const match = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (!match) {
      return { ok: false, error: 'Email not found.' };
    }
    if (match.password !== password) {
      return { ok: false, error: 'Incorrect password.' };
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(match));
    setCurrentUser(match);
    return { ok: true, user: match };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  const value = useMemo(() => ({ currentUser, login, register, logout }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
