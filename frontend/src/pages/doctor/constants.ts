export interface DocumentType {
  id: string;
  label: string;
  price: number;
}

export const DOCUMENT_TYPES: DocumentType[] = [
  { id: "GENERAL", label: "일반진단서", price: 10000 },
  { id: "OPINION", label: "소견서", price: 3000 },
];

export interface DiagnosisCode {
  code: string;
  name: string;
}