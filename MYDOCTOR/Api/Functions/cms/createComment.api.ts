import { axiosInstance } from "@/Api/Axios/Axios";
import {ICreateBlogCommentPayload,ICreateBlogCommentResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const createComment:MutationFunction<ICreateBlogCommentResponse,string> = async(payload:string)=>{
    const res = await axiosInstance.post<ICreateBlogCommentResponse>(
        endpoints.cms.createBlogComment,
        payload
    )
    return res.data;
}