import { axiosInstance } from "@/Api/Axios/Axios";
import {ISearchBlogResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const searchBlog= async(payload:string):Promise<ISearchBlogResponse> =>{
    const res = await axiosInstance.get<ISearchBlogResponse>(
        `${endpoints.cms.searchBlog}/${payload}`
    )
    return res.data;
}