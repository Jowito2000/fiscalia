import { Download, Eye, FileText, Trash2 } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

export function DocumentDirectoryList() {
    const { isLoading, 
        filteredDocuments, 
        searchQuery, 
        selectedType, 
        handleDeleteDocument, 
        getStatusColor, 
        getStatusLabel, 
        getTypeLabel 
    } = useDocuments();
    
    return (
        <div className="min-h-[150px] max-h-[500px] overflow-y-auto pr-2">
            {isLoading ? (
                <div className="text-center py-8">
                <p className="text-muted-foreground">Cargando documentos...</p>
                </div>
            ) : filteredDocuments.length === 0 ? (
                <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                    {searchQuery || selectedType !== 'all'
                    ? 'No se encontraron documentos'
                    : 'Aún no tienes documentos. Comienza generando una factura.'}
                </p>
                </div>
            ) : (
                <div className="space-y-2">
                {filteredDocuments.map((doc) => (
                    <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                    <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm">{doc.name}</p>
                            <Badge variant="secondary" className="text-xs">
                            {getTypeLabel(doc.type)}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                            {getStatusLabel(doc.status)}
                            </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(doc.date).toLocaleDateString('es-ES')}
                            </span>
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                        </Button>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDocument(doc.id)}
                        >
                        <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}