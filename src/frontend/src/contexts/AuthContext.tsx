import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { createContext, useCallback, useContext } from "react";
import type { ReactNode } from "react";
import { useProfile } from "../hooks/useProfile";
import type { PatientProfile } from "../types";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  profile: PatientProfile | null;
  isAdmin: boolean;
  isPatient: boolean;
  isProfileLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { login, clear, isAuthenticated, isLoggingIn } = useInternetIdentity();
  const {
    profile,
    isAdmin,
    isPatient,
    isLoading: isProfileLoading,
  } = useProfile();

  const logout = useCallback(() => {
    clear();
  }, [clear]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoggingIn,
        profile,
        isAdmin,
        isPatient,
        isProfileLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
