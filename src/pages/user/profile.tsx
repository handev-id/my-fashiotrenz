import Breadcrumbs from "@/components/profileBox";
import { useSession } from "next-auth/react";
import { AiFillEdit } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { Box } from "@chakra-ui/react";
import MetaTag from "@/components/MetaTag";

const ProfilePage = () => {
  const { data }: any = useSession();

  return (
    <Box mt={50}>
      <MetaTag title={`Profile - ${data ? data?.user?.fullname : ""} Fashiotrendz`} description="Profile User Fashiotrenz" />
      <Breadcrumbs
        role={data?.user?.role}
        href="/admin/dashboard/Home"
        username={data?.user?.fullname}
        profilesData={profilesData}
        isLogin={data ? true : false}
      />
    </Box>
  );
};

export default ProfilePage;

const profilesData = [
  { title: "Edit Profile", path: "/user/edit", icon: <AiFillEdit /> },
  { title: "Alamat", path: "/user/address", icon: <FaAddressBook /> },
  {
    title: "Ubah Password",
    path: "/user/password",
    icon: <AiFillLock />,
  },
  // { title: "Pesanan", path: "/user//orders", icon: <TbTruckDelivery /> },
];
