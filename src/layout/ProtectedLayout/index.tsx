import useAuth from "@/hooks/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedLayout() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/welcome" replace />;
}
