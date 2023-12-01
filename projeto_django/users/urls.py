from django.urls import path
from .views import *
from django.views.generic import TemplateView

urlpatterns = [
    # GET USUARIOS / POST USUARIO
    path("usuarios/", UsuarioListCreateView.as_view(), name="usuario-list-create"),
    # PUT USUARIO / DELETE USUARIO
    path(
        "usuarios/<int:pk>/",
        UsuarioRetrieveUpdateDestroyView.as_view(),
        name="usuario-retrieve-update-destroy",
    ),
    # GET USUARIO PELO EMAIL
    path(
        "usuarios/<str:email>/<str:senha>/",
        UsuarioRetrieveView.as_view(),
        name="usuario-retrieve-by-email",
    ),
    # GET MONITORES / POST MONITOR
    path("monitores/", MonitorListCreateView.as_view(), name="monitor-list-create"),
    # PUT MONITOR / DELETE MONITOR
    path(
        "monitores/<int:pk>/",
        MonitorRetrieveUpdateDestroyView.as_view(),
        name="monitor-retrieve-update-destroy",
    ),
    #  GET ASSUNTOS / POST ASSUNTO
    path("assuntos/", AssuntoListCreateView.as_view(), name="assunto-list-create"),
    # PUT ASSUNTO / DELETE ASSUNTO
    path(
        "assuntos/<int:pk>/",
        AssuntoRetrieveUpdateDestroyView.as_view(),
        name="assunto-retrieve-update-destroy",
    ),
    path("admin/", AdminListCreateView.as_view(), name="admin-list-create"),
    path(
        "admin/<int:pk>/",
        AdminRetrieveUpdateDestroyView.as_view(),
        name="admin-retrieve-update-destroy",
    ),
    path(
        "interesses/", InteresseListCreateView.as_view(), name="interesse-list-create"
    ),
    path(
        "interesses/del/<int:pk>/",
        InteresseRetrieveUpdateDestroyView.as_view(),
        name="interesse-retrieve-update-destroy",
    ),
    path(
        "interesses/<int:monitor_id>/",
        InteressePorMonitor.as_view(),
        name="interesse-por-monitor",
    ),
    # GET ADMIN
    path(
        "administradores/<int:pk>/",
        AdminRetrieveUpdateDestroyView.as_view(),
        name="administrador",
    ),
    # POST ADMIN
    path(
        "administradores/",
        AdminListCreateView.as_view(),
        name="tabela-admin",
    ),
]
