import { RegisterDTO } from "@/model/UserModel";
import { registerUser } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterDTO) => {
    try {
      setLoading(true);
      const userCredential = await registerUser(data);

      toast.success("Cuenta creada exitosamente");

      // Esperamos unos ms para permitir que useAuth detecte el cambio
      setTimeout(() => router.push("/"), 200);

    } catch (err: any) {
      console.error(err);

      let message = "Error desconocido";

      if (err.code === "auth/email-already-in-use")
        message = "El correo ya está registrado";
      else if (err.code === "auth/weak-password")
        message = "La contraseña es demasiado débil";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}
