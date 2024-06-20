# django rest framework
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MessageSerializer
from rest_framework.renderers import TemplateHTMLRenderer
# mi modelo
from .models import Message
#django
from django.views.generic.edit import FormView
from .forms import Form
from django.shortcuts import render
# vista para el ingreso de datos
class MessageForm(FormView):
   template_name = 'index.html'
   success_url = '/messages-list'
   form_class = Form
   def form_valid(self, form):
       form.save()
       return super().form_valid(form)
# vista para obtener los datos
class Get_messages(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'messages.html'
    def get(self,request):
        messages_date = Message.objects.all()
        serializer = MessageSerializer(messages_date)
        return Response({'messages':messages_date})
