"use client";
import { TaxModelsContent } from './TaxModelsContent';

export function ModelsScreen() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h2>Modelos Fiscales</h2>
        <p className="text-muted-foreground">
          Rellena tus declaraciones trimestrales con ayuda paso a paso
        </p>
      </div>

      <TaxModelsContent />
    </div>
  );
}
