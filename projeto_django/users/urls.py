from django.urls import path
from .views import *
from django.views.generic import TemplateView

urlpatterns = [
    path("usuarios/", getusers, name="lista_de_usuarios"),
    path("post/", postUser, name="criar_usuario"),
]
