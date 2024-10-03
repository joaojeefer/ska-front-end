'use client';

import { getUserInfoById, signIn } from "@/api";
import { GetUserInfo, SignInApiPayload } from "@/api/types";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean
    user: GetUserInfo | undefined
    handleSignIn: (data: SignInApiPayload) => Promise<void>
    handleLogout: () => void
}

type AuthProviderProps = {
    children: ReactNode;
}

const USER_TOKEN_KEY = 'ska-app-token';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<GetUserInfo | undefined>(undefined);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { [USER_TOKEN_KEY]: token } = parseCookies();

        if (token) {
            const userId = JSON.parse(token).userId;

            getUserInfo(userId);
        }
    }, []);

    async function getUserInfo(userId: number) {
        const userInfo = await getUserInfoById(userId);

        if (userInfo) {
            setUser(userInfo);
        }
    }
    
    async function handleSignIn(data: SignInApiPayload) {
        const response = await signIn(data);

        if (response) {
            setCookie(
                undefined,
                USER_TOKEN_KEY,
                JSON.stringify({ token: response.token, userId: response.userId }),
                {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                }
            );

            setUser({ userId: response.userId, username: data.username });

        } else {
            setUser(undefined);
        }
    }

    async function handleLogout() {
        destroyCookie(undefined, USER_TOKEN_KEY);

        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, handleSignIn, handleLogout }}>{children}</AuthContext.Provider>
    );
}
