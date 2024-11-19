import { axiosInstance } from "@/Api/Axios/Axios";
import {IUserDashboardResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const dashboard= async(id:string):Promise<IUserDashboardResponse> =>{
    const res = await axiosInstance.get<IUserDashboardResponse>(
        `${endpoints.cms.userDash}/${id}`
    )
    return res.data;
}