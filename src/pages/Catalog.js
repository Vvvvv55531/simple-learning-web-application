import React, { Component } from 'react';
import './Catalog.css';
import { Footer } from '../components/Footer';
import { Container } from 'react-bootstrap';

export default class Catalog extends Component {
    state = {
        products: [], // Инициализируем состояние с пустым массивом продуктов
    };

    // Загрузка продуктов после монтирования компонента
    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:8000/api/product");
            const data = await response.json();
            this.setState({ products: data.products }); // Сохраняем продукты в состоянии
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }

    // Обработчик кнопки
    handleAddToCart = (product) => {
        alert(`Продукт добавлен в корзину: ${product.name}`);
        this.sendValue(product);
    };

    // Отправка данных на сервер
    sendValue = async (product) => {
        try {
            const response = await fetch("http://localhost:8000/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product }),
            });

            if (response.ok) {
                console.log("Продукт успешно отправлен на сервер");
            } else {
                console.error("Ошибка при отправке данных");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    render() {
        const { products } = this.state;

        return (
            <>
                <main className="block-ctlg">
                    <h3 className="text-ctlg">Каталог</h3>
                    <div className="sample"></div>
                </main>
                <Container className="product-catalog">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={`http://localhost:8000${product.image_url}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">{product.price} $</p>
                            <button
                                className="add-to-cart"
                                onClick={() => this.handleAddToCart(product)}
                            >
                                Добавить в корзину
                            </button>
                        </div>
                    ))}
                </Container>
                <Footer />
            </>
        );
    }
}
