"use client";

import {
  FileText,
  Folder,
} from 'lucide-react';
import { DocumentCounterCard } from './DocumentCounterCard';
import { DocumentsDirectoryCard } from './DocumentsDirectoryCard';
import { useDocuments } from '@/hooks/useDocuments';

export function DocumentScreen() {
    const { documentStats } = useDocuments();
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div>
            <h2>Centro de Documentación</h2>
            <p className="text-muted-foreground">Gestiona todas tus facturas y documentos fiscales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DocumentCounterCard documentType="Total" documentCount={documentStats.total} icon={<Folder className="w-8 h-8 text-blue-600" />} />
            <DocumentCounterCard documentType="Facturas" documentCount={documentStats.invoices} icon={<FileText className="w-8 h-8 text-green-600" />} />
            <DocumentCounterCard documentType="Modelos" documentCount={documentStats.taxModels} icon={<FileText className="w-8 h-8 text-purple-600" />} />
            <DocumentCounterCard documentType="Otros" documentCount={documentStats.others} icon={<FileText className="w-8 h-8 text-gray-600" />} />
        </div>

        <DocumentsDirectoryCard />
        </div>
    );
}
