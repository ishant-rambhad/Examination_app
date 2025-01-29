# //backend\admin_console\views.py  
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
from .models import Question
from .forms import QuestionForm
import json
import bcrypt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Predefined admin credentials
ADMIN_EMAIL = "Admin@gmail.com"
ADMIN_PASSWORD_HASH = bcrypt.hashpw("Admin".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  # Pre-hashed password

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({"error": "Email and password are required."}, status=400)

            # Check email and bcrypt password hash
            if email == ADMIN_EMAIL and bcrypt.checkpw(password.encode('utf-8'), ADMIN_PASSWORD_HASH.encode('utf-8')):
                return JsonResponse({"message": "Login successful", "user": email}, status=200)

            return JsonResponse({"error": "Invalid credentials."}, status=403)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    return JsonResponse({"error": "Only POST requests are allowed."}, status=405)

@csrf_exempt
def create_question(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = QuestionForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Question created successfully'}, status=201)
        return JsonResponse({'errors': form.errors}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def read_questions(request):
    if request.method == 'GET':
        questions = Question.objects.all().values()
        return JsonResponse({'questions': list(questions)}, safe=False, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def update_question(request, question_id):
    if request.method == 'PUT':
        question = get_object_or_404(Question, question_id=question_id)
        data = json.loads(request.body)
        form = QuestionForm(data, instance=question)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Question updated successfully'}, status=200)
        return JsonResponse({'errors': form.errors}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_question(request, question_id):
    if request.method == 'DELETE':
        question = get_object_or_404(Question, question_id=question_id)
        question.delete()
        return JsonResponse({'message': 'Question deleted successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

