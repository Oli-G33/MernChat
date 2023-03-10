import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});
const uploadsBaseUrl = import.meta.env.VITE_REST_URL;

const api = axios.create({
  baseURL: uploadsBaseUrl,
  withCredentials: true,
  credentials: 'include'
});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    api.get('/profile').then(response => {
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
