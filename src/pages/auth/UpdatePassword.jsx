import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, KeyRound, Lock, EyeOff, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase/supabaseClient";

const UpdatePassword = () => {
  const [IsLoading, SetIsLoading] = useState(false);
  const [visiBility, setVisibility] = useState(true);
  const [visiBilityConfirm, setVisibilityConfirm] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = new URLSearchParams(location.hash.substring(1));
    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({
          access_token,
          refresh_token,
        })
        .then(({ error }) => {
          if (error) {
            toast.error("Gagal memverifikasi token reset");
          }
        });
    }
  }, [location]);

  const handleResetPassword = async () => {
    if (password !== passwordConfirm || passwordConfirm !== password) {
      toast.error("Konfirmasi atau password tidak sama");
      return;
    }
    try {
      SetIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast.success("Password berhasil diubah. Silahkan login kembali");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error?.message || "Terjadi Kesalahan");
      SetIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <CardTitle className={"text-center text-2xl mb-2 font-bold"}>
              Ubah Password
            </CardTitle>
            <CardDescription className={`text-center`}>
              Masukkan email Anda dan Kami akan mengirimkan link untuk reset
              password anda melalui email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className={"text-[1rem]"} htmlFor="email">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Lock />
                  </div>
                  <Input
                    className={
                      "h-[3rem] w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    }
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={visiBility ? "password" : "text"}
                    placeholder="passwordkamu"
                    value={password}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setVisibility(!visiBility)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {visiBility ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label className={"text-[1rem]"} htmlFor="email">
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Lock />
                  </div>
                  <Input
                    className={
                      "h-[3rem] w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    }
                    id="password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    type={visiBilityConfirm ? "password" : "text"}
                    placeholder="passwordkamu"
                    value={passwordConfirm}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setVisibilityConfirm(!visiBilityConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {visiBilityConfirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              type="submit"
              onClick={handleResetPassword}
              disabled={IsLoading ? true : false}
              className="w-full h-[2.5rem] bg-green-700 hover:bg-green-800 cursor-pointer"
            >
              {IsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengubah Password...
                </>
              ) : (
                "Ubah Password"
              )}
            </Button>
            <Link
              to={"/auth/login"}
              className="text-gray-600 w-full text-sm flex items-center justify-center hover:text-gray-800 hover:bg-gray-100 h-[2.5rem] rounded transition-all duration-150 ease-in-out"
            >
              Kembali Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default UpdatePassword;
