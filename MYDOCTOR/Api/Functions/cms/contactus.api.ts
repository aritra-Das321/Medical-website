import { axiosInstance } from "@/Api/Axios/Axios";
import {IContactUsPayload,IContactUsResponse} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const contactUs:MutationFunction<IContactUsResponse,string> = async(payload:string)=>{
    const res = await axiosInstance.post<IContactUsResponse>(
        endpoints.cms.contactUs,
        payload
    )
    return res.data;
}