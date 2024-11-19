import { axiosInstance } from "@/Api/Axios/Axios";
import {IListOfDoctorResponse} from '@/typescript/cms.interface';
// import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const allDoctors= async():Promise<IListOfDoctorResponse>=>{
    console.log("calledf");
    
    const res = await axiosInstance.get<IListOfDoctorResponse>(
        endpoints.cms.listOfDoctors
    )
    return res.data;
}