import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { IuserProfileResponse, IregisterUserResponse } from '@/typescript/auth.interface';
import { login } from "@/Api/Functions/auth/login.api";
import { Registration } from "@/Api/Functions/auth/registration.api";
import { AxiosError } from 'axios';
import { useDispatch } from "react-redux";
import { login as loginAction } from '@/toolkit/authSlice'; // Ensure correct path to your Redux action

// Hook for sign-in
export const useSignInMutation = (): UseMutationResult<
  IuserProfileResponse,
  AxiosError,
  string
> => {
  const cookies = new Cookies();
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation<IuserProfileResponse, AxiosError, string>({
    mutationFn: login,
    onSuccess: (response) => {
      const { token, status, message, data } = response || {};
      console.log(data);

      if (status === 200) {
        cookies.set("token", token, {
          path: '/',
          secure: true,
          sameSite: "strict"
        });
        cookies.set("userId", data._id, {
          path: '/',
          secure: true,
          sameSite: "strict"
        });
        dispatch(loginAction(data.image)); 
        router.push('/');
        toast.success("Logged in successfully");
      } else {
        toast.error(message || "An error occurred");
      }
    },
    onError: (error: AxiosError) => {
      toast.error("An error occurred!");
      console.error("Login error:", error.response?.data); // More specific error logging
    }
  });
}

// Hook for user sign-up
export const useUserSignUpMutation = (): UseMutationResult<
  IregisterUserResponse,
  AxiosError,
  FormData
> => {
  const router = useRouter();

  return useMutation<IregisterUserResponse, AxiosError, FormData>({
    mutationFn: Registration,
    onSuccess: (response) => {
      const { success, message } = response || {};
      if (success) {
        toast.success(message);
        router.push("/auth/signin");
      } else {
        toast.error(message || "An error occurred!");
      }
    },
    onError: (error: AxiosError) => {
      toast.error("An error occurred!");
      console.error("Sign-up error:", error.response?.data); // More specific error logging
    }
  });
}
