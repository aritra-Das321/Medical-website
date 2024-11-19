import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NetworkProvider, useNetworkCheck } from "@/offline";
import Layout from "@/Layout/layout/Layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'leaflet/dist/leaflet.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "@/toolkit/store";

const queryClient =new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <NetworkProvider>
          <Layout>
            <ToastContainer/>
            <Component {...pageProps} />
          </Layout>
        </NetworkProvider>
      </QueryClientProvider>
      </Provider>
  )
}
