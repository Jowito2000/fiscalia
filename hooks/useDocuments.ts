import { Document } from "@/model/DocumentModel";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export function useDocuments() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        setIsLoading(true);
        try {
            // Obtener los documentos de la base de datos
        } catch (error) {
            console.error('Error loading documents:', error);
            toast.error('Error al cargar documentos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteDocument = async (documentId: string) => {
        try {
            // Eliminar el documento de la base de datos
        } catch (error) {
            console.error('Error deleting document:', error);
            toast.error('Error de conexión');
        }
    };

    // NO SE QUE HACEN TODAS ESTAS FUNCIONES. PERO CUANDO HAGAMOS ALGO CON ESTA PANTALLA LO PENSAREMOS
    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            invoice: 'Factura',
            'tax-model': 'Modelo Fiscal',
            receipt: 'Recibo',
            other: 'Otro',
        };
        return labels[type] || type;
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            completed: 'Completado',
            draft: 'Borrador',
            pending: 'Pendiente',
        };
        return labels[status] || status;
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            completed: 'bg-green-100 text-green-800',
            draft: 'bg-yellow-100 text-yellow-800',
            pending: 'bg-blue-100 text-blue-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'all' || doc.type === selectedType;
        return matchesSearch && matchesType;
    });

    const documentStats = {
        total: documents.length,
        invoices: documents.filter((d) => d.type === 'invoice').length,
        taxModels: documents.filter((d) => d.type === 'tax-model').length,
        others: documents.filter((d) => d.type === 'receipt' || d.type === 'other').length,
    };      

    return {
        documents,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        isLoading,
        handleDeleteDocument,
        getTypeLabel,
        getStatusLabel,
        getStatusColor,
        filteredDocuments,
        documentStats
    }
}