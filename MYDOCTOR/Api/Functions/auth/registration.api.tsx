import {MutationFunction} from '@tanstack/react-query';
import { axiosInstance } from '../../Axios/Axios';
import { endpoints } from '../../Endpoints/endpoints';
import {
    IRegisterResponse,
    IregisterUserResponse
} from "@/typescript/auth.interface";

export const Registration: MutationFunction<IregisterUserResponse, FormData> = async(
    userPayload: FormData
):Promise<IregisterUserResponse> =>{
    const res = await axiosInstance.post<IregisterUserResponse>(
        endpoints.auth.signUp,
        userPayload
    );
    return res.data;
};