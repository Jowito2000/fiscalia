import { HeaderBar } from "../../../components/HeaderBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col bg-gray-50">
      <HeaderBar />
      {children}
    </div>
  );
};
export default RootLayout;