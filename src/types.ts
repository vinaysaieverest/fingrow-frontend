export type Tcard = {
  type: string;
  createdAt: Date;
  category: string;
  amount: number;
  transactionName: string;
};
export type Rcard ={
    category:string,
    allocatedAmount:number,
    spentAmount:number
}