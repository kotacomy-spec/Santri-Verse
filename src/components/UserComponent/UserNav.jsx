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

    const username = userProfile.full_name;
    setUserInfo({
      username: username,
      email: userEmail,
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
            <Avatar className="h-8 w-8">
              <AvatarImage src="/vite.svg" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="grid text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {userInfo?.username ? (
                  <span className="truncate font-medium">
                    {userInfo.username}
                  </span>
                ) : (
                  <div className="flex items-center gap-1">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      Loading
                    </span>
                  </div>
                )}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {userInfo?.email ? (
                  <span className="truncate font-medium">{userInfo.email}</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      Loading
                    </span>
                  </div>
                )}
              </span>
            </div>
            <EllipsisVertical className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userInfo?.username ? (
                  <span className="truncate font-medium">
                    {userInfo.username}
                  </span>
                ) : (
                  <div className="flex items-center gap-1">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      Loading
                    </span>
                  </div>
                )}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userInfo?.email ? (
                  <span className="truncate font-medium">{userInfo.email}</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      Loading
                    </span>
                  </div>
                )}
              </p>
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
