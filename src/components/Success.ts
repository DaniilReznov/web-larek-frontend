import { handlePrice } from '../utils/utils';
import { Component } from './base/Component';

// Интерфейс для действий, которые можно выполнять с компонентом Success
interface ISuccessActions {
  onClick: (event: MouseEvent) => void; // Функция для обработки клика по кнопке
}

// Интерфейс, представляющий свойства компонента Success
export interface ISuccess {
  description: number; // Описание как числовое значение
}

// Класс Success, расширяющий базовый класс Component
export class Success extends Component<ISuccess> {
  protected _button: HTMLButtonElement; // Кнопка для закрытия компонента
  protected _description: HTMLElement; // Элемент для отображения описания

  constructor(
    protected blockName: string, // Имя блока для целевой CSS-класса
    container: HTMLElement, // Родительский контейнер для компонента
    actions?: ISuccessActions // Опциональные действия для обработки событий
  ) {
    super(container); // Вызов конструктора базового класса

    // Выбор кнопки закрытия и элемента описания из контейнера
    this._button = container.querySelector(`.${blockName}__close`);
    this._description = container.querySelector(`.${blockName}__description`);

    // Если предоставлено действие onClick, добавляем его как обработчик события для кнопки
    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      }
    }
  }

  // Сеттер для свойства description
  set description(value: number) {
    // Обновляем текстовое содержимое элемента описания с отформатированным значением
    this._description.textContent = 'Списано ' + handlePrice(value) + ' синапсов';
  }
}
