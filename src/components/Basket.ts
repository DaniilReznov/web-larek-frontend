import { ICard } from '../types';
import { handlePrice } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

// Интерфейс, описывающий структуру корзины товаров
export interface IBasket {
  list: HTMLElement[]; // Массив элементов, представляющих товары в корзине
  price: number; // Общая стоимость товаров в корзине
}

// Класс, реализующий функциональность корзины товаров
export class Basket extends Component<IBasket> {
  protected _list: HTMLElement; // Ссылка на элемент, представляющий список товаров
  protected _price: HTMLElement; // Ссылка на элемент, отображающий общую стоимость
  protected _button: HTMLButtonElement; // Ссылка на кнопку оформления заказа

  constructor(
    protected blockName: string,
    container: HTMLElement,
    protected events: IEvents
  ) {
    super(container);

    // Инициализация элементов корзины на основе классов
    this._list = this.getElement(`.${blockName}__list`);
    this._price = this.getElement(`.${blockName}__price`);
    this._button = container.querySelector(`.${blockName}__button`);

    // Добавление обработчика события на кнопку оформления заказа
    this._button?.addEventListener('click', () => this.events.emit('basket:order'));
  }

  /*
   * Утилита для получения элемента по селектору.
   * Выбрасывает ошибку, если элемент не найден.
   */
  private getElement(selector: string): HTMLElement {
    const element = this.container.querySelector(selector);
    if (!element) {
      throw new Error(`Element with selector "${selector}" not found`);
    }
    return element as HTMLElement;
  }

  // Сеттер для обновления общей стоимости товаров в корзине
  set price(value: number) {
    this._price.textContent = `${handlePrice(value)} синапсов`;
  }

  // Сеттер для обновления списка товаров в корзине
  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items); // Замена текущих элементов новыми
    this._button.disabled = items.length === 0; // Отключение кнопки, если товаров нет
  }

  // Метод для отключения кнопки оформления заказа
  disableButton() {
    this._button.disabled = true;
  }

  /*
   * Метод для обновления индексов товаров в корзине
   * При удалении товара индексы пересчитываются
   */
  refreshIndices() {
    Array.from(this._list.children).forEach((item, index) => {
      const indexElement = item.querySelector(`.basket__item-index`);
      if (indexElement) {
        indexElement.textContent = (index + 1).toString();
      }
    });
  }
}

// Интерфейс для товара в корзине с добавлением уникального идентификатора и индекса
export interface IProductBasket extends ICard {
  id: string; // Уникальный идентификатор товара
  index: number; // Индекс товара в корзине
}

// Интерфейс для описания действий с элементами корзины
export interface IStoreItemBasketActions {
  onClick: (event: MouseEvent) => void;
}

// Класс, представляющий отдельный товар в корзине
export class StoreItemBasket extends Component<IProductBasket> {
  protected _index: HTMLElement; // Ссылка на элемент, отображающий индекс товара
  protected _title: HTMLElement; // Ссылка на элемент, отображающий название товара
  protected _price: HTMLElement; // Ссылка на элемент, отображающий цену товара
  protected _button: HTMLButtonElement; // Ссылка на кнопку удаления товара из корзины

  constructor(
    protected blockName: string,
    container: HTMLElement,
    actions?: IStoreItemBasketActions // Опциональные действия с элементом
  ) {
    super(container);

    // Инициализация элементов товара
    this._title = this.getElement(`.${blockName}__title`);
    this._index = this.getElement(`.basket__item-index`);
    this._price = this.getElement(`.${blockName}__price`);
    this._button = container.querySelector(`.${blockName}__button`);

    // Добавление обработчика клика на кнопку удаления товара
    this._button?.addEventListener('click', (evt) => {
      this.container.remove(); // Удаление элемента из корзины
      actions?.onClick(evt); // Вызов обработчика клика, если он определен
    });
  }

  private getElement(selector: string): HTMLElement {
    const element = this.container.querySelector(selector);
    if (!element) {
      throw new Error(`Element with selector "${selector}" not found`);
    }
    return element as HTMLElement;
  }

  // Сеттер для обновления названия товара
  set title(value: string) {
    this._title.textContent = value;
  }

  // Сеттер для обновления индекса
  set index(value: number) {
    this._index.textContent = value.toString();
  }

  // Сеттер для обновления цены товара
  set price(value: number) {
    this._price.textContent = `${handlePrice(value)} синапсов`;
  }
}
