import { IOrder, ICard, FormErrors, IOrderForm } from '../types';
import { Model } from './base/Model';
import { IAppStatus } from '../types';

export class Product extends Model<ICard> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}

// Класс, описывающий состояние приложения
export class AppState extends Model<IAppStatus> {
  basket: Product[] = []; // Корзина с товарами
  store: ICard[] = []; // Массив всех товаров
  order: IOrder = { // Объект заказа клиента
    items: [],
    payment: '',
    total: null,
    address: '',
    email: '',
    phone: '',
  };

  // Объект с ошибками форм
  formErrors: FormErrors = {};

  // Добавляет продукт в корзину
  addToBasket(product: Product): void {
    this.basket.push(product);
  }

  // Удаляет продукт из корзины
  deleteFromBasket(productId: string): void {
    this.basket = this.basket.filter(item => item.id !== productId);
  }

  // Очищает все товары из корзины
  clearBasket(): void {
    this.basket = [];
  }

  // Возвращает общее количество товаров в корзине
  getBasketAmount(): number {
    return this.basket.length;
  }

  // Обновляет список товаров в заказе на основе текущей корзины
  setItems(): void {
    this.order.items = this.basket.map(item => item.id);
  }

  // Устанавливает конкретное поле в заказе и запускает валидацию
  setOrderField<K extends keyof IOrderForm>(field: K, value: string): void {
    this.order[field] = value;

    if (this.validateContacts()) {
      this.events.emit('contacts:ready', this.order);
    }
    if (this.validateOrder()) {
      this.events.emit('order:ready', this.order);
    }
  }

  // Проверяет валидность контактных данных заказа
  private validateContacts(): boolean {
    const errors: FormErrors = {};

    // Проверка наличия email и телефона
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return !Object.keys(errors).length;
  }

  // Проверяет валидность полей заказа
  private validateOrder(): boolean {
    const errors: FormErrors = {};
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return !Object.keys(errors).length;
  }

  // Обновляет объект заказа до начального состояния
  refreshOrder(): void {
    this.order = {
      items: [],
      total: null,
      address: '',
      email: '',
      phone: '',
      payment: ''
    };
  }

  // Вычисляет общую стоимость товаров в корзине
  getTotalBasketPrice(): number {
    return this.basket.reduce((total, product) => total + (product.price || 0), 0);
  }

  // Устанавливает товары в магазине и эмитирует событие об изменении
  setStore(items: ICard[]): void {
    // this.store = items.map(item => new Product({ ...item, selected: false }, this.events));
    // this.emitChanges('items:changed', { store: this.store });
    this.store = items;
    this.emitChanges('items:changed', { store: this.store });
  }

  // Сбрасывает состояние selected для всех товаров в магазине
  resetSelected(): void {
    this.store.forEach(item => item.selected = false);
  }
}
