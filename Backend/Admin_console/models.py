from django.db import models

class SubjectCategory(models.Model):
    sub_cat_id = models.IntegerField(unique=True)
    sub_cat_name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=100, null=True)
    updated_by = models.CharField(max_length=100, null=True)



class Subject(models.Model):
    subject_id = models.IntegerField(unique=True)
    subject_name = models.CharField(max_length=255)
    sub_cat_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=100, null=True)
    updated_by = models.CharField(max_length=100, null=True)

class Topic(models.Model):
    topic_id = models.IntegerField(unique=True)
    topic_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=100, null=True)
    updated_by = models.CharField(max_length=100, null=True)

class Question(models.Model):
    topic_id = models.IntegerField()
    subject_id = models.IntegerField()
    question_id = models.IntegerField(unique=True)
    question = models.TextField()
    programme = models.TextField()
    options = models.JSONField()
    answer = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=100, null=True)
    updated_by = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"Question {self.question_id}: {self.question}"
