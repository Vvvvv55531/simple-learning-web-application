from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import RegistrationForm

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()  # Сохраняем пользователя в БД
            login(request, user)  # Авторизуем пользователя после регистрации
            return redirect('home')  # Перенаправляем на домашнюю страницу
    else:
        form = RegistrationForm()
    return render(request, 'accounts/register.html', {'form': form})
