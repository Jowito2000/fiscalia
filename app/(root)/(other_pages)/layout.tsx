import { HeaderBar } from "@/components/header/HeaderBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <HeaderBar />
      {children}
    </div>
  );
};
export default RootLayout;