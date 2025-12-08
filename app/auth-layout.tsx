"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const PUBLIC_ROUTES = ["/login"];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  const shouldBlockUI =
    loading ||
    (!currentUser && !isPublic) ||
    (currentUser && isPublic);

  useEffect(() => {
    if (!loading) {
      if (!currentUser && !isPublic) {
        router.replace("/login");
      }
      if (currentUser && isPublic) {
        router.replace("/");
      }
    }
  }, [currentUser, loading, pathname, isPublic, router]);

  if (shouldBlockUI) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Cargando...
      </div>
    );
  }

  return <>{children}</>;
}
