import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit3, Save, X } from "lucide-react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [oldImagePath, setOldImagePath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    mobile_phone: "",
    addres: "",
    description: "",
    profile_picture: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setNewImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleCancelImage = () => {
    setNewImageFile(null);
    setPreviewImage(null);
    const input = document.getElementById("imageUpload");
    if (input) input.value = "";
  };

  useEffect(() => {
    setIsLoading(true);
    const getUserProfile = async () => {
      const { data: UserProfile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) navigate("/not-found");
      setProfile(UserProfile);
      if (UserProfile?.profile_picture) {
        const url = new URL(UserProfile.profile_picture);
        const path = decodeURIComponent(
          url.pathname.split("/storage/v1/object/public/pesantren/")[1]
        );
        setOldImagePath(path);
      }

      setIsLoading(false);
    };

    getUserProfile();
  }, [id, navigate]);

  const handleProfileSave = async () => {
    let imageUrl = profile.profile_picture;

    if (newImageFile) {
      const fileExt = newImageFile.name.split(".").pop();
      const fileName = `${id}.${fileExt}`;
      const filePath = `images/avatar/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("pesantren")
        .upload(filePath, newImageFile, { upsert: true });

      if (uploadError) {
        console.log(uploadError);
        toast.error("Gagal upload gambar");
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("pesantren").getPublicUrl(filePath);

      if (oldImagePath && oldImagePath !== filePath) {
        await supabase.storage.from("pesantren").remove([oldImagePath]);
      }

      imageUrl = publicUrl;
      setOldImagePath(filePath);
    }

    const { error } = await supabase
      .from("profiles")
      .update({ ...profile, profile_picture: imageUrl })
      .eq("id", id);

    if (error) return toast.error("Gagal update profile");

    toast.success("Profile diperbarui");
    setNewImageFile(null);
    setIsEditing(false);
  };

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>
                  Perbarui detail pribadi dan gambar profil Anda
                </CardDescription>
              </div>
              <Button
                className={`cursor-pointer ${
                  isEditing
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-700 hover:bg-green-800"
                }`}
                onClick={() => setIsEditing(!isEditing)}
                disabled={isLoading}
              >
                {isEditing ? (
                  <X className="w-4 h-4 mr-2" />
                ) : (
                  <Edit3 className="w-4 h-4 mr-2" />
                )}
                {isEditing ? "Batal" : "Edit"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-20 h-20 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={previewImage || profile.profile_picture}
                      alt="Profile"
                    />
                    <AvatarFallback className="text-xl">
                      {profile?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {isEditing && (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Ubah Gambar
                  </Button>

                  {previewImage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelImage}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batal Gambar
                    </Button>
                  )}

                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={profile.username}
                      onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })
                      }
                      placeholder="Masukkan Username"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                    <Input
                      id="nama_lengkap"
                      name="nama_lengkap"
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile({ ...profile, full_name: e.target.value })
                      }
                      placeholder="Masukkan Nama Lengkap"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telepon">Nomor Telepon</Label>
                    <Input
                      id="telepon"
                      name="telepon"
                      value={profile.mobile_phone}
                      onChange={(e) =>
                        setProfile({ ...profile, mobile_phone: e.target.value })
                      }
                      placeholder="Masukkan no Telepon"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alamat">Alamat</Label>
                    <Input
                      id="alamat"
                      name="alamat"
                      value={profile.addres}
                      onChange={(e) =>
                        setProfile({ ...profile, addres: e.target.value })
                      }
                      placeholder="Masukkan Alamat"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.description}
                    className={`resize-none`}
                    onChange={(e) =>
                      setProfile({ ...profile, description: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Masukkan Bio"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      className="bg-green-700 hover:bg-green-800 cursor-pointer"
                      onClick={handleProfileSave}
                      disabled={isLoading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
