import React, { useState } from 'react';
import './enterForm.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <button onClick={toggleForm} className="toggle-button">
          {isLogin ? "Перейти к регистрации" : "Перейти к входу"}
        </button>
      </div>
    </div>
  );
}

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formType: "login", ...formData }),
      });
      alert("Вход выполнен и сохранен!");
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Вход</h2>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Введите ваш email" />
      </div>
      <div className="form-group">
        <label>Пароль:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Введите ваш пароль" />
      </div>
      <button type="submit" className="submit-button">Войти</button>
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
      await fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formType: "register", ...formData }),
      });

          alert("Регистрация выполнена и сохранена!");
    } 
      
    catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Регистрация</h2>
      <div className="form-group">
        <label>Имя:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Введите ваше имя" />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Введите ваш email" />
      </div>
      <div className="form-group">
        <label>Пароль:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Введите ваш пароль" />
      </div>
      <button type="submit" className="submit-button">Зарегистрироваться</button>
    </form>
  );
}

export default AuthPage;
