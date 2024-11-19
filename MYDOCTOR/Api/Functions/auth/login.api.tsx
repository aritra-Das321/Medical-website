import {axiosInstance} from '../../Axios/Axios';
import { MutationFunction } from '@tanstack/react-query';
import {ILoginResponse,IuserProfileResponse} from "@/typescript/auth.interface";
import { endpoints } from '../../Endpoints/endpoints';
export const login:MutationFunction<IuserProfileResponse,string>=async(
    payload:string
):Promise<IuserProfileResponse>=>{
    console.log(payload);
    
    const res = await axiosInstance.post<IuserProfileResponse>(
        endpoints.auth.signIn,
        payload
    )
    return res.data
}