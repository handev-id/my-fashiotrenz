import Breadcrumbs from "@/components/profileBox";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data }: any = useSession();

  return (
    <>
      <Breadcrumbs
        role={data?.user?.role}
        href="/admin/dashboard/Home"
        username={data?.user?.fullname}
        profilesData={profilesData}
        isLogin={data ? true : false}
      />
    </>
  );
};

export default ProfilePage;

const profilesData = [
  { title: "Edit Profile", path: "/user/profile/edit" },
  { title: "Alamat", path: "/user/profile/address" },
  { title: "Ubah Password", path: "/user/profile/password" },
];
