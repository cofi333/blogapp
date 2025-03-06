"use client";
import { Button } from "@/app/components/ui/button";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button
            variant="destructive"
            className="mt-6"
            type="submit"
            disabled={pending}
        >
            {pending ? "Loading..." : "Delete"}
        </Button>
    );
};

export default DeleteButton;
