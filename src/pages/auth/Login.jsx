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
import { Mail, Lock, Eye, EyeOff, BookOpenText, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const LoginPages = () => {
  const [visiBility, setVisibility] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const toastId = toast.loading("Mohon Tunggu Sebentar...");

    try {
      setIsLoading(true);

      if (!email || !password) {
        toast.error("Harap isi semua field", { id: toastId });
        setIsLoading(false);
        return;
      }

      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (error) throw error;

      const userId = loginData.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;

      toast.success("Berhasil Login", { id: toastId });
      setIsLoading(false);
      const role = profile.role;
      if (role === "musyrif") {
        navigate("/musyrif/dashboard", { replace: true });
      } else if (role === "orang_tua" || role === "santri") {
        navigate("/orangtua/dashboard", { replace: true });
      } else if (role === "keamanan") {
        navigate("/keamanan/dashboard", { replace: true });
      } else {

        toast.error("Anda belum memiliki role", { id: toastId });
      }
    } catch (error) {
      toast.error(error?.message || "Login Gagal coba lagi", { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className={"text-center text-2xl mb-2 font-bold"}>
              Login
            </CardTitle>
            <CardDescription className="flex justify-center">
              <div className="w-25 h-25 mb-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <BookOpenText className="w-13 h-13 text-white" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className={"text-[1rem]"} htmlFor="email">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Mail size={20} />
                  </div>
                  <Input
                    className={
                      "w-full pl-12 h-[3rem] pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                    }
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="orangtua@gmail.com"
                    required
                    value={email}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className={"text-[1rem]"} htmlFor="password">
                    Password
                  </Label>
                  <Link
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    to={"/auth/forgot-password"}
                  >
                    Lupa password ?
                  </Link>
                </div>
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
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              onClick={handleLogin}
              className="w-full h-[2.5rem] bg-green-700 hover:bg-green-800 cursor-pointer"
            >
              {IsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memuat...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPages;
