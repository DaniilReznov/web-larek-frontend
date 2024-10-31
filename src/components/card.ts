import { Component } from "./base/Component";
import { CategoryType, ICard } from "../types";
import { ensureElement, handlePrice } from "../utils/utils";
import { categoryMapping, CDN_URL } from "../utils/constants";

interface IActions {
  onClick: (event: MouseEvent) => void;
}

export default class Card extends Component<ICard> {
  protected _title: HTMLElement;
  protected _category: HTMLElement;
  protected _description: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(protected elementName: string, container: HTMLElement, actions?: IActions) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.card__title`, container);
    this._category = container.querySelector('.card__category');
    this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
    this._price = container.querySelector('.card__price');
    this._button = container.querySelector('.card__button');

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }
  // Сеттер и геттер для уникального ID
  set id(value: string) {
    this.container.dataset.id = value;
  }
  get id(): string {
    return this.container.dataset.id || '';
  }

  // Сеттер и гетер для названия
  set title(value: string) {
    this._title.textContent = value;
  }
  get title(): string {
    return this._title.textContent || '';
  }

  // Сеттер для кратинки
  set image(value: string) {
    this._image.src = CDN_URL + value;
  }

  // Сеттер для определения выбрали товар или нет
  set selected(value: boolean) {
    if (!this._button.disabled) {
      this._button.disabled = value;
    }
  }

  // Сеттер для цены
  set price(value: number | null) {
    this._price.textContent = value
      ? handlePrice(value) + ' синапсов'
      : 'Бесценно';
    if (this._button && !value) {
      this._button.disabled = true;
    }
  }

  // Сеттер для категории
  set category(value: CategoryType) {
    this._category.textContent = value;
    this._category.classList.add(categoryMapping[value]);
  }
}

export class StoreItem extends Card {
  constructor(container: HTMLElement, actions?: IActions) {
    super('card', container, actions);
  }
}

export class StoreItemPreview extends Card {
  protected _description: HTMLElement;

  constructor(container: HTMLElement, actions?: IActions) {
    super('card', container, actions);

    this._description = container.querySelector(`.${this.elementName}__text`);
  }

  set description(value: string) {
    this._description.textContent = value;
  }
}