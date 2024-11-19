import { axiosInstance } from "@/Api/Axios/Axios";
import {IDoctorDetailsResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const doctorDetails= async(id:string):Promise<IDoctorDetailsResponse> =>{
    const res = await axiosInstance.get<IDoctorDetailsResponse>(
        `${endpoints.cms.doctorDetails}/${id}`
    )
    return res.data;
}