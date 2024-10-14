// Интерфейс для товара
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Интерфейс для корзины
interface CartItem {
  product: Product;
  quantity: number;
}

// Интерфейс для корзины
interface Cart {
  items: CartItem[];
  addItem(product: Product): void;
  removeItem(productId: string): void;
  clearCart(): void;
}

// Интерфейс для способа оплаты
interface PaymentMethod {
  id: string;
  name: string;
}

// Интерфейс для информации о доставке
interface DeliveryInfo {
  address: string;
  paymentMethod: PaymentMethod;
}

// Интерфейс для пользователя
interface User {
  email: string;
  phone: string;
}

// Интерфейс для состояния оформления заказа
interface OrderProcess {
  deliveryInfo?: DeliveryInfo;
  user?: User;
  step: 1 | 2; // 1 - выбор способа оплаты и адреса, 2 - ввод данных пользователя
  validateStep(): boolean; // Метод для проверки заполненности полей
  submitOrder(): void; // Метод для подтверждения заказа
}

// Интерфейс для модального окна с детальной информацией о товаре
interface ProductModal {
  product: Product;
  onBuy: (product: Product) => void; // Функция для добавления в корзину
  onRemove: (productId: string) => void; // Функция для удаления из корзины
}

// Интерфейс для главной страницы
interface MainPage {
  products: Product[];
  onProductClick: (productId: string) => void; // Функция для открытия модального окна с детальной информацией
  onCartIconClick: () => void; // Функция для открытия корзины
}

// Интерфейс для корзины
interface CartPage {
  cart: Cart;
  onCheckout: () => void; // Функция для начала оформления заказа
}

// Интерфейс для оформления заказа
interface CheckoutPage {
  orderProcess: OrderProcess;
  onNextStep: () => void; // Функция для перехода к следующему шагу
  onSubmit: () => void; // Функция для завершения заказа
}
