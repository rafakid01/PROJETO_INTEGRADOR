from django.urls import path
from .views import *
from django.views.generic import TemplateView

urlpatterns = [
    path("usuarios/", getUsers, name="lista_de_usuarios"),
    path("post/", postUser, name="criar_usuario"),
    path(
        "usuarios/<str:email>/<str:senha>/",
        getUser,
        name="resgatar_usuario",
    ),
    path("put/<int:pk>/", updateUser, name="atualizar_usuario"),
    path("delete/<int:pk>/", deleteUser, name="excluir_usuario"),
]
