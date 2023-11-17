from django.shortcuts import render
from .models import Usuario

# Create your views here.


def listar_users(request) :
    usuarios = Usuario.objects.all()