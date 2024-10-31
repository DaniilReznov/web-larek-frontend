import { Product } from "../components/appStatus";

export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
}

export type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';

export type CategoryMapping = {
  [Key in CategoryType]: string;
};

export interface ApiResponse {
  items: ICard[];
}

export interface IOrder {
  // Массив ID купленных товаров
  items: string[];
  address: string;
  email: string;
  phone: string;
  payment: string;
  total: number;
}

export interface IOrderForm {
  address: string;
  email: string;
  phone: string;
  payment: string;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IAppStatus {
  // Корзина и товары
  basket: Product[];
  store: Product[];

  // Заказ и ошибки
  order: IOrder;
  formErrors: FormErrors;

  // Методы управления корзиной
  addToBasket(product: Product): void;
  deleteFromBasket(productId: string): void;
  clearBasket(): void;
  getBasketAmount(): number;
  getTotalBasketPrice(): number;

  // Методы для обработки заказа
  setItems(): void;
  setOrderField(field: keyof IOrderForm, value: string): void;
  validateContacts(): boolean;
  validateOrder(): boolean;
  refreshOrder(): boolean;

  // Методы для работы с данными
  setStore(items: ICard[]): void;
  resetSelected(): void;
}
