"use client"
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { VStack, Heading, Center, FormControl, Input, FormLabel, Button, useToast, Spinner } from "@chakra-ui/react"
import Link from "next/link"
import { useUpdateUser, useUserQueryId, useUsersQuery } from '@/features/user/index'
// todo - Main Function
export default function Update({ params }) {
  const { refetch: refetchUsers } = useUsersQuery();
  const { data, isLoading } = useUserQueryId(params.id);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      id: params.id,
      name: "",
      email: "",
      phone: "",
      password: "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        await updateUser(values);
        resetForm();
        toast({
          title: "User Diupdate",
          status: "success",
        });
      } catch (error) {
        console.error("Error updating user:", error);
        toast({
          title: "Gagal Mengupdate User",
          status: "error",
        });
      }
    },
  });

  useEffect(() => {
      formik.setValues({
        id: params.id,
        name: data?.data.user?.name || '',
        email: data?.data.user?.email || '',
        phone: data?.data.user?.phone || '',
        password: data?.data.user?.password || '',
      });
  }, [data]);

  const { mutate: updateUser, isPending } = useUpdateUser({
    onSuccess: () => {
      refetchUsers();
    },
  });

  const handleForm = (e) => formik.setFieldValue(e.target.name, e.target.value);

  return (
    <>
      <Center pt="1rem">
        <Link href="/users">Kembali</Link>
        <Heading>User Update</Heading>
      </Center>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing="1rem" p="1rem">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name='name' onChange={handleForm} value={formik.values.name} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name='email' onChange={handleForm} value={formik.values.email} />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input name='phone' onChange={handleForm} value={formik.values.phone} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name='password' onChange={handleForm} value={formik.values.password} />
          </FormControl>
          {isPending ? <Spinner /> : <Button type='submit'>Update</Button>}
        </VStack>
      </form>
    </>
  )
}
