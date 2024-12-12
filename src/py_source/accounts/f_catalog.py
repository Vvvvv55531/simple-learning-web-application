from accounts.models import Product
import json
from django.http import JsonResponse

def products(request):

    # Получение всех товаров из базы данных
    products = Product.objects.all()

    # Формирование списка товаров в виде словарей
    product_data = [
        {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "description": product.description,
            "image_url": product.image_url
            # Добавьте другие поля по необходимости
        }
        for product in products
    ]

    # Возврат JSON-ответа
    return JsonResponse({"products": product_data})
