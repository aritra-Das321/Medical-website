import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
interface GlobalHooks{
    queryClient:QueryClient
}

export const useGlobalHooks =(): GlobalHooks =>{
    const queryClient = useQueryClient();
    return {queryClient}
}