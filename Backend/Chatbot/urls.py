from django.urls import path
from . import views

urlpatterns = [
    # path('chat/', views.chat, name='chat'),
    # path('generate/', views.generate, name='generate'),
    path('', views.chatbot_home, name='chatbot_home'),

]

