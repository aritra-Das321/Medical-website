import { axiosInstance } from "@/Api/Axios/Axios";
import {IChildCareDoctorResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const childCare  = async() :Promise<IChildCareDoctorResponse> =>{
    const res = await axiosInstance.get<IChildCareDoctorResponse>(
        endpoints.cms.childCare
    )
    return res.data;
}