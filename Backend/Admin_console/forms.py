# //Backend\Admin_console\forms.py
from django import forms
from .models import SubjectCategory, Subject, Topic, Question


class SubjectCategoryForm(forms.ModelForm):
    class Meta:
        model = SubjectCategory
        fields = ['sub_cat_id', 'sub_cat_name', 'domain', 'created_by', 'updated_by']
        widgets = {
            'sub_cat_name': forms.TextInput(attrs={'placeholder': 'Enter subject category name'}),
            'domain': forms.TextInput(attrs={'placeholder': 'Enter domain'}),
            'created_by': forms.TextInput(attrs={'placeholder': 'Created by'}),
            'updated_by': forms.TextInput(attrs={'placeholder': 'Updated by'}),
        }


class SubjectForm(forms.ModelForm):
    class Meta:
        model = Subject
        fields = ['subject_id', 'subject_name', 'sub_cat_id', 'created_by', 'updated_by']
        widgets = {
            'subject_name': forms.TextInput(attrs={'placeholder': 'Enter subject name'}),
            'sub_cat_id': forms.NumberInput(attrs={'placeholder': 'Enter subject category ID'}),
            'created_by': forms.TextInput(attrs={'placeholder': 'Created by'}),
            'updated_by': forms.TextInput(attrs={'placeholder': 'Updated by'}),
        }


class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['topic_id', 'topic_name', 'created_by', 'updated_by']
        widgets = {
            'topic_name': forms.TextInput(attrs={'placeholder': 'Enter topic name'}),
            'created_by': forms.TextInput(attrs={'placeholder': 'Created by'}),
            'updated_by': forms.TextInput(attrs={'placeholder': 'Updated by'}),
        }


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['topic_id', 'subject_id', 'question_id', 'question', 'programme', 'options', 'answer', 'created_by', 'updated_by']
        widgets = {
            'topic_id': forms.Select(choices=[(topic.topic_id, topic.topic_name) for topic in Topic.objects.all()]),
            'subject_id': forms.Select(choices=[(subject.subject_id, subject.subject_name) for subject in Subject.objects.all()]),
            'question': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Enter the question'}),
            'programme': forms.Textarea(attrs={'rows': 2, 'placeholder': 'Enter programme details'}),
            'options': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Enter options as JSON'}),
            'answer': forms.TextInput(attrs={'placeholder': 'Enter the correct answer'}),
            'created_by': forms.TextInput(attrs={'placeholder': 'Created by'}),
            'updated_by': forms.TextInput(attrs={'placeholder': 'Updated by'}),
        }
