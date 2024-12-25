from django.urls import path
from . import views

urlpatterns = [
    path('api/students/login/', views.login, name='login'),
    path('api/students/registration/', views.registration, name='registration'),
]
