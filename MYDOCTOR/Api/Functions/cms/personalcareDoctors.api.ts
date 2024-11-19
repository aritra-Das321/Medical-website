import { axiosInstance } from "@/Api/Axios/Axios";
import {IPersonalCareDoctorResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const personalcareDoctors= async() :Promise<IPersonalCareDoctorResponse> =>{
    const res = await axiosInstance.get<IPersonalCareDoctorResponse>(
        endpoints.cms.personalCare
    )
    return res.data;
}