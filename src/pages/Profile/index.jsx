import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Profile from "@/components/views/Profile/Profile";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/ui/mondok-loading";

const ProfilePages = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      setIsLoading(true);
      const { data: userLogin, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userLogin?.user?.id) {
        console.error("Gagal ambil user login:", userError);
        setIsLoading(false);
        return;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userLogin.user.id)
        .single();

      if (profileError || !userProfile) {
        console.error("Gagal ambil role:", profileError);
        setIsLoading(false);
        return;
      }

      setRole(userProfile.role);
      setIsLoading(false);
    };

    fetchRole();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout type={role}>
      <Profile />
    </DashboardLayout>
  );
};

export default ProfilePages;
