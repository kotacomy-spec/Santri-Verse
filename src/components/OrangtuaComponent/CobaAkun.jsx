import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

export default function CobaAkun() {
  // const [orangtuaInfo, setOrangtuaInfo] = useState({});

  // const getOrangtua = async () => {
  //   const { data: userLogin } = await supabase.auth.getUser();
  //     const userId = userLogin.user.id;

  //   const { data: userOrangtua, error } = await supabase
  //     .from("orang_tua")
  //     .select(
  //       `
  //     *,
  //     profile:profiles (
  //       id,
  //       username
  //     )
  //   `
  //     )
  //     .eq("id", userId)
  //     .single();

  //     console.log(userId)
  //     const userName = userOrangtua;
  //     console.log(userName)

  //     if (error) {
  //       console.error("Error fetching orang tua:", error);
  //       console.log("gagal",userId)
  //       console.log("gagal",userName)
  //     } else {
  //             console.log("Berhasil",userId)
  //       setOrangtuaInfo({
  //         id: userId,
  //         username: userName,
  //       });
  //       console.log("Berhasil",userName)
  //   }
  // };

  // useEffect(() => {
  //   getOrangtua();
  // }, []);
  const [userInfo, setUserInfo] = useState({});
  const getUserProfile = async () => {
    const { data: userProfile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", "asantoso")
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return;
    }

    setUserInfo({
      id: userProfile.id,
      username: userProfile.username,
      email: userProfile.email ?? "-", // fallback kalo gak ada
      picture: userProfile.profile_picture,
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <div className="bg-green-700  text-white p-4 my-2">
        {/* <p>Username: {orangtuaInfo?.username}</p>
          <p>Profile ID: {orangtuaInfo?.id}</p> */}
        halo
       <p> {userInfo.username}</p>
        <p>{userInfo.id}</p>
        <p>{userInfo.email}</p>
        <img src={`${userInfo.picture}`} alt="" className="w-12 h-12" />
        <p>{userInfo.picture}</p>
      </div>
      {/* <p>{userId}</p> */}
    </>
  );
}
