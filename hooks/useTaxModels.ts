import { useState } from "react";
import { TaxModel303Data, TaxModel130Data } from "../model/TaxModels";
import { toast } from "sonner";

export function useTaxModel303() {
    const [model303, setModel303] = useState<TaxModel303Data>({
        trimestre: '1T',
        baseImponibleGeneral: 0,
        cuotaIVA: 0,
        ivaDeducible: 0,
    });

  const calculateModel303 = () => {
    const resultado = model303.cuotaIVA - model303.ivaDeducible;
    return {
      cuotaDevengada: model303.cuotaIVA,
      cuotaDeducible: model303.ivaDeducible,
      resultado: resultado,
      aIngresar: resultado > 0 ? resultado : 0,
      aCompensar: resultado < 0 ? Math.abs(resultado) : 0,
    };
  };

  const handleSaveModel303 = () => {
    toast.success('Modelo 303 guardado correctamente');
  };

  return {
    model303,
    setModel303,
    calculateModel303,
    handleSaveModel303,
  };
}

export function useTaxModel130() {
  const [model130, setModel130] = useState<TaxModel130Data>({
    trimestre: '1T',
    ingresos: 0,
    gastos: 0,
    pagosPrevios: 0,
  });

  const calculateModel130 = () => {
    const rendimientoNeto = model130.ingresos - model130.gastos;
    const cuotaTributaria = rendimientoNeto * 0.2; // 20% IRPF
    const resultado = cuotaTributaria - model130.pagosPrevios;

    return {
      rendimientoNeto,
      cuotaTributaria,
      pagosPrevios: model130.pagosPrevios,
      resultado: resultado > 0 ? resultado : 0,
    };
  };

  const handleSaveModel130 = () => {
    toast.success('Modelo 130 guardado correctamente');
  };

  return {
    model130,
    setModel130,
    calculateModel130,
    handleSaveModel130,
  };
}
