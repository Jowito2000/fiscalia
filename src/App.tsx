import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { SplashScreen } from "./components/SplashScreen";
import { AuthScreen } from "./components/AuthScreen";
import { OnboardingTutorial } from "./components/OnboardingTutorial";
import { ChatInterface } from "./components/ChatInterface";
import { InvoiceGenerator } from "./components/InvoiceGenerator";
import { TaxModels } from "./components/TaxModels";
import { DocumentCenter } from "./components/DocumentCenter";
import { UserProfile } from "./components/UserProfile";
import { PaymentPlans } from "./components/PaymentPlans";
import { Button } from "./components/ui/button";
import {
  Calculator,
  MessageSquare,
  FileText,
  TrendingUp,
  FolderOpen,
  User,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

type AppView =
  | "chat"
  | "invoices"
  | "tax-models"
  | "documents"
  | "profile"
  | "plans";

interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  userType: string;
  accessToken: string;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [currentView, setCurrentView] =
    useState<AppView>("chat");
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem(
      "hasSeenOnboarding",
    );
    if (!hasSeenOnboarding && isAuthenticated) {
      setShowOnboarding(true);
    }
  }, [isAuthenticated]);

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentView("chat");
    localStorage.removeItem("hasSeenOnboarding");
  };

  const handleUpdateUser = (userData: any) => {
    setCurrentUser((prev) =>
      prev ? { ...prev, ...userData } : null,
    );
  };

  const navigationItems = [
    {
      id: "chat" as AppView,
      label: "Chat IA",
      icon: MessageSquare,
    },
    {
      id: "invoices" as AppView,
      label: "Facturas",
      icon: FileText,
    },
    {
      id: "tax-models" as AppView,
      label: "Modelos",
      icon: TrendingUp,
    },
    {
      id: "documents" as AppView,
      label: "Documentos",
      icon: FolderOpen,
    },
    { id: "profile" as AppView, label: "Perfil", icon: User },
    {
      id: "plans" as AppView,
      label: "Planes",
      icon: CreditCard,
    },
  ];

  if (showSplash) {
    return (
      <SplashScreen onComplete={() => setShowSplash(false)} />
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {showOnboarding && (
        <OnboardingTutorial
          onComplete={handleOnboardingComplete}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl">Fiscal IA</h1>
              <p className="text-xs text-muted-foreground">
                Tu asistente fiscal inteligente
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={
                    currentView === item.id
                      ? "default"
                      : "ghost"
                  }
                  onClick={() => setCurrentView(item.id)}
                  className="space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:block text-right mr-2">
              <p className="text-sm">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">
                {currentUser?.email}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={
                      currentView === item.id
                        ? "default"
                        : "ghost"
                    }
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentView === "chat" && currentUser && (
          <div className="h-full bg-gray-100">
            <ChatInterface
              userId={currentUser.id}
              accessToken={currentUser.accessToken}
            />
          </div>
        )}

        {currentView === "invoices" && currentUser && (
          <div className="h-full overflow-auto bg-white">
            <InvoiceGenerator
              userId={currentUser.id}
              accessToken={currentUser.accessToken}
              userData={currentUser}
            />
          </div>
        )}

        {currentView === "tax-models" && (
          <div className="h-full overflow-auto bg-white">
            <TaxModels />
          </div>
        )}

        {currentView === "documents" && currentUser && (
          <div className="h-full overflow-auto bg-white">
            <DocumentCenter
              userId={currentUser.id}
              accessToken={currentUser.accessToken}
            />
          </div>
        )}

        {currentView === "profile" && currentUser && (
          <div className="h-full overflow-auto bg-white">
            <UserProfile
              userData={currentUser}
              accessToken={currentUser.accessToken}
              onUpdateUser={handleUpdateUser}
            />
          </div>
        )}

        {currentView === "plans" && (
          <div className="h-full overflow-auto bg-white">
            <PaymentPlans />
          </div>
        )}
      </main>

      <Toaster />
    </div>
  );
}