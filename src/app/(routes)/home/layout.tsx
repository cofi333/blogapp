const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <div className="max-w-4xl m-auto min-h-screen p-12">{children}</div>;
};

export default HomeLayout;
