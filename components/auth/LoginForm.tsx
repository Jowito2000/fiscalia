"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Image from "next/image";

export function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);

  const { login, loading } = useLogin();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("submit!")
  toast.info("Iniciando sesión");
  login(values, remember);
};


  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Correo Electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="login-email"
              type="email"
              placeholder="tu@email.com"
              className="pl-10"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              value={ values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember-session"
            checked={remember}
            onCheckedChange={(checked : boolean) => setRemember(checked as boolean)}
          />
          <Label
            htmlFor="remember-session"
            className="text-sm cursor-pointer select-none"
          >
            Recordar mi sesión
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          toast.error("Google no disponible");
        }}
      >
        <Image src="googlechrome.svg" alt="Google" width={16} height={16} className="mr-2" />
        Google
      </Button>
    </div>
  );
}
