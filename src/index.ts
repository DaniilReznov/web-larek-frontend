import LarekAPI from './components/larekAPI';
import './scss/styles.scss';
import { ApiResponse, ICard, IOrderForm } from './types/index';
import { cloneTemplate, ensureElement } from './utils/utils';
import { API_URL, CDN_URL} from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState, Product } from './components/appStatus';
import { StoreItem, StoreItemPreview } from './components/card';
import { Page } from './components/Page';
import Modal from './components/Modal';
import { Basket, StoreItemBasket } from './components/Basket';
import { ApiListResponse } from './components/base/api';
import { Order } from './components/Order';
import { Contact } from './components/Contact';
import { Success } from './components/Success';
const events = new EventEmitter();

const api = new LarekAPI(CDN_URL, API_URL);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const basket = new Basket('basket', cloneTemplate(basketTemplate), events);

const page = new Page(document.body, events);
const appData = new AppState({}, events);
const order = new Order('order', cloneTemplate(orderTemplate), events)
const contacts = new Contact(cloneTemplate(contactsTemplate), events);
const success = new Success('order-success', cloneTemplate(successTemplate), {
  onClick: () => {
    events.emit('modal:close')
    modal.close()
  }
})

// Получаем лоты с сервера
api
  .get('/product')
  .then((res: ApiResponse) => {
    appData.setStore(res.items as ICard[]);
    console.log(appData.store);
  })
  .catch((err) => {
    console.error(err);
  });

events.on('items:changed', () => {
  page.store = appData.store.map((item) => {
    const product = new StoreItem(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item),
    });
    return product.render({
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
    });
  });
});

// Открытие карточки
events.on('card:select', (item: Product) => {
  page.locked = true;
  const product = new StoreItemPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      events.emit('card:toBasket', item)
    },
  });
  modal.render({
    content: product.render({
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      description: item.description,
      price: item.price,
      selected: item.selected
    }),
  });
});

// корзина
events.on('basket:open', () => {
  page.locked = true
  const basketItems = appData.basket.map((item, index) => {
    const storeItem = new StoreItemBasket(
      'card',
      cloneTemplate(cardBasketTemplate),
      {
        onClick: () => events.emit('basket:delete', item)
      }
    );
    return storeItem.render({
      title: item.title,
      price: item.price,
      index: index + 1,
    });
  });
  modal.render({
    content: basket.render({
      list: basketItems,
      price: appData.getTotalBasketPrice(),
    }),
  });
});

// добавить товар в корзину
events.on('card:toBasket', (item: Product) => {
  const addToBasket = () => {
    item.selected = true;
    appData.addToBasket(item);
    page.counter = appData.getBasketAmount();
    modal.close();
  };

  addToBasket();
});

// удаление товара из корзины
events.on('basket:delete', (item: Product) => {
  appData.deleteFromBasket(item.id); // Удаляем товар из корзины по его ID
  item.selected = false; // Обновляем состояние выбранного товара

  basket.price = appData.getTotalBasketPrice(); // Обновляем общую цену корзины
  page.counter = appData.getBasketAmount(); // Обновляем количество товаров в корзине
  basket.refreshIndices(); // Обновляем индексы корзины
  
  // Если корзина пустая, отключаем кнопку
  if (!appData.basket.length) {
    basket.disableButton();
  }
});

// Оформить заказ
events.on('basket:order', () => {
  modal.render({
    content: order.render(
      {
        address: '',
        valid: false,
        errors: []
      }
    ),
  });
});

// Изменилось состояние валидации заказа
events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
  const { payment, address } = errors;
  order.valid = !payment && !address;
  order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Изменилось состояние валидации контактов
events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
});

// Изменились введенные данные
events.on('orderInput:change', (data: { field: keyof IOrderForm, value: string }) => {
  appData.setOrderField(data.field, data.value);
});

// Заполнить телефон и почту
events.on('order:submit', () => {
  appData.order.total = appData.getTotalBasketPrice()
  appData.setItems();
  modal.render({
    content: contacts.render(
      {
        valid: false,
        errors: []
      }
    ),
  });
})

// Покупка товаров
events.on('contacts:submit', () => {
  api.post('/order', appData.order)
    .then((res) => {
      events.emit('order:success', res);
      appData.clearBasket();
      appData.refreshOrder();
      order.disableButtons();
      page.counter = 0;
      appData.resetSelected();
    })
    .catch((err) => {
      console.log(err)
    })
})

// Окно успешной покупки
events.on('order:success', (res: ApiListResponse<string>) => {
  modal.render({
    content: success.render({
      description: res.total
    })
  })
})

// закрытие модального окна
events.on('modal:close', () => {
  appData.refreshOrder();
  page.locked = false;
});