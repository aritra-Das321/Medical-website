import { axiosInstance } from "@/Api/Axios/Axios";
import {IDepartmentWiseDoctorResponse} from '@/typescript/cms.interface';
import { endpoints } from "@/Api/Endpoints/endpoints";

export const departmentWiseDoctor = async(id:string): Promise<IDepartmentWiseDoctorResponse>=>{
    const res = await axiosInstance.get<IDepartmentWiseDoctorResponse>(
        `${endpoints.cms.depertmentWiseDoctor}/${id}`
    )
    return res.data;
}