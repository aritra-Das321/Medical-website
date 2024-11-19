interface LoginPayload {
    email: string;
  password: string;
}
interface user{
    _id:string;
    email:string;
    phone:string;
    image:string;
}
interface LoginResponse {
    success: boolean;
    message: string;
    status: number;
    token: String;
    data:user
}
export interface ILoginResponse extends LoginPayload {
    data: LoginPayload;
}
export interface IuserProfileResponse extends LoginResponse {
    
}
interface registerPayload{
    name: string;
email:string;
phone:string;
password:string;
forget:string;
image:File;
}
interface registerResponsePayload{
    success: boolean;
    message: string;
    status: number;
    token: String;
}

export interface IRegisterResponse extends registerPayload{
    data: registerPayload
}
export interface IregisterUserResponse extends registerResponsePayload{
    data: registerResponsePayload
}