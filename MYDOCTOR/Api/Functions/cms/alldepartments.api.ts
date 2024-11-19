import { axiosInstance } from "@/Api/Axios/Axios";
import {IDepartmentsResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const allDepartments:MutationFunction<IDepartmentsResponse> = async()=>{
    const res = await axiosInstance.get<IDepartmentsResponse>(
        endpoints.cms.allDepartments
    )
    return res.data;
}