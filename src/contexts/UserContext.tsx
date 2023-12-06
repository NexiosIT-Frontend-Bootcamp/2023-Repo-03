import { useContext, useState, createContext, useEffect } from "react"; 
import { IUser } from "../types/User";
import { LoginResult } from "../types/LoginResult"
import * as api from "../api/Auth/Auth";
import { AxiosResponse } from "axios";
import { Cookies, useCookies } from "react-cookie";

export interface IProviderProps {
    children?: any;
  }

export interface IUserContext {
    loading: boolean;
    user?: IUser;
    jwt?: string;
    signIn: (email: string, password: string) => Promise<LoginResult>;
    signOut: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({ children }: IProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | undefined>();
    const [jwt, setJwt] = useState<string>();

    const [cookies, setCookie] = useCookies(["user"]);

    useEffect(() => {
        if (cookies.user) {
            setUser(cookies.user);
        }
    }, []);

    const signIn = async (email: string, password: string): Promise<LoginResult> => {
        setLoading(true);
    
        try {
            const response: AxiosResponse<any, any> = await api.signIn(email, password);

            setJwt(response.data.access_token); 

            const userResponse: AxiosResponse<any, any> = await api.retrieveUserInformation(response.data.access_token)
    
            const username: string = userResponse.data.username;

            const user: IUser = {username, email, password}

            setUser(user); 

            setCookie("user", user, { path: "/" });
    
            setLoading(false);
            return { isSuccess: true, accessToken: response.data.access_token };
        } catch (e) {
            setLoading(false);
            return { isSuccess: false, error: e.response.data.message}
        }
        };

    const signOut = () => {
        setUser(undefined);
        setJwt("");
    };

    return <UserContext.Provider value={{ loading, signIn, signOut, user, jwt, cookies }}> {children} </UserContext.Provider>
}

export const useUserContext = (): IUserContext => {
    const context = useContext<IUserContext | null>(UserContext);

    if (!context) {
        throw new Error("User context must be used within a Provider")
    }
    return context;
}