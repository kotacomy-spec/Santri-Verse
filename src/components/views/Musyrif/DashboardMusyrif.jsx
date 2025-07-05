import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabaseClient";
import { toast } from "sonner";

const DashboardMusyrif = () => {
  const handleLogout = async () => {
    const toastId = toast.loading("Mohon tunggu sebentar...");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      toast.success("Berhasil Logout", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.message || "Terjadi Kesalahan", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <div>
        <h1 className="mb-5">Musyrif Dashboard</h1>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>
    </>
  );
};

export default DashboardMusyrif;
