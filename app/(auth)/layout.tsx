import { Logo } from "../components";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-6">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
