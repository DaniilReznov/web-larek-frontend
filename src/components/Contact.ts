import { IEvents } from './base/events';
import { Form } from './Form';

// Интерфейс, описывающий окошко контакты
export interface IContact {
  phone: string; // Телефон
  email: string; // Электронная почта
}

// Класс, описывающий окошко контакты
export class Contact extends Form<IContact> {
  // Конструктор принимает родительский элемент и обработчик событий
  constructor(
    container: HTMLFormElement,
    events: IEvents
  ) {
    super(container, events);
  }
}