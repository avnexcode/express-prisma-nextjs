import { axiosInstance } from "@/libs/axios"
import { useQuery } from "@tanstack/react-query"

export const useUserQueryId = (id) => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/${id}`)
            return response
        }
    })
}