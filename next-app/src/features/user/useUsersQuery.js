import { axiosInstance } from "@/libs/axios"
import { useQuery } from "@tanstack/react-query"

// export const useUsersQuery = () => {
//     const { data, isLoading } = useQuery({
//         queryFn: async () => {
//             const response = await axiosInstance.get('/users')
//             return response
//         }
//     })
//     return { data, isLoading }
// }

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axiosInstance.get('/users')
            return response
        }
    })
}