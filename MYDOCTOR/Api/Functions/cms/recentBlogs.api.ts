import { axiosInstance } from "@/Api/Axios/Axios";
import {IRecentBlogResponse} from '@/typescript/cms.interface';
// import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const recentBlog  = async() :Promise<IRecentBlogResponse>=>{
    const res = await axiosInstance.get<IRecentBlogResponse>(
        endpoints.cms.recentBlog
    )
    return res.data;
}