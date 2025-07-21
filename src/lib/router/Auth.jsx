import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const AuthRole = ({ children, allowedRoles }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAllowed(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !allowedRoles.includes(profile.role)) {
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
    };

    checkRole();
  }, [allowedRoles]);

  if (isAllowed === null) return <Navigate to="/auth/login" replace />;
  if (isAllowed === false) return <Navigate to="/auth/login" replace />;

  return children;
};

export default AuthRole;
