from django.db import models

class StudentDetails(models.Model):
    full_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    identity_proof_type = models.CharField(max_length=50, null=True, blank=True)
    identity_proof_number = models.CharField(max_length=50, null=True, blank=True)
    course = models.CharField(max_length=50, default="c1")
    mobile_number = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.email
