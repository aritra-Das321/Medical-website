import { axiosInstance } from "@/Api/Axios/Axios";
import {IAllBlogsResponse} from '@/typescript/cms.interface';
// import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const allBlogs= async() :Promise<IAllBlogsResponse> =>{
    const res = await axiosInstance.get<IAllBlogsResponse>(
        endpoints.cms.blog
    )
    return res.data;
}