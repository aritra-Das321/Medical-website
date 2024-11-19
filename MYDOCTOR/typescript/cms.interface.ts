
interface contactUsPayload{
name:string;
email:string;
topic:string;
phone:string;
msg:string
}
interface contactUsResponse{
success:boolean;
message:string;
status:boolean
}
export interface IContactUsPayload extends contactUsPayload{
    data:contactUsPayload
}
export interface IContactUsResponse extends contactUsResponse{
    data:contactUsResponse
}
interface doctorDeptDetails{
    departmentName:string
}
interface doctorDetails{
    _id: number;
  name: string;
  aperture_time:string;
  departure_time:string;
  department_details:doctorDeptDetails[];
  image:string;
  department_id:string;
}
interface listOfDoctorResponse{
data:doctorDetails[];
status:boolean;
message:string;
}
export interface IListOfDoctorResponse extends listOfDoctorResponse{
    
}


interface createAppointmentPayload{
user_id:string;
department_id:string;
doctor_id:string;
phone:number;
message:string;
data:object;
success:boolean;
token:string
}
interface createAppointmentResponse{
data:object;
status:boolean;
message:string;
}

export interface IcreateaAppointMentPayload extends createAppointmentPayload{
    data: createAppointmentPayload
}
export interface IcreateaAppointMentResponse extends createAppointmentResponse{
    data: createAppointmentResponse
}
interface deptWiseDoctor{
    _id:string;
    aperture_time:string;
    departure_time:string;
    name:string;
    image:string;
    description:string;
}
interface departmentWiseDoctorResponse{
    data:deptWiseDoctor[];
    success:boolean;
    message:string;
    token:string
}
export interface IDepartmentWiseDoctorResponse extends departmentWiseDoctorResponse{
}
interface featuredDoctorResponse{
    data:object;
    success:boolean;
    message:string;
    token:string
}
export interface IFeaturedDoctorResponse extends featuredDoctorResponse{
    data: featuredDoctorResponse;
}
interface departmentIdDetailsInDoctorDetails{
    _id:string;
    departmentName:string;
    description:string
}
interface doctorDetailsApires{
    _id: number;
  name: string;
  aperture_time:string,
  departure_time:string,
  department_id:departmentIdDetailsInDoctorDetails,
  description:string,
  image:string
}
interface doctorDetailsResponse{
    data:doctorDetailsApires;
    success:boolean;
    message:string;
    token:string
}
export interface IDoctorDetailsResponse extends doctorDetailsResponse{

}
interface personalCareDoctorResponse{
    status:boolean;
    message:string;
    data:object;
    name:string;
    description:string;
    image:string
}
export interface IPersonalCareDoctorResponse extends personalCareDoctorResponse{
    data: personalCareDoctorResponse;
}
interface childCareDoctorResponse{
    status:boolean;
    message:string;
    data:object;
}
export interface IChildCareDoctorResponse extends childCareDoctorResponse{
    data: childCareDoctorResponse;
}
export interface IDepartmentsData{
    _id:string;
    departmentName:string;
    description:string;
    doctor_id:string[]
}
interface departmentsResponse{
    status:boolean;
    message:string;
    data:IDepartmentsData[];
}
export interface IDepartmentsResponse extends departmentsResponse{
    
}

interface blogContent{
    _id:string;
    title:string;
    description:string;
    createdAt:any;
    image:string
}
interface allBlogsResponse{
    status:boolean;
    message:string;
    data:blogContent[];
}
export interface IAllBlogsResponse extends allBlogsResponse{
}
interface singleBlogContent{
    _id:string;
    createdAt:string;
    description:string;
    image:string;
    title:string;
}
interface singleBlogresponse{
    status:boolean;
    message:string;
    data:singleBlogContent;
}
export interface ISingleBlogresponse extends singleBlogresponse{
    
}
interface createBlogCommentPayload{
    blog_Id:string;
    user_id:string;
    comment:string;
}
interface createBlogCommentResponse{
    status:number;
    message:string;
    data:object;
}
export interface ICreateBlogCommentPayload extends createBlogCommentPayload{
}
export interface ICreateBlogCommentResponse extends createBlogCommentResponse{
    data: createBlogCommentResponse;
}
interface singleBlogUserIdDetails{
    name:string;
    email:string;
    image:string;
}
interface singleBlogCommentsData{
    _id:string;
    comment:string;
    createdAt:string;
    user_id:singleBlogUserIdDetails
}
interface singleBlogCommentsResponse{
    status:boolean;
    message:string;
    data:singleBlogCommentsData[];
    count:number;

}
export interface ISingleBlogCommentsResponse extends singleBlogCommentsResponse{
  
}
interface dashboardDepartmentId{
_id:string;
departmentName:string;
}
interface dashboardDoctorId{
name:string;
image:string;
description:string;
}
interface dashboardData{
    createdAt:string;
    _id:string;
    isPending:boolean;
    doctor_id:dashboardDoctorId;
    department_id: dashboardDepartmentId;
    message:string;
    phone:string;
}
interface userDashboardResponse{
    status:boolean;
    message:string;
    data:dashboardData[];
}
export interface IUserDashboardResponse extends userDashboardResponse{
}
interface recentBlogContent{
    _id:string;
    description:string;
    image:string;
    title:string
}
interface recentBlogResponse{
    status:boolean;
    message:string;
    data:recentBlogContent[];
}
export interface IRecentBlogResponse extends recentBlogResponse{
    
}
interface searchBlogResponse{
    status:boolean;
    message:string;
    data:object;
}
export interface ISearchBlogResponse extends searchBlogResponse{
    data: searchBlogResponse;
}