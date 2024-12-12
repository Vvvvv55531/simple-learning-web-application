
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from accounts.models import Product
from django.shortcuts import redirect
from django.http import JsonResponse
from accounts.create_order import create_order
from django.contrib import messages

@login_required
def catalog_view(request):
    if request.method == "POST":
        # Получаем текущего пользователя
        user = request.user
        customer_name = user.get_full_name() or user.username  # Имя пользователя
        customer_email = user.email  # Почта пользователя

        # Формируем корзину из POST-данных
        cart_items = []
        for key, value in request.POST.items():
            if key.startswith("product_"):
                product_id = int(key.split("_")[1])
                quantity = int(value)
                if quantity > 0:
                    cart_items.append({"product_id": product_id, "quantity": quantity})

        # Проверяем, что корзина не пуста
        if not cart_items:
            messages.error(request, "Корзина пуста. Выберите хотя бы один товар.")
            return redirect("order_page")

        # Создаем заказ
        try:
            create_order(customer_name, customer_email, cart_items)
            messages.success(request, "Ваш заказ успешно оформлен!")
            return redirect("order_page")  # Перенаправление на домашнюю страницу
        except Exception as e:
            messages.error(request, f"Ошибка при оформлении заказа: {str(e)}")
            return redirect("order_page")

    # Получаем список всех товаров для отображения в каталоге
    products = Product.objects.all()
    return render(request, "app/order_page.html", {"products": products})

def index(request):
    return render(request, 'app/index.html')

def order_page(request):

    return render(request, 'app/order_page.html')

@login_required
def home(request):
      products = Product.objects.all() 
      return render(request, 'app/home.html', {'products': products})