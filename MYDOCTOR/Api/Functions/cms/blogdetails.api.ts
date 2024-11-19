import { axiosInstance } from "@/Api/Axios/Axios";
import {ISingleBlogresponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const singleBlog:MutationFunction<ISingleBlogresponse,string> = async(id:string)=>{
    const res = await axiosInstance.get<ISingleBlogresponse>(
        `${endpoints.cms.singleBlog}/${id}`
    )
    return res.data;
}