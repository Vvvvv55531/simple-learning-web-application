import React, { Component } from 'react';
import './Catalog.css'
import { Footer } from '../components/Footer'

const printValue = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/product"); // Запрос на сервер
    const data = await response.json(); // Преобразование ответа в JSON
    return data.products; // Возвращаем массив товаров
  } catch (error) {
    console.error("Ошибка при получении данных:", error); // Логирование ошибки
    return []; // Возвращаем пустой массив в случае ошибки
  }
};

const products = await printValue()

// const products = [
//     { id: 1, name: 'Кеды Converse', price: 7999, image: 'converse.jpg' },
//     { id: 2, name: 'Кроссовки Nike', price: 8999, image: 'nike.jpg' },
//     { id: 3, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 4, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 5, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 6, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 7, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 8, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 9, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 10, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 11, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     { id: 12, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
//     ];

const ProductCard = ({ product }) => {
    const imageUrl = `http://localhost:8000${product.image_url}`;

    return (
      <div className="product-card">
        <img src={imageUrl} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price} $</p>
        {/* <p className="product-price">{product.description} ₽</p> */}
        <button className="add-to-cart">Добавить в корзину</button>
      </div>
    );
  };

  const ProductCatalog = ({ products }) => {
    return (
        <div className="product-catalog">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
    );
    };

export default class Catalog extends Component {
    render() {
        return (
            <><main className="block-ctlg">
                <h3 className="text-ctlg">Каталог</h3>
                <div className="sample"></div>

                
            </main>

          <ProductCatalog products={products} />
          <Footer /></>
        )
    }
}
