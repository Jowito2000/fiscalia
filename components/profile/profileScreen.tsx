"use client";

import { useState } from "react";
import { Sun, Moon, Shield, Badge } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";



export default function ProfileScreen() { 
    return (
        <div className="flex h-screen">      
            <div className={`flex-1 p-10 space-y-6 `}>        
                <div className="space-y-8">
                    <div>
                        <h2>Mi Perfil</h2>
                        <p className="text-muted-foreground">
                        Gestiona tu información personal y fiscal
                        </p>
                    </div>
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle>Mi Perfil</CardTitle>
                            <CardDescription>Gestiona tu información personal y fiscal</CardDescription>                
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle>Datos Personales</CardTitle>
                            <Button>
                                si                  
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Nombre</Label>
                                    <Input />
                                </div>
                                <div>
                                    <Label>Apellidos</Label>
                                    <Input />
                                </div>
                            </div>
                            <div>
                                <Label>Correo</Label>
                                <Input />
                            </div>
                            <div>
                                <Label>Teléfono</Label>
                                <Input />
                            </div>
                            <div>
                                <Label>Dirección</Label>
                                <Input />
                            </div>
                        </CardContent>
                    </Card>
                </div>               
            </div>
        </div>
  );
    
}