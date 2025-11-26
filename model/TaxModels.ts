export interface TaxModel303Data {
  trimestre: string;
  baseImponibleGeneral: number;
  cuotaIVA: number;
  ivaDeducible: number;
}

export interface TaxModel130Data {
  trimestre: string;
  ingresos: number;
  gastos: number;
  pagosPrevios: number;
}