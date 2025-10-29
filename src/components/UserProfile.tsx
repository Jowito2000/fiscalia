import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { User, Mail, Briefcase, Building, MapPin, Phone, CreditCard, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId } from '../utils/supabase/info';

interface UserProfileProps {
  userData: any;
  accessToken: string;
  onUpdateUser: (userData: any) => void;
}

export function UserProfile({ userData, accessToken, onUpdateUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: '',
    nif: '',
    address: '',
    businessName: '',
    businessActivity: '',
  });

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ba59f8f5/user/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success('Perfil actualizado correctamente');
        onUpdateUser(data.user);
        setIsEditing(false);
      } else {
        toast.error('Error al actualizar perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error de conexión');
    }
  };

  const getInitials = () => {
    const name = formData.name || 'U';
    const lastName = formData.lastName || 'S';
    return `${name[0]}${lastName[0]}`.toUpperCase();
  };

  const getUserType = () => {
    return userData?.userType || 'particular';
  };

  const getUserTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      autonomo: 'Autónomo',
      freelance: 'Freelance',
      pyme: 'Pequeña Empresa',
      particular: 'Particular',
    };
    return types[type] || type;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h2>Mi Perfil</h2>
        <p className="text-muted-foreground">Gestiona tu información personal y fiscal</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h3>
                  {formData.name} {formData.lastName}
                </h3>
                <Badge>{getUserTypeLabel(getUserType())}</Badge>
              </div>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Datos Personales</TabsTrigger>
          <TabsTrigger value="fiscal">Datos Fiscales</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Información Personal</CardTitle>
                <Button
                  variant={isEditing ? 'outline' : 'default'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancelar' : 'Editar'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">Apellidos</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Dirección</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="Calle, Ciudad, CP"
                  />
                </div>
              </div>

              {isEditing && (
                <Button onClick={handleSaveProfile} className="w-full">
                  Guardar Cambios
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fiscal" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Datos Fiscales</CardTitle>
                <Button
                  variant={isEditing ? 'outline' : 'default'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancelar' : 'Editar'}
                </Button>
              </div>
              <CardDescription>
                Información necesaria para facturación y declaraciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nif">NIF / CIF</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="nif"
                    value={formData.nif}
                    onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="12345678X"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="businessName">Nombre Comercial / Razón Social</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="Tu Empresa S.L."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="businessActivity">Actividad Económica (CNAE)</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="businessActivity"
                    value={formData.businessActivity}
                    onChange={(e) =>
                      setFormData({ ...formData, businessActivity: e.target.value })
                    }
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="Consultoría informática"
                  />
                </div>
              </div>

              <div className="pt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm mb-2">Información guardada</h4>
                <p className="text-sm text-muted-foreground">
                  Estos datos se utilizarán automáticamente al generar facturas y rellenar modelos
                  fiscales, ahorrándote tiempo en cada operación.
                </p>
              </div>

              {isEditing && (
                <Button onClick={handleSaveProfile} className="w-full">
                  Guardar Cambios
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Seguridad y Privacidad
              </CardTitle>
              <CardDescription>Gestiona tu contraseña y configuración de privacidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm">Cambiar Contraseña</h4>
                <Button variant="outline">Actualizar Contraseña</Button>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-2">
                <h4 className="text-sm">Eliminar Cuenta</h4>
                <p className="text-sm text-muted-foreground">
                  Al eliminar tu cuenta, se borrarán permanentemente todos tus datos, facturas y
                  documentos.
                </p>
                <Button variant="destructive" disabled>
                  Eliminar mi cuenta
                </Button>
              </div>

              <div className="h-px bg-border" />

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-sm mb-2 text-green-900">Tu privacidad es importante</h4>
                <p className="text-sm text-green-800">
                  Tus datos están encriptados y nunca se comparten con terceros. Solo tú tienes
                  acceso a tu información fiscal y documentos.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
