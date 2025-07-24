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
import { Mail, Loader2, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { adminAuthClient } from "@/lib/supabase/supabaseAdmin";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [IsLoading, SetIsLoading] = useState(false);
  const [Email, SetEmail] = useState(null);

  const handleResetPassword = async () => {
    if (!Email) toast.error("Harap Isi Email");

    SetIsLoading(true);

    const { data } = await adminAuthClient.listUsers();

    const user = data.users.find((u) => u.email === Email);

    if (!user) {
      toast.error("Tidak dapat menemukan email");
      SetIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(Email, {
      redirectTo: "http://localhost:5173/auth/update-password",
      // redirectTo: "https://santri-verse.vercel.app/auth/update-password",
    });

    if (error) {
      SetIsLoading(false);
      toast.error(error?.message || "Terjadi Kesalahan");
      return;
    }

    toast.success(
      "Email berhasil dikirim. Silahkan check inbox untuk update password"
    );

    SetIsLoading(false);
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
              Lupa Password
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
                    onChange={(e) => SetEmail(e.target.value)}
                    type="email"
                    placeholder="orangtua@gmail.com"
                    required
                  />
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
                  Mengirim Email...
                </>
              ) : (
                "Reset Pasword"
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

export default ResetPassword;
