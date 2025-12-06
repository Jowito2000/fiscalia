export interface Document {
  id: string;
  name: string;
  type: 'invoice' | 'tax-model' | 'receipt' | 'other';
  date: string;
  size: string;
  status: 'completed' | 'draft' | 'pending';
}