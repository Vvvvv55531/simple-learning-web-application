from django.http import JsonResponse

def set_value(request):
    value = "Hello from Django!"  # Example value
    return JsonResponse({"value": value})
