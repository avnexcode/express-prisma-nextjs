import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/libs/axios"
export function useCreateUser({ onSuccess }) {
    return useMutation({
        mutationFn: async (body) => {
            const response = axiosInstance.post('/users', body)
            return response
        },
        onSuccess,
    })
}
