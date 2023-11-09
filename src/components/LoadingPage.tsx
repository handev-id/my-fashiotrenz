import { Center, Text, Spinner } from "@chakra-ui/react";
import { useState } from "react";

const Loading = () => {
  const [isError, setIsError] = useState<boolean>(false);

  setTimeout(() => {
    setIsError(true);
  }, 20000);

  return (
    <Center
      pos={"fixed"}
      zIndex={100}
      bg={"rgba(0, 0, 0, 0.297)"}
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
        <Spinner size={"xl"} color={"white"} />
        {isError && <Text>Network Error, Refresh Browser anda</Text>}
      </div>
    </Center>
  );
};

export default Loading;
