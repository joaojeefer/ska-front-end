'use client';

import { LoginForm } from "@/components";
import { AuthContext } from "@/contexts";
import { useContext } from "react";
import Machines from "./machines/page";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <main>
      {isAuthenticated ? <Machines /> : <LoginForm />}
    </main>
  );
}
