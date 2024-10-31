import { ICard, IOrder, IOrderForm } from "../types";
import { Api, ApiListResponse } from "./base/api";

export interface ILarekAPI {
    getItemList: () => Promise<ICard[]>;
    getItem: (id: string) => Promise<ICard>;
    orderItems: (order: IOrder) => Promise<IOrderForm>
}

export default class LarekAPI extends Api implements ILarekAPI {
    readonly cdn: string;
    
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getItemList(): Promise<ICard[]> {
        return this.get('/product')
        .then((data: ApiListResponse<ICard>) => 
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))) 
    }

    getItem(id: string): Promise<ICard> {
        return this.get(`/product/${id}`)
        .then((item: ICard) => ({
            ...item,
            image: this.cdn + item.image
        }))
    }

    orderItems(order: IOrder): Promise<IOrderForm> {
        return this.post('/order', order)
        .then((data: IOrderForm) => data);
    }
}