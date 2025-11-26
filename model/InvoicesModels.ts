export interface Client {
  id?: string;
  name: string;
  nif: string;
  address: string;
}

export interface InvoiceData {
  clientId: string;
  concept: string;
  unitPrice: number;
  quantity: number;
  ivaPercentage: number;
  irpfPercentage: number;
}