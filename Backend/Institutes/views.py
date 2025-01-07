from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({"error": "Username and password are required."}, status=400)

            user = authenticate(username=username, password=password)
            if user and user.is_superuser:
                return JsonResponse({"message": "Login successful", "user": username}, status=200)
            return JsonResponse({"error": "Invalid credentials or not a superuser."}, status=403)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    return JsonResponse({"error": "Only POST requests are allowed."}, status=405)
