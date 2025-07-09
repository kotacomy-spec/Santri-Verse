import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!profile) {
    return <Navigate to="/auth/login" replace />;
  }

  const userRole = profile.role || "orangtua";

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    const roleRedirects = {
      musyrif: "/musyrif/dashboard",
      keamanan: "/keamanan/dashboard",
      orangtua: "/orangtua/dashboard",
    };

    return <Navigate to={roleRedirects[userRole] || "/auth/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
