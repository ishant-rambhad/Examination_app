from django.db import models

class Question(models.Model):
    topic_id = models.IntegerField()
    subject_id = models.IntegerField()
    question_id = models.IntegerField(unique=True)
    question = models.TextField()
    programme = models.TextField()
    options = models.JSONField()  # Store options as a list in JSON format
    answer = models.CharField(max_length=255)

    def __str__(self):
        return f"Question {self.question_id}: {self.question}"
