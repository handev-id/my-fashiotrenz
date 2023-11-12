import Breadcrumbs from "@/components/profileBox";
import { useSession } from "next-auth/react";
import { AiFillEdit } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import Loading from "@/components/LoadingPage";
import ProfileLoad from "@/components/skeletons/profile";

const ProfilePage = () => {
  const { data }: any = useSession();
  if (!data) {
    return <ProfileLoad />;
  }

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
  { title: "Edit Profile", path: "/user/profile/edit", icon: <AiFillEdit /> },
  { title: "Alamat", path: "/user/profile/address", icon: <FaAddressBook /> },
  {
    title: "Ubah Password",
    path: "/user/profile/password",
    icon: <AiFillLock />,
  },
];
