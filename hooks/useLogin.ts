import { loginUser } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface LoginFields {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (loginFields: LoginFields, remember: boolean) => {
    try {
      setLoading(true);

      const userCredential = await loginUser(loginFields['email'], loginFields['password']);

      toast.success("Inicio de sesión exitoso");

      if (remember) {
        localStorage.setItem("rememberEmail", loginFields['email']);
      }

      setTimeout(() => router.push("/"), 200);

    } catch (err: any) {
      console.error(err);

      let message = "Error al iniciar sesión";

      if (err.code === "auth/wrong-password") message = "Contraseña incorrecta";
      if (err.code === "auth/user-not-found") message = "El usuario no existe";
      if (err.code === "auth/invalid-email") message = "Correo inválido";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
