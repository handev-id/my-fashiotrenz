import { Colors } from "@/components/ColorScheme";
import {
  Center,
  Heading,
  Input,
  Button,
  VStack,
  Card,
  CardBody,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/dist/client/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import MetaTag from "@/components/MetaTag";

const schema = yup.object({
  email: yup.string().required("Isi Email!").email("Berikan Format Email"),
  password: yup
    .string()
    .required("Isi Password!")
    .min(8, "Password Minimal 8 Karakter"),
});

const LoginPage = () => {
  const { push, query } = useRouter();

  const submitUser = (data: any) => {
    userLogin(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const callbackUrl: any = query.callbackUrl || "/";

  const {
    mutate: userLogin,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (userData: any) => {
      const response = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
        callbackUrl,
      });
      if (response?.status === 401) {
        throw new Error("Password Atau Email Salah");
      } else {
        push(callbackUrl);
        return response;
      }
    },
  });
  return (
    <Center h="100vh" bg={Colors.fourthirty} color="white" py={10}>
      <MetaTag title="Login - Fashiotrendz" description="Login In Fashiotrenz" />
      <Card bg="white" w={350} mx={2} py={5}>
        <CardBody>
          <Heading size="lg" textAlign="center" color={Colors.secondary}>
            Login
          </Heading>
          <p
            style={{
              color: "crimson",
              textAlign: "center",
              margin: "15px auto",
            }}
          >
            {isError && "Password Atau Email Salah"}
          </p>
          <form onSubmit={handleSubmit(submitUser)}>
            <VStack>
              <Text color="crimson" marginRight="auto">
                {errors.email?.message}
              </Text>
              <Input
                {...register("email")}
                placeholder="Email"
                focusBorderColor={Colors.secondary}
              />
              <Text color="crimson" marginRight="auto">
                {errors.password?.message}
              </Text>
              <Input
                type="password"
                {...register("password")}
                placeholder="Password"
                focusBorderColor={Colors.secondary}
              />
              <Button
                w="full"
                mt={5}
                type="submit"
                color="white"
                _hover={{ bg: Colors.hoverPrimary }}
                bg={Colors.secondary}
              >
                {isLoading ? <Spinner /> : "Login"}
              </Button>
            </VStack>
          </form>
          <p style={{ color: "black", textAlign: "center", marginTop: 10 }}>
            Belum Punya Akun?{" "}
            <Link
              href="/auth/register"
              style={{ fontWeight: "bold", color: Colors.secondary }}
            >
              Daftar
            </Link>{" "}
            Disini
          </p>
        </CardBody>
      </Card>
    </Center>
  );
};

export default LoginPage;
