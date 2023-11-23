from rest_framework import serializers
from .models import Usuarios, Monitores, Administrador


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = "__all__"


class MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitores
        fields = "__all__"
        depth = 1


class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = "__all__"
