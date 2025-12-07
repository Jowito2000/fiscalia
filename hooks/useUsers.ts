// src/services/useUsers.ts
"use client";

import { useEffect, useState } from "react";
import {
  createUser,
  deleteUserById,
  fetchUsers,
  updateUserName,
  User,
} from "@/services/testsService";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (name: string) => {
    try {
      await createUser(name);
      await loadUsers();
    } catch (err: any) {
      console.error(err);
      setError("Error creando usuario");
    }
  };

  const editUser = async (id: string, newName: string) => {
    try {
      await updateUserName(id, newName);
      await loadUsers();
    } catch (err: any) {
      console.error(err);
      setError("Error actualizando usuario");
    }
  };

  const removeUser = async (id: string) => {
    try {
      await deleteUserById(id);
      await loadUsers();
    } catch (err: any) {
      console.error(err);
      setError("Error eliminando usuario");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    reload: loadUsers,
    addUser,
    editUser,
    removeUser,
  };
}
