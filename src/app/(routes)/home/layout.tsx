const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="m-auto min-h-screen max-w-4xl p-12">{children}</div>;
};

export default HomeLayout;
