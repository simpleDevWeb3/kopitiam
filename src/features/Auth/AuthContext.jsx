import { createContext, useContext } from "react";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const { isLoading, isAuthenticated, user, isFetching } = useUser();




  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isFetching,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider!");
  return ctx;
}

export { AuthProvider, useAuth };
