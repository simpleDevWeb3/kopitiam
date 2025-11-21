import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/Auth/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
