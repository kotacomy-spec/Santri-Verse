import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/ui/mondok-loading";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Outlet } from "react-router-dom";

const RoleBasedLayout = () => {
  const [role, setrole] = useState("loading");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setrole(profile?.role);
      }
    };
    getUser();
  }, []);

  if (role === "loading") return <LoadingScreen />;

  console.log("role", role);
  return (
    <>
      <DashboardLayout type={role}>
        <Outlet />
      </DashboardLayout>
    </>
  );
};

export default RoleBasedLayout;
