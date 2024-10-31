# Проектная работа "Веб-ларек"

## Оглавление

- [Стек технологий](#стек-технологий)
- [Структура проекта](#структура-проекта)
- [Установка и запуск](#установка-и-запуск)
- [Сборка](#сборка)
- [Описание базовых классов](#описание-базовых-классов)
  - [Класс Api](#класс-api)
  - [Класс EventEmitter](#класс-eventemitter)
  - [Класс Component](#класс-component)
  - [Класс Model](#класс-model)
- [Интерфейсы и Типы](#интерфейсы-и-типы)
  - [ICard](#icard)
  - [CategoryType](#categorytype)
  - [CategoryMapping](#categorymapping)
  - [ApiResponse](#apiresponse)
  - [IOrder](#iorder)
  - [IOrderForm](#iorderform)
  - [FormErrors](#formerrors)
  - [IAppStatus](#iappstatus)
- [Список файлов и их назначение](#список-файлов-и-их-назначение)
## Стек технологий

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SCSS](https://img.shields.io/badge/scss-%23E50695.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

____
[Вернуться к оглавлению](#оглавление)

## Описание базовых классов
### Класс `Api`
Предназначен для работы с сервером. Имеет функции получения и отправки данных на сервер.

- readonly baseUrl: string // Содержит ссылку на сервер
- protected options: RequestInit // Необходим для настройки запроса
- handleResponse() // Проверяет ответ от сервера
- get() // Метод для отправки данных на сервер
- post() // Метод для получения данных с сервера

### Класс `EventEmitter`
Предназначен для взаимодействием с событиями.

- on() // Установить обработчик на событие
- off() // Снять обработчик с события
- emit() // Инициировать событие с данными
- onAll() // Слушать все события
- offAll() // Сбросить все обработчики
- trigger() // Сделать коллбек триггер, генерирующий событие при вызове

### Класс `Component`
Предназначен для создания компонентов пользовательского интерфейса.

- toggleClass() // переключает классы
- setText() // устанавливает текстовое содержимое для элемента
- setDisabled() // меняет статус элемента на активный/неактивный
- setHidden() // скрывает элемент
- setVisible() // делает элемент видимым
- setImage() // устанавливает изображение с атрибутом alt
- render() // возвращает DOM-элемент

### Класс `Model`
Данный класс является абстрактным и представляет собой базовую модель. Конструктор принимает следующие аргументы:

- data: Partial // частичные данные
- events: IEvents // события Содержит метод emitChanges(), который оповещает о том, что модель изменилась.

____
[Вернуться к оглавлению](#оглавление)

## Интерфейсы и Типы

### `ICard`
Интерфейс, описывающий карточку товара.

```typescript
export interface ICard {
  id: string;               // Уникальный идентификатор товара
  title: string;            // Название товара
  category: string;         // Категория товара
  description: string;      // Описание товара
  image: string;            // URL изображения товара
  price: number | null;     // Цена товара (может быть null)
  selected: boolean;        // Статус выбора товара
}
```

### `CategoryType`
Тип, описывающий возможные категории товаров.

```typescript
export type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';
```

### `CategoryMapping`
Тип, отображающий категории на строки.

```typescript
export type CategoryMapping = {
  [Key in CategoryType]: string;
};
```

### `ApiResponse`
Интерфейс, представляющий ответ API.

```typescript
export interface ApiResponse {
  items: ICard[];          // Массив товаров
}
```

### `IOrder`
Интерфейс для описания заказа.

```typescript
export interface IOrder {
  items: string[];         // Массив ID купленных товаров
  address: string;         // Адрес доставки
  email: string;           // Email покупателя
  phone: string;           // Телефон покупателя
  payment: string;         // Метод оплаты
  total: number;           // Общая сумма заказа
}
```

### `IOrderForm`
Интерфейс для формы заказа.

```typescript
export interface IOrderForm {
  address: string;         // Адрес доставки
  email: string;           // Email покупателя
  phone: string;           // Телефон покупателя
  payment: string;         // Метод оплаты
}
```

### `FormErrors`
Тип, представляющий ошибки формы.

```typescript
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
```

### `IAppStatus`
Интерфейс, описывающий состояние приложения.

```typescript
export interface IAppStatus {
  basket: Product[];                  // Корзина и товары
  store: Product[];                   // Товары в магазине
  order: IOrder;                      // Заказ
  formErrors: FormErrors;             // Ошибки формы

  // Методы управления корзиной
  addToBasket(product: Product): void;        // Добавить товар в корзину
  deleteFromBasket(productId: string): void;  // Удалить товар из корзины
  clearBasket(): void;                        // Очистить корзину
  getBasketAmount(): number;                  // Получить количество товаров в корзине
  getTotalBasketPrice(): number;              // Получить общую сумму корзины

  // Методы для обработки заказа
  setItems(): void;                            // Установить товары для заказа
  setOrderField(field: keyof IOrderForm, value: string): void; // Установить поле заказа
  validateContacts(): boolean;                 // Проверить контактные данные
  validateOrder(): boolean;                    // Проверить заказ
  refreshOrder(): boolean;                     // Обновить заказ

  // Методы для работы с данными
  setStore(items: ICard[]): void;              // Установить товары в магазине
  resetSelected(): void;                       // Сбросить выбранные товары
}
```
____
[Вернуться к оглавлению](#оглавление)

## Список файлов и их назначение

### `appStatus`
Этот код реализует классы, которые управляют состоянием приложения для интернет-магазина. Основные элементы и их назначения:

**Класс Product:**

Описывает продукт с такими свойствами, как id, description, image, title, category, price и selected.

**Класс AppState:**

Хранит состояние приложения, включая:

| Элемент      | Описание                                                                                                              |
| :----------: |:---------------------------------------------------------------------------------------------------------------------:|
| basket       | массив продуктов, добавленных в корзину                                                                               |
| store        | массив всех доступных продуктов                                                                                       |
| order        | объект, представляющий заказ клиента, с полями для хранения информации о товарах, способах оплаты и контактных данных |
| formErrors   | объект для хранения ошибок валидации форм                                                                             |

**Методы класса AppState:**

| Элемент                         | Описание                                                                            |
| :-----------------------------: |:-----------------------------------------------------------------------------------:|
| addToBasket                     | добавляет продукт в корзину                                                         |
| deleteFromBasket                | удаляет продукт из корзины по его идентификатору                                    |
| clearBasket                     | очищает корзину                                                                     |
| getBasketAmount                 | возвращает количество товаров в корзине                                             |
| setItems                        | обновляет список товаров в заказе на основе содержимого корзины                     |
| setOrderField                   | устанавливает значение поля заказа и выполняет валидацию контактных данных и заказа |
| validateContacts и validateOrder| проверяют корректность заполнения контактных данных и полей заказа, соответственно  |
| refreshOrder                    | сбрасывает объект заказа до начального состояния                                    |
| getTotalBasketPrice             | вычисляет общую стоимость товаров в корзине                                         |
| setStore                        | устанавливает список продуктов в магазине и генерирует событие об изменениях        |
| resetSelected                   | сбрасывает выбор для всех товаров в магазине                                        |


____
### `Basket`
Этот код реализует функциональность корзины товаров в веб-приложении. Основные элементы кода:
| Элемент           | Описание                                                                                       |
| :---------------: |:----------------------------------------------------------------------------------------------:|
| Интерфейс IBasket | Определяет структуру корзины, включая список товаров (в виде элементов HTML) и общую стоимость |
| Класс Basket      | Наследует от класса Component и управляет отображением корзины                                 |

**Класс Basket**
- Инициализацию элементов (списка товаров, цены, кнопки).
- Обработчик события на кнопку оформления заказа, который вызывает событие basket:order.
- Методы для обновления списка товаров и общей стоимости, а также для отключения кнопки оформления заказа.
- Метод для обновления индексов товаров после их удаления.

| Элемент                                             | Описание                                                                                  |
| :-----------------------------------------------:   |:-----------------------------------------------------------------------------------------:|
| Интерфейсы IProductBasket и IStoreItemBasketActions | Определяют структуру товара в корзине и действия с элементами корзины (например, нажатие на кнопку удаления) |

**Класс StoreItemBasket:**
Управляет отдельным товаром в корзине. Он включает:

- Инициализацию элементов (название, индекс, цена, кнопка удаления).
- Обработчик нажатия на кнопку удаления, который удаляет элемент из DOM и вызывает обработчик клика, если он задан.
- Сеттеры для обновления названия, индекса и цены товара.
____
### `card`

Этот код реализует компонент карточки товара для веб-приложения, а также его расширенные версии. Основные части кода:

Интерфейс IActions: Определяет действия, которые могут быть выполнены при нажатии на карточку (например, обработчик события клика).

Класс Card: Основной класс, который наследует от Component и отвечает за отображение карточки товара. Основные функции:

Инициализация элементов карточки (название, категория, изображение, цена, кнопка) с помощью методов, которые обеспечивают наличие этих элементов.
Обработчик нажатия на кнопку или на карточку, если кнопка отсутствует.
Сеттеры и геттеры для уникального идентификатора, названия, изображения, состояния кнопки (выбрана или нет), цены и категории товара. Сеттеры обновляют соответствующие элементы DOM.
Классы StoreItem и StoreItemPreview: Расширяют класс Card, добавляя функциональность для различных типов карточек:

StoreItem: Используется для обычных товаров в магазине.

### `Contact`

Этот код реализует компонент окошка контактов, позволяя пользователям вводить контактные данные, такие как телефон и электронная почта. Вот основные элементы кода:

Интерфейс IContact: Определяет структуру контактной информации с двумя полями — phone и email.

Класс Contact: Наследует от класса Form, что позволяет ему использовать функциональность формы. Основные функции:

Конструктор принимает элемент формы (родительский элемент) и обработчик событий (events), обеспечивая интеграцию с другими компонентами приложения.

### `Form`

### `larekAPI`

### `Modal`

### `Order`

### `Page`

### `Success`

____
[Вернуться к оглавлению](#оглавление)