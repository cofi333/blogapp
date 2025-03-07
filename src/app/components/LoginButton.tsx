"use client";
import { GitHubIcon } from "../assets/icons";
import Image from "next/image";
import { login } from "@/auth/actions";
import { toast } from "sonner";

const LoginButton = () => {
    return (
        <button
            onClick={() => login()}
            className="bg-black text-white p-3 rounded-xl hover:cursor-pointer items-center transition-all ease-in hover:opacity-80 font-medium flex gap-2"
        >
            <Image src={GitHubIcon} alt="Github icon" width={25} height={20} />
            Sign in with GitHub
        </button>
    );
};

export default LoginButton;
