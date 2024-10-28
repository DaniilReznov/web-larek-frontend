import LarekAPI from './components/larekAPI';
import './scss/styles.scss';
// import {IProduct} from './types/index';

import { cloneTemplate, ensureElement } from './utils/utils';
import { API_URL, CDN_URL, PaymentTypes } from './utils/constants';

const api = new LarekAPI(CDN_URL, API_URL);

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const galleryMain = document.querySelector('.gallery');

// index.ts

interface IProduct {
  id: string;
  title: string;
  price: number;
  image: string; // URL изображения
  category: string; // Категория продукта
}

async function fetchProducts(): Promise<IProduct[]> {
  const response = await fetch('https://larek-api.nomoreparties.co/api/weblarek/product/');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  const data = await response.json();

  // Проверяем, если данные являются объектом, извлекаем массив
  if (typeof data === 'object' && data.items && Array.isArray(data.items)) {
      return data.items; // Возвращаем массив продуктов
  } else {
      throw new Error('Полученные данные не содержат массив продуктов');
  }
}


function createProductCard(items: IProduct): DocumentFragment {
  const clone = cardCatalogTemplate.content.cloneNode(true) as DocumentFragment;

  const categoryElement = clone.querySelector('.card__category') as HTMLElement;
  const titleElement = clone.querySelector('.card__title') as HTMLElement;
  const imageElement = clone.querySelector('.card__image') as HTMLImageElement;
  const priceElement = clone.querySelector('.card__price') as HTMLElement;

  categoryElement.textContent = items.category;
  titleElement.textContent = items.title;
  imageElement.src = api.cdn + items.image;
  priceElement.textContent = `${items.price} синапсов`;

  return clone;
}

async function renderCatalog() {
  // const catalog = document.getElementById('catalog') as HTMLElement;

  try {
      const products = await fetchProducts();
      products.forEach((items: IProduct) => {
          // console.log(items);
          const card = createProductCard(items);
          console.log(card);
          galleryMain.appendChild(card);
      });
  } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
  }
}

renderCatalog();
