from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def get_value(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            value = data.get("value", "")
            print(f"{value}")  # Вывод в консоль
            return JsonResponse({"message": "Value received successfully!"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
