import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNewBlog, getBlogs, getBlogsById } from "../api/blog"

export const useBlogs = () => { 
    return useQuery({
        queryKey: ['blogs'], 
        queryFn: getBlogs
    })
}

export const useGetBlog = (id: number) => {
    return useQuery({ 
        queryKey:['blog', id], 
        queryFn: () => getBlogsById(id),
        enabled: !!id
    })
}

export const useCreateBlog = () => { 
    const queryClient = useQueryClient();

    return useMutation({ 
      mutationFn: createNewBlog,
      onSuccess: () => { 
        queryClient.invalidateQueries({queryKey: ["blogs"]})
      }  
    })

}



