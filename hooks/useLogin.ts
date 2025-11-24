import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (loginData: any, remember: boolean) => {
    setLoading(true);
    try {
      toast.success("¡Inicio de sesión exitoso!");
      if (remember) {
        //localStorage.setItem("fiscalIASession", JSON.stringify(data.user));
      }

      router.push("/");

    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
