"use server"

import { signIn, signOut } from "@/auth/auth"


export const login = async () => {
    await signIn("github", {redirectTo: "/home?status=1"});
}

export const logout = async () => {
    await signOut();
}