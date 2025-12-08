"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabAllContent } from "./TabAllContent";
import { TabLegislationContent } from "./TabLegislationContent";
import { TabCalendarContent } from "./TabCalendarContent";
import { TabTributeAgencyContent } from "./TabTributeAgencyContent";
import { TabSSContent } from "./TabSSContent";
import { TabOthersResources } from "./TabOthersResources";

export default function OfficialResources() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6"> 
        <div>
            <h2>Recursos Oficiales</h2>
            <p className="text-muted-foreground">
            Consulta las fuentes verificadas en las que se basa Fiscal IA para ofrecer información actualizada y precisa
            </p>
        </div>

        <Tabs defaultValue="todas" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="legislacion">Legislación</TabsTrigger>
            <TabsTrigger value="calendario">Calendario Fiscal</TabsTrigger>
            <TabsTrigger value="agencia">Agencia Tributaria</TabsTrigger>
            <TabsTrigger value="ss">Seguridad Social</TabsTrigger>
            <TabsTrigger value="otros">Otros Organismos</TabsTrigger>
            </TabsList>

            <TabsContent value="todas">
                <TabAllContent />
            </TabsContent>
            <TabsContent value="legislacion">
                <TabLegislationContent />
            </TabsContent>
            <TabsContent value="calendario">
                <TabCalendarContent />
            </TabsContent>
            <TabsContent value="agencia">
                <TabTributeAgencyContent />
            </TabsContent>
            <TabsContent value="ss">
                <TabSSContent />
            </TabsContent>
            <TabsContent value="otros">
                <TabOthersResources />
            </TabsContent>
        </Tabs>
    </div>
  );
}   