# from rest_framework.response import Response
from .models import Usuario, Monitor, Admin, Assunto, Interesse
from .serializers import (
    UsuarioSerializer,
    MonitorSerializer,
    AdministradorSerializer,
    AssuntoSerializer,
    InteresseSerializer,
)
from django.http.response import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status

from django.shortcuts import get_object_or_404

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
        # Criação do usuário comum
        usuario = serializer.save()

        # Se o usuário for um monitor, crie uma instância na tabela de monitores
        if usuario.categoria == "monitor":
            monitor_data = self.request.data.get("monitor", {})
            monitor_data[
                "user"
            ] = usuario.id  # Associe o monitor ao usuário recém-criado
            monitor_serializer = MonitorSerializer(data=monitor_data)
            if monitor_serializer.is_valid():
                monitor_serializer.save()

        return JsonResponse(usuario)


class UsuarioRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioRetrieveView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = "email"
        filter_kwargs = {lookup_url_kwarg: self.kwargs[lookup_url_kwarg]}
        obj = queryset.get(**filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj


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


# @api_view(["GET"])
# def getUsers(self, request):
#     usuarios = Usuarios.objects.all()
#     usuario_serializer = UsuarioSerializer(usuarios, many=True)

#     monitores = Monitores.objects.all()
#     monitores_serializer = MonitorSerializer(monitores, many=True)

#     return JsonResponse(
#         # [usuario_serializer.data, monitores_serializer.data], safe=False
#         usuario_serializer.data,
#         safe=False,
#     )


# @api_view(["GET"])
# def getMonitoresFilter(self, request):
#     monitores = Monitores.objects.filter(published=True)

#     monitor_serializer = MonitorSerializer(monitores, many=True)
#     return JsonResponse(monitor_serializer.data, safe=False)


# @api_view(["GET"])
# def getUser(self, request, *args, **kwargs):
#     email = self.kwargs.get("email")
#     senha = self.kwargs.get("senha")

#     try:
#         usuario = Usuarios.objects.get(email=email, senha=senha, categoria="aluno")
#         # Você pode personalizar os campos que deseja incluir na resposta JSON
#         data = {
#             "id_usuario": usuario.id_usuario,
#             "nome": usuario.nome,
#             "email": usuario.email,
#             "senha": usuario.senha,
#             "curso": usuario.curso,
#             "categoria": usuario.categoria,
#             "contato_numero1": usuario.contato_numero1,
#             "contato_numero2": usuario.contato_numero2,
#             "foto_perfil": usuario.foto_perfil,
#         }
#         return JsonResponse(data)

#     except Usuarios.DoesNotExist:
#         usuario = get_object_or_404(Usuarios, email=email, categoria="monitor")
#         monitor = Monitores.objects.get(id_monitor=usuario.id_usuario)

#         usuario_serializer = UsuarioSerializer(usuario)
#         monitor_serializer = MonitorSerializer(monitor)

#         data = {"usuario": usuario_serializer.data, "monitor": monitor_serializer.data}

#         return JsonResponse(data)


# @api_view(["PUT"])
# def updateUser(self, request, pk):
#     try:
#         usuario = Usuarios.objects.get(id_usuario=pk)
#     except Usuarios.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     usuario_serializer = UsuarioSerializer(usuario, data=request.data)
#     if usuario_serializer.is_valid():
#         usuario_serializer.save()

#         # Se o usuário for um monitor, atualiza também a tabela de monitores
#         if usuario.categoria == "monitor":
#             monitor = Monitores.objects.get(id_monitor=usuario.id_usuario)
#             monitor_data = request.data.get("monitor", {})

#             # Atualiza os dados específicos do monitor
#             monitor_serializer = MonitorSerializer(
#                 monitor, data=monitor_data, partial=True
#             )
#             if monitor_serializer.is_valid():
#                 monitor_serializer.save()
#             else:
#                 return Response(
#                     monitor_serializer.errors, status=status.HTTP_400_BAD_REQUEST
#                 )

#         return Response(usuario_serializer.data)

#     return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# def postUser(self, request):
#     usuario_data = JSONParser().parse(request)
#     usuario_serializer = UsuarioSerializer(data=usuario_data)
#     if usuario_serializer.is_valid():
#         usuario = usuario_serializer.save()

#         if usuario.categoria == "monitor":
#             Monitores.objects.create(id_monitor=usuario)

#         return JsonResponse(usuario_serializer.data, status=status.HTTP_201_CREATED)
#     print(usuario_serializer.errors)

#     return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["DELETE"])
# def deleteUser(self, request, pk):
#     tutorial = Usuarios.objects.get(pk=pk)
#     tutorial.delete()
#     return JsonResponse(
#         {"message": "Tutorial was deleted successfully!"},
#         status=status.HTTP_204_NO_CONTENT,
#     )
