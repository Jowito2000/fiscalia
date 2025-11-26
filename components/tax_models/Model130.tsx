import { Alert, AlertDescription } from "../ui/alert";
import { HelpCircle } from "lucide-react";
import { Model130Data } from "./Model130Data";
import { Model130Result } from "./Model130Result";

export function Model130() {
    return (
        <div className="space-y-6 mt-6">
          <Alert>
            <HelpCircle className="w-4 h-4" />
            <AlertDescription className="max-w-[810px]">
              El Modelo 130 es el pago fraccionado del IRPF. Lo deben presentar los autónomos en
              estimación directa que no tengan retención del 70% o más de sus ingresos.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Model130Data />
            <Model130Result />
          </div>
        </div>
    )
}