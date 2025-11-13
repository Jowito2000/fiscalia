
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return( 
    <div> 
        <div>
            <h1>Fiscalía Application</h1>
            <ul className="py-30 flex flex-col gap-2 text-blue-500  underline  hover:text-blue-700  cursor-pointer *:**:not-[]: transition-all  duration-300  ease-in-out *:**:not-[]: hover:scale-85">  
                <li><a href="/">Home</a></li>
                <li><a href="/chatbot">Chatbot</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/profile/settings">Settings</a></li>
                <li><a href="/profile/history">History</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/forgot-password">Forgot Password</a></li>
                <li><a href="/reset-password">Reset Password</a></li>
                <li><a href="/verify-email">Verify Email</a></li>
                <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
        </div>
        {children}
    </div>
  );
} 

export default RootLayout;