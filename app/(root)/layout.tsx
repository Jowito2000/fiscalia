import {HeaderBar} from "../components/HeaderBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return( 
    <div> 
        <div>
          <HeaderBar />           
        </div>
        {children}
    </div>
  );
} 

export default RootLayout;