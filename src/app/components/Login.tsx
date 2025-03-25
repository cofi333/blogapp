import { LoginButton } from '@/app/components';

const Login = () => {
  return (
    <div className="max-w-2xl rounded-2xl border-t-8 border-blue-500 bg-gray-400 p-12">
      <div className="mb-9 flex items-center justify-between">
        <h1 className="text-5xl font-bold tracking-tight">BlogveL</h1>
        <LoginButton />
      </div>
      <p className="text-2xl">
        Explore our latest posts, join the conversation, and feel free to share
        your thoughts. Your journey with us starts now—let&apos;s dive into the
        world of endless possibilities!
      </p>
    </div>
  );
};

export default Login;
