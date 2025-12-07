import { RegisterDTO } from "@/model/UserModel";
import { registerUser } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterDTO) => {
    setLoading(true);
    try {
      await registerUser(data);
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
