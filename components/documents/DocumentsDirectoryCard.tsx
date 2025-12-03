import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DocumentDirectorySearch } from "./DocumentDirectorySearch";
import { DocumentDirectoryList } from "./DocumentDirectoryList";

export function DocumentsDirectoryCard() {
    return (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <CardTitle>Mis Documentos</CardTitle>
                <CardDescription>Todos tus archivos organizados en un solo lugar</CardDescription>
              </div>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Subir Documento
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <DocumentDirectorySearch />
              <DocumentDirectoryList />
            </div>
          </CardContent>
        </Card>
    )
}