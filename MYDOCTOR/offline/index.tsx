import {
    useContext,
    createContext,
    useEffect,
    useState,

  } from "react";
  
  type ChildrenType = {
    children: React.ReactNode;
  };
  
  type NetworkStatusContextType = {
    isOnline: boolean;
  };
  
  const NetworkContext = createContext<NetworkStatusContextType | null>(null);
  
  export const NetworkProvider = ({ children }: ChildrenType) => {
    const [isOnline, setOnline] = useState<boolean>(true); 
  
    useEffect(() => {
      const updateOnlineStatus = () => {
        if (typeof navigator !== "undefined") {
          setOnline(navigator.onLine);
        }
      };
  
      updateOnlineStatus(); // Set the initial status
  
      window.addEventListener("online", () => setOnline(true));
      window.addEventListener("offline", () => setOnline(false));
  
      return () => {
        window.removeEventListener("online", () => setOnline(true));
        window.removeEventListener("offline", () => setOnline(false));
      };
    }, []);
  
    return (
      <NetworkContext.Provider value={{ isOnline }}>
        {children}
      </NetworkContext.Provider>
    );
  };
  
  export const useNetworkCheck = () => {
    const context = useContext(NetworkContext);
    if (!context) {
      throw new Error("useNetworkCheck must be used inside of NetworkProvider");
    }
  
    return context;
  };
  