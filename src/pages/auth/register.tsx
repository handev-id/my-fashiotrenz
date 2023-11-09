import { Colors } from "@/components/ColorScheme";
import {
    Center,
    Heading,
    Input,
    Button,
    VStack,
    Card,
    CardBody,
    Spinner,
    Text,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/dist/client/link";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required('Isi Email!').email('Berikan Format Email'),
  fullname: yup.string().required('Isi Nama!').min(5, 'Nama Minimal 5 Karakter'),
  password: yup.string().required('Isi Password!').min(8, 'Password Minimal 8 Karakter'),
  confPassword: yup.string().oneOf([yup.ref('password')], 'Password Tidak Sama').required('Konfirmasi Password!')
});

const RegisterPage = () => {
  const {push} = useRouter(); 

  const  { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const submitUser = (data: any) => {
    createUser(data)
  }  

  const { mutate: createUser, isLoading, isError } = useMutation({
    mutationFn: async (userData) => {
      const res = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      
      if(res.status === 400) {
        throw new Error("Email sudah terdaftar")
      }else {
        push('/auth/login')
      }
      return res;
    },
  })

  return (
    <Center h="100vh" bg={Colors.fourthirty} color="white" py={10}>
        <Card bg="white" w={350} mx={2} py={5}>
            <CardBody>
                    <Heading size="lg" textAlign="center" color={Colors.secondary}>Register</Heading>
                    <p style={{color: 'crimson', textAlign: 'center', margin: '15px auto'}} >{isError && 'Email sudah terdaftar'}</p>
                    <form onSubmit={handleSubmit(submitUser)}>
                <VStack>
                  <Text color="crimson" marginRight="auto">{errors.email?.message}</Text>
                    <Input {...register('email')} placeholder='Email' focusBorderColor={isError ? 'crimson' : Colors.secondary} isInvalid={isError} />
                  <Text color="crimson" marginRight="auto">{errors.fullname?.message}</Text>
                    <Input {...register('fullname')} placeholder='Nama Lengkap' focusBorderColor={Colors.secondary} />
                  <Text color="crimson" marginRight="auto">{errors.password?.message}</Text>
                    <Input type="password" {...register('password')} placeholder='Password' focusBorderColor={Colors.secondary} />
                  <Text color="crimson" marginRight="auto">{errors.confPassword?.message}</Text>
                    <Input type="password" {...register('confPassword')} placeholder='Konfirmasi Password' focusBorderColor={Colors.secondary} />
                    <Button type="submit" w="full" color="white" _hover={{bg: Colors.hoverPrimary}} bg={Colors.secondary} mt={5}>{ isLoading ? <Spinner /> : "Register"}</Button>
                </VStack>
                    </form>
        <p style={{color: 'black', textAlign: 'center', marginTop: 10}}>Sudah Punya Akun? <Link href="/auth/login" style={{fontWeight: 'bold', color: Colors.secondary}}>Login</Link> Disini</p>
            </CardBody>
        </Card>
    </Center>
  )
}

export default RegisterPage;