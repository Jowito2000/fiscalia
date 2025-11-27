import { HeaderBar } from "@/components/header/HeaderBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <HeaderBar />
      {children}
    </div>
  );
};
export default RootLayout;