"use client";
import Image from "next/image";
import { ArrowIcon } from "../assets/icons";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    return (
        <Image
            src={ArrowIcon}
            alt="Arrow"
            width={30}
            height={30}
            className=" hover:cursor-pointer hover:opacity-80 transition-all duration-150"
            onClick={router.back}
        />
    );
};

export default BackButton;
