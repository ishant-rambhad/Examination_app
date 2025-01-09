from django import forms
from .models import Question

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['topic_id', 'subject_id', 'question_id', 'question', 'programme', 'options', 'answer']
