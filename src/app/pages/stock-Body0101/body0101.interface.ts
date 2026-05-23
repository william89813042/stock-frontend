import { BaseRequest } from '../../common/vo/BaseRequest';
import { PageBaseRequest } from '../../common/vo/PageBaseRequest';

export type TransactionType = 'BUY' | 'SELL';

export interface QryStockRequest extends PageBaseRequest {
  stockCode: string | null;
  stockName: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface QryStockResponse {
  id: number;
  stockCode: string;
  stockName: string;
  purchaseDate: string | null;
  purchaseQuantity: number | null;
  purchasePrice: number | null;
  purchaseTotalCost: number | null;
  saleDate: string | null;
  saleQuantity: number | null;
  salePrice: number | null;
  saleTotalAmount: number | null;
  rate: number | null;
}

export interface QryStockPageResponse {
  content: QryStockResponse[];
  totalElements: number;
  size: number;
  number: number;
}

export interface ViewStockRequest extends BaseRequest {
  id?: number;
  stockCode?: string | null;
  purchaseDate?: string | null;
}

export interface ViewStockResponse {
  stockCode: string;
  stockName: string;
  purchaseDate: string | null;
  purchaseQuantity: number | null;
  purchasePrice: number | null;
  purchaseTotalCost: number | null;
  saleDate: string | null;
  saleQuantity: number | null;
  salePrice: number | null;
  saleTotalAmount: number | null;
  netProfit: number | null;
  rate: number | null;
  memo: string | null;
}

export interface AddStockVo {
  transactionType: TransactionType;
  stockCode: string;
  stockName: string;
  purchaseDate?: string | null;
  purchaseQuantity?: number | null;
  purchasePrice?: number | null;
  saleDate?: string | null;
  saleQuantity?: number | null;
  salePrice?: number | null;
  memo?: string | null;
}

export interface AddStockRequest extends BaseRequest {
  addStockList: AddStockVo[];
}

export interface AddStockResponse {
}

export interface UpdStockVo {
  id: number;
  stockCode: string;
  stockName: string;
  purchaseDate: string;
  purchaseQuantity: number;
  purchasePrice: number;
  purchaseTotalCost: number;
}

export interface UpdStockRequest extends BaseRequest {
  updStockList: UpdStockVo[];
}

export interface UpdStockResponse {
}

export interface DelStockRequest extends BaseRequest {
  id: number;
  stockCode: string;
}

export interface DelStockResponse {
}
