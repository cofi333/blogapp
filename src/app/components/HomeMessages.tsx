"use client";
import { useSearchParams } from "next/navigation";
import { Toaster } from "@/app/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";
import { THomeMessages } from "@/lib/types";

const HomeMessages = () => {
    const params = useSearchParams();
    const status = params.get("status");
    const message: THomeMessages = {
        1: "You are successfully logged in",
        2: "You successfully deleted your article",
    };

    useEffect(() => {
        const isShowed = sessionStorage.getItem("isShowed") || false;

        if (status && !isShowed) {
            toast(message[status], {
                position: "top-right",
                style: {
                    background: "#fff",
                    color: "#000",
                },
            });
            sessionStorage.setItem("isShowed", "true");
        }
    }, [params]);

    return <Toaster />;
};

export default HomeMessages;
