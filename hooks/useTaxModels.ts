import { useState } from "react";
import { FiscalModel } from "../model/TaxModels";
import { toast } from "sonner";

export function useTaxModel303() {
    const [model303, setModel303] = useState<FiscalModel>({
        type: 303,
        trimestre: '1T',
        baseImponibleGeneral303: 0,
        cuotaIVA303: 0,
        ivaDeducible303: 0,
    });

  const calculateModel303 = () => {
    const resultado = model303.cuotaIVA303! - model303.ivaDeducible303!;
    return {
      cuotaDevengada: model303.cuotaIVA303,
      cuotaDeducible: model303.ivaDeducible303,
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
  const [model130, setModel130] = useState<FiscalModel>({
    type: 130,
    trimestre: '1T',
    ingresos130: 0,
    gastos130: 0,
    pagosPrevios130: 0,
  });

  const calculateModel130 = () => {
    const rendimientoNeto = model130.ingresos130! - model130.gastos130!;
    const cuotaTributaria = rendimientoNeto * 0.2; // 20% IRPF
    const resultado = cuotaTributaria - model130.pagosPrevios130!;

    return {
      rendimientoNeto,
      cuotaTributaria,
      pagosPrevios: model130.pagosPrevios130,
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
