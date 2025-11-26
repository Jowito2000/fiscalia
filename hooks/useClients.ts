"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Client } from "@/model/InvoicesModels";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setLoading(true);
        try {
            // Obtener los clientes
            // setClients(result);
        } finally {
            setLoading(false);
        }
    };

    const addClient = async (client: Client) => {
        if (!client.name || !client.nif) {
            toast.error("Nombre y NIF son obligatorios");
            return false;
        }

        // Crear cliente en la base de datos
        toast.success("Cliente añadido");
        load();
        return true;
    };

    return { clients, loading, addClient };
}
