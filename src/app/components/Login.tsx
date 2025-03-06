import { LoginButton } from "@/app/components";

const Login = () => {
    return (
        <div className="bg-gray-400 p-12 rounded-2xl max-w-2xl border-blue-500 border-t-8">
            <div className="flex justify-between items-center mb-9">
                <h1 className="text-5xl font-bold tracking-tight">BlogveL</h1>
                <LoginButton />
            </div>
            <p className="text-2xl">
                Explore our latest posts, join the conversation, and feel free
                to share your thoughts. Your journey with us starts now—let's
                dive into the world of endless possibilities!
            </p>
        </div>
    );
};

export default Login;
