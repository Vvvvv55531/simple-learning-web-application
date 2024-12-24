from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json

@csrf_exempt
def enter(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            form_type = data.get("formType", "")

            if form_type == "login":
                email = data.get("email", "")
                password = data.get("password", "")
                user = authenticate(username=email, password=password)

                if user is not None:
                    # Генерация токена (в реальности используйте JWT)
                    token = "dummy_token"  # Реализуйте токенизацию
                    return JsonResponse({"message": "Successful login!", "token": token})
                else:
                    return JsonResponse({"error": "Incorrect data"}, status=401)

            elif form_type == "register":
                name = data.get("name", "")
                email = data.get("email", "")
                password = data.get("password", "")

                if User.objects.filter(username=email).exists():
                    return JsonResponse({"error": "User already exists"}, status=400)

                user = User.objects.create_user(username=email, password=password, first_name=name)
                user.save()
                return JsonResponse({"message": "Registration successful"})

            else:
                return JsonResponse({"error": ""}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": ""}, status=400)

    return JsonResponse({"error": ""}, status=405)

