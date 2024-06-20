from django.db import models

# Creacion del model Message
class Message(models.Model):
    name = models.CharField(max_length = 20)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateField(auto_now_add = True)