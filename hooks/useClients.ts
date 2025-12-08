"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Client, ClientSchema } from "@/model/InvoicesModels";
import { auth, db } from "@/firebase/firebaseClient";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    try {
      const clientsRef = collection(db, "users", user.uid, "clients");

      const q = query(clientsRef, orderBy("name", "asc"));
      const snapshot = await getDocs(q);

      const list: Client[] = snapshot.docs.map(doc => {
        const data = doc.data();

        // Convertir timestamps si existieran
        if (data.createdAt instanceof Timestamp) {
          data.createdAt = data.createdAt.toDate();
        }

        // Validar con Zod
        const parsed = ClientSchema.safeParse({
          id: doc.id,
          ...data
        });

        if (!parsed.success) {
          console.warn("Cliente inválido en Firestore:", parsed.error);
          return null;
        }

        return parsed.data;
      }).filter((c): c is Client => c !== null);

      setClients(list);

    } catch (error) {
      console.error("Error cargando clientes:", error);
      toast.error("Error cargando clientes");
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (client: Client) => {
    const parsed = ClientSchema.safeParse(client);
    if (!parsed.success) {
      toast.error("Cliente inválido");
      return false;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("Debes iniciar sesión");
      return false;
    }

    try {
      const clientsRef = collection(db, "users", user.uid, "clients");

      await addDoc(clientsRef, {
        name: client.name,
        nif: client.nif,
        address: client.address,
        createdAt: serverTimestamp(),
      });

      toast.success("Cliente añadido correctamente");
      loadClients();

      return true;

    } catch (error) {
      console.error("Error añadiendo cliente:", error);
      toast.error("No se pudo añadir el cliente");
      return false;
    }
  };

  return { clients, loading, addClient, reload: loadClients };
}
