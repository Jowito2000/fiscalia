"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";
import { User, Mail, Lock, Briefcase } from "lucide-react";
import { useRegister } from "@/hooks/useRegister";

export function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  });

  const { register, loading } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Nombre */}
      <div className="space-y-2">
        <Label>Nombre</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Juan"
            className="pl-10"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Apellidos */}
      <div className="space-y-2">
        <Label>Apellidos</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pérez García"
            className="pl-10"
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Correo Electrónico</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="email@ejemplo.com"
            className="pl-10"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label>Contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Tipo de Usuario */}
      <div className="space-y-2">
        <Label>Tipo de Usuario</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground z-10" />

          <Select
            value={values.userType}
            onValueChange={(v) => setValues({ ...values, userType: v })}
          >
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Selecciona tu perfil" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="autonomo">Autónomo</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="pyme">Pequeña Empresa</SelectItem>
              <SelectItem value="particular">Particular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Botón */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </Button>
      
    </form>
  );
}
