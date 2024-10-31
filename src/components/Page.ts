import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

/*
  * Интерфейс для описания страницы
  * */
interface IPage {
  // Счетчик товаров в корзине
  counter: number;

  // Массив элементов карточек с товарами
  store: HTMLElement[];

  // Блокировка прокрутки страницы
  locked: boolean;
}

/*
  * Класс для описания главной страницы
  * */
export class Page extends Component<IPage> {
  // Внутренние ссылки на элементы
  protected _counterElement: HTMLElement;
  protected _storeElement: HTMLElement;
  protected _wrapperElement: HTMLElement;
  protected _basketElement: HTMLElement;

  // Конструктор принимает контейнер и обработчик событий
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counterElement = ensureElement<HTMLElement>('.header__basket-counter');
    this._storeElement = ensureElement<HTMLElement>('.gallery');
    this._wrapperElement = ensureElement<HTMLElement>('.page__wrapper');
    this._basketElement = ensureElement<HTMLElement>('.header__basket');

    this._basketElement.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  // Сеттер для счетчика товаров в корзине
  set counter(value: number) {
    this.setText(this._counterElement, String(value));
  }

  // Сеттер для карточек товаров на странице
  set store(items: HTMLElement[]) {
    this._storeElement.replaceChildren(...items);
  }

  // Сеттер для блокировки прокрутки
  set locked(value: boolean) {
    this._wrapperElement.classList.toggle('page__wrapper_locked', value);
  }
}
