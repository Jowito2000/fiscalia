import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDocuments } from "@/hooks/useDocuments";

export function DocumentDirectorySearch() {
    const { searchQuery, setSearchQuery, selectedType, setSelectedType } = useDocuments();
    return (
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar documentos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex space-x-2">
                <Button
                    variant={selectedType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('all')}
                >
                    Todos
                </Button>
                <Button
                    variant={selectedType === 'invoice' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('invoice')}
                >
                    Facturas
                </Button>
                <Button
                    variant={selectedType === 'tax-model' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('tax-model')}
                >
                Modelos
                </Button>
            </div>
        </div>
    )
}