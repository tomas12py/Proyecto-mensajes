from django import forms
# importo mi modelo
from .models import Message

# modelo para el formulario
class Form(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['name','email','message']

