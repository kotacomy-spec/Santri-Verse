import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  //   DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EllipsisVertical,
  User,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const UserNav = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const menuItem = [
    { label: "Profile", icon: User },
    { label: "Settings", icon: Settings },
  ];

  const getUserProfile = async () => {
    const { data: userLogin } = await supabase.auth.getUser();
    const userId = userLogin.user.id;
    const userEmail = userLogin.user.email;

    const { data: userProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    const username = userProfile.username;
    setUserInfo({
      username: username,
      email: userEmail,
      picture: userProfile.profile_picture,
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center w-full gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-muted transition">
            {userInfo?.picture ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={userInfo.picture} alt={userInfo.username} />
                <AvatarFallback>
                  {userInfo?.username
                    ? userInfo.username.charAt(0).toUpperCase()
                    : "SC"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted animate-pulse">
                  <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                </AvatarFallback>
              </Avatar>
            )}
            <div className="grid text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {userInfo?.username ? (
                  <span className="truncate font-medium">
                    {userInfo.username}
                  </span>
                ) : (
                  <div className="h-4 bg-muted rounded animate-pulse w-20 mb-2"></div>
                )}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {userInfo?.email ? (
                  <span className="truncate font-medium">{userInfo.email}</span>
                ) : (
                  <div className="h-3 bg-muted rounded animate-pulse w-24"></div>
                )}
              </span>
            </div>
            <EllipsisVertical className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex gap-2">
              {userInfo?.picture ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userInfo.picture} alt={userInfo.username} />
                  <AvatarFallback>
                    {userInfo?.username
                      ? userInfo.username.charAt(0).toUpperCase()
                      : "SC"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted animate-pulse">
                    <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userInfo?.username ? (
                    <span className="truncate font-medium">
                      {userInfo.username}
                    </span>
                  ) : (
                    <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
                  )}
                </p>

                <p className="text-xs leading-none text-muted-foreground">
                  {userInfo?.email ? (
                    <span className="truncate font-medium">
                      {userInfo.email}
                    </span>
                  ) : (
                    <div className="h-3 bg-muted rounded animate-pulse w-24"></div>
                  )}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menuItem.map((item, index) => (
              <DropdownMenuItem key={index} className="flex items-center gap-2">
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-2"
          >
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yakin ingin logout?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserNav;
