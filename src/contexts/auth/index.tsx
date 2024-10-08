'use client';

import { getUserInfoById, signIn } from "@/api";
import { GetUserInfo, SignInApiPayload } from "@/api/types";
import { jwtDecode } from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean
    isSigningIn: boolean
    user: GetUserInfo | undefined
    handleSignIn: (data: SignInApiPayload) => Promise<void>
    handleLogout: () => void
}

type AuthProviderProps = {
    children: ReactNode;
}

const USER_TOKEN_KEY = 'ska-app-token';
const MAX_AGE_COOKIE_LIFE = 60 * 60 * 24 * 30 // 30 days

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [user, setUser] = useState<GetUserInfo | undefined>(undefined);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { [USER_TOKEN_KEY]: token } = parseCookies();

        const decodedToken = token ? jwtDecode(token) : undefined;

        if (decodedToken?.sub) {
            const userId = Number(decodedToken.sub);

            getUserInfo(userId);
        }
    }, []);

    async function getUserInfo(userId: number) {
        setIsSigningIn(true);

        getUserInfoById(userId)
            .then((userInfo) => {
                if (userInfo) {
                    setUser(userInfo);
                }
            })
            .finally(() => setIsSigningIn(false));

    }
    
    async function handleSignIn(data: SignInApiPayload) {
        setIsSigningIn(true);

        signIn(data)
            .then((response) => {
                if (response) {
                    setCookie(
                        undefined,
                        USER_TOKEN_KEY,
                        JSON.stringify(response.token),
                        { maxAge: MAX_AGE_COOKIE_LIFE },
                    );
        
                    setUser({ userId: response.userId, username: data.username, name: response.name });
                } else {
                    setUser(undefined);
                }
            })
            .catch(() => setUser(undefined))
            .finally(() => setIsSigningIn(false));
    }

    async function handleLogout() {
        destroyCookie(undefined, USER_TOKEN_KEY);

        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isSigningIn, user, handleSignIn, handleLogout }}>{children}</AuthContext.Provider>
    );
}
