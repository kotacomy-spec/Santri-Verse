import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const AuthRole = ({ children, allowedRoles }) => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsLoggedIn(false);
        setChecking(false);
        return;
      }

      setIsLoggedIn(true);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!error && profile && allowedRoles.includes(profile.role)) {
        setHasAccess(true);
      }

      setChecking(false);
    };

    checkAuth();
  }, [allowedRoles]);

  if (checking) return null;

  if (!isLoggedIn) return <Navigate to="/auth/login" replace />;

  if (!hasAccess) return <Navigate to="/auth/login" replace />;

  return children;
};

export default AuthRole;
