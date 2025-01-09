# //Backend\Institutes\urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('questions/create/', views.create_question, name='create_question'),
    path('questions/', views.read_questions, name='read_questions'),
    path('questions/update/<int:question_id>/', views.update_question, name='update_question'),
    path('questions/delete/<int:question_id>/', views.delete_question, name='delete_question'),
]
