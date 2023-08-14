"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import userService from "../services/userService";

interface ContextProps {
  token: string;
}
const AuthContext = createContext<ContextProps>({
  token: ''
});

const AuthContextProvider = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string>("");

  const checkLogin = async () => {
    const access_token = localStorage.getItem("token") ?? "";

    if (access_token !== "") {
      try {
        const { exp } = jwtDecode<JwtPayload>(access_token);
        
        setToken(access_token);
        if (exp && exp < Math.floor(Date.now() / 1000)) {
          localStorage.removeItem('token');
          setToken("")
          // return false;
          throw new Error("Token expired");
        }

        if (exp && exp < Math.floor(Date.now() / 1000) - 1000) {

          alert(
            "Phiên đăng nhập sắp hết hạn, vui lòng đăng nhập lại để sử dụng !!!"
          );
        }

        return true;
      } catch (error) {
        console.error("Error decoding or verifying token:", error);
        return false;
      }
    } else {
      setToken("");
      return false;
    }
  };
  
  useEffect(() => {
    // Check if token exists in localStorage
    if(!userService.isLoggedIn()){
      router.push("/");
    }
    if (!checkLogin()) {
      router.push("/");
      localStorage.removeItem('token')
    }
  }, [pathname]);
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
