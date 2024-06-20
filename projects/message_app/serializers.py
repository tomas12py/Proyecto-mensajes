from rest_framework import serializers
from .models import Message
# Se crea el serializer a partir del modelo message
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['name','email','message']