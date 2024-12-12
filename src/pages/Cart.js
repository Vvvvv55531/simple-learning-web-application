import './Cart.css'
import { Footer } from '../components/Footer'
import React, { Component } from "react";
import { Container } from 'react-bootstrap';


const products = [
    { id: 1, name: 'Кеды Converse', price: 7999, image: 'converse.jpg' },
    { id: 2, name: 'Кроссовки Nike', price: 8999, image: 'nike.jpg' },
    { id: 3, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 4, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 5, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 6, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 7, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 8, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 9, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 10, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 11, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    { id: 12, name: 'Ботинки Timberland', price: 12999, image: 'timberland.jpg' },
    ];

const ProductCard = ({ product }) => {
    return (
        <div className="cart-product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <h3 className="cart-product-name">{product.name}</h3>
        <p className="cart-product-price">{product.price} ₽</p>
        </div>
    );
    };
    
    const ProductCatalog = ({ products }) => {
    return (
        <div className="cart-product-catalog">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
    );
    };

export default class Catalog extends Component {
    render() {
        return (
            <><main className="cart-block-ctlg">
                <h3 className="cart-text-ctlg">Корзина</h3>
                <div className="cart-sample"></div>

                
            </main>

            <Container>
                <ProductCatalog products={products} />
            </Container>
            <Footer /></>
        )
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

