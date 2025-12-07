"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FirebaseTestPage() {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();
  const [newUserName, setNewUserName] = useState("");

  const handleCreate = async () => {
    if (!newUserName.trim()) return;
    await addUser(newUserName.trim());
    setNewUserName("");
  };

  const handleEdit = async (id: string, currentName: string) => {
    const newName = window.prompt("Nuevo nombre:", currentName);
    if (!newName || !newName.trim()) return;
    await editUser(id, newName.trim());
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    await removeUser(id);
  };

  return (
    <main className="flex flex-col space-y-2 p-4 text-center">
      <h1>Pruebas Firebase (Firestore)</h1>
      <p>Esta pantalla prueba CRUD básico sobre la colección <code>users</code>.</p>

      <Card className="w-full max-w-md mx-auto">
        <CardContent>
            <h2>Crear usuario</h2>
            <Input
            type="text"
            placeholder="Nombre..."
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className = "m-2"
            />
            <Button className='mt-2' onClick={handleCreate}>Crear</Button>
        </CardContent>
      </Card>

      <Card className="m-6">
        <CardContent className="space-y-4">
            <h2>Usuarios</h2>

            {loading && <p>Cargando usuarios...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && users.length === 0 && <p>No hay usuarios todavía.</p>}

            <ul className="flex flex-col">
                {users.map((u) => (
                    <li key={u.id} style={{ marginBottom: "0.5rem" }}>
                    <strong>{u.name}</strong>{" "}
                    <small>
                        (creado:{" "}
                        {u.createdAt instanceof Date
                        ? u.createdAt.toLocaleString()
                        : String(u.createdAt)}
                        )
                    </small>{" "}
                    <Button onClick={() => handleEdit(u.id, u.name)}>Editar</Button>{" "}
                    <Button onClick={() => handleDelete(u.id)}>Eliminar</Button>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </main>
  );
}
