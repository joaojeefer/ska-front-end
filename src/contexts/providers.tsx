import { ReactNode } from "react";
import { AuthProvider } from "./auth";

type ProvidersProps = {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return <AuthProvider>{children}</AuthProvider>;
}