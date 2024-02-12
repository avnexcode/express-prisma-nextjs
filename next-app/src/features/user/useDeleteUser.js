import { axiosInstance } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query"

export function useDeleteUser({ onSuccess }) {
    return useMutation({
        mutationFn: async (id) => {
            const response = await axiosInstance.delete(`/users/${id}`)
            return response
        },
        onSuccess,
    })
}
