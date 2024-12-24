import React, { useState, useEffect } from "react";
import "./enterForm.css";
import "./page.css"
import icon from "./icon.png"

function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Добавляем состояние для проверки авторизации

  // Проверяем токен при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен из localStorage
    setIsAuthenticated(false); // Устанавливаем пользователя как неавторизованного
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (isAuthenticated) {
    // Если пользователь авторизован, отображаем другую страницу
    return <Page onLogout={handleLogout}/>;
  }

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        {isLogin ? (
          <LoginForm onAuthSuccess={() => setIsAuthenticated(true)} />
        ) : (
          <RegisterForm />
        )}
        <button onClick={toggleForm} className="toggle-button">
          {isLogin ? "Перейти к регистрации" : "Перейти к входу"}
        </button>
      </div>
    </div>
  );
}

function LoginForm({ onAuthSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/enter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formType: "login", ...formData }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Вход выполнен!");
        localStorage.setItem("token", data.token); // Сохраняем токен
        console.log("Пользователь вошел в систему:", data);
        onAuthSuccess(); // Сообщаем о том, что авторизация прошла успешно
        console.log("Сохраненный токен:", localStorage.getItem("token"));
      } else {
        alert(`Ошибка: ${data.error || "Неверные данные"}`);
      }
    } catch (error) {
      console.error("Ошибка при выполнении входа:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Вход</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Введите ваш email"
        />
      </div>
      <div className="form-group">
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Введите ваш пароль"
        />
      </div>
      <button type="submit" className="submit-button">
        Войти
      </button>
    </form>
  );
}

function RegisterForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/enter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formType: "register", ...formData }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Регистрация выполнена!");
        console.log("Новый пользователь зарегистрирован:", data);
      } else {
        alert(`Ошибка: ${data.error || "Некорректные данные"}`);
      }
    } catch (error) {
      console.error("Ошибка при выполнении регистрации:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Регистрация</h2>
      <div className="form-group">
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Введите ваше имя"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Введите ваш email"
        />
      </div>
      <div className="form-group">
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Введите ваш пароль"
        />
      </div>
      <button type="submit" className="submit-button">
        Зарегистрироваться
      </button>
    </form>
  );
}

function Page(a) {
  return (
    <div className="page-back">
      <img
      src={icon}>
      </img>
      <h1>Добро пожаловать!</h1>
      <h2></h2>
      <p>Вы успешно вошли в систему.</p>
      <a href='/cart'><button
        className="page-button">
        К корзине
      </button></a>
      <button
        className="page-button"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload(); // Перезагружаем страницу для возврата на форму
        }}
      >
        Выйти
      </button>
    </div>
  );
}

export default AuthPage;
