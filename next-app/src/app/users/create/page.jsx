"use client"
import React from 'react'
import { useFormik } from 'formik'
import { useCreateUser } from "@/features/user/useCreateUser"
import { VStack, Heading, Center, FormControl, Input, FormLabel, Button, useToast, Spinner } from "@chakra-ui/react"
import Link from "next/link"
import { useUsersQuery } from '@/features/user/useUsersQuery'
export default function Create() {
  const { refetch: refetchUsers } = useUsersQuery()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      createUser(values)
      resetForm()
      toast({
        title: "User Ditambahkan",
        status: "success"
      })
    }
  })
  const { mutate: createUser, isPending } = useCreateUser({
    onSuccess: () => {
      refetchUsers()
    }
  })

  const handleForm = e => formik.setFieldValue(e.target.name, e.target.value)
  
  return (
    <>
      <Center pt="1rem">
        <Link href="/users">Kembali</Link>
        <Heading>User Create</Heading>
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
          {isPending ? <Spinner /> : <Button type='submit'>Submit</Button>}
        </VStack>
      </form>
    </>
  )
}
