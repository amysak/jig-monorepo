export interface Terms {
  id: string;
  name: string;
  text: string;
  type: "net" | "multi";
  payments: { percentage: number; explanationText: string }[];
  adjustTotal: boolean;
  paymentDue: number;
  discountDue: number;
  discountPercent: number;
}
