# Generated by Django 5.1.4 on 2025-01-09 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic_id', models.IntegerField()),
                ('subject_id', models.IntegerField()),
                ('question_id', models.IntegerField(unique=True)),
                ('question', models.TextField()),
                ('programme', models.TextField()),
                ('options', models.JSONField()),
                ('answer', models.CharField(max_length=255)),
            ],
        ),
    ]
