"use client"
import { useState } from "react"
import {
  Spinner, Heading, Button, Table, Th, Tr, Td, Tbody, Thead, TableContainer, Flex, useToast, Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from "@chakra-ui/react"
// import { useUsers } from "@/features/user/useUsers"
import { useDeleteUser,useUsersQuery } from "@/features/user/index"
import Link from 'next/link'
export default function Users() {
  const { onClose } = useDisclosure()
  const [isOpenDelete, setIsOpenDelete] = useState({});
  const toggleIsOpen = (id, isOpen) => {
    setIsOpenDelete((prevState) => {
      return {
        ...prevState,
        [id]: isOpen,
      };
    });
  };
  // own function
  // const { data: users, isLoading } = useUsers()
  const toast = useToast()
  const { data, isLoading, refetch: refetchUser } = useUsersQuery()
  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      refetchUser()
      toast({
        title: "User deleted",
        status: "success"
      })
    }
  })

  const renderElement = () => {
    return data?.data.users.map((item, i) => {
      return (
        <Tr key={i}>
          <Td>{i + 1}</Td>
          <Td>{item.name}</Td>
          <Td>{item.email}</Td>
          <Td>{item.phone}</Td>
          <Td>
            <Link href={`/users/update/${item.id}`}>
              <Button colorScheme="green" size="xs">Update</Button>
            </Link>
            <Button key={item.id} onClick={() => toggleIsOpen(item.id, true)} colorScheme="red" size="xs">Delete</Button>
          </Td>
          <Modal key={i}
            isOpen={isOpenDelete[item.id] ?? false}
            onClose={() => toggleIsOpen(item.id, false)}
            id={item.id}>
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Serius Dihapus {item.name}?
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => toggleIsOpen(item.id, false)}>
                  Close
                </Button>
                <Button onClick={() => { deleteUser(item.id); onClose }} colorScheme="red">Delete</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Tr>
      )
    })
  }

  return (
    <Flex direction="column" gap="30px">
      <Flex align="center" justify="space-between" p="1rem">
        <Heading>Hello Users</Heading>
        <Link href="/users/create"><Button>Create User</Button></Link>
      </Flex>
      {isLoading ? <Spinner /> : null}
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th colSpan={2}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {renderElement()}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
