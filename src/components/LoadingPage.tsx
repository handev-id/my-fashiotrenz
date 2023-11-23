import { Center, Text, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Colors } from "./ColorScheme";

const Loading = () => {
  const [isError, setIsError] = useState<boolean>(false);

  setTimeout(() => {
    setIsError(true);
  }, 20000);

  return (
    <Center
      pos={"fixed"}
      zIndex={100}
      bg={Colors.fourthirty}
      w={"full"}
      h={"100vh"}
      left={0}
      top={0}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div className="spinner"></div>
        {isError && <Text>Network Error, Refresh Browser anda</Text>}
      </div>
    </Center>
  );
};

export default Loading;
