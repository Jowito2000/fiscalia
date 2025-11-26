import { HelpCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Model303Result } from "./Model303Result";
import { Model303Data } from "./Model303Data";

export function Model303() {
    return (
        <div className="space-y-6 mt-6">
          <Alert>
            <HelpCircle className="w-4 h-4" />
            <AlertDescription className="max-w-[810px]">
              El Modelo 303 es la declaración trimestral del IVA. Deben presentarlo autónomos y
              empresas que realicen actividades sujetas a IVA.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Model303Data />
            <Model303Result />
          </div>
        </div>
    );
}