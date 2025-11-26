import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (data: any) => {
    if (!data.userType) return toast.error("Selecciona un tipo de usuario");

    setLoading(true);
    try {
      // Registrarse en la Base de Datos
      console.log("Registrando en la Base de Datos");
      toast.success("Cuenta creada exitosamente");
      //localStorage.setItem("fiscalIASession", JSON.stringify(data.user));

      router.push("/");

    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}
