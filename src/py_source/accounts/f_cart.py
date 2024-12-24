from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Хранилище данных о продуктах
product_data = []

@csrf_exempt
def cart(request, product_id=None):
    if request.method == "DELETE" and product_id is not None:
        product_to_delete = next((p for p in product_data if p["id"] == product_id), None)
        if product_to_delete:
            product_data.remove(product_to_delete)
            return JsonResponse({"message": f"ID {product_id} "}, status=200)
        else:
            return JsonResponse({"error": " "}, status=404)

    elif request.method == "POST":
        try:
            # Декодируем JSON из тела запроса
            data = json.loads(request.body)
            product = data.get("product")  # Получаем объект 'product' из запроса
            
            if not product:
                return JsonResponse({"error": "No product provided"}, status=400)
            
            # Добавляем продукт в список
            product_data.append(product)
            print(f"Add: {product}")  # Логируем продукт на сервере
            
            return JsonResponse({"products": product_data})  # Отправляем обновленный список продуктов
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    # Если метод GET, возвращаем текущий список продуктов
    return JsonResponse({"products": product_data})
