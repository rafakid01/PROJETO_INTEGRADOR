# from rest_framework.response import Response
from .models import Usuario, Monitor, Admin, Assunto, Interesse
from .serializers import (
    UsuarioSerializer,
    MonitorSerializer,
    AdministradorSerializer,
    AssuntoSerializer,
    InteresseSerializer,
)
from rest_framework.response import Response
from rest_framework import status

from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveAPIView,
)

# # Create your views here.


# USUARIO
class UsuarioListCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        usuario = serializer.save()

        if usuario.categoria == "monitor":
            monitor_data = self.request.data.get("monitor", {})
            monitor_data["user"] = usuario.id

            monitor_serializer = MonitorSerializer(data=monitor_data)
            if monitor_serializer.is_valid():
                monitor_serializer.save()
                return Response({"id": usuario.id}, status=status.HTTP_201_CREATED)
            else:
                usuario.delete()  # Se a criação do monitor falhar, remova o usuário recém-criado
                return Response(
                    monitor_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

        return Response({"id": usuario.id}, status=status.HTTP_201_CREATED)


class UsuarioRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioRetrieveView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get(self, request, email, senha):
        try:
            usuario = Usuario.objects.get(email=email, senha=senha)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)
        except Usuario.DoesNotExist:
            return Response(
                {"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND
            )


# MONITOR
class MonitorListCreateView(ListCreateAPIView):
    queryset = Monitor.objects.all()
    serializer_class = MonitorSerializer


class MonitorRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Monitor.objects.all()
    serializer_class = MonitorSerializer


# ASSUNTO
class AssuntoListCreateView(ListCreateAPIView):
    queryset = Assunto.objects.all()
    serializer_class = AssuntoSerializer


class AssuntoRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Assunto.objects.all()
    serializer_class = AssuntoSerializer


# ADMIN
class AdminListCreateView(ListCreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdministradorSerializer


class AdminRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdministradorSerializer


# INTERESSE
class InteresseListCreateView(ListCreateAPIView):
    queryset = Interesse.objects.all()
    serializer_class = InteresseSerializer


class InteresseRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Interesse.objects.all()
    serializer_class = InteresseSerializer
