import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle } from "lucide-react";
import { ResourcesContainer } from "./ResourcesContainer";

export function TabAllContent() {
    return (
        <div className="space-y-6 mt-6">
            <Alert>
                <HelpCircle className="w-4 h-4" />
                <AlertDescription>
                Descripción aleatoria sobre la categoría de todas las fuentes oficiales. Sujeto a cambios obviamente.
                </AlertDescription>
            </Alert>

            <div className="
                            grid gap-10
                            grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
                            justify-center
                            max-w-6xl mx-auto
                            px-4
                            ">
                <ResourcesContainer
                    title="Boletín Oficial del Estado"
                    description="Fuente Oficial de la normativa española"
                    link="https://boletinoficial.gob.es/"
                    buttonText="Visitar Sitio Oficial"
                    lastUpdate="20 de Junio de 2024"
                />
                
                <ResourcesContainer
                    title="Agencia Tributaria (AEAT)"
                    description="Información sobre modelos tributarios, plazos de presentación nomativa,del IVA, IRPF y otros impuestos"
                    link="https://www.aeat.es/"
                    buttonText="Visitar AEAT"
                    lastUpdate="20 de Junio de 2024"
                />
                
                <ResourcesContainer
                    title="Agencia Tributaria (AEAT)"
                    description="Información sobre modelos tributarios, plazos de presentación nomativa,del IVA, IRPF y otros impuestos"
                    link="https://www.aeat.es/"
                    buttonText="Visitar AEAT"
                    lastUpdate="20 de Junio de 2024"
                />
            </div>
            <div>
                <h2>Transpariencia y actualización</h2>
                <p className="text-muted-foreground">Fiscal IA actualiza periódicamente su conocimientos a partir de fuentes oficiales y verificadas. Estas fuentes se revisan automáticamente para garantizar la precisión de la información ofrecida</p>
            </div>
        </div>
    )
}