import { axiosInstance } from "@/Api/Axios/Axios";
import {IcreateaAppointMentResponse,IcreateaAppointMentPayload} from '@/typescript/cms.interface';
import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const createAppointment:MutationFunction<IcreateaAppointMentResponse,string> = async(payload:string)=>{
    const res = await axiosInstance.post<IcreateaAppointMentResponse>(
        endpoints.cms.createAppointment,
        payload
    )
    return res.data;
}