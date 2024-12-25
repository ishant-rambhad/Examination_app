# //students/forms.py
from django import forms
from .models import StudentDetails

class StudentForm(forms.ModelForm):
    class Meta:
        model = StudentDetails
        fields = [
            'full_name', 'email', 'password', 'date_of_birth', 
            'identity_proof_type', 'identity_proof_number', 
            'course', 'mobile_number'
        ]
        widgets = {
            'password': forms.PasswordInput(),
        }
