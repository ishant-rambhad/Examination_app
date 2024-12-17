from django.shortcuts import render

def chatbot_home(request):
    return render(request, 'Chatbot/home.html')
