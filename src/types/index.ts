// Интерфейс для товара
export interface IProduct {
  id: string;
  title: string;
  price: number;
  image: string; // Предполагаем, что API возвращает URL изображения
  category: string; // Предполагаем, что API возвращает категорию
}

// Интерфейс для корзины
export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IOrderForm {
  payment: string;
  address: string;
}

export interface IContactForm {
  phone: string;
  email: string;
}

export interface IOrder extends IOrderForm, IContactForm {
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}

// Интерфейс для корзины
export interface ICart {
  items: ICartItem[];
  addItem(product: IProduct): void;
  removeItem(productId: string): void;
  clearCart(): void;
}

// Интерфейс для способа оплаты
export interface IPaymentMethod {
  id: string;
  name: string;
}

// Интерфейс для информации о доставке
export interface IDeliveryInfo {
  address: string;
  paymentMethod: IPaymentMethod;
}

// Интерфейс для пользователя
export interface IUser {
  email: string;
  phone: string;
}

// Интерфейс для состояния оформления заказа
export interface IOrderProcess {
  deliveryInfo?: IDeliveryInfo;
  user?: IUser;
  step: 1 | 2; // 1 - выбор способа оплаты и адреса, 2 - ввод данных пользователя
  validateStep(): boolean; // Метод для проверки заполненности полей
  submitOrder(): void; // Метод для подтверждения заказа
}

// Интерфейс для модального окна с детальной информацией о товаре
export interface IProductModal {
  product: IProduct;
  onBuy: (product: IProduct) => void; // Функция для добавления в корзину
  onRemove: (productId: string) => void; // Функция для удаления из корзины
}

// Интерфейс для главной страницы
export interface IMainPage {
  products: IProduct[];
  onProductClick: (productId: string) => void; // Функция для открытия модального окна с детальной информацией
  onCartIconClick: () => void; // Функция для открытия корзины
}

// Интерфейс для корзины
export interface ICartPage {
  cart: ICart;
  onCheckout: () => void; // Функция для начала оформления заказа
}

// Интерфейс для оформления заказа
export interface ICheckoutPage {
  orderProcess: IOrderProcess;
  onNextStep: () => void; // Функция для перехода к следующему шагу
  onSubmit: () => void; // Функция для завершения заказа
}
