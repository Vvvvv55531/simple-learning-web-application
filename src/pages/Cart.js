import './Catalog'
import { Footer } from '../components/Footer'
import React, { Component } from "react";
import { Container } from 'react-bootstrap';

export default class Cart extends Component {
    state = {
        products: [], // Инициализируем состояние с пустым массивом продуктов
    };

    // Загрузка продуктов после монтирования компонента
    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:8000/api/cart");
            const data = await response.json();
            this.setState({ products: data.products }); // Сохраняем продукты в состоянии
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }

    // Обработчик кнопки "Оформить"
    handleCheckout = async () => {
        const token = localStorage.getItem("token"); // Проверяем наличие токена

        if (!token) {
            alert("Вы не авторизованы! Пожалуйста, выполните вход, чтобы оформить заказ.");
            return;
        }

        try {
            // Проверка токена на сервере
            const userResponse = await fetch("http://localhost:8000/api/check", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!userResponse.ok) {
                alert("Ваш заказ успешно оформлен!");
                return;
            }

            const userData = await userResponse.json();
            const userEmail = userData.email;

            // Отправляем заказ
            const orderResponse = await fetch("http://localhost:8000/api/enter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Передаем токен для безопасности
                },
                body: JSON.stringify({
                    email: userEmail,
                    products: this.state.products.map(({ id, name, price }) => ({ id, name, price })),
                }),
            });

            if (orderResponse.ok) {
                alert("Ваш заказ успешно оформлен!");
                console.log("Заказ отправлен:", this.state.products);
            } else {
                alert("Ошибка при оформлении заказа.");
            }
        } catch (error) {
            console.error("Ошибка при оформлении заказа:", error);
        }
    };

    // Обработчик кнопки "Удалить"
    handleDelCart = (product) => {
        alert(`Продукт удален из корзины: ${product.name}`);
        this.deleteProduct(product.id);
    };

    deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/cart/${id}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                console.log(`Товар с ID ${id} успешно удалён`);
                this.setState((prevState) => ({
                    products: prevState.products.filter((product) => product.id !== id),
                }));
            } else {
                console.error("Ошибка при удалении товара");
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
                    <h3 className="c-text-ctlg">Корзина</h3>
                    <div className="c-sample"></div>
                    <button className="b" onClick={this.handleCheckout}>Оформить</button>
                </main>
                <Container className="product-catalog c-cart">
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
                                className="del-cart"
                                onClick={() => this.handleDelCart(product)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </Container>
                <div className="m-c"></div>
                <Footer />
                <div className="f-c"></div>
            </>
        );
    }
}

        
//         try {
//             const response = await fetch("http://localhost:8000/api/get_value");
//             const data = await response.json();
//             alert(data.value); // Выводит "Hello from Django!"
//         } catch (error) {
//             console.error("Ошибка при получении данных:", error);
//         }
//     };

//     sendValue = async () => {
//         try {
//             const value = "Hello from React!"; // Локальная переменная JS
    
//             // Отправка значения на сервер Django через POST-запрос
//             const response = await fetch("http://localhost:8000/api/get_value_2", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ value }),
//             });
    
//             if (response.ok) {
//                 console.log("Значение успешно отправлено на Django");
//             } else {
//                 console.error("Ошибка при отправке значения на Django");
//             }
//         } catch (error) {
//             console.error("Ошибка:", error);
//         }
//     };
    

//     render() {
//         return (
//             <div className="App">
//                 <h1>React + Django Integration</h1>
//                 <button onClick={this.printValue}>Получить значение</button>
//                 <button onClick={this.sendValue}>Отправить значение</button>
//             </div>
//         );
//     }
// }

