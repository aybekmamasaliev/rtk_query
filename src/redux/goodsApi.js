import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes:["Goods"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://sms-h9zb.onrender.com" }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: () => `reviews`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Goods", id })),
              { type: "Goods", id: "LIST" },
            ]
          : [{ type: "Goods", id: "LIST" }],
    }),
    addProducts: build.mutation({
      query: (body) => ({
        url: "reviews",
        method: "POST",
        body,
      }),
      invalidatesTags:[{type:"Goods", id:"LIST"}]
    }),
    deleteProduct:build.mutation({
      query:(id)=>({
        url:`reviews/${id}`,
        method:"DELETE",
      }),
      invalidatesTags:[{type:"Goods", id:"LIST"}]
    })
  }),
});

export const { useGetGoodsQuery , useDeleteProductMutation, useAddProductsMutation} = goodsApi;
