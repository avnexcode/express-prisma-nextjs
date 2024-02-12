import { axiosInstance } from "@/libs/axios"
import { useMutation } from "@tanstack/react-query"
export function useUpdateUser({ onSuccess }) {
    return useMutation({
        mutationFn: async (body) => {
            const response = await axiosInstance.put(`/users/${body.id}`, body)
            return response
        },
        onSuccess
    })
}
