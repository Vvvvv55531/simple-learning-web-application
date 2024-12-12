from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def enter(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            form_type = data.get("formType", "")
            form_data = {key: value for key, value in data.items() if key != "formType"}
            
            # Печатаем полученные данные в консоль
            print(f"T: {form_type}")
            print(f"D: {form_data}")

            return form_data
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid request method"})

