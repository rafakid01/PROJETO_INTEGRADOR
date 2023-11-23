from rest_framework import serializers
from .models import Usuario, Monitor, Admin, Assunto, Interesse


class UsuarioSerializer(serializers.ModelSerializer):
    # monitor = MonitorSerializer(source="monitor", read_only=True)

    class Meta:
        model = Usuario
        fields = "__all__"


class MonitorSerializer(serializers.ModelSerializer):
    # assuntos = AssuntoSerializer(many=True, read_only=True)

    class Meta:
        model = Monitor
        fields = "__all__"


class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = "__all__"


class AssuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assunto
        fields = "__all__"


class InteresseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interesse
        fields = "__all__"
