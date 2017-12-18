export interface ISale {
    _id: number;
    saleNumber: string;
    name: string;
    updatedAt: Date;
    createdAt: Date;
    buyPriceF: string;
    buyPriceL: string;
    buyPriceT: string;
    salePrice: string;
 }