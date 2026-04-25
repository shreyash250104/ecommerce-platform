import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        // Simple demo login - accept any email/password
        if (email && password) {
          set({
            user: { id: '1', email, name: email.split('@')[0] },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      
      signup: async (name, email, password) => {
        if (name && email && password) {
          set({
            user: { id: Date.now().toString(), email, name },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);