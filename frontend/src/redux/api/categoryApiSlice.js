import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        createCategory: builder.mutation({
            query: (newCategory)=>({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory
            }),
            invalidatesTags: ["Category"]
        }),

        updateCategory: builder.mutation({
            query: ({categoryId, updateCategory})=>({
                url: `${CATEGORY_URL}/${categoryId}`,
                method:"PUT",
                body: updateCategory
            }),
            invalidatesTags: ["Category"]
        }),

        deleteCategory: builder.mutation({
            query: (categoryId)=> ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Category"]
        }),

        fetchAllCategory: builder.query({
            query: ()=> `${CATEGORY_URL}/categories`,
            providesTags: ["Category"],
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchAllCategoryQuery
} = categoryApiSlice
