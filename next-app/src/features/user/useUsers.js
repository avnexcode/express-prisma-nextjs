"use client"
import { useState, useEffect } from "react"
import { axiosInstance } from "@/libs/axios"
export const useUsers = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchUsers = async () => {
        try {
            setTimeout(async () => {
                const response = await axiosInstance.get('/users')
                setUsers(response.data.users)
                setIsLoading(false)
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        data: users,
        isLoading
    }
}