import  {UseMutationResult, useMutation, useQuery, UseQueryResult} from '@tanstack/react-query';
import { useGlobalHooks } from './GlobalHooks';
import {IListOfDoctorResponse,
IContactUsPayload, 
IContactUsResponse,
IcreateaAppointMentPayload, 
IcreateaAppointMentResponse,
IDoctorDetailsResponse,
IDepartmentWiseDoctorResponse,
IFeaturedDoctorResponse,
IPersonalCareDoctorResponse,
IChildCareDoctorResponse,
IDepartmentsResponse,
IAllBlogsResponse,
ISingleBlogresponse,
ICreateBlogCommentPayload,
ICreateBlogCommentResponse,
ISingleBlogCommentsResponse,
IUserDashboardResponse,
IRecentBlogResponse,
ISearchBlogResponse
} from '@/typescript/cms.interface'
import { allDoctors } from '@/Api/Functions/cms/allDoctors.api';
import { AxiosError } from 'axios';
import { contactUs } from '@/Api/Functions/cms/contactus.api';
import { toast } from 'react-toastify';
import { createAppointment } from '@/Api/Functions/cms/createAppointment.api';
import { departmentWiseDoctor } from '@/Api/Functions/cms/departmentwisedoctor.api';
import { featuredDoctors } from '@/Api/Functions/cms/featuredDoctor.api';
import { doctorDetails } from '@/Api/Functions/cms/doctordetails.api';
import { personalcareDoctors } from '@/Api/Functions/cms/personalcareDoctors.api';
import { childCare } from '@/Api/Functions/cms/childcare.api';
import { allDepartments } from '@/Api/Functions/cms/alldepartments.api';
import { allBlogs } from '@/Api/Functions/cms/allblogs.api';
import { singleBlog } from '@/Api/Functions/cms/blogdetails.api';
import { createComment } from '@/Api/Functions/cms/createComment.api';
import { singleBlogComments } from '@/Api/Functions/cms/singleBlogComments.api';
import { IuserProfileResponse } from '@/typescript/auth.interface';
import { dashboard } from '@/Api/Functions/cms/dashboard.api';
import { recentBlog } from '@/Api/Functions/cms/recentBlogs.api';
import { searchBlog } from '@/Api/Functions/cms/searchBlog.api';
import { useRouter } from 'next/router';

export const useAllDoctorList = (): UseQueryResult<IListOfDoctorResponse> => {
    const {queryClient} = useGlobalHooks();
    return useQuery<IListOfDoctorResponse>({
        queryKey: ['doctorsList'],
        queryFn: allDoctors,
        
    });
}

export const useContactUsMutation = ():UseMutationResult<
IContactUsResponse,
AxiosError,
string,
unknown
> =>{
    return useMutation<IContactUsResponse,AxiosError,string>({
        mutationFn: contactUs,
        onSuccess:(response)=>{
            const {status,data,message} = response || {};
            if(status===true){
                toast.success("contact created successfully");
            }else{
                toast.error("an unknown error occurred")
            }
        }
    })
}

export const useCreateAppoitmentMutation = ():UseMutationResult<
IcreateaAppointMentResponse,
AxiosError,
string,
unknown
>=>{
    const router = useRouter();
    return useMutation<IcreateaAppointMentResponse,AxiosError,string>({
        mutationFn: createAppointment,
        onSuccess:(response)=>{
            const {status,message}=response || {};
            if(status){
                toast.success("appointmemnt created successfully");
                router.push('/');
            }
        },
        onError:(error)=>{
            toast.error(error?.message)
        }
    })
}



export const useDeptWiseDoctorQuery = (id: string): UseQueryResult<IDepartmentWiseDoctorResponse> => {
    return useQuery<IDepartmentWiseDoctorResponse>({
        queryKey: ['departmentWiseDoctor', id],
        queryFn: () => departmentWiseDoctor(id),
    });
};

export const useGetFeaturedDoctorQuery = ():UseQueryResult<IFeaturedDoctorResponse>=>{
    return useQuery<IFeaturedDoctorResponse>({
        queryKey:["featuredDoctors"],
        queryFn: featuredDoctors
    })
}

export const useDoctorDetailsQuery = (id:string):UseQueryResult<IDoctorDetailsResponse> =>{
    return useQuery<IDoctorDetailsResponse>({
        queryKey:["doctorDetails",id],
        queryFn: ()=> doctorDetails(id)
    })
}

export const usePersonalCareDoctorQuery = ():UseQueryResult<IPersonalCareDoctorResponse>=>{
    return useQuery<IPersonalCareDoctorResponse>({
        queryKey:["personalCare"],
        queryFn:personalcareDoctors
    })
}

export const useChildCareDoctorQuery = ():UseQueryResult<IChildCareDoctorResponse> =>{
    return useQuery<IChildCareDoctorResponse>({
        queryKey:["childCare"],
        queryFn:childCare
    })
}

export const useGetAllDeptsQuery = ():UseQueryResult<IDepartmentsResponse>=>{
    return useQuery<IDepartmentsResponse>({
        queryKey:["departments"],
        queryFn: allDepartments
    })
}

export const useAllBlogQuery=():UseQueryResult<IAllBlogsResponse> =>{
    return useQuery<IAllBlogsResponse>({
        queryKey:["allBlogs"],
        queryFn:allBlogs
    })
}

export const useGetSingleBlogQuery = (id:string):UseQueryResult<ISingleBlogresponse> =>{
    return useQuery<ISingleBlogresponse>({
        queryKey:["singleBlog"],
        queryFn: ()=>singleBlog(id)
    })
}

export const useCreateCommentMutation = ():UseMutationResult<
ICreateBlogCommentResponse,
AxiosError,
string,
unknown
> =>{
    return useMutation<ICreateBlogCommentResponse,AxiosError,string>({
        mutationFn: createComment,
        onSuccess: (response)=>{
            const {status,message, data} = response || {};
            if(status===200){
                toast.success(message);
            }
        }
    })
}

export const useGetSingleBlogComments = (id:string):UseQueryResult<ISingleBlogCommentsResponse> =>{
    return useQuery<ISingleBlogCommentsResponse>({
        queryKey:['singleBlogComment',id],
        queryFn: ()=> singleBlogComments(id)
    })
}

export const useUserDashboardQuery = (id:string):UseQueryResult<IUserDashboardResponse> =>{
    return useQuery<IUserDashboardResponse>({
        queryKey:["userDashboard",id],
        queryFn: ()=> dashboard(id)
    })
}

export const useRecentBlogQuery = () :UseQueryResult<IRecentBlogResponse> =>{
    return useQuery<IRecentBlogResponse>({
        queryKey:["recentBlogs"],
        queryFn: recentBlog
    })
}

export const useSearchBlogQuery = (payload:string):UseQueryResult<ISearchBlogResponse> =>{
    return useQuery<ISearchBlogResponse>({
        queryKey:["searchBlog",payload],
        queryFn: ()=>searchBlog(payload)
    })
}