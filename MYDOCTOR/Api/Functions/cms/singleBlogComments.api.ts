import { axiosInstance } from "@/Api/Axios/Axios";
import {ISingleBlogCommentsResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const singleBlogComments= async(id:string) :Promise<ISingleBlogCommentsResponse> =>{
    const res = await axiosInstance.get<ISingleBlogCommentsResponse>(
        `${endpoints.cms.getSingleBlogComment}/${id}`
    )
    return res.data;
}