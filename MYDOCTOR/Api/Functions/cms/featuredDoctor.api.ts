import { axiosInstance } from "@/Api/Axios/Axios";
import {IFeaturedDoctorResponse} from '@/typescript/cms.interface';
// import {MutationFunction} from '@tanstack/react-query';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const featuredDoctors = async() :Promise<IFeaturedDoctorResponse>=>{
    const res = await axiosInstance.get<IFeaturedDoctorResponse>(
        endpoints.cms.featuredDoctors
    )
    return res.data;
}